// 학습 추천 엔진 — 결손 트리 → 우선순위 → 5단계 시퀀스

import { getNodeById, getItemsByNode } from "@/lib/data";
import type { DiagnosticResult, LearningSequence, LearningStep } from "@/lib/types";

export function buildLearningPaths(result: DiagnosticResult): LearningSequence[] {
  // 우선순위 점수 계산
  const masteryMap: Record<string, number> = {};
  result.masteryByNode.forEach((m) => (masteryMap[m.nodeId] = m.mastery));

  const ranked = result.rootCauses
    .map((rc) => {
      const targetNodeId = rc.rootCause; // root cause부터 채움
      const mastery = masteryMap[targetNodeId] ?? 0.5;
      const node = getNodeById(targetNodeId);
      const depth = rc.path.length;
      const priority = depth * 3 + (1 - mastery) * 2;
      return { rc, targetNodeId, mastery, node, priority };
    })
    .filter((x) => x.node)
    .sort((a, b) => b.priority - a.priority);

  // 중복 제거 (같은 root cause 여러 weak에서 등장 시 한 번만)
  const seen = new Set<string>();
  const unique = ranked.filter((r) => {
    if (seen.has(r.targetNodeId)) return false;
    seen.add(r.targetNodeId);
    return true;
  });

  return unique.slice(0, 5).map((r): LearningSequence => {
    const items = getItemsByNode(r.targetNodeId);
    const sequence: LearningStep[] = [
      {
        step: 1,
        type: "concept_explanation",
        estimatedMin: 5,
        description: `${r.node!.name} 개념을 다시 설명할게요.`,
      },
      {
        step: 2,
        type: "worked_example",
        itemIds: items.slice(0, 1).map((i) => i.id),
        estimatedMin: 8,
        description: "풀이 과정을 함께 살펴봐요.",
      },
      {
        step: 3,
        type: "practice",
        itemIds: items.slice(1, 4).map((i) => i.id),
        estimatedMin: 12,
        description: "이제 직접 풀어볼 차례예요.",
      },
      {
        step: 4,
        type: "quick_check",
        itemIds: items.slice(4, 5).map((i) => i.id),
        estimatedMin: 3,
        description: "간단한 점검 문제로 확인해요.",
      },
      {
        step: 5,
        type: "ai_tutor",
        estimatedMin: 5,
        description: "막히는 부분이 있으면 AI 튜터와 대화해요.",
      },
    ];
    return {
      nodeId: r.targetNodeId,
      nodeName: r.node!.name,
      priority: Math.round(r.priority * 10) / 10,
      sequence,
      estimatedTotalMin: sequence.reduce((sum, s) => sum + s.estimatedMin, 0),
    };
  });
}
