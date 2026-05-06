import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GradingPage() {
  const submissions = [
    { id: "S-1247", student: "김민지", subj: "국어", q: "Q3 / 글의 중심 생각", answer: "균형이 중요하고 연습해야 한다", status: "대기", auto: 78 },
    { id: "S-1248", student: "이지훈", subj: "국어", q: "Q3 / 글의 중심 생각", answer: "자전거를 자주 타야 한다", status: "대기", auto: 42 },
    { id: "S-1249", student: "박서연", subj: "과학", q: "Q15 / 자유 서술", answer: "물체는 미는 방향으로 움직임", status: "대기", auto: 88 },
    { id: "S-1250", student: "최도현", subj: "국어 (논술)", q: "200자 논술", answer: "환경 보호는 우리 모두의 책임이다…", status: "검토중", auto: 65 },
    { id: "S-1245", student: "정유나", subj: "과학", q: "Q9 / 동물 분류", answer: "고래, 돌고래, 상어", status: "완료", auto: 71 },
  ];

  return (
    <main className="bg-paper-grey min-h-screen">
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold tracking-widest bg-mint-100 text-mint-700 px-2 py-0.5 rounded-full">FUN-001</span>
              <span className="eyebrow text-mint-700">답안 등록·채점</span>
            </div>
            <h1 className="h-section text-2xl">서술형 답안 수동 채점</h1>
            <div className="text-sm text-ink-600 mt-1">자동 채점 신뢰도 &lt; 0.75 항목은 인간 검토 라우팅</div>
          </div>
          <div className="flex gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-sun-100 text-sun-600">대기 23</span>
            <span className="px-3 py-1.5 rounded-full bg-sky-100 text-sky-700">검토중 4</span>
            <span className="px-3 py-1.5 rounded-full bg-mint-100 text-mint-700">완료 187</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-ink-100 overflow-hidden">
          <div className="px-6 py-3 bg-paper-grey border-b border-ink-100 grid grid-cols-12 gap-3 text-[10px] font-bold tracking-widest text-ink-600">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">학생</div>
            <div className="col-span-2">교과·문항</div>
            <div className="col-span-4">응답 답안</div>
            <div className="col-span-1 text-center">자동</div>
            <div className="col-span-1 text-center">상태</div>
            <div className="col-span-1 text-right">채점</div>
          </div>
          {submissions.map((s) => (
            <div key={s.id} className="px-6 py-4 grid grid-cols-12 gap-3 items-center border-b border-ink-100 last:border-0 hover:bg-paper-grey transition">
              <div className="col-span-1 text-xs font-mono text-ink-600">{s.id}</div>
              <div className="col-span-2 text-sm font-semibold">{s.student}</div>
              <div className="col-span-2 text-xs text-ink-700">
                <div className="font-semibold">{s.subj}</div>
                <div className="text-ink-500">{s.q}</div>
              </div>
              <div className="col-span-4 text-xs text-ink-700 italic line-clamp-2">"{s.answer}"</div>
              <div className="col-span-1 text-center">
                <span className={`text-xs font-bold tabular-nums ${s.auto >= 75 ? "text-mint-700" : s.auto >= 50 ? "text-sun-600" : "text-peach-500"}`}>
                  {s.auto}%
                </span>
              </div>
              <div className="col-span-1 text-center">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.status === "완료" ? "bg-mint-100 text-mint-700" : s.status === "검토중" ? "bg-sky-100 text-sky-700" : "bg-sun-100 text-sun-600"
                }`}>{s.status}</span>
              </div>
              <div className="col-span-1 text-right flex justify-end gap-1">
                <button className="w-8 h-8 rounded-lg bg-mint-50 text-mint-700 text-xs font-bold hover:bg-mint-100" title="정답">○</button>
                <button className="w-8 h-8 rounded-lg bg-peach-100 text-peach-500 text-xs font-bold hover:bg-peach-200" title="오답">×</button>
              </div>
            </div>
          ))}
        </div>

        {/* 채점 도구 */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-ink-100">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-2">RUBRIC · 정답채점기준</div>
            <ul className="space-y-1.5 text-xs text-ink-700">
              <li>· 완전 정답 — 핵심 키워드 모두 포함</li>
              <li>· 부분 정답 — 일부 키워드 + 논리 OK</li>
              <li>· 오답 — 핵심 누락 또는 개념 오류</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-ink-100">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-2">AI 신뢰도 정책</div>
            <div className="text-xs text-ink-700 leading-[1.6]">
              confidence &lt; 0.75 → 인간 검토 큐 자동 라우팅<br />
              ICC ≥ 0.80 목표 (인간 채점자 2인 vs AI)
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-ink-100">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-2">일괄 작업</div>
            <div className="space-y-1.5">
              <button className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-mint-50 text-mint-700 hover:bg-mint-100">선택 정답 처리</button>
              <button className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">CSV 내보내기</button>
            </div>
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
