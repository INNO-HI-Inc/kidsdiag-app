import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function MyPage() {
  const history = [
    { date: "2026.05.06", type: "사전 진단", subj: "전체 4블록", score: 74, status: "완료", color: "mint" },
    { date: "2026.05.05", type: "AI 튜터", subj: "분수의 덧셈 · 23회 대화", score: null, status: "기록", color: "sky" },
    { date: "2026.05.04", type: "향상 교육", subj: "비와 비율 · 동영상 5편", score: null, status: "완료", color: "lavender" },
    { date: "2026.05.03", type: "유사 문항", subj: "수학 12문항", score: 83, status: "완료", color: "mint" },
    { date: "2026.05.02", type: "오답 노트", subj: "과학 4문항 복습", score: null, status: "완료", color: "sun" },
  ];

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-12">
        {/* 학생 정보 카드 */}
        <div className="bg-gradient-to-br from-mint-50 via-paper to-lavender-50 border-2 border-mint-200 rounded-3xl p-7 mb-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-mint-200/40 blur-2xl pointer-events-none" />
          <div className="relative grid md:grid-cols-3 gap-5 items-center">
            <div className="flex items-center gap-4 md:col-span-2">
              <div className="w-16 h-16 rounded-2xl bg-mint-500 text-white flex items-center justify-center text-3xl font-bold">민</div>
              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-widest text-mint-700">MY PAGE</div>
                <h1 className="text-xl font-bold tracking-tight">김민지 · 초5</h1>
                <div className="text-[11px] text-ink-600 mt-1">
                  학번 <span className="font-semibold tabular-nums">2026-05-1247</span> · 제닉스초등학교 5-3
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-mint-700 tabular-nums">+36p</div>
                <div className="text-[9px] text-ink-600">전체 향상도</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-lavender-700 tabular-nums">28%</div>
                <div className="text-[9px] text-ink-600">전국 상위</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sun-600 tabular-nums">7급</div>
                <div className="text-[9px] text-ink-600">반 진도</div>
              </div>
            </div>
          </div>
        </div>

        {/* 영역별·종합결과 (FUN-002) */}
        <div className="bg-white rounded-2xl p-7 border border-ink-100 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold tracking-tight">📊 영역별·종합결과 (사전 → 사후)</h2>
            <Link href="/parent/report/child_demo" className="text-xs font-semibold text-mint-700 hover:text-mint-900">
              학부모 리포트 →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { subj: "국어", pre: 71, post: 85, c: "lavender" },
              { subj: "과학", pre: 65, post: 81, c: "sky" },
              { subj: "수학", pre: 78, post: null, c: "mint" },
              { subj: "통합사고력", pre: 82, post: null, c: "sun" },
            ].map((s) => {
              const cmap: Record<string, { bg: string; bar: string; text: string }> = {
                mint: { bg: "bg-mint-50", bar: "bg-mint-500", text: "text-mint-700" },
                sky: { bg: "bg-sky-50", bar: "bg-sky-500", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", bar: "bg-lavender-500", text: "text-lavender-700" },
                sun: { bg: "bg-sun-50", bar: "bg-sun-500", text: "text-sun-600" },
              };
              const c = cmap[s.c];
              return (
                <div key={s.subj} className={`${c.bg} rounded-xl p-3`}>
                  <div className={`text-[10px] font-bold ${c.text} mb-1.5`}>{s.subj}</div>
                  {s.post !== null ? (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-bold tabular-nums">{s.post}%</span>
                        <span className={`text-[10px] font-bold ${c.text}`}>+{s.post - s.pre}p</span>
                      </div>
                      <div className="text-[9px] text-ink-600 mt-0.5">사전 {s.pre}% → 사후 {s.post}%</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl font-bold tabular-nums text-ink-700">{s.pre}%</div>
                      <div className="text-[9px] text-ink-500 mt-0.5">사후 진단 대기</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 학습이력관리 (FUN-004) */}
        <div className="bg-white rounded-2xl p-7 border border-ink-100 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold tracking-tight">📅 학습이력관리</h2>
            <span className="text-[10px] font-bold text-lavender-700 bg-lavender-50 px-2 py-0.5 rounded-full">FUN-004</span>
          </div>
          <div className="space-y-1.5">
            {history.map((h, i) => {
              const cmap: Record<string, { bg: string; text: string }> = {
                mint: { bg: "bg-mint-50", text: "text-mint-700" },
                sky: { bg: "bg-sky-50", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", text: "text-lavender-700" },
                sun: { bg: "bg-sun-50", text: "text-sun-600" },
              };
              const c = cmap[h.color];
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-ink-100 last:border-0">
                  <div className="text-[11px] text-ink-500 tabular-nums w-20 flex-shrink-0">{h.date}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.bg} ${c.text} flex-shrink-0`}>
                    {h.type}
                  </span>
                  <div className="flex-1 text-sm font-semibold min-w-0 truncate">{h.subj}</div>
                  {h.score !== null && <div className="text-sm font-bold tabular-nums">{h.score}%</div>}
                  <span className="text-xs text-ink-600 w-12 text-right">{h.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 진단/총괄 현황 조회 (FUN-001 사용자 측) */}
        <div className="bg-white rounded-2xl p-7 border border-ink-100 mb-5">
          <h2 className="text-base font-bold mb-4 tracking-tight">🗂 진단·총괄 현황 조회</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] text-ink-500 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="pb-2 text-left">유형</th>
                  <th className="pb-2 text-center">국어</th>
                  <th className="pb-2 text-center">과학</th>
                  <th className="pb-2 text-center">수학</th>
                  <th className="pb-2 text-center">통합</th>
                  <th className="pb-2 text-right">응시일</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "사전 진단", k: 71, s: 65, m: 78, i: 82, d: "2026.05.06" },
                  { type: "사후 진단 (예정)", k: "—", s: "—", m: "—", i: "—", d: "권장: 2026.06" },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-ink-100 last:border-0">
                    <td className="py-3 font-semibold">{r.type}</td>
                    <td className="py-3 text-center tabular-nums">{r.k}{typeof r.k === "number" && "%"}</td>
                    <td className="py-3 text-center tabular-nums">{r.s}{typeof r.s === "number" && "%"}</td>
                    <td className="py-3 text-center tabular-nums">{r.m}{typeof r.m === "number" && "%"}</td>
                    <td className="py-3 text-center tabular-nums">{r.i}{typeof r.i === "number" && "%"}</td>
                    <td className="py-3 text-right text-xs text-ink-600 tabular-nums">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/improvement" className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5 hover:-translate-y-1 transition">
            <div className="text-2xl mb-2">🎬</div>
            <div className="font-bold text-sm text-sky-700">향상교육 시작</div>
            <div className="text-[11px] text-ink-600 mt-0.5">동영상 5편 추천</div>
          </Link>
          <Link href="/tutor" className="bg-mint-50 border-2 border-mint-200 rounded-2xl p-5 hover:-translate-y-1 transition">
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-bold text-sm text-mint-700">AI 튜터 대화</div>
            <div className="text-[11px] text-ink-600 mt-0.5">분수 마저 풀기</div>
          </Link>
          <Link href="/summative" className="bg-lavender-50 border-2 border-lavender-200 rounded-2xl p-5 hover:-translate-y-1 transition">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-bold text-sm text-lavender-700">총괄평가</div>
            <div className="text-[11px] text-ink-600 mt-0.5">사후 진단 안내</div>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
