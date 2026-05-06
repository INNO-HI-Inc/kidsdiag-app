"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const ITEMS = [
  {
    subj: "수학", grade: "초5", topic: "분수의 덧셈",
    stem: "1/2 + 1/3 의 값을 구하시오.",
    choices: ["① 2/5", "② 5/6", "③ 1/6", "④ 2/6"],
    answer: "②",
    explain: "통분하면 1/2 = 3/6, 1/3 = 2/6 입니다. 따라서 3/6 + 2/6 = 5/6.",
    similar: ["1/3 + 1/4 = ?", "2/5 + 1/3 = ?", "1/2 + 2/5 = ?"],
  },
  {
    subj: "과학", grade: "초5", topic: "물질의 상태",
    stem: "다음 중 액체의 성질로 옳은 것은?",
    choices: ["① 모양이 일정하다", "② 부피가 일정하다", "③ 손으로 잡을 수 있다", "④ 모두 색이 있다"],
    answer: "②",
    explain: "액체는 담는 그릇에 따라 모양이 바뀌지만 부피는 일정합니다.",
    similar: ["고체의 성질은?", "기체의 부피 변화", "고체→액체 상태 변화"],
  },
  {
    subj: "국어", grade: "초5", topic: "독해 — 중심 생각",
    stem: "다음 글의 중심 생각으로 알맞은 것은?\n\n자전거를 타려면 균형이 중요하다. 처음에는 어렵지만 자꾸 연습하면 잘 탈 수 있다.",
    choices: ["① 자전거는 비싸다", "② 균형을 잡으려면 연습이 필요하다", "③ 자전거는 위험하다", "④ 어른은 잘 탄다"],
    answer: "②",
    explain: "글의 핵심은 '연습으로 균형을 잡을 수 있다'입니다.",
    similar: ["수영 배우기 글", "공부 습관 글", "운동 효과 글"],
  },
];

export default function PracticePage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const item = ITEMS[idx];
  const isCorrect = selected === item.answer;

  function next() {
    setIdx((idx + 1) % ITEMS.length);
    setSelected(null);
    setRevealed(false);
  }

  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white">
                <span className="w-1 h-1 rounded-full bg-lavender-500" />FUN-003
              </span>
              <span className="text-[10px] font-bold tracking-widest text-sky-700">향상교육 · 문항 풀이</span>
            </div>
            <span className="text-xs text-ink-600 tabular-nums">{idx + 1} / {ITEMS.length}</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-mint-50 text-mint-700">{item.subj}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-paper-grey text-ink-700">{item.grade}</span>
            <span className="text-xs text-ink-700">· {item.topic}</span>
          </div>
        </div>

        {/* 문항 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-8 mb-4">
          <h1 className="text-lg md:text-xl font-bold leading-[1.6] mb-6 whitespace-pre-line tracking-tight">
            {item.stem}
          </h1>

          <div className="space-y-2.5">
            {item.choices.map((c) => {
              const key = c.match(/^[①②③④]/)?.[0] ?? c[0];
              const sel = selected === key;
              const isAns = revealed && key === item.answer;
              const isWrong = revealed && sel && key !== item.answer;
              return (
                <button
                  key={c}
                  onClick={() => !revealed && setSelected(key)}
                  disabled={revealed}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium text-sm transition ${
                    isAns
                      ? "border-mint-500 bg-mint-50"
                      : isWrong
                      ? "border-peach-400 bg-peach-100"
                      : sel
                      ? "border-mint-500 bg-mint-600 text-white"
                      : "border-ink-100 bg-white hover:border-mint-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{c}</span>
                    {isAns && <span className="text-[10px] font-bold text-mint-700">정답</span>}
                    {isWrong && <span className="text-[10px] font-bold text-peach-500">오답</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 액션 */}
        {!revealed ? (
          <div className="flex gap-3">
            <button
              onClick={() => setRevealed(true)}
              disabled={!selected}
              className="flex-1 bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition disabled:opacity-50 shadow-pop"
            >
              제출 + 해설 보기
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 결과 */}
            <div className={`rounded-2xl border-2 p-5 ${isCorrect ? "border-mint-300 bg-mint-50" : "border-peach-200 bg-peach-100"}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-bold ${isCorrect ? "text-mint-700" : "text-peach-500"}`}>
                  {isCorrect ? "정답입니다" : "오답입니다"}
                </span>
                <span className="text-xs text-ink-600">정답: {item.answer}</span>
              </div>
            </div>

            {/* 해설 */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-2">해설</div>
              <p className="text-sm text-ink-800 leading-[1.7]">{item.explain}</p>
            </div>

            {/* 풀이 단계 */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-[10px] font-bold tracking-widest text-sky-700 mb-3">풀이 단계 (Socratic 5)</div>
              <ol className="space-y-1.5 text-sm text-ink-800">
                {["방향 — 무엇을 묻는 문제인지", "개념 — 핵심 개념 환기", "공식·방법 — 적용할 도구", "과정 — 단계별 풀이", "확인 — 검산"].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-paper-grey text-ink-700 text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            {/* 유사 문항 */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <div className="text-[10px] font-bold tracking-widest text-lavender-700 mb-3">유사 문항 (자동 매칭)</div>
              <div className="space-y-1.5">
                {item.similar.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-paper-grey">
                    <span className="text-[10px] font-bold text-ink-500 tabular-nums">#{i + 1}</span>
                    <span className="text-xs text-ink-800 flex-1">{s}</span>
                    <button className="text-[10px] font-semibold text-mint-700">풀어보기 →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 다음 */}
            <div className="flex gap-3">
              <Link href="/improvement" className="flex-1 text-center px-6 py-3.5 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 font-semibold transition">
                향상교육 홈
              </Link>
              <button onClick={next} className="flex-1 bg-mint-600 hover:bg-mint-700 text-white font-bold py-3.5 rounded-full transition shadow-pop">
                다음 문항 →
              </button>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
