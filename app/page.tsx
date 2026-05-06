import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight } from "@/components/icons";

function Squiggle({ color = "#FFC82A" }: { color?: string }) {
  return (
    <svg className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none" viewBox="0 0 200 12" preserveAspectRatio="none">
      <path d="M2,8 Q35,2 70,7 T138,8 T198,7" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="bg-paper text-ink-900">
      <SiteHeader />

      {/* HERO */}
      <section className="relative border-b border-ink-100 overflow-hidden">
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-accent-500/15 pointer-events-none hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 bg-mint-50 text-mint-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
              (주)제닉스 · AI 기반 초등학력 진단·학습시스템
            </div>

            <h1 className="h-hero text-4xl md:text-5xl lg:text-[4.5rem]">
              우리 아이,<br />
              <span className="relative inline-block">
                어디서 막혔을까요
                <Squiggle color="#FFC82A" />
              </span>
              <span className="text-mint-600">?</span>
            </h1>

            <p className="text-lg text-ink-700 font-normal leading-[1.7] mt-7 mb-9 max-w-md">
              초3~초6, 수학·과학·국어를 통해<br />
              <strong className="font-semibold text-ink-900">학력과 재능 8개 영역</strong>을 동시 진단합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Link href="/select" className="inline-flex items-center justify-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-7 py-4 rounded-full text-base transition shadow-pop">
                사전 진단 시작 <IconArrowRight size={18} />
              </Link>
              <Link href="/parent/report/child_demo" className="text-ink-700 font-semibold hover:text-mint-600 transition px-2">
                학습결과 리포트 보기 →
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="absolute -top-4 -left-4 z-20 px-4 py-2 rounded-full bg-accent-500 text-carbon-900 text-xs font-bold rotate-[-6deg] shadow-accent">
              실시간 분석
            </div>
            <div className="relative bg-white rounded-3xl p-7 border border-ink-100 shadow-pop rotate-[1.5deg] hover:rotate-0 transition-transform duration-700 z-10">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <div className="eyebrow text-mint-600">진단 리포트</div>
                  <div className="text-base font-bold mt-1">민지 · 초5</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-ink-900 tabular-nums leading-none">72<span className="text-base text-ink-500 ml-0.5">%</span></div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { name: "분수의 곱셈", pct: 88 },
                  { name: "분모 다른 분수 덧셈", pct: 32 },
                  { name: "비와 비율", pct: 65 },
                ].map((b) => (
                  <div key={b.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-ink-700">{b.name}</span>
                      <span className="font-bold text-ink-900 tabular-nums">{b.pct}%</span>
                    </div>
                    <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${b.pct >= 70 ? "bg-mint-500" : b.pct < 50 ? "bg-accent-500" : "bg-carbon-900"}`} style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-paper-grey rounded-2xl p-3.5 border border-ink-100">
                <div className="text-[11px] text-ink-500 mb-2 font-semibold tracking-wider uppercase">결손 트리</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-mint-50 border border-mint-200 text-mint-700 text-[11px] font-semibold">분수 덧셈</span>
                  <span className="text-ink-300 text-xs">←</span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-ink-200 text-ink-700 text-[11px] font-semibold">통분</span>
                  <span className="text-ink-300 text-xs">←</span>
                  <span className="px-2.5 py-1 rounded-md bg-accent-500 text-carbon-900 text-[11px] font-semibold">나눗셈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-ink-100 bg-paper">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
            {[
              { v: "초3~6", l: "4학년 대상", color: "text-ink-900" },
              { v: "3교과", l: "수학·과학·국어", color: "text-mint-600" },
              { v: "8차원", l: "학력 + 재능 매핑", color: "text-lavender-600" },
              { v: "6,000", l: "시범 운영 학생", color: "text-sky-600" },
              { v: "CAT", l: "적응형 진단", color: "text-accent-700" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-ink-100 pl-5 hover:border-mint-500 transition">
                <div className={`text-4xl md:text-5xl font-bold ${s.color} tabular-nums tracking-tight`}>{s.v}</div>
                <div className="text-sm text-ink-600 mt-2 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3과목 컬러 카드 */}
      <section className="py-24 border-b border-ink-100 bg-paper-grey relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-mint-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-lavender-100/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-mint-600 mb-3">3 SUBJECTS</div>
            <h2 className="h-section text-3xl md:text-4xl">
              초3~6, <span className="text-mint-600">3개 영역</span> 모두 진단합니다
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">학년별·과목별·단원별 결손까지 입체적으로</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "수학",
                tag: "MATH",
                desc: "사칙연산·분수·도형·비례 — CAT 적응형 진단",
                bg: "bg-mint-50",
                border: "border-mint-200",
                accent: "bg-mint-500",
                text: "text-mint-700",
                emoji: "📐",
                topics: ["사칙연산", "분수·소수", "도형", "비와 비율"],
                rotate: "rotate-[-1deg]",
              },
              {
                name: "과학",
                tag: "SCIENCE",
                desc: "물질·에너지·생명·지구 — 개념 이해도 측정",
                bg: "bg-sky-50",
                border: "border-sky-200",
                accent: "bg-sky-500",
                text: "text-sky-700",
                emoji: "🔬",
                topics: ["물질", "에너지", "생명", "지구·우주"],
                rotate: "rotate-[1deg]",
              },
              {
                name: "국어 (논술 포함)",
                tag: "KOREAN",
                desc: "독해·문법·어휘·논술 — AI 글쓰기 피드백",
                bg: "bg-lavender-50",
                border: "border-lavender-200",
                accent: "bg-lavender-500",
                text: "text-lavender-700",
                emoji: "📖",
                topics: ["독해", "문법", "어휘", "논술"],
                rotate: "rotate-[-1deg]",
              },
            ].map((s) => (
              <div
                key={s.name}
                className={`group relative ${s.bg} ${s.border} border-2 rounded-3xl p-8 hover:-translate-y-1.5 hover:rotate-0 transition-all duration-500 shadow-card hover:shadow-pop ${s.rotate}`}
              >
                <div className={`absolute -top-3 -right-3 ${s.accent} text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full shadow-card`}>
                  {s.tag}
                </div>
                <div className="text-5xl mb-5">{s.emoji}</div>
                <h3 className={`text-2xl font-bold mb-3 ${s.text}`}>{s.name}</h3>
                <p className="text-ink-700 leading-[1.7] mb-5 text-sm">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.topics.map((t) => (
                    <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-ink-100 text-ink-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8개 재능 영역 (GeniusX 매핑) */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-lavender-100/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-mint-100/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-lavender-50 text-lavender-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-500" />
              GeniusX · 8 TALENTS
            </div>
            <h2 className="h-section text-3xl md:text-4xl">
              학력 한 번에, <span className="text-lavender-600">8개 재능</span> 함께 진단
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">
              교과 문항에 학력 태그(A) + 재능 태그(B) 이중 매핑.<br className="hidden md:inline" />
              한 번 응시로 학력과 잠재 재능을 동시에 짚어냅니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: "수리·논리", emoji: "🔢", desc: "수량·패턴 인식", color: "mint", measured: true },
              { name: "자연·생태", emoji: "🌱", desc: "분류·인과추론", color: "success", measured: true },
              { name: "공간·시각", emoji: "🧊", desc: "심적 변환·구성", color: "sky", measured: true },
              { name: "언어·기호", emoji: "💬", desc: "의미·구문·담화", color: "lavender", measured: true },
              { name: "자기·성찰", emoji: "🪞", desc: "측정 객관성·오류", color: "sun", measured: true },
              { name: "음향·리듬", emoji: "🎵", desc: "심화 진단에서 측정", color: "ink", measured: false },
              { name: "신체·운동", emoji: "🏃", desc: "심화 진단에서 측정", color: "ink", measured: false },
              { name: "사회·관계", emoji: "🤝", desc: "심화 진단에서 측정", color: "ink", measured: false },
            ].map((t) => {
              const measuredStyles: Record<string, { bg: string; border: string; badge: string; text: string }> = {
                mint: { bg: "bg-mint-50", border: "border-mint-300", badge: "bg-mint-500", text: "text-mint-700" },
                success: { bg: "bg-success-50", border: "border-success-100", badge: "bg-success-500", text: "text-success-600" },
                sky: { bg: "bg-sky-50", border: "border-sky-300", badge: "bg-sky-500", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", border: "border-lavender-300", badge: "bg-lavender-500", text: "text-lavender-700" },
                sun: { bg: "bg-sun-50", border: "border-sun-300", badge: "bg-sun-500", text: "text-sun-600" },
                ink: { bg: "bg-paper-grey", border: "border-ink-200", badge: "bg-ink-400", text: "text-ink-500" },
              };
              const s = measuredStyles[t.color];
              return (
                <div
                  key={t.name}
                  className={`relative ${s.bg} ${s.border} border-2 rounded-2xl p-5 transition-all duration-300 ${
                    t.measured ? "hover:-translate-y-1 hover:shadow-card" : "opacity-60"
                  }`}
                >
                  <div className="absolute top-3 right-3">
                    {t.measured ? (
                      <span className={`${s.badge} text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full`}>
                        측정
                      </span>
                    ) : (
                      <span className="bg-white border border-ink-200 text-ink-500 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full">
                        심화
                      </span>
                    )}
                  </div>
                  <div className={`text-3xl mb-3 ${!t.measured && "grayscale"}`}>{t.emoji}</div>
                  <h3 className={`font-bold text-sm mb-1 ${s.text}`}>{t.name}</h3>
                  <p className="text-[11px] text-ink-600 leading-[1.5]">{t.desc}</p>
                </div>
              );
            })}
          </div>

          {/* 윤리 원칙 인용 */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-lavender-50 via-mint-50 to-sky-50 border border-lavender-200 rounded-3xl p-8 md:p-10 relative">
            <div className="absolute top-4 left-6 text-6xl text-lavender-300/40 font-serif leading-none">"</div>
            <div className="relative pt-2">
              <p className="text-base md:text-lg text-ink-900 font-semibold leading-[1.7] mb-3">
                점수가 낮은 영역은 <span className="text-lavender-700">'약점'이 아닌 '아직 발현되지 않은 영역'</span>입니다.
              </p>
              <p className="text-sm text-ink-700 leading-[1.7]">
                3·4학년은 재능이 분화되기 시작하는 시기입니다.<br />
                전체 8개 중 5개만 본 진단에서 측정되며, 나머지 3개는 심화 진단에서 별도로 살핍니다.
              </p>
              <div className="mt-5 pt-5 border-t border-lavender-200/60 flex items-center gap-2 text-xs text-lavender-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-lavender-500" />
                GeniusX Ver.4 핵심 원칙 · "발현되지 않은 재능은 진단할 수 없다"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (요약 — 자세한 건 /features) */}
      <section className="py-24 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="eyebrow text-mint-600 mb-3">FEATURES</div>
              <h2 className="h-section text-3xl md:text-4xl">
                일반 평가와 다른 점
              </h2>
            </div>
            <Link href="/features" className="text-sm text-mint-700 font-semibold hover:text-mint-600">자세히 보기 →</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { t: "학년 거슬러 추적", d: "막힌 단원의 선수 개념까지 자동으로 거슬러 짚어냅니다.", color: "mint", emoji: "🎯" },
              { t: "결손 트리 시각화", d: "약점의 표면이 아닌 근본 원인 노드까지 그래프로.", color: "lavender", emoji: "🌳" },
              { t: "안전한 AI 튜터", d: "정답 직답 X. 단계적 힌트로 사고를 이끕니다.", color: "sky", emoji: "🤖" },
              { t: "사전·사후 성장 측정", d: "동일 영역 사후 진단으로 학습 효과를 정량 측정.", color: "sun", emoji: "📈" },
            ].map((f, i) => {
              const colorMap: Record<string, { num: string; hover: string; border: string }> = {
                mint: { num: "text-mint-500", hover: "group-hover:text-mint-700", border: "hover:border-mint-500" },
                lavender: { num: "text-lavender-500", hover: "group-hover:text-lavender-700", border: "hover:border-lavender-500" },
                sky: { num: "text-sky-500", hover: "group-hover:text-sky-700", border: "hover:border-sky-500" },
                sun: { num: "text-sun-500", hover: "group-hover:text-sun-600", border: "hover:border-sun-500" },
              };
              const c = colorMap[f.color];
              return (
                <Link
                  key={f.t}
                  href="/features"
                  className={`group bg-white border border-ink-100 rounded-3xl p-7 md:p-9 ${c.border} hover:-translate-y-1 transition duration-300 relative overflow-hidden`}
                >
                  <div className="absolute top-6 right-6 text-3xl opacity-80 group-hover:scale-110 transition-transform">{f.emoji}</div>
                  <div className={`text-5xl md:text-6xl font-bold ${c.num} tabular-nums leading-none ${c.hover} transition mb-4`}>
                    0{i + 1}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{f.t}</h3>
                  <p className="text-ink-700 leading-[1.7] font-normal">{f.d}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW (요약) */}
      <section className="py-24 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="eyebrow text-mint-600 mb-3">HOW IT WORKS</div>
              <h2 className="h-section text-3xl md:text-4xl">
                <span className="text-mint-600">4단계,</span> 사전부터 사후까지
              </h2>
            </div>
            <Link href="/how-it-works" className="text-sm text-mint-700 font-semibold hover:text-mint-600">자세히 보기 →</Link>
          </div>

          <div className="grid md:grid-cols-4 gap-x-5 gap-y-8">
            {[
              { n: "01", t: "사전 진단", time: "60~90분", color: "mint", icon: "✏️", desc: "CAT 적응형 진단" },
              { n: "02", t: "결손 리포트", time: "즉시", color: "lavender", icon: "📊", desc: "마스터리%·결손트리" },
              { n: "03", t: "향상 교육", time: "맞춤 학습", color: "sky", icon: "🎬", desc: "동영상·AI 튜터" },
              { n: "04", t: "사후 진단", time: "성장 측정", color: "sun", icon: "🚀", desc: "사전 대비 향상도" },
            ].map((s) => {
              const cmap: Record<string, { num: string; bar: string; text: string; bg: string }> = {
                mint: { num: "text-mint-500/20", bar: "border-mint-500", text: "text-mint-700", bg: "bg-mint-50" },
                lavender: { num: "text-lavender-500/25", bar: "border-lavender-500", text: "text-lavender-700", bg: "bg-lavender-50" },
                sky: { num: "text-sky-500/25", bar: "border-sky-500", text: "text-sky-700", bg: "bg-sky-50" },
                sun: { num: "text-sun-500/30", bar: "border-sun-500", text: "text-sun-600", bg: "bg-sun-50" },
              };
              const c = cmap[s.color];
              return (
                <div key={s.n} className={`group relative ${c.bg} rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`text-6xl md:text-7xl font-bold ${c.num} tabular-nums leading-none`}>
                      {s.n}
                    </div>
                    <div className="text-2xl mt-1">{s.icon}</div>
                  </div>
                  <div className={`border-t-2 ${c.bar} pt-4`}>
                    <h3 className="font-bold mb-1.5 tracking-tight">{s.t}</h3>
                    <div className="text-[11px] text-ink-600 mb-1">{s.desc}</div>
                    <div className={`text-xs ${c.text} font-bold tracking-wider`}>{s.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 향상교육 + AI 학습도우미 (FUN-003) */}
      <section className="py-24 border-b border-ink-100 bg-paper-grey relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-sky-700 mb-3">향상교육 · FUN-003</div>
            <h2 className="h-section text-3xl md:text-4xl">
              결손이 잡히면, <span className="text-sky-600">바로 채웁니다</span>
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">동영상 강의 · AI 추천 문제 · 오답 유형 관리 · 유사 문항</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* 동영상 강의 카드 */}
            <div className="md:col-span-7 bg-white border-2 border-ink-100 rounded-3xl p-7 hover:border-sky-300 transition-all duration-300 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="eyebrow text-sky-600 mb-1">VIDEO</div>
                  <h3 className="text-lg font-bold tracking-tight">동영상 강의 라이브러리</h3>
                </div>
                <span className="bg-sky-50 text-sky-700 text-[10px] font-bold px-2.5 py-1 rounded-full">FUN-003</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { t: "분수의 덧셈", d: "5:32", color: "from-mint-400 to-mint-600" },
                  { t: "물질의 상태", d: "7:21", color: "from-sky-400 to-sky-600" },
                  { t: "독해 전략", d: "4:48", color: "from-lavender-400 to-lavender-600" },
                ].map((v) => (
                  <div key={v.t} className="group cursor-pointer">
                    <div className={`relative aspect-video bg-gradient-to-br ${v.color} rounded-xl flex items-center justify-center mb-2 overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-card">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-900" fill="currentColor">
                          <polygon points="6,4 20,12 6,20" />
                        </svg>
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold tabular-nums">
                        {v.d}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-ink-800">{v.t}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-ink-600 pt-3 border-t border-ink-100">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                결손 노드별 매칭 · 자동 재생 시퀀스 · 자기주도 학습
              </div>
            </div>

            {/* AI 학습 도우미 카드 */}
            <div className="md:col-span-5 bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-7 shadow-pop relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-mint-500/20 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="eyebrow text-mint-400 mb-1">AI TUTOR</div>
                    <h3 className="text-lg font-bold tracking-tight">AI 학습 도우미</h3>
                  </div>
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="space-y-2.5 mb-4">
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm p-3 text-xs leading-[1.6] max-w-[85%]">
                    분수가 자꾸 틀려요 ㅠㅠ
                  </div>
                  <div className="bg-mint-500/20 border border-mint-400/30 rounded-2xl rounded-br-sm p-3 text-xs leading-[1.6] ml-auto max-w-[85%]">
                    먼저 <strong className="text-mint-200">통분</strong> 부터 점검해볼까? 분모가 다른 두 분수를 더할 때 가장 먼저 무엇을 해야 할까?
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm p-3 text-xs leading-[1.6] max-w-[85%]">
                    분모를 같게 만들어요!
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-white/70 pt-3 border-t border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                  Socratic 5단계 힌트 · 정답 직답 금지 · 3중 가드레일
                </div>
              </div>
            </div>

            {/* AI 추천 문제 + 오답 유형 + 유사 문항 */}
            <div className="md:col-span-12 grid md:grid-cols-3 gap-4">
              {[
                {
                  tag: "AI 추천",
                  title: "다음 풀어볼 문제",
                  emoji: "🎯",
                  desc: "결손 트리에서 우선순위 노드 추출 → 5단계 학습 시퀀스",
                  badge: "수준별 맞춤",
                  color: "mint",
                },
                {
                  tag: "오답 유형 관리",
                  title: "왜 틀렸는지",
                  emoji: "🔍",
                  desc: "오답 패턴 4종 분류 (개념 누락 / 절차 오류 / 부주의 / 시간 부족)",
                  badge: "유형 분석",
                  color: "lavender",
                },
                {
                  tag: "유사 문항",
                  title: "한 번 더 연습",
                  emoji: "📝",
                  desc: "Sentence-BERT 임베딩으로 동일 개념 변형 문항 자동 매칭",
                  badge: "AI 매칭",
                  color: "sky",
                },
              ].map((c) => {
                const cmap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
                  mint: { bg: "bg-white", border: "border-mint-200", text: "text-mint-700", badge: "bg-mint-500" },
                  lavender: { bg: "bg-white", border: "border-lavender-200", text: "text-lavender-700", badge: "bg-lavender-500" },
                  sky: { bg: "bg-white", border: "border-sky-200", text: "text-sky-700", badge: "bg-sky-500" },
                };
                const cc = cmap[c.color];
                return (
                  <div key={c.tag} className={`${cc.bg} ${cc.border} border-2 rounded-2xl p-5 hover:-translate-y-1 transition`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-3xl">{c.emoji}</div>
                      <span className={`${cc.badge} text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full`}>
                        {c.badge}
                      </span>
                    </div>
                    <div className={`text-[10px] font-bold tracking-widest ${cc.text} mb-1`}>{c.tag}</div>
                    <h4 className="font-bold text-base mb-2 tracking-tight">{c.title}</h4>
                    <p className="text-xs text-ink-700 leading-[1.6]">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4역할 시각화 */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-accent-500" />
        <div className="absolute bottom-32 left-16 w-3 h-3 rounded-full bg-mint-500" />
        <div className="absolute top-40 left-1/3 w-2 h-2 rounded-full bg-lavender-500" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-mint-600 mb-3">4 ROLES</div>
            <h2 className="h-section text-3xl md:text-4xl">
              <span className="text-mint-600">4명의 사용자,</span> 화면도 권한도 다릅니다
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">학생·교원·학부모·관리자 — RBAC 기반 권한 분리</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                role: "학생",
                tag: "STUDENT",
                emoji: "👧",
                desc: "사전진단 · 향상교육 · 총괄평가",
                bg: "bg-mint-50",
                border: "border-mint-300",
                badge: "bg-mint-500",
                items: ["AI 튜터 채팅", "단계별 힌트", "동영상 강의"],
              },
              {
                role: "교원",
                tag: "TEACHER",
                emoji: "👨‍🏫",
                desc: "검사지 생성 · 응시 결과 조회",
                bg: "bg-sky-50",
                border: "border-sky-300",
                badge: "bg-sky-500",
                items: ["반별 통계", "맞춤 검사", "결과 분석"],
              },
              {
                role: "학부모",
                tag: "PARENT",
                emoji: "👪",
                desc: "자녀 평가·이력 조회",
                bg: "bg-lavender-50",
                border: "border-lavender-300",
                badge: "bg-lavender-500",
                items: ["성장 그래프", "결손 트리", "PDF 리포트"],
              },
              {
                role: "관리자",
                tag: "ADMIN",
                emoji: "🛠",
                desc: "회원·콘텐츠·통계 관리",
                bg: "bg-sun-50",
                border: "border-sun-300",
                badge: "bg-sun-500",
                items: ["권한 관리", "엑셀 다운로드", "알림 발송"],
              },
            ].map((r) => (
              <div
                key={r.role}
                className={`group ${r.bg} ${r.border} border-2 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{r.emoji}</div>
                  <span className={`${r.badge} text-white text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full`}>
                    {r.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{r.role}</h3>
                <p className="text-xs text-ink-700 leading-[1.6] mb-4">{r.desc}</p>
                <ul className="space-y-1.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-center gap-1.5 text-[11px] text-ink-700">
                      <span className={`w-1 h-1 rounded-full ${r.badge}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사전·사후 진단 비교 (NEW) */}
      <section className="py-24 border-b border-ink-100 bg-paper-grey relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-accent-700 mb-3">PRE · POST</div>
            <h2 className="h-section text-3xl md:text-4xl">
              <span className="text-accent-700">사전 → 사후,</span> 학습 효과를 숫자로
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">동일 영역 사후 진단으로 향상도 정량 측정</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 사전 */}
            <div className="bg-white border-2 border-ink-100 rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-6 bg-ink-700 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                BEFORE · 사전 진단
              </div>
              <div className="text-sm text-ink-500 mb-2 mt-2">민지 · 초5 · 수학</div>
              <div className="text-6xl font-bold text-ink-900 tabular-nums leading-none mb-4">42<span className="text-2xl text-ink-400">%</span></div>
              <div className="space-y-2">
                {[
                  { n: "분수 덧셈", v: 32 },
                  { n: "비와 비율", v: 51 },
                  { n: "도형의 둘레", v: 44 },
                ].map((b) => (
                  <div key={b.n}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-ink-700">{b.n}</span>
                      <span className="font-bold tabular-nums">{b.v}%</span>
                    </div>
                    <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                      <div className="h-full bg-peach-400 rounded-full" style={{ width: `${b.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 사후 */}
            <div className="bg-mint-50 border-2 border-mint-300 rounded-3xl p-8 relative shadow-pop">
              <div className="absolute -top-3 left-6 bg-mint-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                AFTER · 사후 진단
              </div>
              <div className="text-sm text-mint-700 mb-2 mt-2">민지 · 초5 · 수학</div>
              <div className="flex items-baseline gap-3 mb-4">
                <div className="text-6xl font-bold text-mint-700 tabular-nums leading-none">78<span className="text-2xl text-mint-500">%</span></div>
                <div className="text-sm font-bold text-mint-600 bg-white px-2 py-0.5 rounded-full">+36p</div>
              </div>
              <div className="space-y-2">
                {[
                  { n: "분수 덧셈", v: 76, d: 44 },
                  { n: "비와 비율", v: 82, d: 31 },
                  { n: "도형의 둘레", v: 75, d: 31 },
                ].map((b) => (
                  <div key={b.n}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-ink-700">{b.n}</span>
                      <span className="font-bold tabular-nums text-mint-700">{b.v}% <span className="text-[10px] text-mint-500">+{b.d}</span></span>
                    </div>
                    <div className="h-1.5 bg-mint-100 rounded-full overflow-hidden">
                      <div className="h-full bg-mint-500 rounded-full" style={{ width: `${b.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 가격·티어 퍼널 (무료 학력 → 유료 심화) */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-mint-500" />
        <div className="absolute bottom-1/4 right-10 w-2 h-2 rounded-full bg-accent-500" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-accent-700 mb-3">PRICING · 2-TIER</div>
            <h2 className="h-section text-3xl md:text-4xl">
              <span className="text-mint-600">학력 진단 무료</span> · 재능 심화는 선택
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">
              모두에게 학력 진단을, 원하는 가족에겐 GeniusX 심화 진단을
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 무료 학력 */}
            <div className="bg-white border-2 border-mint-200 rounded-3xl p-8 hover:-translate-y-1 transition shadow-card relative">
              <div className="absolute -top-3 left-7 bg-mint-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                FREE · 누구나
              </div>
              <div className="mt-2 mb-5">
                <h3 className="text-2xl font-bold text-mint-700 tracking-tight mb-1">학력 진단</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-ink-900 tabular-nums">무료</span>
                  <span className="text-xs text-ink-500">· 시범 운영 6,000명</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  "수학·과학·국어 3교과 진단",
                  "결손 트리 + 마스터리%",
                  "학부모 리포트 (PDF)",
                  "AI 학습 도우미",
                  "사전·사후 진단 비교",
                  "재능 8개 중 5개 프리뷰",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-800">
                    <svg viewBox="0 0 20 20" className="w-4 h-4 mt-0.5 text-mint-500 flex-shrink-0" fill="currentColor">
                      <path d="M16.7 5.3l-9 9-3.4-3.4-1.4 1.4 4.8 4.8 10.4-10.4z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/select" className="block w-full text-center bg-mint-600 hover:bg-mint-700 text-white font-bold px-6 py-3 rounded-full transition">
                무료로 시작하기
              </Link>
            </div>

            {/* 유료 심화 */}
            <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-8 hover:-translate-y-1 transition shadow-pop relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
              <div className="absolute -top-3 left-7 bg-accent-500 text-carbon-900 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full shadow-accent">
                GENIUSX · 심화
              </div>
              <div className="relative">
                <div className="mt-2 mb-5">
                  <h3 className="text-2xl font-bold text-accent-500 tracking-tight mb-1">재능 심화 진단</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold tabular-nums">유료</span>
                    <span className="text-xs text-white/60">· 발달단계 민감기 정밀 분석</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "8개 재능 전체 측정 (음향·신체·사회 포함)",
                    "발현 조건 3차원 + 21세기 역량 4차원",
                    "게임화 수행평가 + 포트폴리오",
                    "학부모·교사 평정 척도",
                    "진로·교육 설계 보고서",
                    "Phase 1 종단 추적 (1년 후 재응시)",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg viewBox="0 0 20 20" className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" fill="currentColor">
                        <path d="M16.7 5.3l-9 9-3.4-3.4-1.4 1.4 4.8 4.8 10.4-10.4z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="block w-full text-center bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-6 py-3 rounded-full transition">
                  심화 진단 사전 신청
                </button>
              </div>
            </div>
          </div>

          {/* 윤리 하단 메시지 */}
          <div className="text-center mt-10 text-xs text-ink-500 leading-[1.7] max-w-2xl mx-auto">
            본 진단은 학력과 재능의 일부 측면만 측정합니다.<br />
            점수가 낮은 영역은 '약점'이 아닌 '아직 발현되지 않은 영역'입니다.
          </div>
        </div>
      </section>

      {/* 학부모 리포트 3페이지 미리보기 */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-mint-400" />
        <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-lavender-400" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-mint-600 mb-3">PARENT REPORT</div>
            <h2 className="h-section text-3xl md:text-4xl">
              학부모 리포트 <span className="text-mint-600">3페이지</span> + 대시보드
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">PDF로 받고, 온라인 대시보드로 추적합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1페이지: 학력 */}
            <div className="bg-white border-2 border-mint-200 rounded-3xl p-7 hover:-translate-y-1 transition-all duration-300 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-mint-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  P. 1
                </span>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-tight">학력 결과</h3>
              <div className="bg-mint-50 rounded-xl p-4 mb-4">
                <div className="text-[10px] text-mint-600 font-semibold mb-1.5">교과별 성취수준</div>
                <div className="flex items-end gap-1.5 h-16">
                  {[
                    { h: "65%", c: "bg-mint-400" },
                    { h: "82%", c: "bg-mint-600" },
                    { h: "48%", c: "bg-peach-400" },
                  ].map((b, i) => (
                    <div key={i} className={`flex-1 ${b.c} rounded-t-md`} style={{ height: b.h }} />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-ink-600 mt-2 font-semibold">
                  <span>수학</span><span>국어</span><span>과학</span>
                </div>
              </div>
              {/* 전국 분포 백분위 */}
              <div className="bg-paper-grey rounded-lg p-3 mb-3">
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span className="text-ink-600">전국 분포 위치</span>
                  <span className="font-bold text-mint-700">상위 28%</span>
                </div>
                <div className="relative h-1.5 bg-ink-100 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint-300 via-mint-500 to-mint-700 rounded-full" style={{ width: "72%" }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-mint-700 border-2 border-white shadow" style={{ left: "calc(72% - 6px)" }} />
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-ink-700">
                <li className="flex gap-2"><span className="text-mint-500">●</span> 부진 영역 학습 가이드 3줄</li>
                <li className="flex gap-2"><span className="text-mint-500">●</span> 결손 트리 시각화</li>
                <li className="flex gap-2"><span className="text-mint-500">●</span> 또래 비교 + 진도 랭킹</li>
              </ul>
            </div>

            {/* 2페이지: 재능 프리뷰 */}
            <div className="bg-white border-2 border-lavender-200 rounded-3xl p-7 hover:-translate-y-1 transition-all duration-300 shadow-card relative">
              <div className="absolute -top-3 right-6 bg-accent-500 text-carbon-900 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full shadow-accent">
                NEW
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-lavender-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                  P. 2
                </span>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-tight">재능 프로필 프리뷰</h3>
              <div className="bg-lavender-50 rounded-xl p-4 mb-4 relative h-[88px] flex items-center justify-center">
                {/* 간단한 8각 레이더 표현 */}
                <svg viewBox="0 0 80 80" className="w-20 h-20">
                  <polygon points="40,8 62,20 70,42 62,64 40,72 18,64 10,42 18,20" fill="none" stroke="#d4b6f7" strokeWidth="1" strokeDasharray="2,2" />
                  <polygon points="40,16 56,24 62,42 56,58 40,62 24,58 18,42 24,24" fill="#9f7aea" fillOpacity="0.3" stroke="#9f7aea" strokeWidth="1.5" />
                  {[
                    { x: 40, y: 8, on: true },
                    { x: 62, y: 20, on: true },
                    { x: 70, y: 42, on: true },
                    { x: 62, y: 64, on: false },
                    { x: 40, y: 72, on: true },
                    { x: 18, y: 64, on: false },
                    { x: 10, y: 42, on: true },
                    { x: 18, y: 20, on: false },
                  ].map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={p.on ? "#9f7aea" : "#d1d5db"} />
                  ))}
                </svg>
              </div>
              {/* 상위 2개 재능 해설 */}
              <div className="space-y-2 mb-3">
                {[
                  { name: "수리·논리", desc: "패턴 인식·계산력 우수", v: 82 },
                  { name: "언어·기호", desc: "독해·어휘 표현 강점", v: 76 },
                ].map((t) => (
                  <div key={t.name} className="bg-lavender-50 rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-lavender-700">{t.name}</span>
                      <span className="text-[10px] font-bold tabular-nums text-lavender-600">{t.v}점</span>
                    </div>
                    <div className="text-[9px] text-ink-600">{t.desc}</div>
                  </div>
                ))}
              </div>
              <ul className="space-y-1.5 text-xs text-ink-700">
                <li className="flex gap-2"><span className="text-lavender-500">●</span> 8개 재능 레이더차트</li>
                <li className="flex gap-2"><span className="text-lavender-500">●</span> 5개 상세 + 3개 미발현</li>
                <li className="flex gap-2"><span className="text-lavender-500">●</span> 상위 2개 재능 해설</li>
              </ul>
            </div>

            {/* 3페이지: 심화 CTA */}
            <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-7 hover:-translate-y-1 transition-all duration-300 shadow-pop relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-accent-500 text-carbon-900 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
                    P. 3
                  </span>
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight">심화 진단 안내</h3>
                <p className="text-xs text-white/75 leading-[1.7] mb-4">
                  발현 조건 3차원 + 21세기 역량 4차원 심화 분석으로<br />
                  잠재 재능까지 입체 측정.
                </p>
                <ul className="space-y-1.5 text-xs text-white/85">
                  <li className="flex gap-2"><span className="text-accent-500">●</span> 음향·신체·사회 재능 측정</li>
                  <li className="flex gap-2"><span className="text-accent-500">●</span> 발현 조건 분석</li>
                  <li className="flex gap-2"><span className="text-accent-500">●</span> 진로·교육 설계 보고서</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 검증 체계 */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { v: "Cohen's κ", l: "≥ 0.7 검수자 일치도", color: "text-mint-700" },
              { v: "Cronbach α", l: "≥ 0.80 내적 일관성", color: "text-success-600" },
              { v: "IRT", l: "2PL → 3PL 모수 검증", color: "text-sky-700" },
              { v: "CFA", l: "CFI ≥ 0.90 · RMSEA ≤ 0.08", color: "text-lavender-700" },
              { v: "직교성", l: "r ∈ [0.3, 0.6]", color: "text-sun-600" },
            ].map((s) => (
              <div key={s.v} className="bg-paper-grey rounded-2xl p-5 border border-ink-100">
                <div className={`text-2xl font-bold ${s.color} tracking-tight`}>{s.v}</div>
                <div className="text-[11px] text-ink-600 mt-1.5 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가입 플로우 + 법적 동의 (회원가입 + 법정대리인) */}
      <section className="py-24 border-b border-ink-100 bg-paper-grey relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-mint-600 mb-3">SIGNUP · LEGAL</div>
            <h2 className="h-section text-3xl md:text-4xl">
              가입은 <span className="text-mint-600">4단계</span>, 동의는 <span className="text-lavender-600">4종</span> 분리
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">
              만 14세 미만 법정대리인 동의 모듈 · 개인정보보호법 §22조의2 준수
            </p>
          </div>

          {/* 4단계 가입 플로우 */}
          <div className="grid md:grid-cols-4 gap-3 mb-10">
            {[
              { n: "1", t: "학부모 가입", d: "이메일·PIN·약관 동의", icon: "👤" },
              { n: "2", t: "법정대리인 동의", d: "만 14세 미만 자녀 보호", icon: "🛡️" },
              { n: "3", t: "자녀 프로필", d: "학년·성별·관심 과목 (N자녀)", icon: "👧" },
              { n: "4", t: "학생 PIN 로그인", d: "간단한 4자리 PIN", icon: "🔢" },
            ].map((s, i) => (
              <div key={s.n} className="relative bg-white border-2 border-ink-100 rounded-2xl p-5 hover:border-mint-300 transition">
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-mint-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-mint-100 text-mint-700 font-bold flex items-center justify-center text-sm">{s.n}</div>
                  <div className="text-2xl">{s.icon}</div>
                </div>
                <h4 className="font-bold text-sm tracking-tight mb-1">{s.t}</h4>
                <p className="text-[11px] text-ink-600 leading-[1.5]">{s.d}</p>
              </div>
            ))}
          </div>

          {/* 동의 4종 분리 */}
          <div className="bg-white border-2 border-lavender-200 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-lavender-500" />
              <span className="text-xs font-bold tracking-widest text-lavender-700">CONSENT · 4-PART</span>
            </div>
            <h3 className="text-lg font-bold mb-5 tracking-tight">목적별 동의 항목 분리 (선택 가능)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { t: "학력 진단 데이터 수집", req: true, d: "교과별 응답·풀이시간·답 변경" },
                { t: "재능 진단 프리뷰 분석", req: true, d: "8개 중 5개 재능 매핑" },
                { t: "심화 진단 연계 안내", req: false, d: "GeniusX 유료 진단 정보 제공" },
                { t: "마케팅·뉴스레터 활용", req: false, d: "진로 가이드·이벤트 안내" },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-3 p-3 rounded-xl bg-paper-grey">
                  <div className={`w-5 h-5 mt-0.5 rounded-md flex-shrink-0 flex items-center justify-center ${c.req ? "bg-lavender-500" : "bg-white border-2 border-ink-200"}`}>
                    {c.req && (
                      <svg viewBox="0 0 20 20" className="w-3 h-3 text-white" fill="currentColor">
                        <path d="M16.7 5.3l-9 9-3.4-3.4-1.4 1.4 4.8 4.8 10.4-10.4z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold">{c.t}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${c.req ? "bg-lavender-100 text-lavender-700" : "bg-ink-100 text-ink-600"}`}>
                        {c.req ? "필수" : "선택"}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-600">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 기술·보안·접근성 (WCAG·SSO·OS·캡처방지·5년파기·IRB) */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-sky-700 mb-3">TECH · SECURITY · ACCESSIBILITY</div>
            <h2 className="h-section text-3xl md:text-4xl">
              어디서든, <span className="text-sky-600">모두에게,</span> 안전하게
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {/* 다양한 디바이스 */}
            <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 hover:border-sky-300 transition">
              <div className="flex items-center gap-2 mb-4 text-2xl">
                <span>💻</span><span>📱</span><span>🖥️</span>
              </div>
              <h3 className="font-bold mb-2 tracking-tight">모든 기기에서</h3>
              <p className="text-xs text-ink-700 leading-[1.6] mb-4">PC·태블릿·모바일 반응형 / Windows·macOS·Android·iOS</p>
              <div className="flex flex-wrap gap-1.5">
                {["Chrome", "Edge", "Firefox", "Safari"].map((b) => (
                  <span key={b} className="text-[10px] font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 rounded">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* SSO 연동 */}
            <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 hover:border-mint-300 transition">
              <div className="text-2xl mb-4">🔗</div>
              <h3 className="font-bold mb-2 tracking-tight">제닉스 SSO 연동</h3>
              <p className="text-xs text-ink-700 leading-[1.6] mb-4">제닉스 포털 단일 로그인. 별도 가입 없이 바로 진입.</p>
              <div className="text-[11px] text-ink-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                기존 회원 데이터 자동 연계
              </div>
            </div>

            {/* WCAG 접근성 */}
            <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 hover:border-lavender-300 transition">
              <div className="text-2xl mb-4">♿</div>
              <h3 className="font-bold mb-2 tracking-tight">웹 접근성 2.1</h3>
              <p className="text-xs text-ink-700 leading-[1.6] mb-4">한국형 웹 콘텐츠 접근성 지침 2.1 준수</p>
              <div className="space-y-1 text-[11px] text-ink-700">
                {["키보드 네비게이션", "TTS 음성 지원", "고대비 모드", "Alt 텍스트"].map((a) => (
                  <div key={a} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-lavender-500" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 보안·법규 6종 그리드 */}
          <div className="bg-paper-grey rounded-3xl p-7 md:p-9 border border-ink-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-peach-400" />
              <span className="text-xs font-bold tracking-widest text-ink-700">DATA GOVERNANCE · 데이터 보호</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { t: "5년 자동 파기", d: "보관 기간 명시", icon: "⏰" },
                { t: "익명 ID", d: "실명 미수집", icon: "🆔" },
                { t: "IRB 심의", d: "서울교대 경유", icon: "🎓" },
                { t: "PIA 영향평가", d: "선제적 시행", icon: "📋" },
                { t: "캡처 방지", d: "스크린샷·드래그 차단", icon: "🚫" },
                { t: "동적 문항 할당", d: "57→55 랜덤", icon: "🎲" },
              ].map((s) => (
                <div key={s.t} className="bg-white rounded-xl p-4 text-center border border-ink-100 hover:border-peach-200 transition">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-xs font-bold tracking-tight mb-1">{s.t}</div>
                  <div className="text-[10px] text-ink-600">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8개월 타임라인 + 자문위원진 */}
      <section className="py-24 border-b border-ink-100 bg-paper-grey relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="eyebrow text-mint-600 mb-3">ROADMAP · TEAM</div>
            <h2 className="h-section text-3xl md:text-4xl">
              <span className="text-mint-600">8개월</span> 파일럿, 학술 자문이 함께
            </h2>
            <p className="text-ink-700 mt-4 leading-[1.7]">M1~M8 단계별 마일스톤 · 책임자문위원진 영입</p>
          </div>

          {/* M1~M8 타임라인 */}
          <div className="bg-white rounded-3xl p-7 md:p-9 border-2 border-ink-100 mb-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {[
                { m: "M1", t: "문항 개발", c: "mint" },
                { m: "M2", t: "이중 태그", c: "mint" },
                { m: "M3", t: "검증 + IRB", c: "sky" },
                { m: "M4", t: "프리테스트", c: "sky" },
                { m: "M5", t: "모집 런칭", c: "lavender" },
                { m: "M6", t: "본 응시", c: "lavender" },
                { m: "M7", t: "데이터 분석", c: "sun" },
                { m: "M8", t: "검증 보고서", c: "sun" },
              ].map((m, i) => {
                const cmap: Record<string, { bg: string; text: string; bar: string }> = {
                  mint: { bg: "bg-mint-50", text: "text-mint-700", bar: "bg-mint-500" },
                  sky: { bg: "bg-sky-50", text: "text-sky-700", bar: "bg-sky-500" },
                  lavender: { bg: "bg-lavender-50", text: "text-lavender-700", bar: "bg-lavender-500" },
                  sun: { bg: "bg-sun-50", text: "text-sun-600", bar: "bg-sun-500" },
                };
                const c = cmap[m.c];
                return (
                  <div key={m.m} className={`${c.bg} rounded-xl p-3 relative`}>
                    <div className={`absolute top-0 left-3 right-3 h-0.5 ${c.bar} rounded-full`} />
                    <div className={`text-[10px] font-bold tracking-widest ${c.text} mt-2`}>{m.m}</div>
                    <div className="text-xs font-bold mt-1 tracking-tight">{m.t}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-5 pt-5 border-t border-ink-100 text-[11px] text-ink-600">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
              파일럿 5,000명 응시 (3·4학년) · Cohen's κ ≥ 0.7 검증 · 학술 논문 2편 산출 목표
            </div>
          </div>

          {/* 자문위원진 + 핵심 인력 */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                role: "수학 책임자문",
                name: "박만구 교수",
                org: "서울교육대학교",
                tag: "한국수학교육학회장 역임",
                color: "mint",
              },
              {
                role: "과학 책임자문",
                name: "[섭외 중]",
                org: "서울과학교육대학",
                tag: "과학교육학회 출신",
                color: "sky",
              },
              {
                role: "국어 책임자문",
                name: "[섭외 중]",
                org: "국어교육 전공",
                tag: "언어·독해 전문",
                color: "lavender",
              },
              {
                role: "기술 PM",
                name: "김종하",
                org: "(주)제닉스 / 이노하이",
                tag: "AI 시스템 총괄",
                color: "sun",
              },
            ].map((p) => {
              const cmap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
                mint: { bg: "bg-mint-50", border: "border-mint-200", badge: "bg-mint-500", text: "text-mint-700" },
                sky: { bg: "bg-sky-50", border: "border-sky-200", badge: "bg-sky-500", text: "text-sky-700" },
                lavender: { bg: "bg-lavender-50", border: "border-lavender-200", badge: "bg-lavender-500", text: "text-lavender-700" },
                sun: { bg: "bg-sun-50", border: "border-sun-200", badge: "bg-sun-500", text: "text-sun-600" },
              };
              const c = cmap[p.color];
              return (
                <div key={p.role} className={`${c.bg} ${c.border} border-2 rounded-2xl p-5`}>
                  <div className={`inline-block ${c.badge} text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full mb-3`}>
                    {p.role}
                  </div>
                  <h4 className={`text-base font-bold tracking-tight ${c.text} mb-1`}>{p.name}</h4>
                  <div className="text-[11px] text-ink-700 font-medium">{p.org}</div>
                  <div className="text-[10px] text-ink-500 mt-1">{p.tag}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 파일럿 운영 디테일 (3교과 57문항·대표성·교육·Raw 데이터) */}
      <section className="py-24 border-b border-ink-100 bg-paper relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="eyebrow text-mint-600 mb-3">PILOT OPERATIONS</div>
            <h2 className="h-section text-3xl md:text-4xl">
              파일럿 <span className="text-mint-600">운영 디테일</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-5">
            {/* 3교과 57문항 / 45분 */}
            <div className="md:col-span-5 bg-white border-2 border-ink-100 rounded-3xl p-7">
              <div className="eyebrow text-sky-600 mb-3">CONTENT · 57문항 / 45분</div>
              <h3 className="text-lg font-bold mb-5 tracking-tight">교과 블록 구성</h3>
              <div className="space-y-3">
                {[
                  { name: "국어 (읽기·어휘)", q: 10, t: 8, color: "bg-lavender-500", bg: "bg-lavender-50" },
                  { name: "과학", q: 20, t: 15, color: "bg-sky-500", bg: "bg-sky-50" },
                  { name: "수학", q: 15, t: 12, color: "bg-mint-500", bg: "bg-mint-50" },
                  { name: "통합 사고력", q: 12, t: 10, color: "bg-sun-500", bg: "bg-sun-50" },
                ].map((s) => {
                  const total = 57;
                  const w = (s.q / total) * 100;
                  return (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-ink-800">{s.name}</span>
                        <span className="text-ink-600 tabular-nums">{s.q}문항 · {s.t}분</span>
                      </div>
                      <div className={`h-2 ${s.bg} rounded-full overflow-hidden`}>
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: `${w * 4}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between text-xs">
                <span className="text-ink-600">총 합계</span>
                <span className="font-bold text-ink-900 tabular-nums">57문항 · 45분 · 차원1 5/8 재능</span>
              </div>
            </div>

            {/* 응시자 대표성 */}
            <div className="md:col-span-7 bg-paper-grey rounded-3xl p-7 border border-ink-100">
              <div className="eyebrow text-lavender-700 mb-3">REPRESENTATIVENESS · 5,000명 균형 배치</div>
              <h3 className="text-lg font-bold mb-5 tracking-tight">응시자 대표성 확보 전략</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "도시·중소도시·읍면", v: "5 : 3 : 2", icon: "🏙️", color: "text-mint-700" },
                  { label: "저소득층 비율", v: "≥ 15%", icon: "💛", color: "text-sun-600" },
                  { label: "일반 공립학교", v: "≥ 80%", icon: "🏫", color: "text-sky-700" },
                  { label: "특수교육 대상", v: "3~5%", icon: "♿", color: "text-lavender-700" },
                  { label: "3학년 응시자", v: "2,500명", icon: "③", color: "text-ink-900" },
                  { label: "4학년 응시자", v: "2,500명", icon: "④", color: "text-ink-900" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3 border border-ink-100 flex items-center gap-3">
                    <div className="text-2xl">{s.icon}</div>
                    <div className="flex-1">
                      <div className="text-[10px] text-ink-600 mb-0.5">{s.label}</div>
                      <div className={`text-base font-bold tabular-nums tracking-tight ${s.color}`}>{s.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 전문가 사전 교육 */}
            <div className="md:col-span-6 bg-white border-2 border-ink-100 rounded-3xl p-7 hover:border-mint-300 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">🎤</div>
                <span className="bg-mint-50 text-mint-700 text-[10px] font-bold px-2 py-0.5 rounded-full">RFP 과업범위 5</span>
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">전문가 사전 교육 (오프라인 설명회)</h3>
              <p className="text-xs text-ink-700 leading-[1.7] mb-4">
                제닉스 전문가 구성원 대상 1회 이상 오프라인 설명회 + 사용 매뉴얼 제공.
              </p>
              <ul className="space-y-1.5 text-xs text-ink-700">
                <li className="flex gap-2"><span className="text-mint-500">●</span> 학력 진단 운영 매뉴얼</li>
                <li className="flex gap-2"><span className="text-mint-500">●</span> 교육 콘텐츠 활용 가이드</li>
                <li className="flex gap-2"><span className="text-mint-500">●</span> 학생 성취도 관리 실습</li>
                <li className="flex gap-2"><span className="text-mint-500">●</span> Q&A 세션</li>
              </ul>
            </div>

            {/* Raw 데이터 + 운영 보고서 */}
            <div className="md:col-span-6 bg-white border-2 border-ink-100 rounded-3xl p-7 hover:border-sky-300 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">📦</div>
                <span className="bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-full">RFP 상세 9</span>
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">Raw 데이터 + 운영 결과 보고서</h3>
              <p className="text-xs text-ink-700 leading-[1.7] mb-4">
                학습 참여율·결과 분석·시각화 자료 포함 운영 보고서 + 시험·보완 학습 raw 데이터 일체 제공.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["CSV", "Excel", "JSON", "PDF 보고서", "PostHog 이벤트"].map((f) => (
                  <span key={f} className="text-[10px] font-semibold px-2 py-1 bg-sky-50 text-sky-700 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B (요약) */}
      <section className="bg-carbon-900 text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-500/8 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow text-accent-500 mb-3">FOR SCHOOLS</div>
              <h2 className="h-section text-3xl md:text-4xl mb-5">
                학교·교원용 <span className="text-accent-500">권한 분리</span> 시스템
              </h2>
              <p className="text-white/75 font-normal leading-[1.7] mb-7 max-w-md">
                학생·교원·학부모·관리자 4역할별 메뉴 분리. SSO 연동·알림 발송·통계 다운로드까지.
              </p>
              <Link href="/institutions" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-7 py-4 rounded-full transition">
                기관용 자세히 보기 <IconArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-paper">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-carbon-900 text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-pop">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-mint-500/10 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent-500/8 pointer-events-none" />
            <div className="relative">
              <div className="eyebrow text-accent-500 mb-4">START NOW</div>
              <h2 className="h-hero text-3xl md:text-5xl mb-5">
                사전 진단부터<br />
                <span className="text-accent-500">시작하세요</span>
              </h2>
              <p className="text-base text-white/80 font-normal mb-9 leading-[1.7]">
                초3~초6 · 수학·과학·국어(논술) · AI 맞춤형 학습 시스템
              </p>
              <Link href="/select" className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-8 py-4 rounded-full text-base transition">
                사전 진단 시작 <IconArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
