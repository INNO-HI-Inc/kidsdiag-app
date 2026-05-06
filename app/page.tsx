"use client";
import Link from "next/link";
import { useState } from "react";
import { IconArrowRight } from "@/components/icons";

function Squiggle({ color = "#FFC82A" }: { color?: string }) {
  return (
    <svg
      className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
    >
      <path d="M2,8 Q35,2 70,7 T138,8 T198,7" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      {/* Compact header */}
      <header className="border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">
              k
            </div>
            <div className="font-bold text-base tracking-tight">제닉스</div>
          </div>
          <div className="text-[11px] font-semibold text-ink-500 hidden sm:block">
            (주)제닉스 · AI 기반 초등학력 진단·학습시스템
          </div>
        </div>
      </header>

      {/* Split: Pitch + Auth */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT — 간단 PITCH */}
        <div className="lg:col-span-7">
          <h1 className="h-hero text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] mb-5">
            <span className="relative inline-block">
              어디서 막혔는지
              <Squiggle color="#FFC82A" />
            </span>
            <br />
            <span className="text-mint-600">짚어드립니다.</span>
          </h1>
          <p className="text-base text-ink-700 leading-[1.7] max-w-md">
            초3~6 학력 + 재능 8개 동시 진단 · 57문항 · 45분
          </p>
        </div>

        {/* RIGHT — AUTH FORM */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-ink-100 rounded-3xl p-7 md:p-8 shadow-card">
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
                    placeholder="••••••••"
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
                <Link
                  href="/select"
                  className="flex items-center justify-center gap-2 w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition shadow-pop"
                >
                  로그인 <IconArrowRight size={18} />
                </Link>
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

                {/* 빠른 진입 (역할별 데모) */}
                <div className="pt-4 mt-4 border-t border-ink-100">
                  <div className="text-[10px] font-bold tracking-widest text-ink-500 mb-2">
                    DEMO · 역할별 빠른 진입
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { l: "학생", h: "/mypage", d: "bg-mint-500" },
                      { l: "교원", h: "/teacher", d: "bg-sky-500" },
                      { l: "학부모", h: "/parent/report/child_demo", d: "bg-lavender-500" },
                      { l: "관리자", h: "/admin", d: "bg-sun-500" },
                    ].map((r) => (
                      <Link
                        key={r.l}
                        href={r.h}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-paper-grey hover:bg-ink-100 text-xs font-semibold transition"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${r.d}`} />
                        {r.l}
                      </Link>
                    ))}
                  </div>
                </div>
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
                    <strong>[필수]</strong> 만 14세 미만 자녀 법정대리인 동의 · 개인정보 수집·이용 (개인정보보호법 §22조의2)
                  </span>
                </label>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition shadow-pop"
                >
                  다음 단계 — 자녀 등록 <IconArrowRight size={18} />
                </Link>
                <div className="text-center text-[10px] text-ink-500 pt-2">
                  가입 4단계: 학부모 정보 → 동의 → 자녀 등록 → PIN 설정
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-[10px] text-ink-500 leading-[1.7]">
            5년 보관 자동 파기 · 익명 ID 사용 · IRB 심의 완료
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-ink-100 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-ink-500">
          <div>© 2026 (주)제닉스 · AI 기반 초등학력 진단·학습시스템</div>
          <div>2022 개정 교육과정 · 개인정보보호법 §22조의2 준수</div>
        </div>
      </footer>
    </main>
  );
}
