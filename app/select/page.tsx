"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type Mode = "pre" | "post";
type Grade = 3 | 4 | 5 | 6;

export default function SelectPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("pre");
  const [grade, setGrade] = useState<Grade>(5);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  function start() {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => router.push(`/diagnose/demo`), 250);
  }

  return (
    <main className="bg-paper min-h-screen">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-mint-500" />FUN-001</span>
            <span className="eyebrow text-mint-600">사전진단 시작</span>
          </div>
          <h1 className="h-section text-3xl mb-3">진단 시작 전 확인사항</h1>
          <p className="text-sm text-ink-700 leading-[1.7]">
            총 57문항 / 약 45분 · 4개 교과 블록 (국어 → 과학 → 수학 → 통합사고력)
          </p>
        </div>

        {/* Step 1 — 진단 유형 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-mint-600 text-white text-sm font-bold flex items-center justify-center">1</div>
            <h2 className="text-base font-bold tracking-tight">진단 유형</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {([
              { v: "pre", t: "사전 진단", d: "학습 시작 전 기준점 측정" },
              { v: "post", t: "사후 진단(총괄평가)", d: "동일 영역 향상도 측정" },
            ] as { v: Mode; t: string; d: string }[]).map((m) => (
              <button
                key={m.v}
                onClick={() => setMode(m.v)}
                className={`text-left p-4 rounded-xl border-2 transition ${
                  mode === m.v ? "border-mint-500 bg-mint-50" : "border-ink-100 bg-white hover:border-ink-300"
                }`}
              >
                <div className="font-bold text-sm mb-0.5">{m.t}</div>
                <div className="text-[11px] text-ink-600">{m.d}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — 소속 학교·학년 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-mint-600 text-white text-sm font-bold flex items-center justify-center">2</div>
            <h2 className="text-base font-bold tracking-tight">소속 학교 · 학년</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <select className="px-3 py-2.5 rounded-xl border-2 border-ink-100 text-sm">
              <option>제닉스초등학교</option>
              <option>한빛초등학교</option>
              <option>샛별초등학교</option>
            </select>
            <input placeholder="반 (예: 5-3)" defaultValue="5-3" className="px-3 py-2.5 rounded-xl border-2 border-ink-100 text-sm" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {([3, 4, 5, 6] as Grade[]).map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`py-3 rounded-xl border-2 font-bold tabular-nums transition ${
                  grade === g ? "border-mint-500 bg-mint-50 text-mint-700" : "border-ink-100 hover:border-ink-300 text-ink-700"
                }`}
              >
                초{g}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-ink-500 mt-2">소속 학교에 등록된 학과별 맞춤 검사 페이지가 자동 제공됩니다.</div>
        </div>

        {/* Step 2.5 — 희망 선호 과목 / 부족 교과 설문 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-mint-600 text-white text-sm font-bold flex items-center justify-center">3</div>
            <h2 className="text-base font-bold tracking-tight">희망·부족 교과 설문 <span className="text-[10px] font-normal text-ink-500">(선택)</span></h2>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-1.5">희망 (자신 있는) 과목</div>
              <div className="flex gap-2 flex-wrap">
                {["수학", "과학", "국어", "통합사고력"].map((s) => (
                  <label key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-100 text-xs cursor-pointer hover:border-mint-300">
                    <input type="checkbox" className="accent-mint-600 w-3 h-3" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-1.5">부족 (도움이 필요한) 교과</div>
              <div className="flex gap-2 flex-wrap">
                {["수학", "과학", "국어", "통합사고력"].map((s) => (
                  <label key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-100 text-xs cursor-pointer hover:border-peach-200">
                    <input type="checkbox" className="accent-peach-400 w-3 h-3" />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 — 4 블록 안내 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-mint-600 text-white text-sm font-bold flex items-center justify-center">4</div>
            <h2 className="text-base font-bold tracking-tight">교과 블록 (자동 진행 순서)</h2>
          </div>
          <div className="space-y-2">
            {[
              { o: 1, n: "국어 (읽기·어휘)", q: 10, t: "8분", c: "bg-lavender-100 text-lavender-700" },
              { o: 2, n: "과학", q: 20, t: "15분", c: "bg-sky-100 text-sky-700" },
              { o: 3, n: "수학", q: 15, t: "12분", c: "bg-mint-100 text-mint-700" },
              { o: 4, n: "통합 사고력", q: 12, t: "10분", c: "bg-sun-100 text-sun-600" },
            ].map((b) => (
              <div key={b.o} className="flex items-center gap-3 p-3 rounded-xl bg-paper-grey">
                <span className={`w-7 h-7 rounded-full ${b.c} font-bold text-xs flex items-center justify-center`}>{b.o}</span>
                <span className="flex-1 text-sm font-semibold">{b.n}</span>
                <span className="text-xs text-ink-700 tabular-nums">{b.q}문항 · {b.t}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-ink-100 flex items-center justify-between">
              <span className="text-xs text-ink-700 font-semibold">총합</span>
              <span className="text-sm font-bold tabular-nums">57문항 · 45분</span>
            </div>
          </div>
        </div>

        {/* Step 5 — 동의 */}
        <div className="bg-lavender-50 border-2 border-lavender-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-lavender-500 text-white text-sm font-bold flex items-center justify-center">5</div>
            <h2 className="text-base font-bold tracking-tight">학습 데이터 수집 동의</h2>
          </div>
          <p className="text-xs text-ink-700 leading-[1.7] mb-3">
            응답·풀이시간·답 변경·재검토 횟수 등 학습 행동 로그를 수집합니다.<br />
            5년 보관 후 자동 파기 · 익명 ID 사용 · IRB 심의 완료.
          </p>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-lavender-600" />
            <span className="text-sm font-semibold">위 내용에 동의하고 진단을 시작합니다</span>
          </label>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="flex-1 text-center px-6 py-3.5 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 font-semibold transition">
            취소
          </Link>
          <button
            onClick={start}
            disabled={!agreed || loading}
            className="flex-1 px-6 py-3.5 rounded-full bg-mint-600 hover:bg-mint-700 text-white font-bold transition disabled:opacity-50 disabled:hover:bg-mint-600 shadow-pop"
          >
            {loading ? "시작 중…" : `${mode === "pre" ? "사전" : "사후"} 진단 시작 →`}
          </button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
