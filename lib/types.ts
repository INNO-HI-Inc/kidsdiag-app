// kidsdiag — 핵심 타입 정의

export type Subject = "math" | "korean";
export type Bloom = "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";

export interface ConceptNode {
  id: string;
  subject: Subject;
  grade: number; // 3~7
  name: string;
  bloom: Bloom;
  achievementStandard?: string;
  description: string;
}

export interface ConceptEdge {
  from: string;
  to: string;
  type: "prerequisite";
  strength: number; // 0~1
}

export interface ConceptGraph {
  version: string;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
}

export type ItemType = "multiple_choice" | "short_answer";

export interface Item {
  id: string;
  nodeId: string;
  subject: Subject;
  grade: number;
  type: ItemType;
  stem: string;
  choices?: string[]; // multiple_choice
  answer: string;
  explanation: string;
  difficulty: number; // 0~1 (0=very easy, 1=very hard)
  irt: { a: number; b: number; c: number };
  estimatedTimeSec: number;
  bloom: Bloom;
  status: "approved" | "pending" | "rejected";
}

export interface Response {
  itemId: string;
  answer: string;
  isCorrect: boolean;
  timeSpentSec: number;
  answerChanges: number;
  timestamp: number;
}

export interface DiagnosticSession {
  id: string;
  childId: string;
  status: "in_progress" | "paused" | "completed";
  startedAt: number;
  endedAt?: number;
  currentTheta: number;
  thetaHistory: number[];
  answeredItemIds: string[];
  responses: Response[];
  consecutiveWrongOnNode: Record<string, number>;
}

export interface MasteryWithCI {
  nodeId: string;
  mastery: number; // 0~1
  ci: [number, number];
}

export interface RootCause {
  weakNode: string;
  rootCause: string;
  path: string[];
  explanation: string;
}

export interface DiagnosticResult {
  sessionId: string;
  masteryByNode: MasteryWithCI[];
  rootCauses: RootCause[];
  overallMastery: number;
  durationMin: number;
  itemsCount: number;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  grade: number;
  consentLegalGuardian: boolean;
  pin: string;
  createdAt: number;
}

export interface Parent {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

export interface LearningStep {
  step: number;
  type: "concept_explanation" | "worked_example" | "practice" | "quick_check" | "ai_tutor";
  itemIds?: string[];
  estimatedMin: number;
  description: string;
}

export interface LearningSequence {
  nodeId: string;
  nodeName: string;
  priority: number;
  sequence: LearningStep[];
  estimatedTotalMin: number;
}

export interface TutorMessage {
  id: string;
  role: "student" | "tutor";
  content: string;
  timestamp: number;
  guardrailFlags?: { gate1?: string; gate2?: string; gate3?: string };
  hintStage?: 1 | 2 | 3 | 4 | 5;
}
