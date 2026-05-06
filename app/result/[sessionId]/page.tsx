import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return [{ sessionId: "demo" }];
}

export const dynamicParams = false;

const SUBJECTS = [
  { name: "국어 (읽기·어휘)", short: "국어", score: 71, percentile: 35, color: "bg-lavender-500", bg: "bg-lavender-50", text: "text-lavender-700" },
  { name: "과학", short: "과학", score: 65, percentile: 42, color: "bg-sky-500", bg: "bg-sky-50", text: "text-sky-700" },
  { name: "수학", short: "수학", score: 78, percentile: 28, color: "bg-mint-500", bg: "bg-mint-50", text: "text-mint-700" },
  { name: "통합 사고력", short: "통합", score: 82, percentile: 22, color: "bg-sun-500", bg: "bg-sun-50", text: "text-sun-600" },
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

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-sky-500" />FUN-002</span>
            <span className="eyebrow text-mint-600">DIAGNOSIS RESULT · 진단 결과</span>
          </div>
          <h1 className="h-section text-3xl mb-3">진단이 완료되었습니다</h1>
          <p className="text-sm text-ink-700">민지 · 초5 · 사전 진단 · 2026.05.06 · 반 진도 7급 · 학교 내 랭킹 12/87</p>
        </div>

        {/* 종합 점수 */}
        <div className="bg-gradient-to-br from-mint-50 to-lavender-50 border-2 border-mint-200 rounded-3xl p-8 mb-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-1">종합 마스터리</div>
              <div className="text-6xl font-bold text-mint-700 tabular-nums leading-none">{overall}<span className="text-2xl text-mint-500">%</span></div>
              <div className="text-xs text-ink-600 mt-2">전국 분포 상위 32%</div>
            </div>
            <div className="md:col-span-2 space-y-2">
              {SUBJECTS.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{s.name}</span>
                    <span className="font-bold tabular-nums">{s.score}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 랭킹·진도 표 (FUN-002) */}
        <div className="bg-white border-2 border-ink-100 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold tracking-tight">랭킹 · 진도</h2>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">FUN-002</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] text-ink-500 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="pb-2 text-left">분류</th>
                  <th className="pb-2 text-center">국어</th>
                  <th className="pb-2 text-center">과학</th>
                  <th className="pb-2 text-center">수학</th>
                  <th className="pb-2 text-center">통합</th>
                  <th className="pb-2 text-right">종합</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { l: "반 내 랭킹 (5-3 / 27명)", v: ["6", "8", "4", "2", "5"], color: "text-mint-700" },
                  { l: "학교 내 (5학년 / 87명)", v: ["18", "24", "12", "9", "12"], color: "text-sky-700" },
                  { l: "학년 진도 (전국 평균 5급)", v: ["7급", "6급", "8급", "7급", "7급"], color: "text-lavender-700" },
                  { l: "전국 백분위 (상위 %)", v: ["35%", "42%", "28%", "22%", "32%"], color: "text-sun-600" },
                ].map((r) => (
                  <tr key={r.l} className="border-b border-ink-100 last:border-0">
                    <td className="py-2.5 text-xs font-semibold">{r.l}</td>
                    {r.v.map((x, i) => (
                      <td key={i} className={`py-2.5 text-center text-sm font-bold tabular-nums ${i === 4 ? r.color : "text-ink-700"}`}>{x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지 1 — 학력 결과 */}
        <div className="bg-white border-2 border-mint-200 rounded-3xl p-7 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="bg-mint-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">P. 1</span>
            <h2 className="text-lg font-bold tracking-tight">학력 결과</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="text-xs font-semibold text-ink-700 mb-3">교과별 성취수준</div>
              <div className="space-y-3">
                {SUBJECTS.map((s) => (
                  <div key={s.name} className={`${s.bg} rounded-xl p-3`}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={`font-bold ${s.text}`}>{s.short}</span>
                      <span className="font-bold tabular-nums">{s.score}%</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-ink-600">
                      <span>전국 분포</span>
                      <span className="tabular-nums">상위 {s.percentile}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-ink-700 mb-3">부진 영역 학습 가이드</div>
              <div className="bg-paper-grey rounded-xl p-4 space-y-3 text-xs">
                <div>
                  <div className="font-bold text-sky-700 mb-1">① 과학 (분류·인과)</div>
                  <p className="text-ink-700 leading-[1.6]">관찰·발견 → 추론·상상 단계 강화 필요. 동영상 강의 5편 추천.</p>
                </div>
                <div>
                  <div className="font-bold text-lavender-700 mb-1">② 국어 (어휘)</div>
                  <p className="text-ink-700 leading-[1.6]">3·4학년군 생활 어휘 보강 필요. 읽기 자료 매일 10분.</p>
                </div>
                <div>
                  <div className="font-bold text-mint-700 mb-1">③ 수학 (분수)</div>
                  <p className="text-ink-700 leading-[1.6]">통분 개념 점검 후 분수 덧셈 연습으로 진행.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 페이지 2 — 재능 프로필 */}
        <div className="bg-white border-2 border-lavender-200 rounded-3xl p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="bg-lavender-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">P. 2</span>
              <h2 className="text-lg font-bold tracking-tight">재능 프로필 (프리뷰)</h2>
            </div>
            <span className="text-[10px] font-bold text-lavender-700 bg-lavender-50 px-2 py-0.5 rounded-full">5 측정 + 3 미발현</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 레이더차트 */}
            <div className="flex items-center justify-center bg-lavender-50 rounded-2xl p-6">
              <svg viewBox="0 0 100 100" className="w-full max-w-[240px]">
                {/* 8각 가이드 */}
                <polygon points="50,8 80,25 92,50 80,75 50,92 20,75 8,50 20,25" fill="none" stroke="#d4b6f7" strokeWidth="0.5" strokeDasharray="1,1" />
                <polygon points="50,21 71,33 79,50 71,67 50,79 29,67 21,50 29,33" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />
                <polygon points="50,33 62,40 67,50 62,60 50,67 38,60 33,50 38,40" fill="none" stroke="#d4b6f7" strokeWidth="0.3" strokeDasharray="0.8,1" />

                {/* 측정값 폴리곤 (5개만) */}
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

                {/* 점 8개 */}
                {TALENTS.map((t, i) => (
                  <circle
                    key={i}
                    cx={t.x}
                    cy={t.y}
                    r="1.8"
                    fill={t.measured ? "#9f7aea" : "#cbd5e0"}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                ))}
              </svg>
            </div>

            {/* 8 재능 리스트 */}
            <div className="space-y-1.5">
              {TALENTS.map((t) => (
                <div key={t.name} className={`flex items-center gap-3 p-2.5 rounded-lg ${t.measured ? "bg-lavender-50" : "bg-paper-grey opacity-60"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${t.measured ? "bg-lavender-500" : "bg-ink-400"}`} />
                  <span className="flex-1 text-xs font-semibold">{t.name}</span>
                  {t.measured ? (
                    <span className="text-xs font-bold tabular-nums text-lavender-700">{t.score}점</span>
                  ) : (
                    <span className="text-[10px] text-ink-500">심화 진단</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 상위 2개 재능 해설 */}
          <div className="mt-5 pt-5 border-t border-lavender-100">
            <div className="text-xs font-semibold text-ink-700 mb-3">상위 2개 재능 해설</div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-lavender-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-lavender-700">수리·논리</span>
                  <span className="text-xs font-bold tabular-nums text-lavender-700">82점</span>
                </div>
                <p className="text-[11px] text-ink-700 leading-[1.6]">
                  패턴 인식·계산력이 또래 평균보다 높습니다. 수학 응용 문제와 논리 퍼즐로 강점을 키워보세요.
                </p>
              </div>
              <div className="bg-lavender-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-lavender-700">언어·기호</span>
                  <span className="text-xs font-bold tabular-nums text-lavender-700">76점</span>
                </div>
                <p className="text-[11px] text-ink-700 leading-[1.6]">
                  독해·어휘 표현이 안정적입니다. 다양한 글 읽기와 글쓰기 활동으로 더욱 발전시킬 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 윤리 메시지 */}
          <div className="mt-5 bg-gradient-to-br from-lavender-50 to-mint-50 border border-lavender-200 rounded-xl p-4">
            <p className="text-xs text-ink-800 font-semibold leading-[1.6] mb-1">
              점수가 낮은 영역은 <span className="text-lavender-700">'약점'이 아닌 '아직 발현되지 않은 영역'</span>입니다.
            </p>
            <p className="text-[10px] text-ink-600">
              3·4학년은 재능이 분화되기 시작하는 시기 · 변화 가능성이 큽니다.
            </p>
          </div>
        </div>

        {/* 페이지 3 — 심화 진단 안내 */}
        <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-7 mb-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent-500/20 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-500 text-carbon-900 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">P. 3</span>
              <h2 className="text-lg font-bold tracking-tight">GeniusX 심화 진단 안내</h2>
            </div>
            <p className="text-sm text-white/85 leading-[1.7] mb-5">
              발현 조건 3차원 + 21세기 역량 4차원 심화 분석으로<br />
              본 진단에서 측정되지 않은 음향·신체·사회 재능까지 입체적으로 살핍니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5 text-sm">
              {[
                "음향·리듬·신체·사회 재능 측정",
                "발현 조건 분석 (F1·F2·F3)",
                "게임화 수행평가",
                "포트폴리오 평가",
                "학부모·교사 평정",
                "진로·교육 설계 보고서",
              ].map((f) => (
                <div key={f} className="flex items-start gap-2 text-xs text-white/85">
                  <span className="text-accent-500 flex-shrink-0">●</span>
                  {f}
                </div>
              ))}
            </div>
            <button className="w-full md:w-auto bg-accent-500 hover:bg-accent-300 text-carbon-900 font-bold px-6 py-3 rounded-full transition">
              심화 진단 사전 신청
            </button>
          </div>
        </div>

        {/* 액션 */}
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/parent/report/child_demo" className="bg-white border-2 border-mint-200 rounded-2xl p-5 text-center hover:-translate-y-1 transition">
            <div className="text-2xl mb-2"></div>
            <div className="font-bold text-sm">학부모 리포트 PDF</div>
            <div className="text-[10px] text-ink-600 mt-1">3페이지 + 대시보드</div>
          </Link>
          <Link href="/improvement" className="bg-white border-2 border-sky-200 rounded-2xl p-5 text-center hover:-translate-y-1 transition">
            <div className="text-2xl mb-2"></div>
            <div className="font-bold text-sm">향상교육 시작</div>
            <div className="text-[10px] text-ink-600 mt-1">동영상 강의 + AI 학습 도우미</div>
          </Link>
          <Link href="/mypage" className="bg-white border-2 border-lavender-200 rounded-2xl p-5 text-center hover:-translate-y-1 transition">
            <div className="text-2xl mb-2"></div>
            <div className="font-bold text-sm">마이페이지</div>
            <div className="text-[10px] text-ink-600 mt-1">학습이력 · 종합결과</div>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
