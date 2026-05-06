"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Item } from "@/lib/types";
import { IconArrowRight, IconCheck, IconClock, IconChart, IconTree } from "@/components/icons";

interface DiagnoseState {
  item: Item | null;
  itemIndex: number;
  done: boolean;
  prevGrade?: number;
}

export default function DiagnosePage() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [step, setStep] = useState<"intro" | "test">("intro"); // 잡다 스타일 인트로 단계
  const [state, setState] = useState<DiagnoseState>({ item: null, itemIndex: 0, done: false });
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [answerChanges, setAnswerChanges] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [gradeJumpNotice, setGradeJumpNotice] = useState<string | null>(null);
  const [totalElapsedSec, setTotalElapsedSec] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const totalStartRef = useRef<number>(Date.now());
  const lastChoiceRef = useRef<string | null>(null);

  // Total timer
  useEffect(() => {
    if (step !== "test" || paused) return;
    const id = setInterval(() => {
      setTotalElapsedSec(Math.floor((Date.now() - totalStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [step, paused]);

  // ===== 정적 export 데모용 mock 문항 시퀀스 =====
  const MOCK_ITEMS = [
    {
      id: "demo_1", subject: "math", grade: 5, type: "multiple_choice",
      stem: "1/2 + 1/3 = ?",
      choices: ["① 2/5", "② 5/6", "③ 1/6", "④ 2/6"],
    },
    {
      id: "demo_2", subject: "math", grade: 5, type: "multiple_choice",
      stem: "비 3:5에서 전항이 6일 때, 후항은?",
      choices: ["① 8", "② 10", "③ 12", "④ 15"],
    },
    {
      id: "demo_3", subject: "math", grade: 4, type: "multiple_choice",
      stem: "144 ÷ 12 = ?",
      choices: ["① 10", "② 11", "③ 12", "④ 13"],
    },
  ] as Item[];

  function startTest() {
    setState({ item: MOCK_ITEMS[0], itemIndex: 0, done: false, prevGrade: MOCK_ITEMS[0].grade });
    startTimeRef.current = Date.now();
    totalStartRef.current = Date.now();
    setStep("test");
  }

  function selectChoice(c: string) {
    if (lastChoiceRef.current && lastChoiceRef.current !== c) setAnswerChanges((n) => n + 1);
    lastChoiceRef.current = c;
    setSelectedChoice(c);
  }

  async function submitAnswer(answer: string | null, isDontKnow = false) {
    if (!state.item) return;
    if (!answer && !isDontKnow) return;
    setSubmitting(true);

    // 정적 export 데모: 다음 mock 문항으로 이동 또는 결과 페이지로
    setTimeout(() => {
      const nextIndex = state.itemIndex + 1;
      if (nextIndex >= MOCK_ITEMS.length) {
        router.push(`/result/${sessionId}`);
        return;
      }
      const nextItem = MOCK_ITEMS[nextIndex];
      let notice: string | null = null;
      if (state.prevGrade && nextItem.grade < state.prevGrade) notice = `잠깐, 기초를 좀 더 살펴볼게요. (초${nextItem.grade})`;
      else if (state.prevGrade && nextItem.grade > state.prevGrade) notice = `좋아요, 한 단계 더 가볼까요. (초${nextItem.grade})`;
      setGradeJumpNotice(notice);
      if (notice) setTimeout(() => setGradeJumpNotice(null), 3500);

      setState({ item: nextItem, itemIndex: nextIndex, done: false, prevGrade: nextItem.grade });
      setSelectedChoice(null);
      setShortAnswer("");
      setAnswerChanges(0);
      lastChoiceRef.current = null;
      startTimeRef.current = Date.now();
      setSubmitting(false);
    }, 250);
  }

  // ============= INTRO (잡다 스타일 진중한 진단 안내) =============
  if (step === "intro") {
    return (
      <main className="min-h-screen bg-paper flex items-center py-8">
        <div className="max-w-3xl mx-auto px-6 w-full">
          {/* 진척 도트 + 뒤로 */}
          <div className="flex items-center justify-between mb-10">
            <a href="/select" className="text-sm text-ink-500 hover:text-ink-900 font-medium">← 뒤로</a>
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-6 rounded-full bg-mint-500" />
              <div className="h-1 w-6 rounded-full bg-mint-500" />
              <div className="h-1 w-6 rounded-full bg-ink-200" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="eyebrow text-mint-600 mb-3">진단 시작 전</div>
            <h1 className="h-hero text-3xl md:text-4xl mb-3">
              <span className="text-mint-600">5~10분</span>이면 끝나요
            </h1>
            <p className="text-ink-700 font-normal text-sm md:text-base">
              차분한 환경에서 시작해주세요.
            </p>
          </div>

          <div className="bg-white border border-mint-100 rounded-3xl p-6 mb-6">
            <ul className="space-y-3">
              {[
                <>모르면 <strong className="font-semibold text-mint-700">"잘 모르겠어요"</strong></>,
                <><strong className="font-semibold text-mint-700">틀려도 점수 안 깎여요</strong></>,
                <>잠깐 쉬어도 OK, <strong className="font-semibold text-mint-700">자동 저장</strong></>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-normal text-ink-800">
                  <span className="w-5 h-5 rounded-full bg-mint-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0 text-[10px] font-bold">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={startTest} className="bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full w-full px-8 py-4 text-base flex items-center justify-center gap-2 shadow-pop transition">
            검사 시작 <IconArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  // ============= PAUSED =============
  if (paused) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-mesh-mint p-6">
        <div className="bg-white rounded-3xl border border-mint-100 shadow-soft p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-3xl bg-mint-100 mx-auto flex items-center justify-center mb-5 text-mint-600">
            <IconClock size={28} />
          </div>
          <h2 className="h-section text-2xl mb-2">잠깐 쉬어가기</h2>
          <p className="text-ink-700 font-normal leading-[1.7] mb-6">
            지금까지 답한 건 자동으로 저장됐어요.<br />
            화장실 다녀오거나 물 마시고 와도 괜찮아요.
          </p>
          <button onClick={() => { setPaused(false); startTimeRef.current = Date.now(); }} className="bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 w-full flex items-center justify-center gap-2 transition">
            다시 시작하기 <IconArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  if (!state.item) {
    return <main className="min-h-screen flex items-center justify-center bg-paper"><div className="text-ink-500 font-medium">진단 준비중…</div></main>;
  }

  const item = state.item;
  const remainingApprox = Math.max(0, 16 - state.itemIndex);
  const progressPct = Math.min(100, ((state.itemIndex + 1) / 17) * 100);
  const minutes = Math.floor(totalElapsedSec / 60);
  const seconds = totalElapsedSec % 60;

  // ============= TEST =============
  return (
    <main className="min-h-screen bg-paper-grey">
      {/* TOP — 잡다 스타일 단계+진척 */}
      <div className="bg-white border-b border-ink-100 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Step indicator (mini) */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              {["1", "2", "3"].map((n) => (
                <div key={n} className={`h-1 w-8 rounded-full ${n === "2" ? "bg-mint-600" : "bg-ink-200"}`} />
              ))}
              <span className="text-[11px] font-semibold text-ink-700 ml-2">2단계 · 진단 진행중</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-700 tabular-nums">
              <IconClock size={12} />
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>

          {/* Question progress */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-[11px] eyebrow text-mint-600">{state.itemIndex + 1}번째 문제</div>
              <div className="text-sm text-ink-700 font-medium mt-0.5">평균 <strong className="font-semibold text-ink-900">{remainingApprox}개</strong> 정도 남았어요</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowHelp(true)} className="w-10 h-10 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold transition flex items-center justify-center text-base" aria-label="도움말">?</button>
              <button onClick={() => setPaused(true)} className="w-10 h-10 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold transition flex items-center justify-center text-sm" aria-label="일시 정지">⏸</button>
            </div>
          </div>
          <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-mint-500 transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* 학년 점프 알림 */}
      {gradeJumpNotice && (
        <div className="max-w-3xl mx-auto px-4 md:px-6 mt-4 animate-slide-up">
          <div className="bg-accent-100 border border-accent-300 rounded-2xl px-4 py-3 text-sm text-accent-700 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            {gradeJumpNotice}
          </div>
        </div>
      )}

      {/* QUESTION */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="bg-white border border-ink-100 rounded-3xl shadow-card p-6 md:p-9 animate-fade-in" key={item.id}>
          <div className="flex items-center gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-mint-600 text-white text-xs font-semibold">
              {item.subject === "math" ? "수학" : "국어"}
            </span>
            <span className="px-3 py-1 rounded-full bg-ink-100 text-ink-700 text-xs font-semibold">
              초{item.grade}
            </span>
          </div>

          <h2 className="text-[22px] md:text-2xl font-bold leading-[1.6] mb-7 whitespace-pre-line text-ink-900 tracking-tight">
            {item.stem}
          </h2>

          {item.type === "multiple_choice" && item.choices && (
            <div className="space-y-3">
              {item.choices.map((c, idx) => {
                const choiceKey = c.match(/^[①②③④]/)?.[0] ?? String.fromCharCode(0x2460 + idx);
                const selected = selectedChoice === choiceKey;
                return (
                  <button
                    key={c}
                    onClick={() => selectChoice(choiceKey)}
                    className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all font-medium text-base min-h-[64px] ${
                      selected
                        ? "border-mint-500 bg-mint-600 text-white shadow-pop"
                        : "border-ink-100 bg-white text-ink-800 hover:border-mint-300 active:bg-mint-50/50"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}

          {item.type === "short_answer" && (
            <input
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              placeholder="답을 적어볼까요?"
              className="w-full px-5 py-5 rounded-2xl border-2 border-ink-100 focus:border-mint-500 outline-none font-medium text-base"
            />
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => submitAnswer(null, true)}
            disabled={submitting}
            className="flex-1 sm:flex-initial bg-white border-2 border-ink-200 text-ink-700 px-7 py-4 rounded-full font-semibold hover:border-accent-500 hover:text-accent-700 transition min-h-[60px]"
          >
            잘 모르겠어요
          </button>
          <button
            onClick={() => submitAnswer(item.type === "multiple_choice" ? selectedChoice : shortAnswer)}
            disabled={
              submitting ||
              (item.type === "multiple_choice" && !selectedChoice) ||
              (item.type === "short_answer" && !shortAnswer)
            }
            className="flex-1 sm:flex-initial bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 flex items-center justify-center gap-2 shadow-pop transition disabled:opacity-50 disabled:hover:bg-mint-600 min-h-[60px]"
          >
            {submitting ? "보내는 중…" : <>제출하고 다음 <IconArrowRight size={18} /></>}
          </button>
        </div>

        <p className="mt-5 text-xs text-center text-ink-500 font-normal leading-relaxed">
          틀려도 점수 안 깎여요. 차분히 풀어보세요.
        </p>
      </div>

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-3xl border border-ink-100 shadow-soft p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="h-section text-xl mb-4">자주 묻는 질문</h3>
            <dl className="space-y-3 text-sm text-ink-700 font-normal mb-5">
              {[
                ["앞 문제 다시 볼 수 있나요?", "아뇨, 한 번 답하면 못 돌아가요. 신중히 답해주세요."],
                ["틀리면 점수가 깎이나요?", "아니에요. 어디 막혔는지 알기 위한 진단이에요."],
                ["부모님은 모든 걸 보나요?", "결과 점수와 학습 경로만 봐요. 답한 내용은 안 보여줘요."],
                ["왜 4학년 문제가 나오나요?", "어디서 막혔는지 거슬러 살펴보는 중이에요. 끝나면 다시 5학년으로 와요."],
                ["잠깐 쉴 수 있나요?", "위 ⏸ 버튼을 눌러요. 자동 저장돼요."],
                ["부모님이 옆에서 같이 봐도 되나요?", "괜찮아요. 다만 답은 본인이 직접 골라야 정확한 진단이 돼요."],
              ].map(([q, a]) => (
                <div key={q}>
                  <dt className="font-semibold text-ink-900 mb-1">Q. {q}</dt>
                  <dd className="leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
            <button onClick={() => setShowHelp(false)} className="bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 w-full">
              알겠습니다
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
