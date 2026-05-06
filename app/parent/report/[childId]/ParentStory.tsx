"use client";
import Link from "next/link";
import Story from "@/components/Story";
import RadarChart from "@/components/RadarChart";
import { IconArrowRight, IconShield, IconCheck, IconClock } from "@/components/icons";
import type { DiagnosticResult, LearningSequence } from "@/lib/types";

interface RootCausePresentation {
  weakNode: string;
  weakNodeName: string;
  rootCause: string;
  rootCauseName: string;
  path: string[];
  pathNodes: { id: string; name: string; grade: number }[];
  explanation: string;
}
interface RadarPoint { label: string; value: number; }

interface Props {
  childName: string;
  grade: number;
  result: DiagnosticResult;
  radarData: RadarPoint[];
  rootCauses: RootCausePresentation[];
  paths: LearningSequence[];
  sortedMastery: { name: string; subject: "math" | "korean"; grade: number; pct: number; ciLow: number; ciHigh: number }[];
  peerDiff: number;
  childAvgPct: number;
}

export default function ParentStory({
  childName, grade, result, radarData, rootCauses, paths, sortedMastery, peerDiff, childAvgPct,
}: Props) {
  const insight = rootCauses[0];

  const slides = [
    // === SLIDE 1: KPI 다크 카드 ===
    <div key="kpi" className="bg-gradient-to-br from-mint-600 to-mint-800 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-pop">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-mint-500/10 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-500/10 pointer-events-none" />
      <div className="relative">
        <div className="eyebrow text-accent-500 mb-3">학부모 리포트</div>
        <h1 className="h-hero text-3xl md:text-5xl mb-3">
          {childName} 학생, <span className="text-accent-500">초{grade}</span>
        </h1>
        <p className="text-base text-white/80 font-normal mb-8">한국창의영재교육원 검수 진단 결과</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-5 border-t border-white/10">
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">종합 마스터리</div>
            <div className="text-3xl md:text-4xl font-bold text-mint-400 tabular-nums">{childAvgPct}<span className="text-lg text-white/60">%</span></div>
          </div>
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">또래 비교</div>
            <div className={`text-3xl md:text-4xl font-bold tabular-nums ${peerDiff >= 0 ? "text-mint-400" : "text-accent-500"}`}>
              {peerDiff >= 0 ? "+" : ""}{peerDiff}<span className="text-lg text-white/60">%p</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">평가 영역</div>
            <div className="text-3xl md:text-4xl font-bold tabular-nums">{result.masteryByNode.length}</div>
          </div>
          <div>
            <div className="text-[11px] text-white/60 font-semibold tracking-wider mb-1">결손 영역</div>
            <div className="text-3xl md:text-4xl font-bold text-accent-500 tabular-nums">{result.rootCauses.length}</div>
          </div>
        </div>
      </div>
    </div>,

    // === SLIDE 2: AI 핵심 메시지 ===
    <div key="insight" className="bg-white border border-ink-100 rounded-3xl p-8 md:p-12">
      <div className="eyebrow text-mint-600 mb-3">AI 진단 한줄 요약</div>
      <h2 className="h-hero text-3xl md:text-4xl mb-6 leading-tight">
        {insight ? <>핵심은 <span className="text-mint-600">"{insight.weakNodeName}"</span>입니다</> : <>현재 학년을 <span className="text-mint-600">잘 따라가고 있어요</span></>}
      </h2>

      {insight ? (
        <>
          <div className="space-y-4 text-ink-800 font-normal leading-[1.75] mb-6">
            <p className="text-base md:text-lg">
              표면적으로 <strong className="font-semibold">{insight.weakNodeName}</strong>이(가) 약하지만,
            </p>
            <p className="text-base md:text-lg">
              근본 원인은 <strong className="font-semibold text-accent-700">{insight.rootCauseName}</strong> 결손에 있습니다.
            </p>
            <p className="text-base md:text-lg">
              학년을 거슬러 메우는 <strong className="font-semibold text-mint-700">"뿌리부터 학습"</strong>이 가장 효율적입니다.
            </p>
          </div>

          <div className="bg-paper-mint border border-mint-100 rounded-2xl p-5">
            <div className="eyebrow text-mint-700 mb-2">학원 vs kidsdiag</div>
            <p className="text-sm text-ink-700 font-normal leading-relaxed">
              학원 레벨테스트는 <span className="line-through text-ink-400">"못한다"</span>까지만,<br />
              kidsdiag는 <strong className="font-semibold text-ink-900">"왜 못하는지"</strong>까지 알려드립니다.
            </p>
          </div>
        </>
      ) : (
        <p className="text-base text-ink-700 font-normal leading-[1.7]">
          현재 학년 단원을 잘 따라가고 있어요. 추가 심화 학습으로 강점을 키워볼 수 있습니다.
        </p>
      )}
    </div>,

    // === SLIDE 3: 영역 차트 ===
    <div key="radar" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
      <div className="eyebrow text-mint-600 mb-2">영역별 분포</div>
      <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
        한눈에 보는 <span className="text-mint-600">학력 지도</span>
      </h2>
      <p className="text-sm text-ink-600 font-normal mb-6">바깥쪽일수록 강점, 안쪽일수록 보강 필요.</p>

      {radarData.length >= 3 && (
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-paper-grey rounded-2xl p-4">
            <RadarChart data={radarData} size={300} color="#15c480" />
          </div>
          <div className="space-y-2.5">
            {radarData.sort((a, b) => b.value - a.value).map((d) => {
              const pct = Math.round(d.value * 100);
              const tag = pct >= 70 ? { color: "text-mint-700 bg-mint-50", l: "강점" }
                : pct < 50 ? { color: "text-accent-700 bg-accent-100", l: "보강 필요" }
                : { color: "text-sky-700 bg-sky-50", l: "양호" };
              return (
                <div key={d.label}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-900 text-sm">{d.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tag.color}`}>{tag.l}</span>
                    </div>
                    <span className="text-sm font-bold text-ink-900 tabular-nums">{pct}%</span>
                  </div>
                  <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct >= 70 ? "bg-mint-500" : pct < 50 ? "bg-accent-500" : "bg-sky-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>,

    // === SLIDE 4: 결손 트리 (있을 때) ===
    ...(rootCauses.length > 0 ? [
      <div key="tree" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
        <div className="eyebrow text-accent-700 mb-2">결손 트리 — 학년 거슬러 추적</div>
        <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
          <span className="text-accent-600">근본 원인</span>까지 짚어드립니다
        </h2>
        <p className="text-sm text-ink-600 font-normal mb-6">가장 깊은 곳부터 채우는 게 효율적입니다.</p>

        <div className="space-y-4">
          {rootCauses.slice(0, 4).map((rc, idx) => (
            <div key={rc.weakNode} className="border border-ink-100 rounded-2xl p-5 hover:border-mint-200 transition">
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

    // === SLIDE 5: 학습 경로 ===
    ...(paths.length > 0 ? [
      <div key="paths" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
        <div className="eyebrow text-lavender-700 mb-2">추천 학습 경로</div>
        <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
          이 <span className="text-lavender-600">순서대로</span> 진행해주세요
        </h2>
        <p className="text-sm text-ink-600 font-normal mb-6">우선순위 알고리즘으로 정렬됐습니다.</p>

        <div className="space-y-3">
          {paths.slice(0, 4).map((p, idx) => (
            <div key={p.nodeId} className="border border-lavender-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-2xl bg-lavender-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-ink-900">{p.nodeName}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-600 font-medium">
                  <IconClock size={12} /> {p.estimatedTotalMin}분
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1.5 ml-12 mt-2">
                {p.sequence.map((s, si) => (
                  <div key={s.step} className="bg-paper-grey rounded-lg p-1.5 text-center">
                    <div className="text-[9px] text-lavender-700 font-bold">STEP {si + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>,
    ] : []),

    // === SLIDE 6: 재진단 일정 ===
    <div key="retest" className="bg-white border border-ink-100 rounded-3xl p-7 md:p-10">
      <div className="eyebrow text-mint-600 mb-2">재진단 일정</div>
      <h2 className="h-section text-xl md:text-2xl lg:text-3xl mb-2">
        <span className="text-mint-600">정량적으로</span> 변화를 추적합니다
      </h2>
      <p className="text-sm text-ink-600 font-normal mb-7">진단은 한 번이 아니라, 학습 효과 측정의 시작점입니다.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-accent-100/40 border border-accent-300 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="eyebrow text-accent-700">2주 후</div>
            <div className="w-10 h-10 rounded-2xl bg-accent-500 text-ink-900 flex items-center justify-center font-bold">
              2W
            </div>
          </div>
          <div className="font-semibold text-ink-900 mb-1.5 text-base">약점 영역 집중 진단</div>
          <p className="text-sm text-ink-700 font-normal leading-relaxed">결손 영역만 30분 짧은 진단으로 즉각 변화를 확인할 수 있습니다.</p>
        </div>

        <div className="bg-mint-50 border border-mint-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="eyebrow text-mint-700">3개월 후</div>
            <div className="w-10 h-10 rounded-2xl bg-mint-500 text-white flex items-center justify-center font-bold">
              3M
            </div>
          </div>
          <div className="font-semibold text-ink-900 mb-1.5 text-base">전체 재진단 + 성장 그래프</div>
          <p className="text-sm text-ink-700 font-normal leading-relaxed">전 영역 마스터리 변화 시각화. 학습 효과를 그래프로 확인합니다.</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 px-2">
        <IconShield className="text-mint-600 flex-shrink-0" size={16} />
        <p className="text-[11px] text-ink-600 font-normal leading-relaxed">
          본 리포트는 한국창의영재교육원 전문가 검수를 통과했으며, 개인정보보호법에 따라 보호됩니다.
        </p>
      </div>
    </div>,

    // === SLIDE 7 (FINAL): 행동 가이드 ===
    <div key="action" className="bg-paper-mint border border-mint-100 rounded-3xl p-8 md:p-12">
      <div className="eyebrow text-mint-700 mb-3">학부모님께</div>
      <h2 className="h-hero text-3xl md:text-4xl mb-4">
        지금 <span className="text-mint-600">바로</span> 시작할 수 있습니다
      </h2>

      <div className="space-y-3 mb-7">
        {[
          "AI 친구 튜터로 추천 학습 경로 1번부터 시작하기",
          "PDF 리포트 다운로드 (준비중)로 학원·과외에 공유",
          "2주 후 약점 영역 짧은 재진단 권장",
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-mint-100">
            <div className="w-7 h-7 rounded-full bg-mint-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              {i + 1}
            </div>
            <p className="text-sm text-ink-800 font-medium leading-relaxed flex-1">{t}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href="/tutor" className="bg-mint-600 hover:bg-mint-700 text-white font-semibold px-6 py-4 rounded-full inline-flex items-center justify-center gap-2 transition shadow-pop">
          AI 튜터 시작 <IconArrowRight size={18} />
        </Link>
        <Link href="/select" className="bg-white border border-ink-200 text-ink-700 font-semibold px-6 py-4 rounded-full hover:border-mint-300 hover:text-mint-700 transition text-center">
          다시 진단하기
        </Link>
      </div>
    </div>,
  ];

  const finalAction = (
    <Link href="/tutor" className="bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 inline-flex items-center justify-center gap-2 shadow-pop transition w-full sm:w-auto">
      AI 튜터 시작하기 <IconArrowRight size={18} />
    </Link>
  );

  return <Story slides={slides} finalAction={finalAction} />;
}
