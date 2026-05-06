// LLM 추상화 레이어 — Claude ↔ 로컬 LLM 스위칭 가능

export interface GenOpts {
  system?: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface LLMAdapter {
  generate(prompt: string, opts?: GenOpts): Promise<string>;
}

import { MockAdapter } from "./mock";
// import { ClaudeAdapter } from "./claude";  // 운영 시 활성화
// import { ExaoneAdapter } from "./exaone";  // 운영 시 활성화

export function getAdapter(): LLMAdapter {
  const provider = process.env.LLM_PROVIDER ?? "mock";
  switch (provider) {
    // case "claude": return new ClaudeAdapter();
    // case "exaone": return new ExaoneAdapter();
    case "mock":
    default:
      return new MockAdapter();
  }
}
