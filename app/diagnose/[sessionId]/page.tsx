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
  const [blockIdx, setBlockIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
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

  // ===== INTRO =====
  if (step === "intro") {
    return (
      <main className="min-h-screen bg-paper flex items-center py-8">
        <div className="max-w-2xl mx-auto px-6 w-full">
          <div className="text-center mb-8">
            <div className="eyebrow text-mint-600 mb-3">진단 시작 전 안내</div>
            <h1 className="h-section text-3xl mb-3">총 <span className="text-mint-600">57문항 · 45분</span></h1>
            <p className="text-sm text-ink-700 leading-[1.7]">
              4개 교과 블록이 자동으로 이어집니다.<br />
              일시정지 가능 · 자동 저장 · 틀려도 점수 차감 없음
            </p>
          </div>

          <div className="bg-white border-2 border-mint-100 rounded-2xl p-6 mb-6 space-y-3">
            {[
              "모르면 '잘 모르겠어요'를 눌러도 괜찮아요",
              "한 번 답하면 이전 문제로 돌아갈 수 없어요",
              "잠깐 쉬어도 OK — 자동으로 저장됩니다",
              "응답·풀이시간·답 변경 횟수가 기록되어 정확한 진단에 사용됩니다",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-ink-800">
                <span className="w-5 h-5 rounded-full bg-mint-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {BLOCKS.map((b, i) => (
              <div key={b.id} className={`${b.color.bg} rounded-xl p-3 text-center`}>
                <div className={`text-[9px] font-bold tracking-widest ${b.color.text}`}>BLOCK {i + 1}</div>
                <div className="text-xs font-bold mt-1">{b.short}</div>
                <div className="text-[10px] text-ink-600 mt-0.5 tabular-nums">{b.totalQ}문항</div>
              </div>
            ))}
          </div>

          <button onClick={startTest} className="w-full bg-mint-600 hover:bg-mint-700 text-white font-bold rounded-full py-4 text-base shadow-pop transition">
            검사 시작 →
          </button>
        </div>
      </main>
    );
  }

  // ===== PAUSED =====
  if (paused) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper-grey p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center border-2 border-mint-200">
          <div className="text-4xl mb-4">⏸</div>
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
              ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
              <button onClick={() => setPaused(true)} className="ml-2 w-7 h-7 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold flex items-center justify-center">⏸</button>
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
        <div className={`${block.color.bg} rounded-2xl p-3 mb-4 inline-block`}>
          <span className={`text-[10px] font-bold tracking-widest ${block.color.text}`}>{block.short.toUpperCase()}</span>
        </div>

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

        <p className="mt-4 text-[11px] text-center text-ink-500">
          틀려도 점수 차감 없음 · 차분히 풀어주세요
        </p>
      </div>
    </main>
  );
}
