import Link from "next/link";

export function generateStaticParams() {
  return [{ childId: "child_demo" }];
}

export const dynamicParams = false;

const SUBJECTS = [
  { name: "국어", pre: 71, post: 85, percentile: 35, dot: "bg-lavender-500", text: "text-lavender-700", bg: "bg-lavender-50" },
  { name: "과학", pre: 65, post: 81, percentile: 42, dot: "bg-sky-500", text: "text-sky-700", bg: "bg-sky-50" },
  { name: "수학", pre: 78, post: 78, percentile: 28, dot: "bg-mint-500", text: "text-mint-700", bg: "bg-mint-50" },
  { name: "통합사고력", pre: 82, post: 82, percentile: 22, dot: "bg-sun-500", text: "text-sun-600", bg: "bg-sun-50" },
];

const TALENTS = [
  { name: "수리·논리", measured: true, score: 82, x: 50, y: 8 },
  { name: "자연·생태", measured: true, score: 65, x: 80, y: 25 },
  { name: "공간·시각", measured: true, score: 71, x: 92, y: 50 },
  { name: "언어·기호", measured: true, score: 76, x: 80, y: 75 },
  { name: "자기·성찰", measured: true, score: 58, x: 50, y: 92 },
  { name: "음향·리듬", measured: false, score: 0, x: 20, y: 75 },
  { name: "신체·운동", measured: false, score: 0, x: 8, y: 50 },
  { name: "사회·관계", measured: false, score: 0, x: 20, y: 25 },
];

