import Link from "next/link";

export function generateStaticParams() {
  return [{ sessionId: "demo" }];
}

export const dynamicParams = false;

const SUBJECTS = [
  { name: "국어", short: "국어", pre: 71, post: 85, percentile: 35, dot: "bg-lavender-500", text: "text-lavender-700", bg: "bg-lavender-50" },
  { name: "과학", short: "과학", pre: 65, post: 81, percentile: 42, dot: "bg-sky-500", text: "text-sky-700", bg: "bg-sky-50" },
  { name: "수학", short: "수학", pre: 78, post: 78, percentile: 28, dot: "bg-mint-500", text: "text-mint-700", bg: "bg-mint-50" },
  { name: "통합사고력", short: "통합", pre: 82, post: 82, percentile: 22, dot: "bg-sun-500", text: "text-sun-600", bg: "bg-sun-50" },
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

export default function ResultPage() {
  const overall = Math.round(SUBJECTS.reduce((a, b) => a + b.post, 0) / SUBJECTS.length);
  const top2 = [...TALENTS].filter(t => t.measured).sort((a, b) => b.score - a.score).slice(0, 2);

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      {/* 컴팩트 헤더 */}
      <header className="border-b border-ink-100 bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/mypage" className="text-sm text-ink-700 hover:text-ink-900">← 마이페이지</Link>
          <div className="text-[11px] font-bold tracking-widest text-mint-700">진단 결과</div>
          <button className="text-xs text-ink-600 hover:text-ink-900">PDF</button>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-5 py-8 pb-16">
        {/* HERO — 종합 점수 */}
        <div className="text-center mb-8">
          <div className="text-sm text-ink-600 mb-3">홍길동 · 초5 · 사전 진단 · 2026.05.06</div>
          <div className="relative inline-block">
            <div className="text-7xl md:text-8xl font-bold text-mint-700 tabular-nums leading-none tracking-tight">
              {overall}
              <span className="text-3xl text-mint-500 ml-1">%</span>
            </div>
          </div>
          <div className="mt-4 text-base text-ink-700">
            전국 분포 <strong className="text-ink-900">상위 32%</strong>
          </div>
          <div className="mt-1 text-xs text-ink-500">또래 평균 67% · 반 평균 71%</div>
        </div>

        {/* 4교과 결과 — 토스 스타일 카드 */}
        <div className="bg-white border border-ink-100 rounded-3xl p-5 mb-4">
          <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-4">교과별 결과</div>
          <div className="space-y-4">
            {SUBJECTS.map((s) => {
              const gain = s.post - s.pre;
              return (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-20 flex-shrink-0">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-sm font-bold">{s.short}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-600">상위 {s.percentile}%</span>
                      <span className="font-bold text-ink-900 tabular-nums">{s.post}%</span>
                    </div>
                    <div className="h-2 bg-paper-grey rounded-full overflow-hidden">
                      <div className={`h-full ${s.dot} rounded-full transition-all`} style={{ width: `${s.post}%` }} />
                    </div>
                  </div>
                  <div className={`text-xs font-bold tabular-nums w-12 text-right ${gain > 0 ? s.text : "text-ink-400"}`}>
                    {gain > 0 ? `+${gain}p` : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 랭킹·진도 */}
        <div className="bg-white border border-ink-100 rounded-3xl p-5 mb-4">
          <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-4">랭킹 · 진도</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "반 내 (5-3)", v: "5위 / 27명", c: "text-mint-700" },
              { l: "학교 내 (5학년)", v: "12위 / 87명", c: "text-sky-700" },
              { l: "학년 진도", v: "7급 / 10급", c: "text-lavender-700" },
              { l: "전국 백분위", v: "상위 32%", c: "text-sun-600" },
            ].map((r) => (
              <div key={r.l} className="bg-paper-grey rounded-xl p-3">
                <div className="text-[10px] text-ink-600 mb-0.5">{r.l}</div>
                <div className={`text-sm font-bold ${r.c}`}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 재능 프로필 */}
        <div className="bg-white border border-ink-100 rounded-3xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold tracking-widest text-lavender-700">재능 프로필</div>
            <span className="text-[10px] font-semibold text-ink-500">5 측정 + 3 미발현</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5 items-center">
            {/* 레이더 */}
            <div className="flex items-center justify-center bg-lavender-50 rounded-2xl p-5">
              <svg viewBox="0 0 100 100" className="w-full max-w-[200px]">
                <polygon points="50,8 80,25 92,50 80,75 50,92 20,75 8,50 20,25" fill="none" stroke="#d4b6f7" strokeWidth="0.5" strokeDasharray="1,1" />
                <polygon points="50,21 71,33 79,50 71,67 50,79 29,67 21,50 29,33" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />
                <polygon points="50,33 62,40 67,50 62,60 50,67 38,60 33,50 38,40" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />
                <polygon
                  points={TALENTS.filter(t => t.measured).map(t => {
                    const r = t.score / 100;
                    const cx = 50, cy = 50;
                    const dx = (t.x - cx) * r;
                    const dy = (t.y - cy) * r;
                    return `${cx + dx},${cy + dy}`;
                  }).join(" ")}
                  fill="#9f7aea"
                  fillOpacity="0.3"
                  stroke="#9f7aea"
                  strokeWidth="0.8"
                />
                {TALENTS.map((t, i) => (
                  <circle key={i} cx={t.x} cy={t.y} r="1.8" fill={t.measured ? "#9f7aea" : "#cbd5e0"} stroke="white" strokeWidth="0.5" />
                ))}
              </svg>
            </div>

            {/* 8개 리스트 */}
            <div className="space-y-1.5">
              {TALENTS.map((t) => (
                <div key={t.name} className={`flex items-center gap-2.5 ${!t.measured && "opacity-50"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${t.measured ? "bg-lavender-500" : "bg-ink-300"}`} />
                  <span className="flex-1 text-xs font-semibold">{t.name}</span>
                  {t.measured ? (
                    <span className="text-xs font-bold tabular-nums text-lavender-700">{t.score}</span>
                  ) : (
                    <span className="text-[10px] text-ink-500">심화</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 상위 2 해설 */}
          <div className="mt-5 pt-5 border-t border-ink-100">
            <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-3">강점 재능</div>
            <div className="space-y-2">
              {top2.map((t) => (
                <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl bg-lavender-50">
                  <span className="text-xs font-bold tabular-nums bg-lavender-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{t.score}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-lavender-700">{t.name}</div>
                    <div className="text-[11px] text-ink-700 leading-[1.5]">
                      {t.name === "수리·논리" && "패턴 인식·계산력이 또래 평균보다 높습니다. 응용 문제로 강점을 키워보세요."}
                      {t.name === "언어·기호" && "독해·어휘 표현이 안정적입니다. 다양한 글 읽기로 확장해보세요."}
                      {t.name === "공간·시각" && "도형 변환 능력이 좋습니다. 모형·그림 자료로 심화 학습을 권장합니다."}
                      {t.name === "자연·생태" && "관찰·분류 사고가 강합니다. 탐구형 학습이 잘 맞습니다."}
                      {t.name === "자기·성찰" && "측정 객관성·오류 인식이 뛰어납니다."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 윤리 메시지 */}
          <div className="mt-4 text-[11px] text-ink-600 leading-[1.6] bg-paper-grey rounded-xl p-3">
            점수가 낮은 영역은 <strong className="text-ink-900">'약점'이 아닌 '아직 발현되지 않은 영역'</strong>입니다. 3·4학년은 재능이 분화되기 시작하는 시기입니다.
          </div>
        </div>

        {/* 부진 영역 학습 가이드 */}
        <div className="bg-white border border-ink-100 rounded-3xl p-5 mb-4">
          <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-4">맞춤 학습 가이드</div>
          <div className="space-y-2">
            {[
              { rank: "①", subj: "과학", topic: "분류·인과", text: "관찰·발견 → 추론 단계 강화 · 동영상 5편 추천", color: "text-sky-700" },
              { rank: "②", subj: "국어", topic: "어휘 확장", text: "3·4학년군 생활 어휘 보강 · 매일 10분", color: "text-lavender-700" },
              { rank: "③", subj: "수학", topic: "분수의 덧셈", text: "통분 개념 점검 후 분수 덧셈 연습", color: "text-mint-700" },
            ].map((g) => (
              <div key={g.rank} className="flex items-start gap-3 p-3 rounded-xl bg-paper-grey">
                <span className={`text-base font-bold ${g.color} flex-shrink-0`}>{g.rank}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-0.5">
                    <span className={g.color}>{g.subj}</span> · {g.topic}
                  </div>
                  <div className="text-xs text-ink-700">{g.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 심화 진단 CTA */}
        <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="text-[11px] font-bold tracking-widest text-accent-500 mb-2">GeniusX 심화 진단</div>
            <h2 className="text-lg font-bold mb-2">아직 발현되지 않은 재능 3개도 살펴보세요</h2>
            <p className="text-xs text-white/75 leading-[1.6] mb-4">
              발현 조건 3차원 + 21세기 역량 4차원 심화 분석<br />
              · 음향·리듬 · 신체·운동 · 사회·관계 재능까지 측정
            </p>
            <button className="bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-5 py-2.5 rounded-full text-sm transition">
              심화 진단 사전 신청
            </button>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { t: "학부모 리포트", h: "/parent/report/child_demo", dot: "bg-mint-500" },
            { t: "향상교육 시작", h: "/improvement", dot: "bg-sky-500" },
            { t: "마이페이지", h: "/mypage", dot: "bg-lavender-500" },
          ].map((a) => (
            <Link key={a.t} href={a.h} className="bg-white border border-ink-100 rounded-2xl p-4 text-center hover:border-mint-300 transition">
              <div className={`w-2 h-2 rounded-full ${a.dot} mx-auto mb-2`} />
              <div className="text-xs font-bold">{a.t}</div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center text-[10px] text-ink-500">
          5년 보관 후 자동 파기 · 익명 ID · IRB 심의 완료
        </div>
      </section>
    </main>
  );
}
