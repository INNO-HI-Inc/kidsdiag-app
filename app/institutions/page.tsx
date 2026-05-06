import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight } from "@/components/icons";

const FEATURES = [
  { v: "N명", t: "단체 진단", d: "한 번의 링크로 N명이 동시 응시 가능합니다." },
  { v: "auto", t: "반별 통계", d: "반·학년별 평균·분포·결손 영역을 자동 집계합니다." },
  { v: "PDF", t: "기관 브랜딩 리포트", d: "기관 로고·서식이 들어간 맞춤 PDF 리포트를 발행합니다." },
  { v: "검수", t: "전문가 문항", d: "한국창의영재교육원 검수를 거친 문항만 사용합니다." },
];

const USECASES = [
  {
    t: "학원·과외",
    d: "신규 등록 학생의 정확한 학력 위치 파악, 반 배정 기준",
    bullets: ["입회 진단 (등록 전 무료 체험)", "반 배정 정확도 향상", "학부모 상담 자료"],
  },
  {
    t: "공교육·학교",
    d: "방과 후 학습 보충, 진로 상담 자료",
    bullets: ["결손 학습자 조기 발견", "1:1 맞춤 학습 경로 제공", "학년 단위 통계 리포트"],
  },
  {
    t: "교육청·재단",
    d: "다수 학교 단위 진단 및 학력 격차 분석",
    bullets: ["지역별 학력 분포", "취약 영역 정책 자료", "1:N 라이선스 옵션"],
  },
];

export default function InstitutionsPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      {/* Hero — 다크 카본 */}
      <section className="bg-carbon-900 text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-500/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-mint-500/8 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-28">
          <div className="eyebrow text-accent-500 mb-3">FOR INSTITUTIONS</div>
          <h1 className="h-hero text-4xl md:text-6xl mb-5">
            학원·학교를 위한<br />
            <span className="text-accent-500">단체 진단</span> 솔루션
          </h1>
          <p className="text-base md:text-lg text-white/80 font-normal leading-[1.7] mb-9 max-w-2xl">
            대량 진단 · 반별 통계 · 맞춤 리포트 패키지.<br />
            한국창의영재교육원 검수 문항을 단체 학습에 활용하세요.
          </p>
          <a href="mailto:hello@kidsdiag.kr" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-7 py-4 rounded-full transition">
            도입 문의 <IconArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow text-mint-600 mb-3">핵심 기능</div>
            <h2 className="h-section text-3xl md:text-4xl">기관용 패키지의 4가지 핵심</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {FEATURES.map((x) => (
              <div key={x.t} className="bg-white border border-ink-100 rounded-3xl p-6 hover:border-mint-500 transition">
                <div className="text-3xl font-bold text-mint-600 tabular-nums leading-none mb-3">{x.v}</div>
                <div className="font-bold mb-2 tracking-tight">{x.t}</div>
                <div className="text-sm text-ink-700 font-normal leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow text-mint-600 mb-3">USE CASES</div>
            <h2 className="h-section text-3xl md:text-4xl">이런 곳에서 활용합니다</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {USECASES.map((u, i) => (
              <div key={u.t} className="bg-paper-grey rounded-3xl p-7">
                <div className="text-mint-600 font-bold text-sm mb-2 tabular-nums">0{i + 1}</div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{u.t}</h3>
                <p className="text-sm text-ink-700 font-normal leading-relaxed mb-4">{u.d}</p>
                <ul className="space-y-1.5">
                  {u.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-ink-600 font-normal">
                      <span className="w-1 h-1 rounded-full bg-mint-500 mt-1.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="h-section text-3xl md:text-4xl mb-5">
            기관 도입을 고려중이신가요?
          </h2>
          <p className="text-base text-ink-700 font-normal mb-9">
            도입 문의를 주시면 데모 미팅을 잡아드립니다.
          </p>
          <a href="mailto:hello@kidsdiag.kr" className="inline-flex items-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-8 py-4 rounded-full text-base transition shadow-pop">
            hello@kidsdiag.kr 문의 <IconArrowRight size={18} />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
