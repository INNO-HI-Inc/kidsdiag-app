"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("0000");
  const [password, setPassword] = useState("0000");

  function login() {
    router.push("/select");
  }

  return (
    <main className="bg-paper text-ink-900 min-h-screen flex flex-col">
      {/* Compact header */}
      <header className="border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">
              제
            </div>
            <div className="font-bold text-base tracking-tight">제닉스</div>
          </div>
          <div className="text-[11px] font-semibold text-ink-500 hidden sm:block">
            AI 기반 초등학력 진단·학습시스템
          </div>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          {/* 브랜드 안내 */}
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              제닉스에 로그인
            </h1>
            <p className="text-sm text-ink-600">
              초등 3~6학년 학력·재능 진단 시스템
            </p>
          </div>

          {/* 인증 카드 */}
          <div className="bg-white border border-ink-100 rounded-2xl p-7 shadow-card">
            {/* 탭 */}
            <div className="flex gap-1 p-1 bg-paper-grey rounded-full mb-6">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 text-sm font-bold py-2.5 rounded-full transition ${
                  tab === "login" ? "bg-white shadow-card text-ink-900" : "text-ink-500"
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 text-sm font-bold py-2.5 rounded-full transition ${
                  tab === "signup" ? "bg-white shadow-card text-ink-900" : "text-ink-500"
                }`}
              >
                회원가입
              </button>
            </div>

            {tab === "login" ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">아이디 / 이메일</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] py-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-mint-600" />
                    <span className="text-ink-700">로그인 유지</span>
                  </label>
                  <button className="text-mint-700 font-semibold hover:text-mint-900">비밀번호 찾기</button>
                </div>
                <button
                  onClick={login}
                  className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition shadow-pop"
                >
                  로그인
                </button>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-ink-100" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[10px] font-semibold text-ink-500 tracking-widest">또는</span>
                  </div>
                </div>
                <button className="w-full border-2 border-ink-100 hover:border-mint-300 text-ink-800 font-bold py-3 rounded-full transition text-sm">
                  제닉스 SSO 로그인
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">학부모 성함</label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">이메일</label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">비밀번호</label>
                  <input
                    type="password"
                    placeholder="8자 이상"
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-sm"
                  />
                </div>
                <label className="flex items-start gap-2 text-[11px] text-ink-700 leading-[1.6] py-1">
                  <input type="checkbox" defaultChecked className="mt-0.5 w-3.5 h-3.5 accent-mint-600 flex-shrink-0" />
                  <span>
                    <strong>[필수]</strong> 만 14세 미만 자녀 법정대리인 동의 · 개인정보 수집·이용
                  </span>
                </label>
                <Link
                  href="/signup"
                  className="block text-center w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition shadow-pop"
                >
                  다음 단계 — 자녀 등록
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-[10px] text-ink-500 leading-[1.7]">
            5년 보관 후 자동 파기 · 익명 ID 사용 · IRB 심의 완료
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-ink-500">
          <div>© 2026 (주)제닉스 · AI 기반 초등학력 진단·학습시스템</div>
          <div>2022 개정 교육과정 · 개인정보보호법 §22조의2 준수</div>
        </div>
      </footer>
    </main>
  );
}
