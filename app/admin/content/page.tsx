import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RolePageHeader from "@/components/RolePageHeader";

export default function ContentManagementPage() {
  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <RolePageHeader
          role="admin"
          title="향상교육 학습 콘텐츠 관리"
          subtitle="3개 영역 동영상 강의 · 학습 자료실 · 오답 유형 등록·수정·삭제"
          funBadges={[{ id: "FUN-005" }, { id: "FUN-003" }]}
          kpis={[
            { v: "184", l: "동영상 강의" },
            { v: "247", l: "학습 자료" },
            { v: "1,247", l: "문항 풀" },
            { v: "4종", l: "오답 유형" },
          ]}
          actions={
            <button className="bg-mint-600 hover:bg-mint-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition">
              + 콘텐츠 등록
            </button>
          }
        />

        {/* 탭 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-2 mb-5 flex gap-1 flex-wrap">
          {["동영상 강의", "학습 자료실", "유사 문항", "오답 유형"].map((t, i) => (
            <button key={t} className={`text-xs font-semibold px-4 py-2 rounded-full transition ${i === 0 ? "bg-mint-600 text-white" : "text-ink-700 hover:bg-paper-grey"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-4 mb-5 grid md:grid-cols-5 gap-2">
          <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
            <option>전체 교과</option><option>수학</option><option>과학</option><option>국어</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
            <option>전체 학년</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
            <option>난이도</option><option>상</option><option>중</option><option>하</option>
          </select>
          <input placeholder="제목 검색" className="md:col-span-1 px-3 py-2 rounded-lg border border-ink-100 text-xs" />
          <button className="px-3 py-2 rounded-lg bg-mint-600 text-white text-xs font-semibold">검색</button>
        </div>

        {/* 콘텐츠 테이블 */}
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-paper-grey text-[10px] text-ink-600 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="px-4 py-3 text-left">제목</th>
                  <th className="px-4 py-3 text-left">교과·학년</th>
                  <th className="px-4 py-3 text-left">단원</th>
                  <th className="px-4 py-3 text-center">길이</th>
                  <th className="px-4 py-3 text-center">조회</th>
                  <th className="px-4 py-3 text-center">상태</th>
                  <th className="px-4 py-3 text-right">관리</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { t: "분수의 덧셈 — 통분 개념부터", s: "수학·초5", u: "분수", d: "5:32", v: 2418, st: "공개" },
                  { t: "물질의 상태 변화", s: "과학·초5", u: "물질", d: "7:21", v: 1872, st: "공개" },
                  { t: "독해 전략 — 중심 생각 찾기", s: "국어·초5", u: "독해", d: "4:48", v: 1654, st: "공개" },
                  { t: "비와 비율의 활용", s: "수학·초6", u: "비율", d: "6:15", v: 987, st: "검토중" },
                  { t: "동물의 분류와 특성", s: "과학·초4", u: "생명", d: "5:08", v: 1245, st: "공개" },
                  { t: "어휘 확장 학습법", s: "국어·초3", u: "어휘", d: "3:42", v: 743, st: "초안" },
                ].map((c, i) => (
                  <tr key={i} className="border-b border-ink-100 last:border-0 hover:bg-paper-grey">
                    <td className="px-4 py-3 text-sm font-semibold">{c.t}</td>
                    <td className="px-4 py-3 text-xs text-ink-700">{c.s}</td>
                    <td className="px-4 py-3 text-xs text-ink-700">{c.u}</td>
                    <td className="px-4 py-3 text-center text-xs tabular-nums">{c.d}</td>
                    <td className="px-4 py-3 text-center text-xs tabular-nums">{c.v.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.st === "공개" ? "bg-mint-50 text-mint-700" : c.st === "검토중" ? "bg-sky-50 text-sky-700" : "bg-paper-grey text-ink-600"
                      }`}>{c.st}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs space-x-2">
                      <button className="text-ink-600 hover:text-ink-900">미리보기</button>
                      <button className="text-mint-700 hover:text-mint-900">수정</button>
                      <button className="text-peach-500 hover:text-peach-400">삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
