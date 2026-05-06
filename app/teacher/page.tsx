import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function TeacherDashboard() {
  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                TEACHER DASHBOARD
              </span>
              <span className="text-[10px] font-bold tracking-widest bg-mint-100 text-mint-700 px-2 py-0.5 rounded-full">FUN-001</span>
              <span className="text-[10px] font-bold tracking-widest bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">FUN-002</span>
            </div>
            <h1 className="h-section text-2xl md:text-3xl">김민수 선생님</h1>
            <div className="text-sm text-ink-600 mt-1">제닉스초등학교 5학년 3반 · 등록 학생 27명 · 검사지 생성·결과 조회 권한</div>
          </div>
          <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-card">
            + 새 검사지 생성
          </button>
        </div>

        {/* KPI 4개 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { v: "27", l: "등록 학생", c: "text-sky-700" },
            { v: "23", l: "사전 진단 완료", c: "text-mint-700" },
            { v: "78%", l: "반 평균 마스터리", c: "text-lavender-700" },
            { v: "5", l: "주의 필요 학생", c: "text-peach-500" },
          ].map((k) => (
            <div key={k.l} className="bg-white rounded-2xl p-5 border border-ink-100">
              <div className={`text-3xl font-bold ${k.c} tabular-nums tracking-tight`}>{k.v}</div>
              <div className="text-xs text-ink-600 mt-1.5 font-medium">{k.l}</div>
            </div>
          ))}
        </div>

        {/* 학생 리스트 */}
        <div className="bg-white rounded-3xl p-7 border border-ink-100 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold tracking-tight">응시 결과 조회</h2>
            <div className="flex gap-2">
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink-100 text-ink-700 hover:bg-ink-200">
                필터
              </button>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-mint-50 text-mint-700 hover:bg-mint-100">
                Excel ↓
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-ink-500 font-semibold tracking-widest border-b border-ink-100">
                  <th className="pb-2.5">학생</th>
                  <th className="pb-2.5 text-center">사전</th>
                  <th className="pb-2.5 text-center">사후</th>
                  <th className="pb-2.5 text-center">향상도</th>
                  <th className="pb-2.5 text-center">상태</th>
                  <th className="pb-2.5 text-right">액션</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "김민지", pre: 42, post: 78, status: "완료", color: "text-mint-700" },
                  { n: "이지훈", pre: 65, post: 81, status: "완료", color: "text-mint-700" },
                  { n: "박서연", pre: 38, post: null, status: "진행", color: "text-sky-700" },
                  { n: "최도현", pre: 72, post: 88, status: "완료", color: "text-mint-700" },
                  { n: "정유나", pre: 28, post: 45, status: "주의", color: "text-peach-500" },
                  { n: "강하준", pre: null, post: null, status: "미응시", color: "text-ink-500" },
                ].map((s) => (
                  <tr key={s.n} className="border-b border-ink-100 last:border-0">
                    <td className="py-3 font-semibold">{s.n}</td>
                    <td className="py-3 text-center tabular-nums text-ink-700">{s.pre ? `${s.pre}%` : "—"}</td>
                    <td className="py-3 text-center tabular-nums font-bold">{s.post ? `${s.post}%` : "—"}</td>
                    <td className="py-3 text-center tabular-nums text-mint-700 font-bold">
                      {s.pre && s.post ? `+${s.post - s.pre}p` : "—"}
                    </td>
                    <td className={`py-3 text-center text-xs font-bold ${s.color}`}>{s.status}</td>
                    <td className="py-3 text-right">
                      <button className="text-xs text-sky-700 hover:text-sky-900 font-semibold">상세 →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 검사지 생성 도구 */}
        <div className="bg-white rounded-3xl p-7 border border-ink-100">
          <h2 className="text-lg font-bold mb-5 tracking-tight">맞춤 검사지 생성</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: "교과 선택", v: "수학 / 과학 / 국어" },
              { t: "영역", v: "분수·도형·논리" },
              { t: "난이도", v: "중·하 (학년 거슬러)" },
              { t: "문항 수", v: "10문항" },
              { t: "소요 시간", v: "약 12분" },
              { t: "응시 학생", v: "전체 27명" },
            ].map((s) => (
              <div key={s.t} className="bg-paper-grey rounded-xl p-4">
                <div className="text-[10px] font-bold text-ink-600 tracking-widest mb-1">{s.t}</div>
                <div className="text-sm font-semibold text-ink-900">{s.v}</div>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-full transition">
            검사지 발송
          </button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
