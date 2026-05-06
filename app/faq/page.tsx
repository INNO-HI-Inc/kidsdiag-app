import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight, IconChevronDown } from "@/components/icons";

const FAQ_GROUPS = [
  {
    cat: "진단 일반",
    items: [
      { q: "진단은 얼마나 걸리나요?", a: "정식 운영은 60~90분이며 분할해서 풀 수 있어요. 데모 체험은 약 5~10분 (10~20문항)." },
      { q: "어떤 학년이 사용할 수 있나요?", a: "베타는 초등 5학년 수학·국어로 시작합니다. 점진적으로 초3~중1 + 전 과목으로 확대할 예정입니다." },
      { q: "재진단은 언제 받나요?", a: "약점 영역은 2주 후 30분 짧은 진단, 전체 재진단은 3개월 후 권장. 시점이 되면 학부모님께 알림이 갑니다." },
      { q: "진단 도중에 중단할 수 있나요?", a: "네. 일시정지 버튼을 누르면 자동 저장되고 24시간 안에 이어 풀 수 있어요." },
    ],
  },
  {
    cat: "AI 튜터",
    items: [
      { q: "AI 튜터가 정답을 직접 알려주지 않나요?", a: "네. Socratic 5단계 힌트로 단계적으로 사고를 이끕니다. 학생이 직접 답을 찾도록 유도해야 진짜 학습 효과가 있어요." },
      { q: "AI 튜터의 안전은 어떻게 보장되나요?", a: "3중 가드레일 (입력 필터·응답 검증·정답 누설 검출) + 자해/학대 신호 감지 시 즉시 학부모·운영자에게 알림이 갑니다." },
      { q: "AI 튜터 대화를 학부모가 볼 수 있나요?", a: "네. 학부모 계정에서 모든 대화 로그를 열람할 수 있어요. 안전 모니터링 목적입니다." },
    ],
  },
  {
    cat: "신뢰성·검수",
    items: [
      { q: "한국창의영재교육원 검수는 어떻게 이뤄지나요?", a: "AI가 1차 생성한 문항을 영재교육 전문가들이 모두 검수합니다. 자동 검증 게이트 + 전문가 승인을 모두 통과한 문항만 운영에 사용됩니다." },
      { q: "어떤 교육과정 기준을 쓰나요?", a: "2022 개정 교육과정 성취기준을 기반으로 합니다." },
      { q: "진단 결과를 신뢰할 수 있나요?", a: "CAT + IRT 2PL 기반 정밀 측정 + 신뢰구간(±) 표기로 추정 정확도를 투명하게 공개합니다." },
    ],
  },
  {
    cat: "개인정보·정책",
    items: [
      { q: "자녀의 개인정보는 안전한가요?", a: "개인정보보호법·정보통신망법 준수. 만 14세 미만은 법정대리인 동의 모듈을 거칩니다. 진단 데이터는 졸업 후 1년 보관 후 자동 파기됩니다." },
      { q: "데이터 삭제를 요청할 수 있나요?", a: "마이페이지에서 즉시 다운로드·삭제 요청이 가능합니다. 30일 이내 전체 파기됩니다." },
      { q: "베타 단계는 무료인가요?", a: "네. 베타 동안 모든 기능을 무료로 사용할 수 있어요." },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-ink-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="eyebrow text-mint-600 mb-3">FAQ</div>
          <h1 className="h-hero text-4xl md:text-6xl mb-5">자주 묻는 질문</h1>
          <p className="text-lg text-ink-700 font-normal leading-[1.7]">
            궁금한 점이 있으시면 아래에서 찾아보시거나 hello@kidsdiag.kr로 문의주세요.
          </p>
        </div>
      </section>

      {/* FAQ Groups */}
      <section className="py-16 border-b border-ink-100">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {FAQ_GROUPS.map((g) => (
            <div key={g.cat}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-mint-500" />
                <h2 className="text-xl font-bold tracking-tight">{g.cat}</h2>
              </div>
              <div className="space-y-2">
                {g.items.map((f) => (
                  <details key={f.q} className="group border-b border-ink-100 py-5">
                    <summary className="cursor-pointer font-semibold text-ink-900 flex items-center justify-between list-none hover:text-mint-600 transition">
                      <span>{f.q}</span>
                      <IconChevronDown className="text-ink-400 group-open:rotate-180 group-open:text-mint-500 transition ml-3 flex-shrink-0" size={18} />
                    </summary>
                    <p className="mt-3 text-ink-700 leading-[1.75] font-normal">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="h-section text-2xl md:text-3xl mb-4">답이 안 보이시나요?</h2>
          <p className="text-ink-700 font-normal mb-7">메일로 직접 문의 주세요.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@kidsdiag.kr" className="inline-flex items-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-7 py-4 rounded-full text-base transition shadow-pop">
              hello@kidsdiag.kr <IconArrowRight size={18} />
            </a>
            <Link href="/select" className="inline-flex items-center gap-2 bg-white border border-ink-200 text-ink-700 hover:border-mint-500 hover:text-ink-900 font-semibold px-7 py-4 rounded-full text-base transition">
              먼저 진단 체험
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
