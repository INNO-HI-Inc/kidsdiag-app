// kidsdiag — 데이터 로더 + 인메모리 스토어 (베타용, 운영시 DB로 교체)

import conceptGraphRaw from "@/data/concept_graph.json";
import itemsRaw from "@/data/items.json";
import type { ConceptGraph, Item, DiagnosticSession, ChildProfile, Parent, TutorMessage } from "@/lib/types";

export const conceptGraph: ConceptGraph = conceptGraphRaw as ConceptGraph;
export const itemsAll: Item[] = itemsRaw as Item[];

// === 인메모리 스토어 (글로벌 싱글톤) ===
declare global {
  // eslint-disable-next-line no-var
  var __kidsdiagStore: KidsdiagStore | undefined;
}

interface KidsdiagStore {
  parents: Map<string, Parent>;
  children: Map<string, ChildProfile>;
  sessions: Map<string, DiagnosticSession>;
  tutorMessages: Map<string, TutorMessage[]>; // sessionId → messages
}

function createStore(): KidsdiagStore {
  // 데모용 시드 데이터
  const demoParent: Parent = {
    id: "parent_demo",
    email: "demo@kidsdiag.dev",
    name: "데모 학부모",
    createdAt: Date.now(),
  };
  const demoChild: ChildProfile = {
    id: "child_demo",
    parentId: "parent_demo",
    name: "민지",
    grade: 5,
    consentLegalGuardian: true,
    pin: "0000",
    createdAt: Date.now(),
  };
  const parents = new Map<string, Parent>();
  parents.set(demoParent.id, demoParent);
  const children = new Map<string, ChildProfile>();
  children.set(demoChild.id, demoChild);
  return { parents, children, sessions: new Map(), tutorMessages: new Map() };
}

export const store: KidsdiagStore = global.__kidsdiagStore ?? (global.__kidsdiagStore = createStore());

// === 헬퍼 ===
export function getNodeById(id: string) {
  return conceptGraph.nodes.find((n) => n.id === id);
}

export function getPrerequisites(nodeId: string): string[] {
  return conceptGraph.edges.filter((e) => e.from === nodeId && e.type === "prerequisite").map((e) => e.to);
}

export function getItemsByNode(nodeId: string): Item[] {
  return itemsAll.filter((i) => i.nodeId === nodeId && i.status === "approved");
}
