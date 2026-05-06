import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AdminDashboard() {
  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-sun-50 text-sun-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sun-500" />
              ADMIN CONSOLE · 관리자
            </div>
            <h1 className="h-section text-2xl md:text-3xl">시스템 관리</h1>
            <div className="text-sm text-ink-600 mt-1">FUN-005 · FUN-006 · FUN-007 · FUN-008 통합 콘솔</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-mint-50 hover:bg-mint-100 text-mint-700 font-bold px-5 py-2.5 rounded-full text-sm transition">
              📊 Excel 다운로드
            </button>
            <button className="bg-sun-500 hover:bg-sun-400 text-white font-bold px-5 py-2.5 rounded-full text-sm transition">
              🔔 알림 발송
            </button>
          </div>
        </div>

        {/* KPI 6개 */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { v: "5,847", l: "총 회원", c: "text-ink-900" },
            { v: "5,124", l: "활성 학생", c: "text-mint-700" },
            { v: "421", l: "교원", c: "text-sky-700" },
            { v: "2,892", l: "학부모", c: "text-lavender-700" },
            { v: "73%", l: "진단 완료율", c: "text-sun-600" },
            { v: "4.6/5", l: "리포트 만족도", c: "text-mint-700" },
          ].map((k) => (
            <div key={k.l} className="bg-white rounded-xl p-3 border border-ink-100">
              <div className={`text-xl font-bold ${k.c} tabular-nums tracking-tight`}>{k.v}</div>
              <div className="text-[10px] text-ink-600 mt-0.5 font-medium">{k.l}</div>
            </div>
          ))}
        </div>

        {/* 4개 관리 모듈 */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* 회원 관리 (FUN-007) */}
          <div className="bg-white rounded-3xl p-7 border border-ink-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight">회원 관리</h2>
              <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2 py-0.5 rounded-full">FUN-007</span>
            </div>
            <div className="space-y-2.5">
              {[
                { type: "학생", count: 5124, color: "bg-mint-500" },
                { type: "교원", count: 421, color: "bg-sky-500" },
                { type: "학부모", count: 2892, color: "bg-lavender-500" },
                { type: "관리자", count: 12, color: "bg-sun-500" },
              ].map((r) => (
                <div key={r.type} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                  <span className={`w-2 h-2 rounded-full ${r.color}`} />
                  <span className="flex-1 text-sm font-semibold">{r.type}</span>
                  <span className="text-sm font-bold tabular-nums">{r.count.toLocaleString()}</span>
                  <button className="text-xs text-ink-500 hover:text-ink-900">관리 →</button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">+ 추가</button>
              <button className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg bg-paper-grey text-ink-700 hover:bg-ink-100">승인 대기</button>
            </div>
          </div>

          {/* 콘텐츠 관리 (FUN-005) */}
          <div className="bg-white rounded-3xl p-7 border border-ink-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight">콘텐츠 관리 (CMS)</h2>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">FUN-005</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: "문항 풀", v: "1,247", l: "검수 완료" },
                { t: "동영상 강의", v: "184", l: "라이브러리" },
                { t: "오답 유형", v: "4종", l: "분류 체계" },
                { t: "유사 문항", v: "AI 매칭", l: "임베딩" },
              ].map((c) => (
                <div key={c.t} className="bg-paper-grey rounded-xl p-3">
                  <div className="text-[10px] font-bold tracking-widest text-ink-600">{c.t.toUpperCase()}</div>
                  <div className="text-base font-bold tabular-nums tracking-tight mt-0.5">{c.v}</div>
                  <div className="text-[10px] text-ink-600 mt-0.5">{c.l}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-xs font-semibold px-3 py-2.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100">
              📝 콘텐츠 신규 등록
            </button>
          </div>

          {/* 통계 (FUN-006) */}
          <div className="bg-white rounded-3xl p-7 border border-ink-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight">통계 · 대시보드</h2>
              <span className="text-[10px] font-bold text-lavender-700 bg-lavender-50 px-2 py-0.5 rounded-full">FUN-006</span>
            </div>
            <div className="space-y-3">
              {[
                { l: "진단 응시 분포", v: "초3 1,287 / 초4 1,341 / 초5 1,294 / 초6 1,202" },
                { l: "교과별 평균", v: "수학 71% · 과학 68% · 국어 75%" },
                { l: "학교별 현황", v: "127개교" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-lavender-300 pl-3 py-1">
                  <div className="text-[10px] font-bold tracking-widest text-lavender-700">{s.l}</div>
                  <div className="text-xs text-ink-700 mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-xs font-semibold px-3 py-2.5 rounded-lg bg-lavender-50 text-lavender-700 hover:bg-lavender-100">
              📊 Excel · CSV · JSON 다운로드
            </button>
          </div>

          {/* 시스템 관리 (FUN-008) */}
          <div className="bg-white rounded-3xl p-7 border border-ink-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-tight">시스템(홈페이지) 관리</h2>
              <span className="text-[10px] font-bold text-sun-600 bg-sun-50 px-2 py-0.5 rounded-full">FUN-008</span>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "학교 이미지 (로고·배너) 관리",
                "공지사항 등록·수정·삭제",
                "Q&A 게시판 관리",
                "기타 문구 수정",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-ink-800">
                  <span className="w-1 h-1 rounded-full bg-sun-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/board" className="mt-4 block w-full text-center text-xs font-semibold px-3 py-2.5 rounded-lg bg-sun-50 text-sun-600 hover:bg-sun-100">
              📋 게시판 관리 →
            </Link>
          </div>
        </div>

        {/* 검수 콘솔 미니 */}
        <div className="bg-gradient-to-br from-carbon-900 to-carbon-700 text-white rounded-3xl p-7 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-mint-500/20 blur-2xl pointer-events-none" />
          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="eyebrow text-mint-400 mb-2">REVIEWER CONSOLE · 전문가 검수</div>
              <h2 className="text-xl font-bold mb-2 tracking-tight">한국창의영재교육원 검수자 콘솔</h2>
              <p className="text-sm text-white/75 leading-[1.7]">
                AI 생성 문항 → 자동 검증 4종 게이트 → 전문가 큐 → 승인/반려.<br />
                Cohen's κ 자동 측정 · 시간당 30+ 처리.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-mint-400 tabular-nums">0.84</div>
              <div className="text-xs text-white/60 mt-1">Cohen's κ (검수자 일치도)</div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
