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

        {/* 교과 블록 내부 구성 + 이독성 통제 (GeniusX Section 3.1) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">교과 블록 내부 구성</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {/* 국어 10문항 내부 구성 */}
            <div className="bg-lavender-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-lavender-700">국어 (읽기·어휘)</div>
                  <div className="text-sm font-bold mt-0.5">10문항 / 8분</div>
                </div>
                <span className="text-[10px] font-semibold text-lavender-700 bg-white px-2 py-0.5 rounded-full">언어-기호 재능</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { n: "어휘", c: "3문항", d: "수용 어휘력" },
                  { n: "문장 이해", c: "3문항", d: "지시어·시제·조건 해석" },
                  { n: "짧은 글 이해", c: "4문항", d: "150~200자 · 중심생각·세부정보·추론" },
                ].map((b) => (
                  <div key={b.n} className="flex items-start gap-2 p-2 rounded-lg bg-white">
                    <span className="font-bold text-lavender-700 w-20 flex-shrink-0">{b.n}</span>
                    <div className="flex-1">
                      <span className="font-bold tabular-nums">{b.c}</span>
                      <div className="text-[10px] text-ink-600 mt-0.5">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이독성 통제 */}
            <div className="bg-paper-grey rounded-xl p-4">
              <div className="text-[10px] font-bold tracking-widest text-ink-700 mb-2">이독성 (Readability) 통제</div>
              <div className="text-sm font-bold mb-2">과학·수학 문항 — 응시 학년 기준 -0.5 이하</div>
              <p className="text-[11px] text-ink-700 leading-[1.6] mb-3">
                과학 문항의 읽기 부하가 수학보다 구조적으로 큼. 국어 측정 없이 과학·수학만 재면 언어 부담이 교과 부진으로 오귀인됨. 이독성 -0.5 이하 통제로 언어 교란을 이중 방지.
              </p>
              <div className="bg-white rounded-lg p-2.5 text-[10px] text-ink-700">
                <strong className="text-ink-900">학술 근거:</strong> 4학년 슬럼프 (4th-grade slump, Chall 1983) — 3학년까지 또래와 비슷하던 학생이 4학년에 어휘 한계로 학업 급락. 파일럿이 정확히 이 전환기를 관통.
              </div>
            </div>
          </div>
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
                  { t: "분수의 덧셈 — 통분 개념부터", s: "수학·초5", u: "분수", d: "5:32", v: 2418, st: "공개", ch: "EBS Math", q: "초등+5학년+분수의+덧셈+통분" },
                  { t: "물질의 상태 변화", s: "과학·초5", u: "물질", d: "7:21", v: 1872, st: "공개", ch: "EBS 초등", q: "초등+5학년+물질의+상태+변화" },
                  { t: "독해 전략 — 중심 생각 찾기", s: "국어·초5", u: "독해", d: "4:48", v: 1654, st: "공개", ch: "EBS 초등", q: "초등+5학년+글의+중심+생각" },
                  { t: "비와 비율의 활용", s: "수학·초6", u: "비율", d: "6:15", v: 987, st: "검토중", ch: "Khan Academy 한국어", q: "초등+6학년+비와+비율" },
                  { t: "동물의 분류와 특성", s: "과학·초4", u: "생명", d: "5:08", v: 1245, st: "공개", ch: "EBS Kids", q: "초등+4학년+동물의+분류" },
                  { t: "어휘 확장 학습법", s: "국어·초3", u: "어휘", d: "3:42", v: 743, st: "초안", ch: "EBS 초등", q: "초등+어휘+확장+학습" },
                ].map((c, i) => (
                  <tr key={i} className="border-b border-ink-100 last:border-0 hover:bg-paper-grey">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FF0000] text-white text-[8px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">YT</span>
                        <div>
                          <div className="font-semibold">{c.t}</div>
                          <div className="text-[10px] text-ink-500">{c.ch}</div>
                        </div>
                      </div>
                    </td>
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
                      <a href={`https://www.youtube.com/results?search_query=${c.q}`} target="_blank" rel="noopener noreferrer" className="text-ink-600 hover:text-ink-900">미리보기</a>
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
