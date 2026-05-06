import Link from "next/link";
import { store, getNodeById } from "@/lib/data";
import { computeResult } from "@/lib/cat/engine";
import { buildLearningPaths } from "@/lib/recommend/recommender";
import type { DiagnosticResult } from "@/lib/types";
import { IconArrowRight } from "@/components/icons";
import ParentStory from "./ParentStory";

export function generateStaticParams() {
  return [{ childId: "child_demo" }];
}

export const dynamicParams = false;

export default async function ParentReportPage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params;
  const child = store.children.get(childId);

  const sessions = Array.from(store.sessions.values())
    .filter((s) => s.childId === childId && s.status === "completed")
    .sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0));

  let result: DiagnosticResult | null = null;
  if (sessions.length > 0) result = computeResult(sessions[0]);

  if (!child) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper">
        <div className="bg-white border border-mint-100 rounded-3xl shadow-soft p-10 text-center max-w-md">
          <h1 className="h-section text-2xl mb-3">자녀 정보를 찾을 수 없어요</h1>
          <Link href="/" className="btn-primary mt-4">처음으로</Link>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-paper-mint flex items-center">
        <div className="max-w-2xl mx-auto px-6 w-full">
          <div className="bg-white border border-mint-100 rounded-3xl shadow-soft p-12 text-center">
            <div className="eyebrow text-mint-600 mb-2">학부모 리포트</div>
            <h1 className="h-section text-3xl mb-3">{child.name} 학생 (초{child.grade})</h1>
            <p className="text-ink-600 font-normal mb-7">아직 완료된 진단이 없어요.<br />자녀와 함께 진단을 시작해보세요.</p>
            <Link href="/select" className="btn-primary">진단 시작하기 <IconArrowRight size={18} /></Link>
          </div>
        </div>
      </main>
    );
  }

  const sortedMastery = [...result.masteryByNode].sort((a, b) => b.mastery - a.mastery).map((m) => {
    const node = getNodeById(m.nodeId);
    return {
      name: node?.name ?? m.nodeId,
      subject: (node?.subject ?? "math") as "math" | "korean",
      grade: node?.grade ?? 5,
      pct: Math.round(m.mastery * 100),
      ciLow: Math.round(m.ci[0] * 100),
      ciHigh: Math.round(m.ci[1] * 100),
    };
  });
  const paths = buildLearningPaths(result);

  // Radar
  const cat: Record<string, { name: string; values: number[] }> = {
    math_calc: { name: "수 계산", values: [] },
    math_concept: { name: "개념 이해", values: [] },
    math_apply: { name: "응용·문장제", values: [] },
    korean_vocab: { name: "어휘·문법", values: [] },
    korean_reading: { name: "독해", values: [] },
    korean_writing: { name: "쓰기", values: [] },
  };
  result.masteryByNode.forEach((m) => {
    const node = getNodeById(m.nodeId);
    if (!node) return;
    if (node.subject === "math") {
      if (node.bloom === "remember" || node.bloom === "apply") cat.math_calc.values.push(m.mastery);
      else if (node.bloom === "understand") cat.math_concept.values.push(m.mastery);
      else cat.math_apply.values.push(m.mastery);
    } else {
      if (node.name.includes("어휘") || node.name.includes("문법")) cat.korean_vocab.values.push(m.mastery);
      else if (node.name.includes("독해")) cat.korean_reading.values.push(m.mastery);
      else cat.korean_writing.values.push(m.mastery);
    }
  });
  const radarData = Object.values(cat)
    .map((c) => ({ label: c.name, value: c.values.length > 0 ? c.values.reduce((s, v) => s + v, 0) / c.values.length : 0 }))
    .filter((d) => d.value > 0);

  const peerAvg = 0.65;
  const peerDiff = Math.round((result.overallMastery - peerAvg) * 100);
  const childAvgPct = Math.round(result.overallMastery * 100);

  const rootCauses = result.rootCauses.map((rc) => {
    const weakNode = getNodeById(rc.weakNode);
    const rootCauseNode = getNodeById(rc.rootCause);
    return {
      ...rc,
      weakNodeName: weakNode?.name ?? rc.weakNode,
      rootCauseName: rootCauseNode?.name ?? rc.rootCause,
      pathNodes: rc.path.map((id) => {
        const node = getNodeById(id);
        return { id, name: node?.name ?? id, grade: node?.grade ?? 5 };
      }),
    };
  });

  return (
    <ParentStory
      childName={child.name}
      grade={child.grade}
      result={result}
      radarData={radarData}
      rootCauses={rootCauses}
      paths={paths}
      sortedMastery={sortedMastery}
      peerDiff={peerDiff}
      childAvgPct={childAvgPct}
    />
  );
}
