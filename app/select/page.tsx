"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

export default function SelectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<"math" | "korean" | null>(null);

  async function startDiagnose(subject: "math" | "korean") {
    setLoading(subject);
    // 정적 export 데모: 클라이언트 ID로 바로 진단 페이지 이동
    setTimeout(() => router.push(`/diagnose/demo`), 250);
  }

  return (
    <main className="h-[100dvh] bg-paper flex flex-col">
      {/* TOP BAR */}
      <div className="border-b border-ink-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-ink-500 hover:text-ink-900 font-medium">← 처음으로</Link>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-6 rounded-full bg-mint-500" />
            <div className="h-1 w-6 rounded-full bg-ink-200" />
            <div className="h-1 w-6 rounded-full bg-ink-200" />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 overflow-hidden">
        <div className="w-full max-w-2xl">
          {/* 학생 인사 */}
          <div className="text-center mb-7">
            <div className="eyebrow text-mint-600 mb-2">민지 · 초5</div>
            <h1 className="h-hero text-3xl md:text-4xl mb-3">
              어떤 과목부터 <span className="text-mint-600">풀어볼까요?</span>
            </h1>
            <p className="text-sm text-ink-600 font-normal leading-[1.7]">
              과목을 선택하면 바로 진단이 시작됩니다.
            </p>
          </div>

          {/* 카드 2개 */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => startDiagnose("math")}
              disabled={loading !== null}
              className="group bg-white border-2 border-ink-100 hover:border-mint-500 rounded-3xl p-6 text-left transition disabled:opacity-50"
            >
              <div className="text-4xl font-bold text-mint-500/20 tabular-nums leading-none mb-3 group-hover:text-mint-500 transition">01</div>
              <div className="text-xl font-bold mb-1 tracking-tight">수학</div>
              <div className="text-xs text-ink-500 font-normal mb-4">분수 · 소수 · 비율 · 도형</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-400 font-medium">10~20문항</span>
                <span className="text-mint-600 font-semibold">{loading === "math" ? "시작 중…" : "시작 →"}</span>
              </div>
            </button>

            <button
              onClick={() => startDiagnose("korean")}
              disabled={loading !== null}
              className="group bg-white border-2 border-ink-100 hover:border-mint-500 rounded-3xl p-6 text-left transition disabled:opacity-50"
            >
              <div className="text-4xl font-bold text-mint-500/20 tabular-nums leading-none mb-3 group-hover:text-mint-500 transition">02</div>
              <div className="text-xl font-bold mb-1 tracking-tight">국어</div>
              <div className="text-xs text-ink-500 font-normal mb-4">어휘 · 문법 · 독해 · 글쓰기</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-400 font-medium">10~20문항</span>
                <span className="text-mint-600 font-semibold">{loading === "korean" ? "시작 중…" : "시작 →"}</span>
              </div>
            </button>
          </div>

          {/* 메타 */}
          <div className="bg-paper-mint rounded-2xl p-4 border border-mint-100">
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: "5~10분", l: "소요 시간" },
                { v: "적응형", l: "출제 방식" },
                { v: "감점 X", l: "오답 처리" },
              ].map((x) => (
                <div key={x.l} className="text-center">
                  <div className="text-sm font-bold text-mint-700 tabular-nums">{x.v}</div>
                  <div className="text-[10px] text-ink-500 font-medium mt-0.5">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
