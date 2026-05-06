import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SignupPage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="eyebrow text-mint-600 mb-3">SIGNUP · 4-STEP</div>
          <h1 className="h-section text-3xl md:text-4xl mb-3">회원 가입</h1>
          <p className="text-ink-700">학부모 가입 → 자녀 등록까지 4단계, 약 3분</p>
        </div>

        {/* 진행 표시 */}
        <div className="flex items-center justify-between mb-10 max-w-md mx-auto">
          {["가입", "법정대리인", "자녀 등록", "PIN"].map((s, i) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 ? "bg-mint-600 text-white" : "bg-ink-100 text-ink-500"
                }`}
              >
                {i + 1}
              </div>
              <div className={`text-[10px] mt-1.5 font-semibold ${i === 0 ? "text-mint-700" : "text-ink-500"}`}>
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1 폼 */}
        <div className="bg-white border-2 border-mint-200 rounded-3xl p-8 mb-6">
          <h2 className="text-lg font-bold mb-5 tracking-tight">Step 1 — 학부모 가입</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink-700 mb-1.5 block">이메일</label>
              <input type="email" placeholder="parent@example.com" className="w-full px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-700 mb-1.5 block">비밀번호</label>
              <input type="password" placeholder="8자 이상" className="w-full px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-700 mb-1.5 block">학부모 성함</label>
              <input type="text" placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm" />
            </div>
          </div>
        </div>

        {/* 동의 4종 */}
        <div className="bg-white border-2 border-lavender-200 rounded-3xl p-8 mb-6">
          <h2 className="text-lg font-bold mb-5 tracking-tight">목적별 동의 (4종 분리)</h2>
          <div className="space-y-3">
            {[
              { t: "[필수] 만 14세 미만 자녀 법정대리인 동의", req: true, info: "개인정보보호법 §22조의2" },
              { t: "[필수] 학력 진단 데이터 수집·이용", req: true, info: "5년 보관 후 자동 파기" },
              { t: "[필수] 재능 진단 프리뷰 분석", req: true, info: "8개 중 5개 재능 매핑" },
              { t: "[선택] 심화 진단 안내·마케팅", req: false, info: "GeniusX 진로 가이드" },
            ].map((c) => (
              <label key={c.t} className="flex items-start gap-3 p-3 rounded-xl bg-paper-grey hover:bg-lavender-50 cursor-pointer transition">
                <input type="checkbox" defaultChecked={c.req} className="mt-1 w-4 h-4 accent-lavender-600" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.t}</div>
                  <div className="text-[11px] text-ink-600 mt-0.5">{c.info}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="flex-1 text-center px-6 py-3.5 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 font-semibold transition">
            취소
          </Link>
          <button className="flex-1 px-6 py-3.5 rounded-full bg-mint-600 hover:bg-mint-700 text-white font-bold transition shadow-pop">
            다음 단계 →
          </button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
