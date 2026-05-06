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

        {/* 7개 sub-route 빠른 진입 (PDF 관리자 메뉴) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { href: "/admin/members", title: "회원관리", desc: "FUN-007 등록·승인", dot: "bg-mint-500" },
            { href: "/admin/stats", title: "통계", desc: "FUN-006 차트·다운로드", dot: "bg-sky-500" },
            { href: "/admin/content", title: "학습 콘텐츠", desc: "FUN-005 동영상·자료", dot: "bg-lavender-500" },
            { href: "/admin/cms-editor", title: "문항 편집기", desc: "FUN-005 CMS 에디터", dot: "bg-sun-500" },
            { href: "/admin/grading", title: "답안 채점", desc: "FUN-001 수동 채점", dot: "bg-mint-500" },
            { href: "/admin/permissions", title: "권한·알림", desc: "FUN-007 매트릭스", dot: "bg-lavender-500" },
            { href: "/admin/site", title: "사이트 설정", desc: "FUN-008 로고·문구", dot: "bg-sun-500" },
            { href: "/admin/report", title: "운영 보고서", desc: "Raw 데이터·시각화", dot: "bg-sky-500" },
            { href: "/manual", title: "매뉴얼·설명회", desc: "사용자 가이드", dot: "bg-mint-500" },
            { href: "/board", title: "게시판", desc: "FUN-008 공지·Q&A", dot: "bg-sky-500" },
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

        {/* 3단계 로드맵 + M1~M8 타임라인 + 자문위원진 (GeniusX Section 2.2, 3.6, 5) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">3단계 로드맵 — MVP → Phase 1 → Phase 2</h2>

          {/* 3단계 카드 */}
          <div className="grid md:grid-cols-3 gap-3 mb-5">
            <div className="bg-mint-50 border-2 border-mint-300 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-mint-700">1단계 · MVP</span>
                <span className="text-[10px] font-semibold text-mint-700">현재</span>
              </div>
              <div className="text-sm font-bold mb-1">8개월 · 5,000명</div>
              <ul className="text-[11px] text-ink-700 space-y-0.5 mb-2">
                <li>· 차원 1 중 5/8 재능</li>
                <li>· 학력 정식 + 재능 프리뷰</li>
                <li>· 본 파일럿 (M1~M8)</li>
              </ul>
              <div className="text-[10px] text-ink-500 pt-2 border-t border-mint-200">출처 데이터: 285,000건 응답 + 행동 로그</div>
            </div>
            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 opacity-90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-sky-700">2단계 · Phase 1</span>
                <span className="text-[10px] font-semibold text-sky-700">+6개월</span>
              </div>
              <div className="text-sm font-bold mb-1">F1 인지 영역 MVP</div>
              <ul className="text-[11px] text-ink-700 space-y-0.5 mb-2">
                <li>· 실행·주의·메타인지 측정</li>
                <li>· CBT 행동 로그 기반</li>
                <li>· 수리·과학 영역 우선</li>
              </ul>
              <div className="text-[10px] text-ink-500 pt-2 border-t border-sky-200">문항 뱅크 200+ · F1 간접 지표 3종 검증</div>
            </div>
            <div className="bg-lavender-50 border-2 border-lavender-200 rounded-xl p-4 opacity-90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-lavender-700">3단계 · Phase 2</span>
                <span className="text-[10px] font-semibold text-lavender-700">+12개월</span>
              </div>
              <div className="text-sm font-bold mb-1">전체 3차원 통합</div>
              <ul className="text-[11px] text-ink-700 space-y-0.5 mb-2">
                <li>· 8 + 3 + 4 차원 전부</li>
                <li>· 게임화·자기보고·포트폴리오</li>
                <li>· GeniusX Ver.4 완전 구현</li>
              </ul>
              <div className="text-[10px] text-ink-500 pt-2 border-t border-lavender-200">미래성공예측지수 산출 · 진로·교육 설계 보고서</div>
            </div>
          </div>

          <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-2">1단계 MVP — 8개월 마일스톤</div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-5">
            {[
              { m: "M1", t: "문항 개발", c: "bg-mint-50 text-mint-700" },
              { m: "M2", t: "이중 태그", c: "bg-mint-50 text-mint-700" },
              { m: "M3", t: "검증·IRB", c: "bg-sky-50 text-sky-700" },
              { m: "M4", t: "프리테스트", c: "bg-sky-50 text-sky-700" },
              { m: "M5", t: "모집 런칭", c: "bg-lavender-50 text-lavender-700" },
              { m: "M6", t: "본 응시", c: "bg-lavender-50 text-lavender-700" },
              { m: "M7", t: "데이터 분석", c: "bg-sun-50 text-sun-600" },
              { m: "M8", t: "검증 보고서", c: "bg-sun-50 text-sun-600" },
            ].map((m) => (
              <div key={m.m} className={`${m.c} rounded-lg p-2.5 text-center`}>
                <div className="text-[10px] font-bold tracking-widest">{m.m}</div>
                <div className="text-xs font-bold mt-0.5">{m.t}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-ink-100 pt-4">
            <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-3">책임 자문위원진</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {[
                { r: "수학 책임자문", n: "박만구 교수", o: "서울교육대" },
                { r: "과학 책임자문", n: "[섭외 중]", o: "서울과학교육대" },
                { r: "국어 책임자문", n: "[섭외 중]", o: "국어교육 전공" },
                { r: "기술 PM", n: "김종하", o: "(주)제닉스" },
              ].map((p) => (
                <div key={p.r} className="bg-paper-grey rounded-lg p-2.5">
                  <div className="text-[9px] text-ink-600 mb-0.5">{p.r}</div>
                  <div className="font-bold text-sm">{p.n}</div>
                  <div className="text-[10px] text-ink-600">{p.o}</div>
                </div>
              ))}
            </div>
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
