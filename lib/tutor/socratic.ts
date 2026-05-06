// Socratic 5단계 점진적 힌트

export type HintStage = 1 | 2 | 3 | 4 | 5;

export const STAGE_DESC: Record<HintStage, string> = {
  1: "방향 제시 — 어떤 종류의 문제인지 인식시키기",
  2: "개념 환기 — 핵심 개념을 학생이 떠올리게 질문",
  3: "부분 공식 — 첫 단계만 함께",
  4: "과정 안내 — 단계별 진행",
  5: "확인 질문 — 학생이 답을 말하게",
};

export function determineNextStage(currentStage: HintStage, studentMessage: string): HintStage {
  const m = studentMessage.toLowerCase();
  // 완전히 모름 신호
  if (m.includes("모르겠") || m.includes("어려워") || m.length < 10) {
    return Math.max(1, currentStage - 1) as HintStage;
  }
  // 답을 알아낸 신호
  if (/[\d/]+/.test(m) && (m.includes("=") || m.includes("답"))) {
    return 5;
  }
  // 진전이 있는 신호
  if (m.includes("그러면") || m.includes("아하") || m.includes("이해") || m.includes("알겠")) {
    return Math.min(5, currentStage + 1) as HintStage;
  }
  return currentStage;
}

export function buildHintPrompt(stage: HintStage, itemStem: string, studentMessage: string): string {
  return `hint_stage:${stage}
item: ${itemStem}
student: ${studentMessage}
스테이지: ${STAGE_DESC[stage]}
지시: 정답을 직접 알려주지 말고 위 스테이지에 맞게 한 줄 한국어로 친근하게 답하세요.`;
}
