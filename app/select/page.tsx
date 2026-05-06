"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Mode = "pre" | "post";
type Grade = 3 | 4 | 5 | 6;

const TOTAL_STEPS = 6;

export default function SelectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<Mode | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [school, setSchool] = useState("제닉스초등학교");
  const [classroom, setClassroom] = useState("5-3");
  const [strong, setStrong] = useState<string[]>([]);
  const [weak, setWeak] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const SUBJECTS = ["수학", "과학", "국어", "통합사고력"];

  const canNext = () => {
    if (step === 1) return mode !== null;
    if (step === 2) return grade !== null;
    if (step === 3) return school.trim() && classroom.trim();
    if (step === 4) return true; // 설문은 선택
    if (step === 5) return true; // 안내는 통과
    if (step === 6) return agreed;
    return false;
  };

  function next() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/diagnose/demo"), 250);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function toggleSubj(arr: string[], setArr: (v: string[]) => void, s: string) {
    if (arr.includes(s)) setArr(arr.filter((x) => x !== s));
    else setArr([...arr, s]);
  }

  return (
    <main className="bg-paper min-h-screen flex flex-col">
      {/* 상단: 뒤로 + 진행 도트 */}
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

      {/* 본문 */}
      <section className="flex-1 flex flex-col px-6 pt-6 pb-32 max-w-md mx-auto w-full">
        {step === 1 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 1 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                어떤 진단을 받으실<br />건가요?
              </h1>
              <p className="text-sm text-ink-600 mt-3">언제든 다시 선택할 수 있어요</p>
            </div>
            <div className="space-y-3">
              {[
                { v: "pre" as Mode, t: "사전 진단", d: "학습 시작 전 기준점을 측정해요", emoji: "처음" },
                { v: "post" as Mode, t: "사후 진단 (총괄평가)", d: "학습 후 향상도를 측정해요", emoji: "두번째" },
              ].map((m) => (
                <button
                  key={m.v}
                  onClick={() => setMode(m.v)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition ${
                    mode === m.v ? "border-mint-500 bg-mint-50" : "border-ink-100 hover:border-ink-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${mode === m.v ? "bg-mint-600 text-white" : "bg-paper-grey text-ink-600"}`}>
                      {m.emoji}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-base">{m.t}</div>
                      <div className="text-xs text-ink-600 mt-1">{m.d}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 2 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                지금 몇 학년이에요?
              </h1>
              <p className="text-sm text-ink-600 mt-3">학년에 맞춘 문항이 자동으로 출제돼요</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([3, 4, 5, 6] as Grade[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`aspect-[4/3] rounded-2xl border-2 font-bold text-2xl tabular-nums transition ${
                    grade === g
                      ? "border-mint-500 bg-mint-600 text-white shadow-pop"
                      : "border-ink-100 hover:border-ink-300 bg-white text-ink-700"
                  }`}
                >
                  초{g}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 3 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                어느 학교, 어느 반이에요?
              </h1>
              <p className="text-sm text-ink-600 mt-3">소속에 맞는 진단이 자동 매칭돼요</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">학교</label>
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                >
                  <option>제닉스초등학교</option>
                  <option>한빛초등학교</option>
                  <option>샛별초등학교</option>
                  <option>푸른초등학교</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest text-ink-600">반 (예: 5-3)</label>
                <input
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                  placeholder="5-3"
                  className="w-full mt-2 px-4 py-4 rounded-2xl border-2 border-ink-100 focus:border-mint-400 focus:outline-none text-base font-medium"
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 4 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                자신 있는 과목 있어요?
              </h1>
              <p className="text-sm text-ink-600 mt-3">여러 개 골라도 OK · 건너뛰어도 돼요</p>
            </div>
            <div className="space-y-2.5">
              {SUBJECTS.map((s) => {
                const sel = strong.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSubj(strong, setStrong, s)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-base transition flex items-center justify-between ${
                      sel ? "border-mint-500 bg-mint-50 text-mint-700" : "border-ink-100 bg-white hover:border-ink-300"
                    }`}
                  >
                    {s}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${sel ? "bg-mint-600 text-white" : "bg-paper-grey text-ink-400"}`}>
                      {sel ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
              <div>
                <label className="text-xs text-ink-600 mt-3 inline-flex items-center gap-2">
                  <input type="checkbox" checked={strong.length === 0} readOnly className="accent-mint-600" />
                  없어요 / 모르겠어요
                </label>
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">STEP 5 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                도움이 필요한 과목은요?
              </h1>
              <p className="text-sm text-ink-600 mt-3">진단 결과 + 이 답을 합쳐서 맞춤 학습을 추천해드려요</p>
            </div>
            <div className="space-y-2.5">
              {SUBJECTS.map((s) => {
                const sel = weak.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSubj(weak, setWeak, s)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-base transition flex items-center justify-between ${
                      sel ? "border-peach-400 bg-peach-100 text-peach-500" : "border-ink-100 bg-white hover:border-ink-300"
                    }`}
                  >
                    {s}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${sel ? "bg-peach-400 text-white" : "bg-paper-grey text-ink-400"}`}>
                      {sel ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <div className="mb-8">
              <div className="text-[11px] font-bold tracking-widest text-lavender-700 mb-2">STEP 6 / 6</div>
              <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
                마지막으로<br />하나만 확인할게요
              </h1>
              <p className="text-sm text-ink-600 mt-3">학습 행동 데이터를 정확한 진단에 사용해요</p>
            </div>

            {/* 진단 안내 요약 */}
            <div className="bg-paper-grey rounded-2xl p-5 mb-5">
              <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-3">진단 안내</div>
              <div className="space-y-2.5 text-sm">
                {[
                  { l: "총 시간", v: "약 45분 · 일시정지 가능" },
                  { l: "문항 수", v: "57문항 (4개 블록 자동 진행)" },
                  { l: "구성", v: "국어 10 → 과학 20 → 수학 15 → 통합사고력 12" },
                  { l: "감점", v: "없어요 · 모르면 '잘 모르겠어요'" },
                ].map((r) => (
                  <div key={r.l} className="flex items-start gap-3">
                    <span className="text-[10px] text-ink-500 w-12 flex-shrink-0 mt-0.5">{r.l}</span>
                    <span className="font-medium text-ink-800">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 동의 */}
            <button
              onClick={() => setAgreed(!agreed)}
              className={`w-full p-5 rounded-2xl border-2 text-left transition ${
                agreed ? "border-lavender-500 bg-lavender-50" : "border-ink-100 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${agreed ? "bg-lavender-500 text-white" : "bg-paper-grey text-ink-400"}`}>
                  {agreed ? "✓" : ""}
                </span>
                <div>
                  <div className="font-bold text-sm mb-1">학습 데이터 수집 동의</div>
                  <div className="text-xs text-ink-700 leading-[1.6]">
                    응답·풀이시간·답 변경 횟수 등 학습 행동 로그를 수집합니다.<br />
                    5년 보관 후 자동 파기 · 익명 ID · IRB 심의 완료
                  </div>
                </div>
              </div>
            </button>
          </>
        )}
      </section>

      {/* 하단 고정 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-ink-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <button
            onClick={next}
            disabled={!canNext() || loading}
            className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-4 rounded-2xl transition disabled:opacity-30 disabled:hover:bg-mint-600 shadow-pop text-base"
          >
            {loading ? "시작 중…" : step < TOTAL_STEPS ? "다음" : `${mode === "pre" ? "사전" : "사후"} 진단 시작`}
          </button>
        </div>
      </div>
    </main>
  );
}
