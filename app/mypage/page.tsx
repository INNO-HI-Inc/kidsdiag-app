import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function MyPage() {
  const history = [
    { date: "2026.05.04", type: "사후 진단", subj: "수학", score: 78, status: "완료", color: "mint" },
    { date: "2026.05.02", type: "AI 튜터", subj: "분수의 덧셈", score: null, status: "23회 대화", color: "sky" },
    { date: "2026.04.28", type: "향상 교육", subj: "비와 비율 (영상 5편)", score: null, status: "완료", color: "lavender" },
    { date: "2026.04.20", type: "사전 진단", subj: "수학", score: 42, status: "완료", color: "mint" },
    { date: "2026.04.20", type: "사전 진단", subj: "과학", score: 65, status: "완료", color: "mint" },
    { date: "2026.04.20", type: "사전 진단", subj: "국어", score: 71, status: "완료", color: "mint" },
  ];

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-12">
        {/* 학생 카드 */}
        <div className="bg-gradient-to-br from-mint-50 via-paper to-lavender-50 rounded-3xl p-7 mb-8 border-2 border-mint-200 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-mint-200/40 blur-2xl pointer-events-none" />
          <div className="relative flex items-center gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-2xl bg-mint-500 text-white flex items-center justify-center text-3xl font-bold">
              민
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-0.5">MY PAGE · 학생</div>
              <h1 className="text-2xl font-bold tracking-tight mb-1">김민지 · 초5</h1>
              <div className="text-sm text-ink-600">제닉스초등학교 5학년 3반</div>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-mint-700 tabular-nums">+36p</div>
                <div className="text-[10px] text-ink-600">전체 향상도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lavender-700 tabular-nums">28%</div>
                <div className="text-[10px] text-ink-600">전국 상위</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sun-600 tabular-nums">7급</div>
                <div className="text-[10px] text-ink-600">반 진도</div>
              </div>
            </div>
          </div>
        </div>

        {/* 종합 결과 */}
        <div className="bg-white rounded-3xl p-7 border border-ink-100 mb-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-lg font-bold tracking-tight">📊 종합 결과 (사전 → 사후)</h2>
            <Link href="/parent/report/child_demo" className="text-xs font-semibold text-mint-700 hover:text-mint-900">
              학부모 리포트 PDF →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { subj: "수학", pre: 42, post: 78, c: "mint" },
              { subj: "과학", pre: 65, post: 81, c: "sky" },
              { subj: "국어", pre: 71, post: 85, c: "lavender" },
            ].map((s) => {
              const cmap: Record<string, { bg: string; bar: string; text: string }> = {
                mint: { bg: "bg-mint-50", bar: "bg-mint-500", text: "text-mint-700" },
                sky: { bg: "bg-sky-50", bar: "bg-sky-500", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", bar: "bg-lavender-500", text: "text-lavender-700" },
              };
              const c = cmap[s.c];
              return (
                <div key={s.subj} className={`${c.bg} rounded-2xl p-4`}>
                  <div className={`text-[10px] font-bold tracking-widest ${c.text} mb-1`}>{s.subj.toUpperCase()}</div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold tabular-nums">{s.post}%</span>
                    <span className={`text-xs font-bold ${c.text}`}>+{s.post - s.pre}p</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-ink-600">
                      <span className="w-8">사전</span>
                      <div className="flex-1 h-1 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-ink-300 rounded-full" style={{ width: `${s.pre}%` }} />
                      </div>
                      <span className="tabular-nums w-7">{s.pre}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="w-8 font-bold">사후</span>
                      <div className="flex-1 h-1 bg-white rounded-full overflow-hidden">
                        <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${s.post}%` }} />
                      </div>
                      <span className="tabular-nums w-7 font-bold">{s.post}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 학습 이력 (FUN-004) */}
        <div className="bg-white rounded-3xl p-7 border border-ink-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold tracking-tight">📅 학습 이력 (대시보드)</h2>
            <span className="text-[10px] font-bold text-lavender-700 bg-lavender-50 px-2 py-0.5 rounded-full">FUN-004</span>
          </div>
          <div className="space-y-2">
            {history.map((h, i) => {
              const cmap: Record<string, { bg: string; text: string }> = {
                mint: { bg: "bg-mint-50", text: "text-mint-700" },
                sky: { bg: "bg-sky-50", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", text: "text-lavender-700" },
              };
              const c = cmap[h.color];
              return (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-ink-100 last:border-0">
                  <div className="text-[11px] text-ink-500 tabular-nums w-20">{h.date}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${c.bg} ${c.text}`}>
                    {h.type}
                  </span>
                  <div className="flex-1 text-sm font-semibold">{h.subj}</div>
                  {h.score !== null && (
                    <div className="text-sm font-bold tabular-nums">{h.score}%</div>
                  )}
                  <span className="text-xs text-ink-600">{h.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { t: "사후 진단 받기", d: "남은 영역 1개", href: "/select", color: "mint", icon: "📝" },
            { t: "AI 튜터와 대화", d: "분수 마저 풀기", href: "/tutor", color: "sky", icon: "🤖" },
            { t: "동영상 강의", d: "추천 5편", href: "/features", color: "lavender", icon: "🎬" },
          ].map((a) => {
            const cmap: Record<string, { bg: string; border: string; text: string }> = {
              mint: { bg: "bg-mint-50", border: "border-mint-200", text: "text-mint-700" },
              sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700" },
              lavender: { bg: "bg-lavender-50", border: "border-lavender-200", text: "text-lavender-700" },
            };
            const c = cmap[a.color];
            return (
              <Link key={a.t} href={a.href} className={`${c.bg} ${c.border} border-2 rounded-2xl p-5 hover:-translate-y-1 transition`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-ink-400">→</span>
                </div>
                <h3 className={`font-bold text-sm tracking-tight ${c.text} mb-1`}>{a.t}</h3>
                <p className="text-[11px] text-ink-600">{a.d}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
