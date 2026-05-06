import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ImprovementPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-lavender-500" />FUN-003</span>
            <span className="eyebrow text-sky-700">향상교육 · IMPROVEMENT</span>
          </div>
          <h1 className="h-section text-3xl mb-3">맞춤 학습</h1>
          <p className="text-sm text-ink-700 leading-[1.7]">
            진단 결과 기반 동영상 강의 · 학습 자료실 · AI 학습 도우미 · 오답 유형 관리 · 유사 문항
          </p>
        </div>

        {/* 3개 영역 학습 콘텐츠 */}
        <div className="mb-8">
          <h2 className="text-base font-bold mb-4 tracking-tight">3개 영역 온라인 학습 콘텐츠</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "수학", count: "47편", focus: "분수·비례·도형", color: "bg-mint-50 border-mint-200 text-mint-700", emoji: "" },
              { name: "과학", count: "62편", focus: "물질·생명·지구", color: "bg-sky-50 border-sky-200 text-sky-700", emoji: "" },
              { name: "국어 (논술)", count: "75편", focus: "독해·어휘·논술", color: "bg-lavender-50 border-lavender-200 text-lavender-700", emoji: "" },
            ].map((s) => (
              <div key={s.name} className={`${s.color} border-2 rounded-2xl p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-[10px] font-bold tabular-nums">{s.count}</span>
                </div>
                <h3 className="font-bold mb-1">{s.name}</h3>
                <p className="text-[11px] text-ink-700">{s.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 동영상 강의 라이브러리 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold tracking-tight"> 동영상 강의 라이브러리</h2>
            <button className="text-xs font-semibold text-sky-700 hover:text-sky-900">전체 보기 →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { t: "분수의 덧셈", d: "5:32", subj: "수학", grad: "from-mint-400 to-mint-600" },
              { t: "물질의 상태", d: "7:21", subj: "과학", grad: "from-sky-400 to-sky-600" },
              { t: "독해 전략", d: "4:48", subj: "국어", grad: "from-lavender-400 to-lavender-600" },
              { t: "비와 비율", d: "6:15", subj: "수학", grad: "from-mint-400 to-mint-600" },
              { t: "동물의 분류", d: "5:08", subj: "과학", grad: "from-sky-400 to-sky-600" },
              { t: "어휘 확장", d: "3:42", subj: "국어", grad: "from-lavender-400 to-lavender-600" },
              { t: "도형의 둘레", d: "4:22", subj: "수학", grad: "from-mint-400 to-mint-600" },
              { t: "글의 구조", d: "5:55", subj: "국어", grad: "from-lavender-400 to-lavender-600" },
            ].map((v, i) => (
              <div key={i} className="cursor-pointer group">
                <div className={`relative aspect-video bg-gradient-to-br ${v.grad} rounded-xl flex items-center justify-center mb-2 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-card group-hover:scale-110 transition">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-900" fill="currentColor">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold tabular-nums">
                    {v.d}
                  </div>
                </div>
                <div className="text-xs font-semibold">{v.t}</div>
                <div className="text-[10px] text-ink-500">{v.subj}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 학습 자료실 */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-white border-2 border-ink-100 rounded-2xl p-6">
            <h2 className="text-base font-bold mb-4 tracking-tight"> 학습 자료실</h2>
            <ul className="space-y-2.5">
              {[
                { t: "분수 개념 정리 PDF", subj: "수학", size: "1.2MB" },
                { t: "물질 상태 변화 워크시트", subj: "과학", size: "0.8MB" },
                { t: "어휘 모음 (3·4학년)", subj: "국어", size: "1.5MB" },
                { t: "비와 비율 연습 문제", subj: "수학", size: "0.6MB" },
                { t: "독해 지문 모음", subj: "국어", size: "2.1MB" },
              ].map((m, i) => (
                <li key={i} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                  <span className="text-xl"></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{m.t}</div>
                    <div className="text-[10px] text-ink-500">{m.subj} · {m.size}</div>
                  </div>
                  <button className="text-xs font-semibold text-mint-700 hover:text-mint-900">↓</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-mint-500/20 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl"></span>
                <h2 className="text-base font-bold tracking-tight">AI 학습 도우미</h2>
              </div>
              <p className="text-xs text-white/80 leading-[1.7] mb-4">
                개별 질의·피드백 가능. 정답 직답 X · Socratic 5단계 힌트.
              </p>
              <div className="space-y-2 mb-5">
                <div className="bg-white/10 rounded-xl rounded-bl-sm p-2.5 text-xs max-w-[85%]">
                  분수가 자꾸 틀려요
                </div>
                <div className="bg-mint-500/20 border border-mint-400/30 rounded-xl rounded-br-sm p-2.5 text-xs ml-auto max-w-[85%]">
                  먼저 통분부터 점검해볼까? 분모가 다른 두 분수를 더할 때 가장 먼저 무엇을?
                </div>
              </div>
              <Link href="/tutor" className="block w-full text-center bg-mint-500 hover:bg-mint-400 text-white font-bold px-5 py-3 rounded-full text-sm transition">
                AI 튜터와 대화 시작 →
              </Link>
            </div>
          </div>
        </div>

        {/* AI 추천 + 오답유형 + 유사문항 */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { t: "AI 추천 학습 문제", d: "결손 영역 우선순위 → 5단계 시퀀스", color: "border-mint-200", href: "/improvement/practice" },
            { t: "오답 유형 관리", d: "개념 누락 / 절차 오류 / 부주의 / 시간 부족 — 4종 분류", color: "border-lavender-200", href: "/improvement/practice" },
            { t: "유사 문항 자동 매칭", d: "Sentence-BERT 임베딩으로 동일 개념 변형 문항", color: "border-sky-200", href: "/improvement/practice" },
          ].map((c) => (
            <Link key={c.t} href={c.href} className={`bg-white border-2 ${c.color} rounded-2xl p-5 hover:-translate-y-1 transition block`}>
              <h3 className="font-bold text-sm mb-2 tracking-tight">{c.t}</h3>
              <p className="text-[11px] text-ink-700 leading-[1.6] mb-2">{c.d}</p>
              <div className="text-[10px] font-bold text-mint-700">문제 풀어보기 →</div>
            </Link>
          ))}
        </div>

        {/* 다음 단계 — 사후 진단 */}
        <div className="bg-mint-50 border-2 border-mint-200 rounded-2xl p-6 text-center">
          <h2 className="text-base font-bold mb-2">학습 완료 후 사후 진단으로 향상도 측정</h2>
          <p className="text-xs text-ink-700 mb-4">동일 영역 사후 검사 → 사전 대비 성장 그래프</p>
          <Link href="/summative" className="inline-flex items-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-bold px-6 py-3 rounded-full text-sm transition">
            총괄평가 (사후 진단) 시작 →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
