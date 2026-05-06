"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Block {
  id: "korean" | "science" | "math" | "thinking";
  name: string;
  short: string;
  totalQ: number;
  totalMin: number;
  color: { bg: string; bar: string; text: string };
  items: { stem: string; choices: string[]; answer: string }[];
}

const BLOCKS: Block[] = [
  {
    id: "korean", name: "국어 (읽기·어휘)", short: "국어",
    totalQ: 10, totalMin: 8,
    color: { bg: "bg-lavender-50", bar: "bg-lavender-500", text: "text-lavender-700" },
    items: [
      { stem: "다음 중 '함박눈'의 뜻으로 알맞은 것은?", choices: ["① 가는 비", "② 굵고 탐스러운 눈", "③ 우박", "④ 진눈깨비"], answer: "②" },
      { stem: "밑줄 친 어휘의 쓰임이 어색한 것은?", choices: ["① 기뻐하다", "② 슬퍼하다", "③ 노여워하다", "④ 생각해지다"], answer: "④" },
      { stem: "다음 글의 중심 생각으로 알맞은 것은?\n\n자전거를 타려면 균형이 중요하다. 처음에는 어렵지만 자꾸 연습하면 잘 탈 수 있다.", choices: ["① 자전거는 비싸다", "② 균형을 잡으려면 연습이 필요하다", "③ 자전거는 위험하다", "④ 어른은 잘 탄다"], answer: "②" },
    ],
  },
  {
    id: "science", name: "과학", short: "과학",
    totalQ: 20, totalMin: 15,
    color: { bg: "bg-sky-50", bar: "bg-sky-500", text: "text-sky-700" },
    items: [
      { stem: "물체를 밀 때 물체가 움직이는 방향은 미는 방향과 어떻게 다를까요?", choices: ["① 같은 방향", "② 반대 방향", "③ 위쪽", "④ 아무 방향"], answer: "①" },
      { stem: "다음 중 액체의 성질로 옳은 것은?", choices: ["① 모양이 일정하다", "② 부피가 일정하다", "③ 손으로 잡을 수 있다", "④ 모두 색이 있다"], answer: "②" },
      { stem: "물에 사는 동물끼리 묶인 것은?", choices: ["① 붕어, 오징어", "② 호랑이, 토끼", "③ 매미, 잠자리", "④ 비둘기, 까치"], answer: "①" },
    ],
  },
  {
    id: "math", name: "수학", short: "수학",
    totalQ: 15, totalMin: 12,
    color: { bg: "bg-mint-50", bar: "bg-mint-500", text: "text-mint-700" },
    items: [
      { stem: "1/2 + 1/3 = ?", choices: ["① 2/5", "② 5/6", "③ 1/6", "④ 2/6"], answer: "②" },
      { stem: "비 3:5에서 전항이 6일 때, 후항은?", choices: ["① 8", "② 10", "③ 12", "④ 15"], answer: "②" },
      { stem: "144 ÷ 12 = ?", choices: ["① 10", "② 11", "③ 12", "④ 13"], answer: "③" },
    ],
  },
  {
    id: "thinking", name: "통합 사고력", short: "통합사고력",
    totalQ: 12, totalMin: 10,
    color: { bg: "bg-sun-50", bar: "bg-sun-500", text: "text-sun-600" },
    items: [
      { stem: "다음 도형을 시계 방향으로 90도 회전하면 어떤 모양이 될까요?\n\n[ㄱ 모양]", choices: ["① ㄴ", "② ㄷ", "③ ㄴ 회전", "④ ㄱ 그대로"], answer: "①" },
      { stem: "수평잡기 저울의 양쪽 접시에 같은 무게가 올라가 있을 때, 한쪽 접시에 추를 더 올리면 어떻게 될까요?", choices: ["① 그대로", "② 추 올린 쪽이 내려간다", "③ 추 올린 쪽이 올라간다", "④ 평형 유지"], answer: "②" },
      { stem: "1, 3, 6, 10, 15, ___ — 다음 수는?", choices: ["① 18", "② 20", "③ 21", "④ 25"], answer: "③" },
    ],
  },
];

