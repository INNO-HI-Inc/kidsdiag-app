"use client";
import { useState, useEffect } from "react";

export default function A11yToggle() {
  const [open, setOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [tts, setTts] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (contrast) root.style.filter = "contrast(1.4)";
    else root.style.filter = "";
  }, [contrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "sm") root.style.fontSize = "14px";
    else if (fontSize === "lg") root.style.fontSize = "18px";
    else root.style.fontSize = "16px";
  }, [fontSize]);

  function speak() {
    if (!("speechSynthesis" in window)) return;
    if (tts) {
      window.speechSynthesis.cancel();
      setTts(false);
      return;
    }
    const text = document.body.innerText.slice(0, 500);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = 1;
    u.onend = () => setTts(false);
    window.speechSynthesis.speak(u);
    setTts(true);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 left-4 z-40 w-12 h-12 rounded-full bg-carbon-900 text-white shadow-pop flex items-center justify-center font-bold text-sm hover:scale-105 transition"
        aria-label="웹 접근성 설정"
        title="웹 접근성 설정"
      >
        A11y
      </button>

      {open && (
        <div className="fixed bottom-20 left-4 z-40 bg-white border border-ink-100 rounded-2xl shadow-pop p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-widest text-ink-700">웹 접근성 (WCAG 2.1)</span>
            <button onClick={() => setOpen(false)} className="w-6 h-6 rounded-full bg-paper-grey text-ink-700 text-xs font-bold">×</button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-1.5">글자 크기</div>
              <div className="grid grid-cols-3 gap-1">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`py-1.5 rounded-lg font-bold transition ${
                      fontSize === s ? "bg-mint-600 text-white" : "bg-paper-grey text-ink-700 hover:bg-ink-100"
                    } ${s === "sm" ? "text-xs" : s === "lg" ? "text-base" : "text-sm"}`}
                  >
                    가
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setContrast(!contrast)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg transition ${
                contrast ? "bg-mint-50 border-2 border-mint-300" : "bg-paper-grey border-2 border-transparent hover:bg-ink-100"
              }`}
            >
              <span className="text-xs font-bold">고대비 모드</span>
              <span className={`w-8 h-4 rounded-full relative transition ${contrast ? "bg-mint-500" : "bg-ink-300"}`}>
                <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${contrast ? "left-4" : "left-0.5"}`} />
              </span>
            </button>

            <button
              onClick={speak}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg transition ${
                tts ? "bg-mint-50 border-2 border-mint-300" : "bg-paper-grey border-2 border-transparent hover:bg-ink-100"
              }`}
            >
              <span className="text-xs font-bold">화면 읽기 (TTS)</span>
              <span className={`w-8 h-4 rounded-full relative transition ${tts ? "bg-mint-500" : "bg-ink-300"}`}>
                <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${tts ? "left-4" : "left-0.5"}`} />
              </span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-ink-100 text-[10px] text-ink-500 leading-[1.5]">
            한국형 웹 콘텐츠 접근성 지침 2.1 준수
          </div>
        </div>
      )}
    </>
  );
}
