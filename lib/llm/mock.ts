// Mock LLM Adapter — API 키 없이 로컬에서 데모 가능

import type { LLMAdapter, GenOpts } from "./adapter";

export class MockAdapter implements LLMAdapter {
  async generate(prompt: string, _opts?: GenOpts): Promise<string> {
    // 단계적 힌트 패턴 매칭 (Socratic)
    if (prompt.includes("hint_stage:1")) {
      return "이 문제는 분수 통분 문제야! 먼저 어떤 개념이 필요한지 떠올려볼래?";
    }
    if (prompt.includes("hint_stage:2")) {
      return "통분이 뭐였는지 기억나? 분모를 같게 만드는 거야. 어떻게 하면 같아질까?";
    }
    if (prompt.includes("hint_stage:3")) {
      return "두 분모의 공통 배수를 찾으면 돼. 1/2와 1/3이라면 분모를 무엇으로 만들면 좋을까?";
    }
    if (prompt.includes("hint_stage:4")) {
      return "분모가 6이라면 1/2 = 3/6, 1/3 = 2/6이 돼. 이제 더하면?";
    }
    if (prompt.includes("hint_stage:5")) {
      return "거의 다 왔어! 분자만 더해보면 어떻게 될까?";
    }

    // 기본 응답
    return "어디가 어려운지 좀 더 자세히 말해줄래? 어떤 부분에서 막혔어?";
  }
}