export default function DiagnosePage() {
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;

  const [step, setStep] = useState<"intro" | "test">("intro");
  const [introStep, setIntroStep] = useState(1);
  const [blockIdx, setBlockIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showRubric, setShowRubric] = useState(false);
  const [selfMark, setSelfMark] = useState<"correct" | "wrong" | null>(null);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (step !== "test" || paused) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [step, paused]);

  function startTest() {
    startRef.current = Date.now();
    setStep("test");
  }

  function submit() {
    if (!selected) return;
    setSubmitting(true);
    setTimeout(() => {
      const block = BLOCKS[blockIdx];
      // 다음 문항
      if (itemIdx + 1 < block.items.length) {
        setItemIdx(itemIdx + 1);
        setSelected(null);
        setSubmitting(false);
        return;
      }
      // 다음 블록
      if (blockIdx + 1 < BLOCKS.length) {
        setBlockIdx(blockIdx + 1);
        setItemIdx(0);
        setSelected(null);
        setSubmitting(false);
        return;
      }
      // 종료
      router.push(`/result/${sessionId}`);
    }, 250);
  }

  // ===== INTRO (토스 스타일 5단계) =====
  if (step === "intro") {
    const INTRO_STEPS = [
      {
        title: "총 45분 정도 걸려요",
        sub: "4개 교과 블록 · 57문항이 자동으로 이어져요",
        body: (
          <div className="bg-paper-grey rounded-2xl p-5">
            <div className="grid grid-cols-4 gap-2">
              {BLOCKS.map((b, i) => (
                <div key={b.id} className={`${b.color.bg} rounded-xl p-2.5 text-center`}>
                  <div className={`text-[9px] font-bold tracking-widest ${b.color.text}`}>{i + 1}</div>
                  <div className="text-xs font-bold mt-1">{b.short}</div>
                  <div className="text-[10px] text-ink-600 mt-0.5 tabular-nums">{b.totalQ}문항</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "모르면 '잘 모르겠어요'",
        sub: "그냥 넘어가도 OK — 점수 차감 없어요",
        body: (
          <div className="flex items-center justify-center py-6">
            <div className="bg-white border-2 border-ink-200 px-6 py-3 rounded-full text-base font-semibold text-ink-700">
              잘 모르겠어요
            </div>
          </div>
        ),
      },
      {
        title: "한 번 답하면 못 돌아가요",
        sub: "신중하게 풀어주세요 · 자동 저장돼요",
        body: (
          <div className="flex items-center justify-center gap-3 py-6">
            <div className="w-10 h-10 rounded-full bg-mint-500 text-white flex items-center justify-center font-bold">1</div>
            <span className="text-ink-300">→</span>
            <div className="w-10 h-10 rounded-full bg-mint-500 text-white flex items-center justify-center font-bold">2</div>
            <span className="text-ink-300">→</span>
            <div className="w-10 h-10 rounded-full bg-paper-grey text-ink-400 flex items-center justify-center font-bold">3</div>
          </div>
        ),
      },
      {
        title: "잠깐 쉬어도 OK",
        sub: "일시정지하면 그때까지 답이 자동 저장돼요",
        body: (
          <div className="flex items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-paper-grey flex items-center justify-center text-3xl font-bold text-ink-700">
              II
            </div>
          </div>
        ),
      },
      {
        title: "응시 데이터가 기록돼요",
        sub: "정확한 진단을 위해 풀이시간·답 변경 횟수도 함께 분석해요",
        body: (
          <div className="bg-paper-grey rounded-2xl p-4 space-y-2 text-xs">
            {[
              { l: "응답 답안", v: "선택한 보기" },
              { l: "풀이 시간", v: "문항별 초 단위" },
              { l: "답 변경 횟수", v: "확신도 분석" },
              { l: "재검토 클릭", v: "메타인지 측정" },
            ].map((r) => (
              <div key={r.l} className="flex justify-between">
                <span className="text-ink-600">{r.l}</span>
                <span className="font-bold text-ink-800">{r.v}</span>
              </div>
            ))}
          </div>
        ),
      },
    ];

    const total = INTRO_STEPS.length;
    const cur = INTRO_STEPS[introStep - 1];

    return (
      <main className="min-h-screen bg-paper flex flex-col">
        {/* 상단 진행 도트 */}
        <header className="px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => (introStep === 1 ? router.push("/select") : setIntroStep(introStep - 1))}
            className="w-10 h-10 rounded-full hover:bg-paper-grey flex items-center justify-center text-ink-700"
            aria-label="뒤로"
          >
            ←
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i + 1 < introStep ? "bg-mint-500 w-4" : i + 1 === introStep ? "bg-mint-600 w-8" : "bg-ink-200 w-4"
                }`}
              />
            ))}
          </div>
          <div className="w-10" />
        </header>

        {/* 본문 */}
        <section className="flex-1 flex flex-col px-6 pt-8 pb-32 max-w-md mx-auto w-full">
          <div className="mb-6">
            <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">
              안내 {introStep} / {total}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-[1.3] tracking-tight">
              {cur.title}
            </h1>
            <p className="text-sm text-ink-600 mt-3 leading-[1.6]">{cur.sub}</p>
          </div>
          <div className="mt-2">{cur.body}</div>
        </section>

        {/* 하단 고정 CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-ink-100">
          <div className="max-w-md mx-auto px-6 py-4">
            <button
              onClick={() => {
                if (introStep < total) setIntroStep(introStep + 1);
                else startTest();
              }}
              className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold py-4 rounded-2xl transition shadow-pop text-base"
            >
              {introStep < total ? "다음" : "검사 시작"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ===== PAUSED =====
  if (paused) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper-grey p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center border-2 border-mint-200">
          <div className="text-4xl mb-4"></div>
          <h2 className="text-xl font-bold mb-2">잠깐 쉬어가기</h2>
          <p className="text-sm text-ink-700 leading-[1.7] mb-6">
            지금까지 답한 건 자동으로 저장됐어요.
          </p>
          <button onClick={() => { setPaused(false); startRef.current = Date.now() - elapsed * 1000; }} className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold rounded-full py-3.5">
            다시 시작
          </button>
        </div>
      </main>
    );
  }

  // ===== TEST =====
  const block = BLOCKS[blockIdx];
  const item = block.items[itemIdx];
  const blockProgressPct = ((itemIdx + 1) / block.items.length) * 100;
  const overallQ = BLOCKS.slice(0, blockIdx).reduce((sum, b) => sum + b.items.length, 0) + (itemIdx + 1);
  const overallTotal = BLOCKS.reduce((sum, b) => sum + b.items.length, 0);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <main className="min-h-screen bg-paper-grey">
      {/* TOP — 4블록 진행도 */}
      <div className="bg-white border-b border-ink-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/select" className="text-xs text-ink-500 hover:text-ink-900">← 종료</Link>
            <div className="flex items-center gap-2 text-[11px] tabular-nums font-semibold text-ink-700">
               {minutes}:{seconds.toString().padStart(2, "0")}
              <button onClick={() => setPaused(true)} className="ml-2 w-7 h-7 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold flex items-center justify-center"></button>
            </div>
          </div>

          {/* 4블록 도트 */}
          <div className="flex items-center gap-1.5 mb-3">
            {BLOCKS.map((b, i) => {
              const isActive = i === blockIdx;
              const isDone = i < blockIdx;
              return (
                <div key={b.id} className="flex-1 flex items-center gap-1.5">
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isActive ? "bg-ink-100" : isDone ? b.color.bar : "bg-ink-100"}`}>
                    {isActive && (
                      <div className={`h-full ${b.color.bar} transition-all duration-500`} style={{ width: `${blockProgressPct}%` }} />
                    )}
                    {isDone && <div className={`h-full ${b.color.bar}`} style={{ width: "100%" }} />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className={`font-bold ${block.color.text}`}>BLOCK {blockIdx + 1} · {block.name}</span>
            <span className="text-ink-600 font-semibold tabular-nums">
              {itemIdx + 1} / {block.items.length} 문항 · 전체 {overallQ}/{overallTotal}
            </span>
          </div>
        </div>
      </div>

      {/* QUESTION */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-4">
          <div className={`${block.color.bg} rounded-xl px-3 py-1.5`}>
            <span className={`text-[10px] font-bold tracking-widest ${block.color.text}`}>{block.short.toUpperCase()}</span>
          </div>
          <button onClick={() => setShowRubric(true)} className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700">
            정답채점기준 보기
          </button>
          <div className="ml-auto flex items-center gap-1 text-[10px]">
            <span className="text-ink-500">자가 표시:</span>
            <button
              onClick={() => setSelfMark("correct")}
              className={`px-2 py-1 rounded font-bold ${selfMark === "correct" ? "bg-mint-500 text-white" : "bg-paper-grey text-ink-700"}`}
              title="정답 자가 표시"
            >○ 정답</button>
            <button
              onClick={() => setSelfMark("wrong")}
              className={`px-2 py-1 rounded font-bold ${selfMark === "wrong" ? "bg-peach-400 text-white" : "bg-paper-grey text-ink-700"}`}
              title="오답 자가 표시"
            >× 오답</button>
          </div>
        </div>

        {/* 멀티미디어 영역 (음성·동영상 재생 자리) */}
        {block.id === "korean" && itemIdx === 2 && (
          <div className="bg-white border-2 border-lavender-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lavender-500 text-white flex items-center justify-center font-bold">▶</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-lavender-700">지문 음성 듣기 (1회 재생)</div>
              <div className="text-[10px] text-ink-600">자전거 타기 — 0:42</div>
            </div>
            <div className="h-1 flex-1 bg-lavender-100 rounded-full max-w-[80px]">
              <div className="h-full bg-lavender-500 rounded-full" style={{ width: "30%" }} />
            </div>
          </div>
        )}

        <div className="bg-white border border-ink-100 rounded-2xl shadow-card p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold leading-[1.6] mb-6 whitespace-pre-line tracking-tight">
            {item.stem}
          </h2>
          <div className="space-y-2.5">
            {item.choices.map((c) => {
              const key = c.match(/^[①②③④]/)?.[0] ?? c[0];
              const sel = selected === key;
              return (
                <button
                  key={c}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left px-4 py-4 rounded-xl border-2 font-medium text-sm md:text-base transition ${
                    sel
                      ? `border-mint-500 bg-mint-600 text-white`
                      : "border-ink-100 bg-white hover:border-mint-300"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => { setSelected("__SKIP__"); setTimeout(submit, 50); }}
            disabled={submitting}
            className="flex-1 sm:flex-initial bg-white border-2 border-ink-200 text-ink-700 px-6 py-3.5 rounded-full font-semibold hover:border-accent-500 hover:text-accent-700 transition"
          >
            잘 모르겠어요
          </button>
          <button
            onClick={submit}
            disabled={!selected || submitting}
            className="flex-1 sm:flex-initial bg-mint-600 hover:bg-mint-700 text-white font-bold rounded-full px-6 py-3.5 transition disabled:opacity-50 shadow-pop"
          >
            {submitting ? "제출 중…" : "제출 →"}
          </button>
        </div>

      </div>

      {/* 정답채점기준 모달 */}
      {showRubric && (
        <div onClick={() => setShowRubric(false)} className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl border border-ink-100 shadow-pop p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold tracking-tight">정답채점기준</h3>
              <button onClick={() => setShowRubric(false)} className="w-8 h-8 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 font-bold">×</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="bg-mint-50 rounded-xl p-3">
                <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-1">완전 정답</div>
                <p className="text-xs text-ink-700 leading-[1.6]">핵심 개념·키워드 모두 포함, 정확한 표현</p>
              </div>
              <div className="bg-sun-50 rounded-xl p-3">
                <div className="text-[10px] font-bold tracking-widest text-sun-600 mb-1">부분 정답</div>
                <p className="text-xs text-ink-700 leading-[1.6]">핵심 일부 + 논리 흐름은 맞음 (부분 점수)</p>
              </div>
              <div className="bg-peach-100 rounded-xl p-3">
                <div className="text-[10px] font-bold tracking-widest text-peach-500 mb-1">오답</div>
                <p className="text-xs text-ink-700 leading-[1.6]">핵심 누락 또는 개념 오류</p>
              </div>
              <div className="text-[10px] text-ink-500 pt-2 border-t border-ink-100">
                AI 채점 신뢰도 ≥ 0.75 자동 채점 / 미만은 인간 검토 라우팅
              </div>
            </div>
            <button onClick={() => setShowRubric(false)} className="w-full mt-5 bg-mint-600 hover:bg-mint-700 text-white font-bold py-3 rounded-full">
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
