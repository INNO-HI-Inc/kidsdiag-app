import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RolePageHeader from "@/components/RolePageHeader";

export default function AdminDashboard() {
  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <RolePageHeader
          role="admin"
          title="시스템 관리"
          subtitle="회원·콘텐츠·통계·시스템 통합 콘솔"
          funBadges={[{ id: "FUN-005" }, { id: "FUN-006" }, { id: "FUN-007" }, { id: "FUN-008" }]}
          kpis={[
            { v: "5,847", l: "총 회원" },
            { v: "5,124", l: "활성 학생" },
            { v: "73%", l: "진단 완료율" },
            { v: "4.6/5", l: "리포트 만족도" },
          ]}
          actions={
            <>
              <button className="bg-mint-50 hover:bg-mint-100 text-mint-700 font-bold px-4 py-2 rounded-full text-xs transition">
                Excel 다운로드
              </button>
              <button className="bg-mint-600 hover:bg-mint-700 text-white font-bold px-4 py-2 rounded-full text-xs transition">
                알림 발송
              </button>
            </>
          }
        />

        {/* 4개 sub-route 빠른 진입 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { href: "/admin/grading", title: "답안 채점", desc: "FUN-001 수동 채점", dot: "bg-mint-500" },
            { href: "/admin/cms-editor", title: "문항 편집기", desc: "FUN-005 CMS", dot: "bg-sky-500" },
            { href: "/admin/permissions", title: "권한·알림", desc: "FUN-007 매트릭스", dot: "bg-lavender-500" },
            { href: "/admin/site", title: "사이트 설정", desc: "FUN-008 로고·문구", dot: "bg-sun-500" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="bg-white rounded-2xl border border-ink-100 p-4 hover:border-mint-300 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <span className="text-sm font-bold">{c.title}</span>
              </div>
              <div className="text-[11px] text-ink-600">{c.desc}</div>
            </Link>
          ))}
        </div>

        {/* 4개 모듈 카드 */}
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          {/* 회원 관리 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">회원 관리</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100">
                <span className="w-1 h-1 rounded-full bg-mint-500" />FUN-007
              </span>
            </div>
            <div className="space-y-2">
              {[
                { type: "학생", count: 5124, dot: "bg-mint-500" },
                { type: "교원", count: 421, dot: "bg-sky-500" },
                { type: "학부모", count: 2892, dot: "bg-lavender-500" },
                { type: "관리자", count: 12, dot: "bg-sun-500" },
              ].map((r) => (
                <div key={r.type} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${r.dot}`} />
                  <span className="flex-1 text-sm font-semibold">{r.type}</span>
                  <span className="text-sm font-bold tabular-nums">{r.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <Link href="/admin/permissions" className="mt-4 block w-full text-center text-xs font-semibold px-3 py-2.5 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">
              권한 매트릭스 →
            </Link>
          </div>

          {/* 콘텐츠 관리 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">콘텐츠 관리 (CMS)</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100">
                <span className="w-1 h-1 rounded-full bg-sky-500" />FUN-005
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { t: "문항 풀", v: "1,247" },
                { t: "동영상 강의", v: "184" },
                { t: "오답 유형", v: "4종" },
                { t: "유사 문항", v: "AI 매칭" },
              ].map((c) => (
                <div key={c.t} className="bg-paper-grey rounded-lg p-2.5">
                  <div className="text-[9px] font-bold tracking-widest text-ink-600">{c.t}</div>
                  <div className="text-sm font-bold tabular-nums tracking-tight mt-0.5">{c.v}</div>
                </div>
              ))}
            </div>
            <Link href="/admin/cms-editor" className="mt-4 block w-full text-center text-xs font-semibold px-3 py-2.5 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">
              문항 편집기 →
            </Link>
          </div>

          {/* 통계 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">통계 · 대시보드</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100">
                <span className="w-1 h-1 rounded-full bg-lavender-500" />FUN-006
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { l: "진단 응시 분포", v: "초3 1,287 / 초4 1,341 / 초5 1,294 / 초6 1,202" },
                { l: "교과별 평균", v: "수학 71% · 과학 68% · 국어 75%" },
                { l: "학교별 현황", v: "127개교" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-lavender-300 pl-2.5 py-1">
                  <div className="text-[10px] font-bold tracking-widest text-lavender-700">{s.l}</div>
                  <div className="text-xs text-ink-700 mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-xs font-semibold px-3 py-2.5 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">
              Excel · CSV · JSON 다운로드
            </button>
          </div>

          {/* 시스템 관리 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">시스템(홈페이지) 관리</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100">
                <span className="w-1 h-1 rounded-full bg-sun-500" />FUN-008
              </span>
            </div>
            <ul className="space-y-1.5 text-sm">
              {[
                "학교 이미지 (로고·배너) 관리",
                "공지사항 등록·수정·삭제",
                "Q&A 게시판 관리",
                "기타 문구 수정",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-ink-800 text-xs">
                  <span className="w-1 h-1 rounded-full bg-sun-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/admin/site" className="mt-4 block w-full text-center text-xs font-semibold px-3 py-2.5 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">
              사이트 설정 →
            </Link>
          </div>
        </div>

        {/* 검수 콘솔 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold tracking-tight">전문가 검수 콘솔</h2>
            <span className="text-xs font-bold tabular-nums text-mint-700">Cohen's κ 0.84</span>
          </div>
          <p className="text-xs text-ink-700 leading-[1.7]">
            AI 생성 문항 → 자동 검증 4종 게이트 → 전문가 큐 → 승인/반려.
            검수자 일치도(Cohen's κ) 자동 측정 · 시간당 30+ 처리.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
