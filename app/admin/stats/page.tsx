import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RolePageHeader from "@/components/RolePageHeader";

export default function StatsPage() {
  // 학년별 분포
  const gradeDist = [
    { g: "초3", n: 1287 },
    { g: "초4", n: 1341 },
    { g: "초5", n: 1294 },
    { g: "초6", n: 1202 },
  ];
  const maxGrade = Math.max(...gradeDist.map(d => d.n));

  // 성별
  const genderDist = [
    { g: "여학생", n: 2614, c: "bg-lavender-500" },
    { g: "남학생", n: 2510, c: "bg-sky-500" },
  ];
  const totalGender = genderDist.reduce((a, b) => a + b.n, 0);

  // 교과별 평균
  const subjects = [
    { s: "수학", v: 71, c: "bg-mint-500" },
    { s: "과학", v: 68, c: "bg-sky-500" },
    { s: "국어", v: 75, c: "bg-lavender-500" },
    { s: "통합사고력", v: 73, c: "bg-sun-500" },
  ];

  // 영역별 수준
  const levels = [
    { l: "최우수 (≥90%)", n: 412, pct: 8 },
    { l: "우수 (75~89%)", n: 1789, pct: 35 },
    { l: "보통 (60~74%)", n: 1947, pct: 38 },
    { l: "미흡 (45~59%)", n: 718, pct: 14 },
    { l: "기초 미달 (<45%)", n: 258, pct: 5 },
  ];

  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <RolePageHeader
          role="admin"
          title="통계 · 대시보드"
          subtitle="학생 분류 전체 현황 + 진단/총괄 영역별 이용·수준 현황 + Excel 다운로드"
          funBadges={[{ id: "FUN-006" }]}
          kpis={[
            { v: "5,124", l: "총 응시자" },
            { v: "127", l: "참여 학교" },
            { v: "73%", l: "진단 완료율" },
            { v: "85%", l: "사후 진단율" },
          ]}
          actions={
            <>
              <button className="bg-mint-50 text-mint-700 font-bold px-3 py-2 rounded-full text-xs">Excel</button>
              <button className="bg-sky-50 text-sky-700 font-bold px-3 py-2 rounded-full text-xs">CSV</button>
              <button className="bg-lavender-50 text-lavender-700 font-bold px-3 py-2 rounded-full text-xs">JSON</button>
            </>
          }
        />

        {/* 응시자 대표성 (GeniusX Section 4.1) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold tracking-tight">응시자 대표성 점검</h2>
            <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2 py-0.5 rounded-full">5,124명 / 5,000 목표</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "도시:비도시:읍면", target: "5 : 3 : 2", actual: "5.1 : 2.9 : 2.0", ok: true },
              { l: "저소득층 (학교급식 지원 기준)", target: "≥ 15%", actual: "17.4%", ok: true },
              { l: "일반 공립학교", target: "≥ 80%", actual: "82.1%", ok: true },
              { l: "특수교육 대상", target: "3~5%", actual: "3.8%", ok: true },
              { l: "사립·국립·혁신학교", target: "적정 비율", actual: "14.7%", ok: true },
              { l: "영재교육원 네트워크", target: "≤ 30%", actual: "23.2%", ok: true },
              { l: "3학년 / 4학년", target: "2,500 / 2,500", actual: "2,587 / 2,537", ok: true },
              { l: "수직 척도화 앵커", target: "15문항 공통", actual: "15문항 동일", ok: true },
            ].map((s) => (
              <div key={s.l} className="bg-paper-grey rounded-xl p-3">
                <div className="text-[10px] text-ink-600 mb-0.5">{s.l}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold tabular-nums">{s.actual}</span>
                  {s.ok && <span className="text-[9px] text-mint-700 font-bold">OK</span>}
                </div>
                <div className="text-[9px] text-ink-500 mt-0.5">목표: {s.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 학년·성별 분포 */}
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <h2 className="text-base font-bold mb-4">학년별 응시자 분포</h2>
            <div className="space-y-3">
              {gradeDist.map((d) => (
                <div key={d.g}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{d.g}</span>
                    <span className="font-bold tabular-nums">{d.n.toLocaleString()}명</span>
                  </div>
                  <div className="h-2 bg-paper-grey rounded-full overflow-hidden">
                    <div className="h-full bg-mint-500 rounded-full" style={{ width: `${(d.n / maxGrade) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <h2 className="text-base font-bold mb-4">성별 분포</h2>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                {genderDist.map((d) => {
                  const pct = (d.n / totalGender) * 100;
                  return (
                    <div key={d.g} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold">{d.g}</span>
                        <span className="tabular-nums">{d.n.toLocaleString()} ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 bg-paper-grey rounded-full overflow-hidden">
                        <div className={`h-full ${d.c} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold tabular-nums">{totalGender.toLocaleString()}</div>
                <div className="text-[10px] text-ink-600">전체</div>
              </div>
            </div>
          </div>
        </div>

        {/* 교과별 평균 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
          <h2 className="text-base font-bold mb-4">교과별 평균 마스터리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjects.map((s) => (
              <div key={s.s} className="bg-paper-grey rounded-xl p-4 text-center">
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e0e0e0" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(s.v / 100) * 94.2} 94.2`} className={s.c.replace("bg-", "text-")} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-base font-bold tabular-nums">{s.v}%</div>
                </div>
                <div className="text-xs font-semibold">{s.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 수준 현황 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
          <h2 className="text-base font-bold mb-4">진단 수준 현황 (5단계 분포)</h2>
          <div className="space-y-2.5">
            {levels.map((l, i) => {
              const colors = ["bg-mint-500", "bg-mint-400", "bg-sky-400", "bg-sun-400", "bg-peach-400"];
              return (
                <div key={l.l}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{l.l}</span>
                    <span className="tabular-nums">{l.n.toLocaleString()}명 · {l.pct}%</span>
                  </div>
                  <div className="h-3 bg-paper-grey rounded-full overflow-hidden">
                    <div className={`h-full ${colors[i]} rounded-full`} style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 영역별 이용 현황 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
          <h2 className="text-base font-bold mb-4">영역별 이용 현황 (이번 달)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] text-ink-500 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="pb-2 text-left">교과</th>
                  <th className="pb-2 text-center">사전 응시</th>
                  <th className="pb-2 text-center">향상학습</th>
                  <th className="pb-2 text-center">사후 응시</th>
                  <th className="pb-2 text-center">평균 향상도</th>
                  <th className="pb-2 text-right">완료율</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: "수학", pre: 5124, imp: 4287, post: 3892, gain: 18.4, comp: 76 },
                  { s: "과학", pre: 5124, imp: 4012, post: 3741, gain: 14.7, comp: 73 },
                  { s: "국어", pre: 5124, imp: 4458, post: 4012, gain: 12.1, comp: 78 },
                  { s: "통합사고력", pre: 5124, imp: 3987, post: 3654, gain: 16.2, comp: 71 },
                ].map((r) => (
                  <tr key={r.s} className="border-b border-ink-100 last:border-0">
                    <td className="py-3 font-semibold text-sm">{r.s}</td>
                    <td className="py-3 text-center tabular-nums text-xs">{r.pre.toLocaleString()}</td>
                    <td className="py-3 text-center tabular-nums text-xs">{r.imp.toLocaleString()}</td>
                    <td className="py-3 text-center tabular-nums text-xs">{r.post.toLocaleString()}</td>
                    <td className="py-3 text-center tabular-nums text-xs font-bold text-mint-700">+{r.gain}p</td>
                    <td className="py-3 text-right tabular-nums text-xs font-bold">{r.comp}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 학교별 현황 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6">
          <h2 className="text-base font-bold mb-4">학교별 현황 (TOP 5)</h2>
          <div className="space-y-2">
            {[
              { s: "제닉스초", n: 287, avg: 78 },
              { s: "한빛초", n: 245, avg: 74 },
              { s: "샛별초", n: 198, avg: 71 },
              { s: "푸른초", n: 187, avg: 76 },
              { s: "햇살초", n: 165, avg: 69 },
            ].map((s) => (
              <div key={s.s} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                <span className="flex-1 text-sm font-semibold">{s.s}</span>
                <span className="text-xs text-ink-600 tabular-nums">{s.n}명 응시</span>
                <span className="text-sm font-bold tabular-nums">{s.avg}%</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
