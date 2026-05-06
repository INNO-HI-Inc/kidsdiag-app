import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight } from "@/components/icons";

const STEPS = [
  {
    n: "01",
    t: "프로필 등록",
    time: "약 3분",
    d: "학부모님이 가입하시고 자녀 프로필을 추가하세요.",
    detail: [
      "이메일·전화번호 인증",
      "자녀 이름·학년·과목 등록",
      "만 14세 미만 법정대리인 동의 모듈",
    ],
  },
  {
    n: "02",
    t: "적응형 진단",
    time: "60~90분 (분할 가능)",
    d: "자녀가 본인 페이스로 진단 문항을 풀어갑니다. 답에 따라 다음 문항이 자동으로 조정됩니다.",
    detail: [
      "객관식·단답형 + 풀이시간·답 변경 추적",
      "막히면 선수개념 노드로 자동 점프",
      '"잘 모르겠어요" 옵션으로 찍기 강요 X',
      "잠깐 쉬었다 이어 풀기 가능",
    ],
  },
  {
    n: "03",
    t: "결손 리포트",
    time: "즉시",
    d: "진단 종료와 동시에 학생용·학부모용 리포트가 생성됩니다.",
    detail: [
      "영역별 마스터리 % + 신뢰구간",
      "결손 트리 (왜 막혔는지 학년 거슬러 추적)",
      "또래 비교 (백분위)",
      "학부모용 PDF 리포트 (준비중)",
    ],
  },
  {
    n: "04",
    t: "AI 심화학습",
    time: "이후 자율",
    d: "진단 결과 기반 맞춤 학습 경로로 약점부터 효율적으로 채워갑니다.",
    detail: [
      "우선순위 정렬된 학습 시퀀스",
      "AI 친구 튜터와 단계별 힌트",
      "2주 후 약점 짧은 재진단",
      "3개월 후 전체 재진단 + 성장 그래프",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-ink-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="eyebrow text-mint-600 mb-3">HOW IT WORKS</div>
          <h1 className="h-hero text-4xl md:text-6xl mb-5">
            <span className="text-mint-600">4단계로</span> 간단합니다
          </h1>
          <p className="text-lg text-ink-700 font-normal leading-[1.7] max-w-2xl">
            가입에서 학습 시작까지 약 1시간이면 충분합니다.<br />
            각 단계에서 어떤 일이 일어나는지 자세히 알아보세요.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 border-b border-ink-100">
        <div className="max-w-4xl mx-auto px-6 space-y-14">
          {STEPS.map((s, i) => (
            <div key={s.n} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <div className="text-6xl md:text-7xl font-bold text-mint-500/20 tabular-nums leading-none mb-2">{s.n}</div>
                <div className="text-xs text-mint-700 font-bold tracking-wider">{s.time}</div>
              </div>
              <div className="md:col-span-9 border-t-2 border-mint-500 pt-5">
                <h2 className="h-section text-2xl md:text-3xl mb-3">{s.t}</h2>
                <p className="text-base text-ink-700 font-normal leading-[1.7] mb-5">{s.d}</p>
                <ul className="space-y-2">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-ink-700 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-600 mt-2 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Total time */}
      <section className="py-20 bg-paper-mint border-b border-ink-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="eyebrow text-mint-700 mb-3">합산</div>
          <h2 className="h-hero text-4xl md:text-5xl mb-3">
            가입부터 결과까지 <span className="text-mint-600">약 1시간</span>
          </h2>
          <p className="text-base text-ink-700 font-normal">초3~중1, 시험 없는 5년의 공백을 1시간에 짚어보세요.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href="/select" className="inline-flex items-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-8 py-4 rounded-full text-base transition shadow-pop">
            무료 진단 시작 <IconArrowRight size={18} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
