import Link from "next/link";
import { store, getNodeById } from "@/lib/data";
import { computeResult } from "@/lib/cat/engine";
import { buildLearningPaths } from "@/lib/recommend/recommender";
import StudentStory from "./StudentStory";

export function generateStaticParams() {
  return [{ sessionId: "demo" }];
}

export const dynamicParams = false;

export default async function ResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const session = store.sessions.get(sessionId);

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper">
        <div className="bg-white border border-mint-100 rounded-3xl shadow-soft p-10 text-center max-w-md">
          <h1 className="h-section text-2xl mb-3">세션을 찾을 수 없어요</h1>
          <p className="text-ink-600 font-normal mb-6">진단을 다시 시작해주세요.</p>
          <Link href="/" className="btn-primary">처음으로</Link>
        </div>
      </main>
    );
  }

  const child = store.children.get(session.childId);
  const childName = child?.name ?? "민지";
  const result = computeResult({ ...session, endedAt: session.endedAt ?? Date.now() });
  const paths = buildLearningPaths(result);
  const sortedMastery = [...result.masteryByNode].sort((a, b) => b.mastery - a.mastery);

  // === Radar (영역 그룹핑) ===
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

  const topMastery = sortedMastery.slice(0, 3).map((m) => {
    const node = getNodeById(m.nodeId);
    return { name: node?.name ?? m.nodeId, grade: node?.grade ?? 5, pct: Math.round(m.mastery * 100) };
  });
  const weakMastery = sortedMastery.slice(-3).reverse().map((m) => {
    const node = getNodeById(m.nodeId);
    return {
      name: node?.name ?? m.nodeId,
      grade: node?.grade ?? 5,
      pct: Math.round(m.mastery * 100),
      ciLow: Math.round(m.ci[0] * 100),
      ciHigh: Math.round(m.ci[1] * 100),
    };
  });

  const rootCauses = result.rootCauses.map((rc) => ({
    ...rc,
    pathNodes: rc.path.map((id) => {
      const node = getNodeById(id);
      return { id, name: node?.name ?? id, grade: node?.grade ?? 5 };
    }),
  }));

  return (
    <StudentStory
      childName={childName}
      childId={session.childId}
      result={result}
      radarData={radarData}
      rootCauses={rootCauses}
      paths={paths}
      topMastery={topMastery}
      weakMastery={weakMastery}
    />
  );
}
