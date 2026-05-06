// AI 튜터 3중 가드레일

const PROFANITY = ["바보", "멍청이", "병신"]; // 데모용 최소 사전
const SAFETY_KEYWORDS = ["죽고 싶", "자살", "자해", "죽어버리", "맞았어", "괴롭힘", "왕따"];
const PHONE_REGEX = /(?:01[016789]|070|02|0\d{2})[-\s]?\d{3,4}[-\s]?\d{4}/;
const RRN_REGEX = /\d{6}[-\s]?[1-4]\d{6}/;

export type GuardrailFlag =
  | { gate: "input"; type: "profanity" | "phone" | "rrn" | "safety_signal"; severity: "low" | "high" }
  | { gate: "output"; type: "answer_leak" | "inappropriate"; severity: "low" | "high" }
  | { gate: "final"; type: "answer_leak"; retried: number; fallback: boolean };

/** Gate 1 — 입력 필터 */
export function gate1Input(message: string): GuardrailFlag | null {
  for (const k of SAFETY_KEYWORDS) {
    if (message.includes(k)) return { gate: "input", type: "safety_signal", severity: "high" };
  }
  if (PHONE_REGEX.test(message)) return { gate: "input", type: "phone", severity: "low" };
  if (RRN_REGEX.test(message)) return { gate: "input", type: "rrn", severity: "high" };
  for (const w of PROFANITY) {
    if (message.includes(w)) return { gate: "input", type: "profanity", severity: "low" };
  }
  return null;
}

/** Gate 1 자해/학대 신호일 때의 표준 응답 */
export const SAFETY_RESPONSE = `선생님이 너의 마음이 걱정돼.
혼자 힘들어하지 말고 어른에게 꼭 말해줘.

언제든 전화할 수 있는 곳:
• 청소년상담 1388 (24시간 무료)
• 부모님이나 학교 선생님

지금 부모님께도 알려드릴게.`;

/** Gate 2 — 응답 검증 (정답 직접 노출, 부적절 콘텐츠) */
export function gate2Output(response: string, currentAnswer?: string): GuardrailFlag | null {
  if (currentAnswer && response.includes(currentAnswer)) {
    return { gate: "output", type: "answer_leak", severity: "high" };
  }
  // 추가 검사: 정답을 직접 알려줘 류 패턴
  if (/(답은|정답은)\s*[\d/]+/.test(response)) {
    return { gate: "output", type: "answer_leak", severity: "high" };
  }
  return null;
}

/** Gate 3 — final-stage 정답 누설 검출 */
export function gate3FinalLeak(response: string, currentAnswer?: string): boolean {
  if (!currentAnswer) return false;
  if (response.includes(currentAnswer)) return true;
  // 숫자 답 추출 후 매칭
  const numMatch = currentAnswer.match(/(\d+(?:\/\d+)?(?:\.\d+)?)/);
  if (numMatch) {
    const numAnswer = numMatch[1];
    if (response.includes(numAnswer)) return true;
  }
  return false;
}

export const FALLBACK_RESPONSE = "조금 더 생각해볼래? 어디까지 풀어봤는지 보여주면 도와줄게!";
