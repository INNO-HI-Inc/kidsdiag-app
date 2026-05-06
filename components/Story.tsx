"use client";
import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@/components/icons";

interface StoryProps {
  slides: React.ReactNode[];
  onComplete?: () => void;
  finalAction?: React.ReactNode; // last slide CTA
}

/* 카드뉴스/스토리형 슬라이드 — 한 화면 한 인사이트 */
export default function Story({ slides, finalAction }: StoryProps) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;
  const isLast = idx === total - 1;
  const isFirst = idx === 0;

  function go(n: number, dir: "next" | "prev") {
    setDirection(dir);
    setIdx(Math.max(0, Math.min(total - 1, n)));
  }
  const next = () => go(idx + 1, "next");
  const prev = () => go(idx - 1, "prev");

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  // Swipe
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchStartX.current = null;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper-grey">
      {/* TOP — 진척 도트 */}
      <header className="bg-white border-b border-ink-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
          <button onClick={prev} disabled={isFirst} className="text-sm text-ink-600 font-semibold disabled:opacity-30 hover:text-mint-600 transition px-2">
            ← 이전
          </button>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? "next" : "prev")}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-carbon-900" : i < idx ? "w-4 bg-mint-500" : "w-4 bg-ink-200"}`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-sm text-ink-700 font-bold tabular-nums w-14 text-right">
            {idx + 1} / {total}
          </div>
        </div>
      </header>

      {/* SLIDE */}
      <div
        className="flex-1 flex items-center justify-center px-4 md:px-6 py-6 md:py-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div key={idx} className="w-full max-w-3xl animate-fade-in">
          {slides[idx]}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bg-white border-t border-ink-100 px-4 md:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="text-[11px] text-ink-500 font-medium hidden sm:block">
            ← → 키 또는 좌우 스와이프
          </div>
          {isLast && finalAction ? (
            <div className="flex-1 sm:flex-initial sm:ml-auto">{finalAction}</div>
          ) : (
            <button
              onClick={next}
              disabled={isLast}
              className="flex-1 sm:flex-initial sm:ml-auto bg-mint-600 hover:bg-mint-700 text-white font-semibold rounded-full px-7 py-4 inline-flex items-center justify-center gap-2 shadow-pop transition disabled:opacity-50"
            >
              다음 <IconArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
