"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TOTAL_STEPS = 4;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [parentName, setParentName] = useState("홍부모");
  const [email, setEmail] = useState("hong@example.com");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState({ guardian: false, dataDiag: false, dataTalent: false, marketing: false });
  const [childName, setChildName] = useState("홍길동");
  const [childGrade, setChildGrade] = useState<3 | 4 | 5 | 6>(5);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const canNext = () => {
    if (step === 1) return parentName.trim() && email.trim() && password.length >= 4;
    if (step === 2) return agreed.guardian && agreed.dataDiag && agreed.dataTalent;
    if (step === 3) return childName.trim();
    if (step === 4) return pin.length === 4;
    return false;
  };

  function next() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/select"), 300);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <header className="px-5 py-4 flex items-center justify-between">
        <button
          onClick={() => (step === 1 ? router.push("/") : back())}
          className="w-10 h-10 rounded-full hover:bg-paper-grey flex items-center justify-center text-ink-700"
          aria-label="뒤로"
        >
          ←
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i + 1 < step ? "bg-mint-500 w-4" : i + 1 === step ? "bg-mint-600 w-8" : "bg-ink-200 w-4"
              }`}
            />
          ))}
        </div>
        <div className="w-10" />
      </header>

      <section className="flex-1 flex flex-col px-6 pt-6 pb-32 max-w-xl mx-auto w-full">
        {step === 1 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 1 / 4</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight">
                학부모님 정보를<br />알려주세요
              </h1>
              <p className="text-sm text-ink-600 mt-3">자녀의 진단 결과를 받아보실 계정이에요</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">성함</label>
                <input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">비밀번호 (4자 이상)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-lavender-700 mb-2">STEP 2 / 4</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight">
                동의 항목을<br />확인해주세요
              </h1>
              <p className="text-sm text-ink-600 mt-3">개인정보보호법 §22조의2 · 만 14세 미만 자녀</p>
            </div>
            <div className="space-y-2.5">
              {[
                { k: "guardian", t: "법정대리인 동의 (필수)", d: "만 14세 미만 자녀의 진단·학습 데이터 처리에 보호자로서 동의합니다. 개인정보보호법 §22조의2 준수." },
                { k: "dataDiag", t: "학력 진단 데이터 수집·이용 (필수)", d: "응답·풀이시간·답 변경 등 학습 행동 로그를 데이터 최소 수집 원칙에 따라 익명 ID로 처리하며, 5년 보관 후 자동 파기됩니다." },
                { k: "dataTalent", t: "재능 진단 프리뷰 분석 (필수)", d: "8개 재능 중 5개 측정값을 익명 ID로 분석합니다. 서울교대 IRB(박민구 교수 책임 체제) 심의 완료." },
                { k: "marketing", t: "심화 진단 안내·마케팅 (선택)", d: "GeniusX 진로 가이드, 이벤트 등 추가 정보 수신. 연구 목적 2차 활용 시 별도 재동의를 받습니다." },
              ].map((c) => {
                const sel = agreed[c.k as keyof typeof agreed];
                return (
                  <button
                    key={c.k}
                    onClick={() => setAgreed({ ...agreed, [c.k]: !sel })}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition ${
                      sel ? "border-lavender-500 bg-lavender-50" : "border-ink-100 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${sel ? "bg-lavender-500 text-white" : "bg-paper-grey text-ink-400 border border-ink-200"}`}>
                        {sel ? "✓" : ""}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-sm mb-1">{c.t}</div>
                        <div className="text-[11px] text-ink-600 leading-[1.5]">{c.d}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 데이터 거버넌스 안내 */}
            <div className="mt-4 bg-paper-grey rounded-2xl p-3.5 text-[10px] text-ink-700 leading-[1.7] space-y-1">
              <div>· 데이터 최소 수집 원칙 — 진단에 꼭 필요한 정보만 수집</div>
              <div>· 보관 5년 후 자동 파기 · 익명 ID 사용 · 실명 미수집</div>
              <div>· IRB 심의 — 서울교대 박민구 교수 책임연구원 체제</div>
              <div>· PIA 선제적 시행 (개인정보 영향평가) · 5,000명 규모 권장 적용</div>
              <div>· 연구 목적 2차 활용 시 별도 재동의 절차</div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 3 / 4</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight">
                자녀를 등록해주세요
              </h1>
              <p className="text-sm text-ink-600 mt-3">자녀가 여러 명이면 가입 후 추가할 수 있어요</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">자녀 이름</label>
                <input
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600 mb-2 block">학년</label>
                <div className="grid grid-cols-4 gap-2">
                  {([3, 4, 5, 6] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setChildGrade(g)}
                      className={`py-3 rounded-2xl border-2 font-bold tabular-nums transition ${
                        childGrade === g
                          ? "border-mint-500 bg-mint-600 text-white"
                          : "border-ink-100 bg-white text-ink-700 hover:border-ink-300"
                      }`}
                    >
                      초{g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 4 / 4</div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[1.3] tracking-tight">
                자녀가 쓸<br />4자리 PIN을 만들어요
              </h1>
              <p className="text-sm text-ink-600 mt-3">{childName} 학생이 로그인할 때 사용해요</p>
            </div>
            <div className="flex justify-center mb-6">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="0000"
                inputMode="numeric"
                maxLength={4}
                className="w-48 text-center px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-3xl font-bold tabular-nums tracking-[0.5em]"
              />
            </div>
            <div className="text-[11px] text-center text-ink-500">
              PIN은 마이페이지에서 언제든 변경할 수 있어요
            </div>
          </>
        )}
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-ink-100">
        <div className="max-w-xl mx-auto px-6 py-4">
          <button
            onClick={next}
            disabled={!canNext() || loading}
            className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-4 rounded-2xl transition disabled:opacity-30 disabled:hover:bg-mint-600 shadow-pop text-base"
          >
            {loading ? "가입 중…" : step < TOTAL_STEPS ? "다음" : "가입 완료 + 진단 시작"}
          </button>
        </div>
      </div>
    </main>
  );
}
