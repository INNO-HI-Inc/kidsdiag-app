// CAT (Computerized Adaptive Testing) 엔진 — 단순화된 베타 버전

import { itemsAll, getPrerequisites, getNodeById } from "@/lib/data";
import { estimateTheta, fisherInfo2pl, standardError, thetaToMastery } from "@/lib/cat/irt";
import type { Item, DiagnosticSession, Response, MasteryWithCI, RootCause, DiagnosticResult } from "@/lib/types";

const MAX_ITEMS = 20; // 데모용 (운영은 80~120)
const MAX_DURATION_MIN = 30; // 데모용 (운영은 60~90)
const SE_THRESHOLD = 0.4;
const NODE_REPEAT_LIMIT = 3;

/** 다음 출제할 문항 선택 (Maximum Fisher Information + 노드 다양성) */
export function selectNextItem(session: DiagnosticSession, allowedSubject?: "math" | "korean"): Item | null {
  const answeredSet = new Set(session.answeredItemIds);
  const nodeCount: Record<string, number> = {};
  for (const r of session.responses) {
    const item = itemsAll.find((i) => i.id === r.itemId);
    if (item) nodeCount[item.nodeId] = (nodeCount[item.nodeId] || 0) + 1;
  }

  // 후보 문항: 안 푼 것 + 노드 반복 한도 미초과 + 과목 필터
  const candidates = itemsAll.filter((i) => {
    if (i.status !== "approved") return false;
    if (answeredSet.has(i.id)) return false;
    if ((nodeCount[i.nodeId] || 0) >= NODE_REPEAT_LIMIT) return false;
    if (allowedSubject && i.subject !== allowedSubject) return false;
    return true;
  });

  if (candidates.length === 0) return null;

  // 학년 거슬러 추적: 최근 노드에서 연속 2회 오답이면 prerequisite 우선
  const lastResponse = session.responses[session.responses.length - 1];
  let preferredNodes: Set<string> | null = null;
  if (lastResponse) {
    const lastItem = itemsAll.find((i) => i.id === lastResponse.itemId);
    if (lastItem && (session.consecutiveWrongOnNode[lastItem.nodeId] || 0) >= 2) {
      const prereqs = getPrerequisites(lastItem.nodeId);
      if (prereqs.length > 0) preferredNodes = new Set(prereqs);
    }
  }

  // Maximum Fisher Information 선택
  let best: Item | null = null;
  let bestScore = -Infinity;
  for (const c of candidates) {
    let score = fisherInfo2pl(session.currentTheta, c.irt.a, c.irt.b);
    if (preferredNodes && preferredNodes.has(c.nodeId)) score *= 1.5; // prerequisite 가중치
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

/** 응답 처리 + theta 업데이트 */
export function processAnswer(session: DiagnosticSession, response: Response): DiagnosticSession {
  const newSession = { ...session };
  newSession.responses = [...session.responses, response];
  newSession.answeredItemIds = [...session.answeredItemIds, response.itemId];

  // theta 업데이트
  const irtResponses = newSession.responses
    .map((r) => {
      const item = itemsAll.find((i) => i.id === r.itemId);
      if (!item) return null;
      return { a: item.irt.a, b: item.irt.b, c: item.irt.c, isCorrect: r.isCorrect };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
  newSession.currentTheta = estimateTheta(irtResponses);
  newSession.thetaHistory = [...session.thetaHistory, newSession.currentTheta];

  // 노드별 연속 오답 카운터
  const item = itemsAll.find((i) => i.id === response.itemId);
  if (item) {
    const newCounts = { ...session.consecutiveWrongOnNode };
    if (response.isCorrect) {
      newCounts[item.nodeId] = 0;
    } else {
      newCounts[item.nodeId] = (newCounts[item.nodeId] || 0) + 1;
    }
    newSession.consecutiveWrongOnNode = newCounts;
  }

  return newSession;
}

/** 종료 조건 검사 */
export function shouldTerminate(session: DiagnosticSession): boolean {
  if (session.answeredItemIds.length >= MAX_ITEMS) return true;
  const elapsedMin = (Date.now() - session.startedAt) / 60000;
  if (elapsedMin > MAX_DURATION_MIN) return true;

  // SE 충분히 작아짐 (최소 5문항 이후)
  if (session.responses.length >= 5) {
    const items = session.responses
      .map((r) => itemsAll.find((i) => i.id === r.itemId))
      .filter((i): i is Item => !!i)
      .map((i) => ({ a: i.irt.a, b: i.irt.b }));
    const se = standardError(session.currentTheta, items);
    if (se < SE_THRESHOLD) return true;
  }
  return false;
}

/** 최종 결과 산출: 마스터리 + 결손 트리 */
export function computeResult(session: DiagnosticSession): DiagnosticResult {
  // 노드별 응답 그룹화
  const byNode: Record<string, Response[]> = {};
  for (const r of session.responses) {
    const item = itemsAll.find((i) => i.id === r.itemId);
    if (!item) continue;
    byNode[item.nodeId] = byNode[item.nodeId] || [];
    byNode[item.nodeId].push(r);
  }

  // 노드별 마스터리: 그 노드 응답으로 추정 theta → mastery
  const masteryByNode: MasteryWithCI[] = Object.entries(byNode).map(([nodeId, responses]) => {
    const irtResp = responses
      .map((r) => {
        const it = itemsAll.find((i) => i.id === r.itemId);
        return it ? { a: it.irt.a, b: it.irt.b, c: it.irt.c, isCorrect: r.isCorrect } : null;
      })
      .filter((r): r is NonNullable<typeof r> => !!r);
    const theta = estimateTheta(irtResp);
    const mastery = thetaToMastery(theta);
    const items = irtResp.map((r) => ({ a: r.a, b: r.b }));
    const se = standardError(theta, items);
    const lower = thetaToMastery(theta - 1.96 * se);
    const upper = thetaToMastery(theta + 1.96 * se);
    return { nodeId, mastery, ci: [Math.max(0, lower), Math.min(1, upper)] as [number, number] };
  });

  // 결손 트리: weak nodes (mastery < 0.5) 의 root cause path 찾기
  const weakNodes = masteryByNode.filter((m) => m.mastery < 0.5);
  const masteryMap: Record<string, number> = {};
  masteryByNode.forEach((m) => (masteryMap[m.nodeId] = m.mastery));

  const rootCauses: RootCause[] = weakNodes.map((weak) => {
    const path: string[] = [weak.nodeId];
    let current = weak.nodeId;
    for (let depth = 0; depth < 3; depth++) {
      const prereqs = getPrerequisites(current);
      const weakPrereqs = prereqs.filter((p) => (masteryMap[p] ?? 1) < 0.5);
      if (weakPrereqs.length === 0) break;
      const sorted = weakPrereqs.sort((a, b) => (masteryMap[a] ?? 1) - (masteryMap[b] ?? 1));
      const next = sorted[0];
      if (path.includes(next)) break;
      path.push(next);
      current = next;
    }
    const rootCauseId = path[path.length - 1];
    const weakName = getNodeById(weak.nodeId)?.name ?? weak.nodeId;
    const causeName = getNodeById(rootCauseId)?.name ?? rootCauseId;
    return {
      weakNode: weak.nodeId,
      rootCause: rootCauseId,
      path,
      explanation:
        rootCauseId === weak.nodeId
          ? `${weakName}을(를) 조금 더 연습해야 해요.`
          : `${weakName}이(가) 약한 이유는 ${causeName} 결손 때문입니다.`,
    };
  });

  const overallMastery =
    masteryByNode.length > 0
      ? masteryByNode.reduce((sum, m) => sum + m.mastery, 0) / masteryByNode.length
      : 0;

  return {
    sessionId: session.id,
    masteryByNode,
    rootCauses,
    overallMastery,
    durationMin: ((session.endedAt ?? Date.now()) - session.startedAt) / 60000,
    itemsCount: session.answeredItemIds.length,
  };
}
