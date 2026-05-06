"use client";
import Link from "next/link";
import Story from "@/components/Story";
import RadarChart from "@/components/RadarChart";
import { IconArrowRight, IconCheck } from "@/components/icons";
import type { DiagnosticResult, ConceptNode, LearningSequence } from "@/lib/types";

interface RadarPoint { label: string; value: number; }
interface RootCausePresentation {
  weakNode: string;
  rootCause: string;
  path: string[];
  explanation: string;
  pathNodes: { id: string; name: string; grade: number }[];
}

interface Props {
  childName: string;
  childId: string;
  result: DiagnosticResult;
  radarData: RadarPoint[];
  rootCauses: RootCausePresentation[];
  paths: LearningSequence[];
  topMastery: { name: string; grade: number; pct: number }[];
  weakMastery: { name: string; grade: number; pct: number; ciLow: number; ciHigh: number }[];
}

export default function StudentStory({
  childName, childId, result, radarData, rootCauses, paths, topMastery, weakMastery,
}: Props) {
  const score = Math.round(result.overallMastery * 100);
  const level = score >= 80 ? "GOLD" : score >= 60 ? "SILVER" : "BRONZE";
  const levelColor = score >= 80 ? "text-accent-700 bg-accent-100" : score >= 60 ? "text-mint-700 bg-mint-100" : "text-lavender-700 bg-lavender-100";
  const message = score >= 80 ? "또래 대비 우수해. 지금처럼만!" : score >= 60 ? "잘하고 있어. 약한 곳만 채우면 더 좋아져." : "수고했어. 어디 막혔는지 알았으니 같이 채우자.";

  const slides = [
    // === SLIDE 1: 인사 + 종합 점수 ===
    <div key="intro" className="bg-gradient-to-br from-mint-600 to-mint-800 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-pop">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-mint-500/10 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-500/10 pointer-events-none" />
      <div className="relative">
        <div className="eyebrow text-accent-500 mb-3">검사 완료</div>
        <h1 className="h-hero text-4xl md:text-5xl mb-4">
          {childName}야, <span className="text-accent-500">고생했어!</span>
        </h1>
        <p className="text-base md:text-lg text-white/85 font-normal leading-[1.7] mb-8">
          {message}
        </p>

        <div className="flex items-end gap-4 mb-7">
          <div className="text-6xl md:text-7xl font-bold tabular-nums leading-none text-accent-500">
            {score}
          </div>
          <div className="text-white/70 font-medium pb-3">/ 100</div>
          <div className={`ml-auto px-4 py-1.5 rounded-full text-xs font-bold tracking-widest ${levelColor}`}>
            {level}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">평가 영역</div>
            <div className="text-2xl font-bold tabular-nums">{result.masteryByNode.length}</div>
          </div>
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">결손 영역</div>
            <div className="text-2xl font-bold text-accent-500 tabular-nums">{result.rootCauses.length}</div>
          </div>
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">소요 시간</div>
            <div className="text-2xl font-bold tabular-nums">{Math.max(1, Math.round(result.durationMin))}<span className="text-sm text-white/60 ml-1">분</span></div>
          </div>
        </div>
      </div>
    </div>,

    // === SLIDE 2: 영역 차트 ===
    <div key="radar" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
      <div className="eyebrow text-mint-600 mb-2">한눈에 보는 학력 지도</div>
      <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
        영역별 <span className="text-mint-600">실력 분포</span>
      </h2>
      <p className="text-sm text-ink-600 font-normal mb-6">바깥쪽일수록 잘하는 영역이야.</p>

      {radarData.length >= 3 ? (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-paper-grey rounded-2xl p-4">
            <RadarChart data={radarData} size={300} color="#15c480" />
          </div>
          <div className="space-y-2.5">
            {radarData.sort((a, b) => b.value - a.value).map((d) => {
              const pct = Math.round(d.value * 100);
              const color = pct >= 70 ? "bg-mint-500" : pct < 50 ? "bg-accent-500" : "bg-sky-500";
              return (
                <div key={d.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-ink-900 text-sm">{d.label}</span>
                    <span className="text-sm font-bold text-ink-900 tabular-nums">{pct}%</span>
                  </div>
                  <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-ink-500">데이터가 부족해 차트를 만들 수 없어요.</p>
      )}
    </div>,

    // === SLIDE 3: 강점 ===
    <div key="strengths" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
      <div className="eyebrow text-mint-600 mb-2">잘하는 부분</div>
      <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
        {childName}는 이 부분이 <span className="text-mint-600">강해</span>
      </h2>
      <p className="text-sm text-ink-600 font-normal mb-7">계속 이 페이스로 가면 돼.</p>

      <div className="space-y-3">
        {topMastery.slice(0, 3).map((m, idx) => (
          <div key={m.name} className="flex items-center gap-4 bg-mint-50 border border-mint-100 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-2xl bg-mint-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-ink-900">{m.name}</div>
              <div className="text-[11px] text-ink-500 mt-0.5">초{m.grade}</div>
            </div>
            <div className="text-2xl font-bold text-mint-600 tabular-nums">{m.pct}%</div>
          </div>
        ))}
      </div>
    </div>,

    // === SLIDE 4: 약점 ===
    <div key="weaknesses" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
      <div className="eyebrow text-accent-700 mb-2">조금 더 연습하면 좋은 부분</div>
      <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
        여기만 채우면 <span className="text-accent-600">한 단계 점프</span>
      </h2>
      <p className="text-sm text-ink-600 font-normal mb-7">
        틀린 게 아니라, <strong className="font-semibold">아직 안 배운 거</strong>일 수도 있어.
      </p>

      <div className="space-y-3">
        {weakMastery.slice(0, 3).map((m, idx) => (
          <div key={m.name} className="bg-accent-100/40 border border-accent-300 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-accent-500 text-ink-900 flex items-center justify-center text-base font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-ink-900">{m.name}</div>
                <div className="text-[11px] text-ink-500 mt-0.5">초{m.grade} · 신뢰구간 {m.ciLow}~{m.ciHigh}%</div>
              </div>
              <div className="text-xl font-bold text-accent-700 tabular-nums">{m.pct}%</div>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 rounded-full" style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>,

    // === SLIDE 5: 결손 트리 (있을 때) ===
    ...(rootCauses.length > 0 ? [
      <div key="tree" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
        <div className="eyebrow text-accent-700 mb-2">왜 막혔을까?</div>
        <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
          학년을 <span className="text-accent-600">거슬러</span> 가서 짚었어
        </h2>
        <p className="text-sm text-ink-600 font-normal mb-7">표면만 보지 말고 뿌리부터 채우자.</p>

        <div className="space-y-4">
          {rootCauses.slice(0, 3).map((rc, idx) => (
            <div key={rc.weakNode} className="border border-ink-100 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-2xl bg-mint-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-ink-900 leading-relaxed flex-1">{rc.explanation}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 ml-11">
                {rc.pathNodes.map((node, i) => (
                  <span key={node.id} className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${
                        i === rc.pathNodes.length - 1
                          ? "bg-accent-500 text-ink-900"
                          : i === 0
                          ? "bg-mint-50 border border-mint-200 text-mint-700"
                          : "bg-ink-100 text-ink-700"
                      }`}
                    >
                      {node.name}
                      <span className="ml-1.5 opacity-60 font-normal">초{node.grade}</span>
                    </span>
                    {i < rc.pathNodes.length - 1 && <span className="text-ink-400 text-xs">←</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>,
    ] : []),

    // === SLIDE 6: 학습 경로 ===
    ...(paths.length > 0 ? [
      <div key="paths" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
        <div className="eyebrow text-lavender-700 mb-2">다음에 같이 풀어볼래?</div>
        <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
          <span className="text-lavender-600">우선순위</span> 순으로 정리했어
        </h2>
        <p className="text-sm text-ink-600 font-normal mb-7">아래 순서대로 풀면 효율적이야.</p>

        <div className="space-y-3">
          {paths.slice(0, 3).map((p, idx) => (
            <div key={p.nodeId} className="flex items-center gap-4 border border-lavender-100 rounded-2xl p-4">
              <div className="w-12 h-12 rounded-2xl bg-lavender-500 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-ink-900">{p.nodeName}</div>
                <div className="text-[11px] text-ink-500 mt-0.5">예상 {p.estimatedTotalMin}분 · {p.sequence.length}단계</div>
              </div>
              <IconArrowRight className="text-lavender-500" size={20} />
            </div>
          ))}
        </div>
      </div>,
    ] : []),

    // === SLIDE 7 (FINAL): 다음 액션 ===
    <div key="action" className="bg-paper-mint border border-mint-100 rounded-3xl p-8 md:p-12 text-center">
      <div className="eyebrow text-mint-700 mb-3">다음 단계</div>
      <h2 className="h-hero text-3xl md:text-4xl mb-4">
        결과를 <span className="text-mint-600">활용</span>해볼까?
      </h2>
      <p className="text-base text-ink-700 font-normal mb-8 max-w-md mx-auto leading-[1.7]">
        AI 친구 튜터와 약점부터 채워가거나,<br />
        부모님께 자세한 리포트를 보여드릴 수 있어.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
        <Link href="/tutor" className="bg-mint-600 hover:bg-mint-700 text-white font-semibold px-6 py-4 rounded-full inline-flex items-center justify-center gap-2 transition shadow-pop">
          AI 튜터 시작 <IconArrowRight size={18} />
        </Link>
        <Link href={`/parent/report/${childId}`} className="bg-white border border-ink-200 text-ink-700 font-semibold px-6 py-4 rounded-full hover:border-mint-300 hover:text-mint-700 transition">
          학부모 리포트
        </Link>
      </div>

      <p className="text-[11px] text-ink-500 font-normal mt-7 leading-relaxed">
        본 진단은 한국창의영재교육원 전문가 검수를 거쳤어요.
      </p>
    </div>,
  ];

  const finalAction = (
    <Link href="/tutor" className="bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 inline-flex items-center justify-center gap-2 shadow-pop transition w-full sm:w-auto">
      AI 튜터 시작하기 <IconArrowRight size={18} />
    </Link>
  );

  return <Story slides={slides} finalAction={finalAction} />;
}
