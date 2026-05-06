import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight } from "@/components/icons";

const FEATURES = [
  {
    n: "01",
    t: "학년 거슬러 추적",
    sub: "초5 → 초3까지 자동",
    d: "초5에서 분수가 막혔다면? 시스템이 자동으로 초3 자연수 나눗셈까지 거슬러 짚어냅니다.",
    detail: [
      "CAT (Computerized Adaptive Testing) 알고리즘",
      "IRT 2PL/3PL 기반 정밀 측정",
      "선수개념 그래프 자동 추적 (최대 2 hop)",
    ],
  },
  {
    n: "02",
    t: "결손 트리 시각화",
    sub: "근본 원인까지 그래프로",
    d: "약점의 표면이 아닌 근본 원인 노드까지 그래프로 표시합니다. 학원에서 알려주지 않는 인사이트.",
    detail: [
      "마스터리 % + 신뢰구간(±) 표기",
      "BFS 기반 root cause 자동 추적",
      "학년별 위계 시각화",
    ],
  },
  {
    n: "03",
    t: "안전한 AI 튜터",
    sub: "정답 직답 X, 단계적 힌트",
    d: "Socratic 5단계 점진적 힌트로 학생이 스스로 답을 찾도록 유도합니다. 3중 가드레일.",
    detail: [
      "Socratic 5단계 (방향→개념→공식→과정→확인)",
      "3중 가드레일 (입력·응답·정답누설)",
      "자해/학대 신호 즉시 학부모 알림",
    ],
  },
  {
    n: "04",
    t: "성장 그래프",
    sub: "재진단으로 효과 정량 측정",
    d: "3개월 후 재진단으로 학습 효과를 정량적으로 측정. 단순 점수가 아닌 영역별 변화 추적.",
    detail: [
      "2주 후 약점 영역 짧은 진단 (30분)",
      "3개월 후 전체 재진단",
      "시간축 마스터리 변화 그래프",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-ink-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="eyebrow text-mint-600 mb-3">FEATURES</div>
          <h1 className="h-hero text-4xl md:text-6xl mb-5">
            <span className="text-mint-600">결손의 뿌리</span>까지<br />
            추적하는 4가지 기능
          </h1>
          <p className="text-lg text-ink-700 font-normal leading-[1.7] max-w-2xl">
            학원 레벨테스트는 "못한다"까지만 알려줍니다.<br />
            kidsdiag는 <strong className="font-semibold">"왜 못하는지"</strong>까지 알려드립니다.
          </p>
        </div>
      </section>

      {/* 4 Features 상세 */}
      <section className="py-16 border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {FEATURES.map((f, i) => (
            <div key={f.n} className={`grid md:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="md:col-span-5">
                <div className="text-7xl md:text-8xl font-bold text-mint-500/15 tabular-nums leading-none">{f.n}</div>
              </div>
              <div className="md:col-span-7">
                <div className="eyebrow text-mint-600 mb-2">{f.sub}</div>
                <h2 className="h-section text-2xl md:text-4xl mb-4">{f.t}</h2>
                <p className="text-base md:text-lg text-ink-700 font-normal leading-[1.7] mb-6">{f.d}</p>
                <ul className="space-y-2">
                  {f.detail.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-ink-700 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-500 mt-2 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="h-section text-3xl md:text-4xl mb-5">직접 체험해보세요</h2>
          <p className="text-base text-ink-700 font-normal mb-8">5~10분이면 충분합니다.</p>
          <Link href="/select" className="inline-flex items-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-8 py-4 rounded-full text-base transition shadow-pop">
            무료 진단 시작 <IconArrowRight size={18} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
