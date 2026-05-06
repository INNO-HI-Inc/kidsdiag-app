import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-mint-50 text-mint-700 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
            (주)제닉스 · AX(UX) INTRODUCTION
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] mb-4">
            AI 기반 초등학력<br />
            <span className="text-mint-600">진단·학습 시스템</span>
          </h1>
          <p className="text-base text-ink-700 leading-[1.7] max-w-xl mx-auto">
            초등 3~6학년 학생의 학력과 재능을 한 번에 진단하고,<br />
            맞춤 학습으로 향상도까지 측정하는 통합 시스템.
          </p>
        </div>

        {/* 3 STEP */}
        <div className="grid md:grid-cols-3 gap-3 mb-10">
          {[
            { n: "01", t: "사전 진단", d: "수학·과학·국어 4개 블록 / 57문항 / 45분", c: "border-mint-300" },
            { n: "02", t: "맞춤 학습", d: "동영상 강의 · AI 학습 도우미 · 오답·유사 문항", c: "border-sky-300" },
            { n: "03", t: "사후 진단", d: "동일 영역 응시로 향상도 정량 측정", c: "border-lavender-300" },
          ].map((s) => (
            <div key={s.n} className={`bg-white border-2 ${s.c} rounded-2xl p-6`}>
              <div className="text-3xl font-bold text-ink-300 tabular-nums mb-3">{s.n}</div>
              <h3 className="text-base font-bold mb-2 tracking-tight">{s.t}</h3>
              <p className="text-xs text-ink-700 leading-[1.6]">{s.d}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-mint-50 to-lavender-50 border border-mint-200 rounded-3xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3 tracking-tight">시작할 준비 되셨나요?</h2>
          <p className="text-sm text-ink-700 mb-6">로그인하고 사전 진단을 시작하세요. 응시 인원 제한 없음.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-bold px-7 py-3.5 rounded-full transition shadow-pop">
              로그인 / 회원가입
            </Link>
            <Link href="/select" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-ink-200 hover:border-mint-500 text-ink-900 font-bold px-7 py-3.5 rounded-full transition">
              사전 진단 시작
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 text-[10px] text-ink-500">
          5년 보관 후 자동 파기 · 익명 ID 사용 · IRB 심의 완료
        </div>
      </section>
    </main>
  );
}
