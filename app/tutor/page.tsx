"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IconChat, IconArrowRight } from "@/components/icons";

interface Msg { role: "student" | "tutor"; content: string; flag?: string; }

const SAMPLE_ITEM_STEM = "1/2 + 1/3을 계산해보세요.";
const SAMPLE_ITEM_ANSWER = "5/6";

export default function TutorPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "tutor", content: `안녕! 오늘은 분수 덧셈을 같이 풀어볼까?\n문제: ${SAMPLE_ITEM_STEM}\n어떻게 시작해볼래?` },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    const content = input.trim();
    if (!content || sending) return;
    setMessages((m) => [...m, { role: "student", content }]);
    setInput("");
    setSending(true);

    // 정적 export 데모: Socratic 5단계 힌트를 클라이언트에서 모의 응답
    const mockReplies: Record<number, { response: string; nextStage?: number }> = {
      1: { response: "좋아요! 분모가 다른 두 분수를 더할 때, 가장 먼저 무엇을 해야 할까?", nextStage: 2 },
      2: { response: "맞아요! 분모를 같게 만드는 걸 통분이라고 해요. 1/2과 1/3의 공통 분모는?", nextStage: 3 },
      3: { response: "그렇죠. 6이에요. 그러면 1/2은 6분의 몇이 될까?", nextStage: 4 },
      4: { response: "정확해요. 1/2 = 3/6. 그럼 1/3은 6분의 몇?", nextStage: 5 },
      5: { response: "잘했어요! 3/6 + 2/6은 이제 더하기만 하면 돼요. 답이 뭘까요?", nextStage: 5 },
    };
    setTimeout(() => {
      const reply = mockReplies[stage] ?? mockReplies[1];
      setMessages((m) => [...m, { role: "tutor", content: reply.response }]);
      if (reply.nextStage) setStage(reply.nextStage as 1 | 2 | 3 | 4 | 5);
      setSending(false);
    }, 600);
  }

  const stageLabels = ["방향 제시", "개념 환기", "부분 공식", "과정 안내", "확인 질문"];

  return (
    <main className="min-h-screen bg-paper-mint flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-mint-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-mint-500 flex items-center justify-center text-white">
              <IconChat size={18} />
            </div>
            <div>
              <div className="font-bold text-ink-900">AI 친구 튜터</div>
              <div className="text-[11px] text-ink-500 font-normal">정답 직답 X · 부모님이 대화를 볼 수 있어요</div>
            </div>
          </div>
          <Link href="/" className="text-sm text-mint-700 hover:underline font-semibold">처음으로</Link>
        </div>

        {/* Progress stages */}
        <div className="max-w-3xl mx-auto px-6 pb-3">
          <div className="flex gap-1.5">
            {stageLabels.map((l, i) => (
              <div key={l} className="flex-1">
                <div className={`h-1 rounded-full transition-all ${i + 1 <= stage ? "bg-mint-500" : "bg-mint-100"}`} />
                <div className={`text-[10px] mt-1 text-center font-semibold ${i + 1 <= stage ? "text-mint-700" : "text-ink-400"}`}>
                  {i + 1}단계
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 max-w-3xl w-full mx-auto px-6 py-6 overflow-y-auto">
        {/* CURRENT QUESTION */}
        <div className="bg-white border border-sun-100 rounded-3xl p-4 mb-5 shadow-card">
          <div className="eyebrow text-sun-600 mb-1.5">풀고 있는 문제</div>
          <div className="font-semibold text-ink-900">{SAMPLE_ITEM_STEM}</div>
        </div>

        <div className="space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === "student" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  m.role === "student"
                    ? "bg-mint-500 text-white rounded-tr-sm font-medium"
                    : "bg-white border border-mint-100 text-ink-900 rounded-tl-sm font-normal"
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.content}</div>
                {m.flag && (
                  <div className={`mt-2 text-[11px] font-semibold ${m.role === "student" ? "opacity-90" : "text-sun-700"}`}>
                    {m.flag}
                  </div>
                )}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-white border border-mint-100 rounded-2xl rounded-tl-sm px-4 py-3 text-ink-400 font-medium">
                생각 중…
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT */}
      <div className="bg-white border-t border-mint-100">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="어디가 막혔는지 적어볼까?"
              className="flex-1 px-4 py-3 rounded-full border-2 border-mint-100 focus:border-mint-500 outline-none font-medium"
              disabled={sending}
            />
            <button onClick={send} disabled={sending || !input.trim()} className="btn-primary !px-6 !py-3">
              <IconArrowRight size={18} />
            </button>
          </div>
          <div className="mt-2 text-[11px] text-ink-500 text-center font-normal">
            현재 힌트 단계 {stage}/5 · {stageLabels[stage - 1]}
          </div>
        </div>
      </div>
    </main>
  );
}
