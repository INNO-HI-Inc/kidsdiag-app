import Link from "next/link";

export function generateStaticParams() {
  return [{ sessionId: "demo" }];
}

export const dynamicParams = false;

const SUBJECTS = [
  { name: "국어", score: 71, percentile: 35, dot: "bg-lavender-500", text: "text-lavender-700", bg: "bg-lavender-50" },
  { name: "과학", score: 65, percentile: 42, dot: "bg-sky-500", text: "text-sky-700", bg: "bg-sky-50" },
  { name: "수학", score: 78, percentile: 28, dot: "bg-mint-500", text: "text-mint-700", bg: "bg-mint-50" },
  { name: "통합사고력", score: 82, percentile: 22, dot: "bg-sun-500", text: "text-sun-600", bg: "bg-sun-50" },
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
  const overall = Math.round(SUBJECTS.reduce((a, b) => a + b.score, 0) / SUBJECTS.length);
  const top2 = [...TALENTS].filter(t => t.measured).sort((a, b) => b.score - a.score).slice(0, 2);

  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      {/* 헤더 */}
      <header className="bg-white border-b border-ink-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/mypage" className="text-sm text-ink-700 hover:text-ink-900">← 마이페이지</Link>
          <div className="text-[11px] font-bold tracking-widest text-mint-700">진단 결과</div>
          <button className="text-xs font-bold text-mint-700 hover:text-mint-900">PDF</button>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-5 py-6 pb-16">
        {/* 응시자 카드 */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-mint-500 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">홍</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold tracking-tight">홍길동 · 초5</div>
              <div className="text-[11px] text-ink-600 mt-0.5">제닉스초 5-3 · 사전 진단 완료 · 2026.05.06</div>
            </div>
          </div>
        </div>

        {/* HERO — 종합 점수 */}
        <div className="bg-gradient-to-br from-mint-50 to-paper rounded-2xl border border-mint-200 p-6 mb-3 text-center">
          <div className="text-[11px] font-bold tracking-widest text-mint-700 mb-2">종합 마스터리</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-6xl md:text-7xl font-bold text-mint-700 tabular-nums leading-none">{overall}</span>
            <span className="text-2xl text-mint-500 font-bold">%</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
            <span className="font-bold">전국 상위 32%</span>
            <span className="text-ink-500">· 또래 평균 67%</span>
          </div>
        </div>

        {/* 4교과 결과 */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 mb-3">
          <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-4">교과별 결과</div>
          <div className="space-y-4">
            {SUBJECTS.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-sm font-bold">{s.name}</span>
                    <span className="text-[10px] text-ink-500">상위 {s.percentile}%</span>
                  </div>
                  <span className="text-base font-bold tabular-nums">{s.score}<span className="text-xs text-ink-500">%</span></span>
                </div>
                <div className="h-2 bg-paper-grey rounded-full overflow-hidden">
                  <div className={`h-full ${s.dot} rounded-full`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 랭킹·진도 */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { l: "반 내 랭킹", v: "5위", sub: "/27명", c: "text-mint-700" },
            { l: "학교 내 (5학년)", v: "12위", sub: "/87명", c: "text-sky-700" },
            { l: "학년 진도", v: "7급", sub: "/10급", c: "text-lavender-700" },
            { l: "전국 백분위", v: "상위", sub: "32%", c: "text-sun-600" },
          ].map((r) => (
            <div key={r.l} className="bg-white border border-ink-100 rounded-2xl p-4">
              <div className="text-[10px] text-ink-600 mb-1">{r.l}</div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-bold ${r.c} tabular-nums`}>{r.v}</span>
                <span className="text-[10px] text-ink-500">{r.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 재능 프로필 */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold tracking-widest text-lavender-700">재능 프로필</div>
            <span className="text-[10px] font-semibold text-ink-500">5 측정 + 3 미발현</span>
          </div>

          {/* 레이더 */}
          <div className="bg-lavender-50 rounded-2xl p-5 mb-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full max-w-[180px]">
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

          {/* 8개 리스트 */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {TALENTS.map((t) => (
              <div key={t.name} className={`flex items-center gap-2 p-2 rounded-lg ${t.measured ? "bg-lavender-50" : "bg-paper-grey opacity-60"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${t.measured ? "bg-lavender-500" : "bg-ink-300"}`} />
                <span className="flex-1 text-[11px] font-semibold truncate">{t.name}</span>
                {t.measured ? (
                  <span className="text-[11px] font-bold tabular-nums text-lavender-700">{t.score}</span>
                ) : (
                  <span className="text-[9px] text-ink-500">심화</span>
                )}
              </div>
            ))}
          </div>

          {/* 상위 2 해설 */}
          <div className="border-t border-lavender-100 pt-4">
            <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-2.5">강점 재능</div>
            <div className="space-y-2">
              {top2.map((t) => (
                <div key={t.name} className="flex items-start gap-3 p-3 rounded-xl bg-lavender-50">
                  <span className="text-xs font-bold tabular-nums bg-lavender-500 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">{t.score}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-lavender-700 mb-0.5">{t.name}</div>
                    <div className="text-[11px] text-ink-700 leading-[1.5]">
                      {t.name === "수리·논리" && "패턴 인식·계산력이 또래 평균보다 높습니다."}
                      {t.name === "언어·기호" && "독해·어휘 표현이 안정적입니다."}
                      {t.name === "공간·시각" && "도형 변환 능력이 좋습니다."}
                      {t.name === "자연·생태" && "관찰·분류 사고가 강합니다."}
                      {t.name === "자기·성찰" && "측정 객관성·오류 인식이 뛰어납니다."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 윤리 메시지 */}
        <div className="bg-paper rounded-2xl p-4 mb-3 border border-ink-100 space-y-1.5 text-[11px] text-ink-700 leading-[1.6]">
          <div>① 이 진단은 <strong className="text-ink-900">학력과 재능의 일부 측면만</strong> 측정합니다.</div>
          <div>② 점수가 낮은 영역은 <strong className="text-ink-900">'약점'이 아닌 '미발현 영역'</strong>입니다.</div>
          <div>③ 전체 8개 재능 중 <strong className="text-ink-900">5개만 측정</strong>됩니다. 나머지 3개(음향·신체·사회)는 심화 진단에서 별도 측정.</div>
        </div>

        {/* 학습 가이드 */}
        <div className="bg-white border border-ink-100 rounded-2xl p-5 mb-3">
          <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-3">맞춤 학습 가이드</div>
          <div className="space-y-2">
            {[
              { rank: "①", subj: "과학", topic: "분류·인과", text: "추론 단계 강화 · 동영상 5편", color: "text-sky-700", bg: "bg-sky-50" },
              { rank: "②", subj: "국어", topic: "어휘 확장", text: "3·4학년 생활 어휘 보강", color: "text-lavender-700", bg: "bg-lavender-50" },
              { rank: "③", subj: "수학", topic: "분수의 덧셈", text: "통분 개념 점검 후 분수 덧셈", color: "text-mint-700", bg: "bg-mint-50" },
            ].map((g) => (
              <div key={g.rank} className={`flex items-start gap-3 p-3 rounded-xl ${g.bg}`}>
                <span className={`text-base font-bold ${g.color} flex-shrink-0`}>{g.rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold mb-0.5">
                    <span className={g.color}>{g.subj}</span> · {g.topic}
                  </div>
                  <div className="text-[11px] text-ink-700">{g.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 심화 진단 CTA */}
        <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-2xl p-5 mb-3 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="text-[11px] font-bold tracking-widest text-accent-500 mb-1.5">GeniusX 심화 진단</div>
            <h2 className="text-base font-bold mb-1.5">아직 발현되지 않은 재능 3개도 살펴보세요</h2>
            <p className="text-[11px] text-white/70 leading-[1.6] mb-4">
              발현 조건 3차원 + 21세기 역량 4차원 심화 분석<br />
              · 음향·신체·사회 재능 측정
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
            { t: "향상교육", h: "/improvement", dot: "bg-sky-500" },
            { t: "마이페이지", h: "/mypage", dot: "bg-lavender-500" },
          ].map((a) => (
            <Link key={a.t} href={a.h} className="bg-white border border-ink-100 rounded-2xl p-3.5 text-center hover:border-mint-300 transition">
              <div className={`w-2 h-2 rounded-full ${a.dot} mx-auto mb-1.5`} />
              <div className="text-xs font-bold">{a.t}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