export default function ParentReportPage() {
  const overall = Math.round(SUBJECTS.reduce((a, b) => a + b.post, 0) / SUBJECTS.length);
  const top2 = [...TALENTS].filter(t => t.measured).sort((a, b) => b.score - a.score).slice(0, 2);

  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      {/* 컴팩트 헤더 */}
      <header className="border-b border-ink-100 bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-ink-700 hover:text-ink-900">← 홈</Link>
          <div className="text-[11px] font-bold tracking-widest text-mint-700">학부모 리포트 PDF (3페이지)</div>
          <button className="text-xs font-bold text-mint-700 hover:text-mint-900">PDF 다운로드 ↓</button>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-6">
        {/* PDF 페이지 1 — 학력 결과 */}
        <article className="bg-white border border-ink-100 rounded-2xl shadow-card p-5 md:p-7 lg:p-9 mb-6 relative">
          <div className="absolute top-4 right-5 text-[10px] font-bold tracking-widest text-ink-400">P. 1 / 3</div>

          <div className="mb-6">
            <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-1">학력 결과 · 전면</div>
            <h1 className="text-xl font-bold tracking-tight">홍길동 학생 학력 진단 결과</h1>
            <div className="text-xs text-ink-600 mt-1">초5 · 제닉스초 5-3 · 사전 진단 · 2026.05.06</div>
          </div>

          {/* 종합 점수 */}
          <div className="flex items-end gap-6 mb-6 pb-6 border-b border-ink-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-1">종합 마스터리</div>
              <div className="text-5xl font-bold text-mint-700 tabular-nums leading-none">{overall}<span className="text-2xl text-mint-500">%</span></div>
            </div>
            <div className="flex-1 pb-2">
              <div className="text-xs text-ink-700 mb-1">전국 분포 내 위치</div>
              <div className="relative h-2 bg-paper-grey rounded-full">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint-300 to-mint-600 rounded-full" style={{ width: "68%" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mint-700 border-2 border-white shadow" style={{ left: "calc(68% - 8px)" }} />
              </div>
              <div className="text-[10px] text-ink-600 mt-1">상위 32% · 또래 평균 67%</div>
            </div>
          </div>

          {/* 교과별 성취수준 */}
          <div className="mb-6">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-3">교과별 성취수준</div>
            <div className="space-y-3">
              {SUBJECTS.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-20 text-sm font-bold">{s.name}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-paper-grey rounded-full overflow-hidden">
                      <div className={`h-full ${s.dot} rounded-full`} style={{ width: `${s.post}%` }} />
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-bold tabular-nums">{s.post}%</div>
                  <div className="w-16 text-right text-[10px] text-ink-600 tabular-nums">상위 {s.percentile}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* 부진 영역 학습 가이드 (3줄) */}
          <div>
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-2">부진 영역 학습 가이드</div>
            <ol className="space-y-1.5 text-sm">
              <li className="flex gap-2"><span className="text-sky-700 font-bold">①</span> <span><strong>과학 분류·인과</strong> — 관찰·발견 → 추론 단계 강화 필요. 동영상 강의 5편 추천.</span></li>
              <li className="flex gap-2"><span className="text-lavender-700 font-bold">②</span> <span><strong>국어 어휘</strong> — 3·4학년군 생활 어휘 보강. 매일 10분 읽기 권장.</span></li>
              <li className="flex gap-2"><span className="text-mint-700 font-bold">③</span> <span><strong>수학 분수의 덧셈</strong> — 통분 개념 점검 후 분수 덧셈 연습 진행.</span></li>
            </ol>
          </div>
        </article>

        {/* PDF 페이지 2 — 재능 프로필 */}
        <article className="bg-white border border-ink-100 rounded-2xl shadow-card p-5 md:p-7 lg:p-9 mb-6 relative">
          <div className="absolute top-4 right-5 text-[10px] font-bold tracking-widest text-ink-400">P. 2 / 3</div>

          <div className="mb-6">
            <div className="text-[10px] font-bold tracking-widest text-lavender-700 mb-1">재능 프로필 · 프리뷰</div>
            <h2 className="text-xl font-bold tracking-tight">8개 재능 중 5개 측정</h2>
            <div className="text-xs text-ink-600 mt-1">나머지 3개는 GeniusX 심화 진단에서 별도 측정</div>
          </div>

          {/* 레이더 + 리스트 */}
          <div className="grid md:grid-cols-2 gap-6 items-center mb-5">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full max-w-[220px]">
                <polygon points="50,8 80,25 92,50 80,75 50,92 20,75 8,50 20,25" fill="none" stroke="#d4b6f7" strokeWidth="0.5" strokeDasharray="1,1" />
                <polygon points="50,21 71,33 79,50 71,67 50,79 29,67 21,50 29,33" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />
                <polygon points="50,33 62,40 67,50 62,60 50,67 38,60 33,50 38,40" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />
                <polygon
                  points={TALENTS.filter(t => t.measured).map(t => {
                    const r = t.score / 100;
                    return `${50 + (t.x - 50) * r},${50 + (t.y - 50) * r}`;
                  }).join(" ")}
                  fill="#9f7aea" fillOpacity="0.3" stroke="#9f7aea" strokeWidth="0.8"
                />
                {TALENTS.map((t, i) => (
                  <circle key={i} cx={t.x} cy={t.y} r="1.8" fill={t.measured ? "#9f7aea" : "#cbd5e0"} stroke="white" strokeWidth="0.5" />
                ))}
              </svg>
            </div>
            <div className="space-y-1.5">
              {TALENTS.map((t) => (
                <div key={t.name} className={`flex items-center gap-2 ${!t.measured && "opacity-50"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${t.measured ? "bg-lavender-500" : "bg-ink-300"}`} />
                  <span className="flex-1 text-xs font-semibold">{t.name}</span>
                  {t.measured ? (
                    <span className="text-xs font-bold tabular-nums text-lavender-700">{t.score}점</span>
                  ) : (
                    <span className="text-[10px] text-ink-500">심화에서 측정</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 상위 2 해설 */}
          <div className="border-t border-ink-100 pt-5">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-3">강점 재능 (상위 2)</div>
            <div className="space-y-2.5">
              {top2.map((t) => (
                <div key={t.name} className="bg-lavender-50 rounded-xl p-3 flex items-start gap-3">
                  <span className="text-xs font-bold tabular-nums bg-lavender-500 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">{t.score}</span>
                  <div>
                    <div className="text-sm font-bold text-lavender-700 mb-0.5">{t.name}</div>
                    <div className="text-[11px] text-ink-700 leading-[1.6]">
                      {t.name === "수리·논리" && "패턴 인식·계산력이 또래 평균보다 높습니다. 응용 문제·논리 퍼즐로 강점을 키워보세요."}
                      {t.name === "언어·기호" && "독해·어휘 표현이 안정적입니다. 다양한 글 읽기와 글쓰기로 더욱 발전시킬 수 있습니다."}
                      {t.name === "공간·시각" && "도형 변환 능력이 좋습니다. 모형·그림 자료로 심화 학습을 권장합니다."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* PDF 페이지 3 — 심화 진단 안내 */}
        <article className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-2xl shadow-pop p-5 md:p-7 lg:p-9 mb-6 relative overflow-hidden">
          <div className="absolute top-4 right-5 text-[10px] font-bold tracking-widest text-white/40">P. 3 / 3</div>
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />

          <div className="relative">
            <div className="mb-5">
              <div className="text-[10px] font-bold tracking-widest text-accent-500 mb-1">GeniusX · 심화 진단 안내</div>
              <h2 className="text-xl font-bold tracking-tight">발현 조건 3차원 + 21세기 역량 4차원</h2>
              <div className="text-xs text-white/70 mt-1">본 검사에서 측정되지 않은 음향·신체·사회 재능까지 입체 분석</div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-5">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-accent-500 mb-2">발현 조건 3차원</div>
                <ul className="space-y-1.5 text-xs">
                  {["F1 · 실행·주의·메타인지", "F2 · 동기·탐구·혁신", "F3 · 성향·기질·웰빙"].map((t) => (
                    <li key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-500" />{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest text-accent-500 mb-2">21세기 역량 4차원</div>
                <ul className="space-y-1.5 text-xs">
                  {["디지털·AI 역량", "문화 지능", "실용 상황 지능", "창의 혁신"].map((t) => (
                    <li key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-500" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
              {["게임화 수행평가", "포트폴리오 평가", "교사·학부모 평정", "진로·교육 설계 보고서"].map((t) => (
                <div key={t} className="bg-white/10 rounded-lg p-2.5 text-[10px] font-semibold text-center">{t}</div>
              ))}
            </div>

            <button className="w-full bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold py-3 rounded-full transition">
              심화 진단 사전 신청
            </button>
          </div>
        </article>

        {/* 푸터 안내 */}
        <div className="text-[10px] text-ink-500 text-center leading-[1.7] mb-6">
          본 리포트는 PDF 3페이지로 다운로드 가능합니다 · 온라인 대시보드에서 시점별 변화 추적 가능<br />
          5년 보관 후 자동 파기 · 익명 ID 사용 · IRB 심의 (서울교대 박민구 교수 책임 체제)
        </div>

        {/* 액션 */}
        <div className="grid grid-cols-2 gap-2">
          <Link href="/parent/report/child_demo" className="bg-white border border-ink-100 rounded-xl py-3 text-center text-xs font-bold hover:border-mint-300">
            온라인 대시보드 →
          </Link>
          <Link href="/mypage" className="bg-mint-600 text-white rounded-xl py-3 text-center text-xs font-bold hover:bg-mint-700">
            PDF 다운로드
          </Link>
        </div>
      </section>
    </main>
  );
}
