import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconArrowRight } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="bg-paper text-ink-900">
      <SiteHeader />

      {/* HERO */}
      <section className="border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-mint-50 text-mint-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
            (주)제닉스 · AI 기반 초등학력 진단·학습시스템
          </div>
          <h1 className="h-hero text-4xl md:text-5xl mb-5">
            초등 3~6학년<br />
            <span className="text-mint-600">학력·재능 이중 진단</span>
          </h1>
          <p className="text-base text-ink-700 leading-[1.7] mb-8 max-w-xl mx-auto">
            수학·과학·국어 3교과 + 통합사고력 57문항 / 45분.<br />
            사전 진단 → 맞춤 학습 → 사후 진단까지.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-7 py-3.5 rounded-full transition shadow-pop">
              회원 가입 <IconArrowRight size={18} />
            </Link>
            <Link href="/select" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-ink-200 hover:border-mint-500 text-ink-900 font-semibold px-7 py-3.5 rounded-full transition">
              사전 진단 시작
            </Link>
          </div>
        </div>
      </section>

      {/* 3교과 + 통합사고력 (RFP 상세 1 + GeniusX 교과 구성) */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="eyebrow text-mint-600 mb-3">CONTENT · 57문항 / 45분</div>
            <h2 className="h-section text-2xl md:text-3xl">진단 교과 4블록</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "국어", q: 10, t: 8, color: "bg-lavender-50 border-lavender-200 text-lavender-700", focus: "읽기·어휘" },
              { name: "과학", q: 20, t: 15, color: "bg-sky-50 border-sky-200 text-sky-700", focus: "자연·생태" },
              { name: "수학", q: 15, t: 12, color: "bg-mint-50 border-mint-200 text-mint-700", focus: "수리·논리" },
              { name: "통합사고력", q: 12, t: 10, color: "bg-sun-50 border-sun-200 text-sun-600", focus: "공간·자기성찰" },
            ].map((s) => (
              <div key={s.name} className={`${s.color} border-2 rounded-2xl p-5`}>
                <h3 className="font-bold text-base mb-1">{s.name}</h3>
                <div className="text-[10px] text-ink-600 mb-3">{s.focus}</div>
                <div className="text-2xl font-bold tabular-nums">{s.q}<span className="text-sm font-medium ml-1">문항</span></div>
                <div className="text-xs text-ink-600 mt-1">{s.t}분</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8개 재능 + 윤리 (GeniusX 핵심) */}
      <section className="py-20 border-b border-ink-100 bg-paper-grey">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-lavender-700 mb-3">GeniusX · 8 TALENTS</div>
            <h2 className="h-section text-2xl md:text-3xl">학력 한 번에, 재능 8개 동시 진단</h2>
            <p className="text-ink-700 mt-3 text-sm">교과 문항에 학력(태그 A) + 재능(태그 B) 이중 매핑</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { n: "수리·논리", measured: true, color: "bg-mint-50 border-mint-200 text-mint-700" },
              { n: "자연·생태", measured: true, color: "bg-success-50 border-success-100 text-success-600" },
              { n: "공간·시각", measured: true, color: "bg-sky-50 border-sky-200 text-sky-700" },
              { n: "언어·기호", measured: true, color: "bg-lavender-50 border-lavender-200 text-lavender-700" },
              { n: "자기·성찰", measured: true, color: "bg-sun-50 border-sun-200 text-sun-600" },
              { n: "음향·리듬", measured: false, color: "bg-paper-grey border-ink-200 text-ink-500" },
              { n: "신체·운동", measured: false, color: "bg-paper-grey border-ink-200 text-ink-500" },
              { n: "사회·관계", measured: false, color: "bg-paper-grey border-ink-200 text-ink-500" },
            ].map((t) => (
              <div key={t.n} className={`${t.color} border-2 rounded-xl p-4 ${!t.measured && "opacity-60"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">{t.n}</h3>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${t.measured ? "bg-white" : "bg-white text-ink-500"}`}>
                    {t.measured ? "측정" : "심화"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-lavender-200">
            <p className="text-sm text-ink-800 leading-[1.7] font-semibold mb-2">
              점수가 낮은 영역은 <span className="text-lavender-700">'약점'이 아닌 '아직 발현되지 않은 영역'</span>입니다.
            </p>
            <p className="text-xs text-ink-600 leading-[1.7]">
              GeniusX Ver.4 핵심 원칙: "발현되지 않은 재능은 진단할 수 없다"
            </p>
          </div>
        </div>
      </section>

      {/* 4역할 (RFP FUN-007) */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-mint-600 mb-3">4 ROLES · FUN-007</div>
            <h2 className="h-section text-2xl md:text-3xl">사용자 4역할 권한 분리</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { r: "학생", icon: "", href: "/mypage", color: "bg-mint-50 border-mint-200 text-mint-700" },
              { r: "교원", icon: "‍", href: "/teacher", color: "bg-sky-50 border-sky-200 text-sky-700" },
              { r: "학부모", icon: "", href: "/parent/report/child_demo", color: "bg-lavender-50 border-lavender-200 text-lavender-700" },
              { r: "관리자", icon: "", href: "/admin", color: "bg-sun-50 border-sun-200 text-sun-600" },
            ].map((r) => (
              <Link key={r.r} href={r.href} className={`${r.color} border-2 rounded-2xl p-5 text-center hover:-translate-y-1 transition`}>
                <div className="text-3xl mb-2">{r.icon}</div>
                <h3 className="font-bold">{r.r}</h3>
                <div className="text-[10px] text-ink-600 mt-1">화면 보기 →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FUN-001 ~ FUN-008 기능 요구사항 8종 */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-mint-600 mb-3">RFP V2 · FUN-001 ~ FUN-008</div>
            <h2 className="h-section text-2xl md:text-3xl">기능 요구사항 8종 충족</h2>
            <p className="text-sm text-ink-700 mt-3">각 요구사항이 어느 화면에서 구현되는지 한눈에 확인</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                id: "FUN-001", name: "3개 영역 기초학습 진단·총괄 검사",
                desc: "수학·과학·국어 사전·사후 진단 (CAT 적응형, 4블록 57문항)",
                href: "/select", linkLabel: "진단 시작 →",
                color: "bg-mint-50 border-mint-200 text-mint-700",
              },
              {
                id: "FUN-002", name: "진단·총괄 검사 결과 및 종합 결과",
                desc: "마스터리%·신뢰구간·랭킹·진도·8재능 레이더·전국 백분위",
                href: "/result/demo", linkLabel: "결과 보기 →",
                color: "bg-sky-50 border-sky-200 text-sky-700",
              },
              {
                id: "FUN-003", name: "학력 학습 학습 기능",
                desc: "동영상 강의 라이브러리 + 학습 자료실 + AI 학습 도우미 + 오답·유사 문항",
                href: "/improvement", linkLabel: "향상교육 →",
                color: "bg-lavender-50 border-lavender-200 text-lavender-700",
              },
              {
                id: "FUN-004", name: "학습이력 관리",
                desc: "일자·시간·내용 타임라인 + 종합 대시보드 (학생용)",
                href: "/mypage", linkLabel: "마이페이지 →",
                color: "bg-sun-50 border-sun-200 text-sun-600",
              },
              {
                id: "FUN-005", name: "콘텐츠 관리 시스템 (CMS)",
                desc: "문항·동영상 등록·수정·삭제 + 메타데이터 검색 + LaTeX·이미지·음성",
                href: "/admin", linkLabel: "관리자 콘솔 →",
                color: "bg-mint-50 border-mint-200 text-mint-700",
              },
              {
                id: "FUN-006", name: "통계 기능",
                desc: "학생 통계·진단/총괄 영역별 현황 + Excel·CSV·JSON 다운로드",
                href: "/admin", linkLabel: "통계 대시보드 →",
                color: "bg-sky-50 border-sky-200 text-sky-700",
              },
              {
                id: "FUN-007", name: "권한 관리 기능",
                desc: "학생·교원·학부모·관리자 4역할 RBAC + 알림 발송",
                href: "/admin", linkLabel: "권한 매트릭스 →",
                color: "bg-lavender-50 border-lavender-200 text-lavender-700",
              },
              {
                id: "FUN-008", name: "시스템(홈페이지) 관리 기능",
                desc: "공지사항·Q&A 게시판 등록·수정·삭제 + 학교 이미지(로고·배너) 관리",
                href: "/board", linkLabel: "게시판 →",
                color: "bg-sun-50 border-sun-200 text-sun-600",
              },
            ].map((f) => (
              <Link
                key={f.id}
                href={f.href}
                className={`${f.color} border-2 rounded-2xl p-5 hover:-translate-y-1 transition group block`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-widest bg-white px-2 py-0.5 rounded-full">
                    {f.id}
                  </span>
                  <span className="text-xs font-semibold opacity-60 group-hover:opacity-100">
                    {f.linkLabel}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1.5 tracking-tight">{f.name}</h3>
                <p className="text-[11px] text-ink-700 leading-[1.6]">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 사전·사후 진단 (RFP 과업범위 1) */}
      <section className="py-20 border-b border-ink-100 bg-paper-grey">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-accent-700 mb-3">PRE · POST</div>
            <h2 className="h-section text-2xl md:text-3xl">사전 → 사후 진단으로 학습 효과 측정</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-white border-2 border-ink-100 rounded-2xl p-6">
              <div className="text-[10px] font-bold tracking-widest text-ink-700 mb-2">사전 진단</div>
              <div className="text-3xl font-bold tabular-nums">42<span className="text-base text-ink-400">%</span></div>
              <div className="text-xs text-ink-600 mt-1">학습 시작 전 기준점</div>
            </div>
            <div className="bg-mint-50 border-2 border-mint-300 rounded-2xl p-6">
              <div className="text-[10px] font-bold tracking-widest text-mint-700 mb-2">사후 진단</div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-mint-700 tabular-nums">78<span className="text-base text-mint-500">%</span></div>
                <span className="text-xs font-bold text-mint-600 bg-white px-2 py-0.5 rounded-full">+36p</span>
              </div>
              <div className="text-xs text-ink-600 mt-1">동일 영역 응시로 향상도 정량 측정</div>
            </div>
          </div>
        </div>
      </section>

      {/* 향상교육 (RFP FUN-003) */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-sky-700 mb-3">향상교육 · FUN-003</div>
            <h2 className="h-section text-2xl md:text-3xl">동영상 강의 · AI 학습 도우미 · 맞춤 추천 문항</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: "동영상 강의", d: "결손 영역 매칭 동영상 라이브러리", icon: "" },
              { t: "AI 학습 도우미", d: "개별 질의·피드백 (정답 직답 X)", icon: "" },
              { t: "오답·유사 문항", d: "오답 유형 관리 + 유사 문항 자동 추천", icon: "" },
            ].map((f) => (
              <div key={f.t} className="bg-white border-2 border-ink-100 rounded-2xl p-5">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold mb-1">{f.t}</h3>
                <p className="text-xs text-ink-700 leading-[1.6]">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 학부모 리포트 3페이지 (GeniusX) */}
      <section className="py-20 border-b border-ink-100 bg-paper-grey">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-mint-600 mb-3">PARENT REPORT</div>
            <h2 className="h-section text-2xl md:text-3xl">학부모 리포트 3페이지</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-mint-200 rounded-2xl p-5">
              <div className="text-[10px] font-bold text-mint-700 mb-2">P. 1 · 학력 결과</div>
              <ul className="space-y-1.5 text-xs text-ink-700">
                <li>· 교과별 성취수준</li>
                <li>· 전국 분포 백분위</li>
                <li>· 부진 영역 학습 가이드</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-lavender-200 rounded-2xl p-5">
              <div className="text-[10px] font-bold text-lavender-700 mb-2">P. 2 · 재능 프로필</div>
              <ul className="space-y-1.5 text-xs text-ink-700">
                <li>· 8개 재능 레이더차트</li>
                <li>· 5개 측정 + 3개 미발현</li>
                <li>· 상위 2개 재능 해설</li>
              </ul>
            </div>
            <div className="bg-carbon-900 text-white rounded-2xl p-5">
              <div className="text-[10px] font-bold text-accent-500 mb-2">P. 3 · 심화 진단 안내</div>
              <ul className="space-y-1.5 text-xs text-white/80">
                <li>· 발현 조건 3차원</li>
                <li>· 21세기 역량 4차원</li>
                <li>· 진로·교육 설계 보고서</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { v: "Cohen's κ", l: "≥ 0.7" },
              { v: "Cronbach α", l: "≥ 0.80" },
              { v: "IRT", l: "2PL/3PL" },
              { v: "CFA", l: "CFI ≥ 0.90" },
              { v: "직교성", l: "r ∈ [0.3, 0.6]" },
            ].map((s) => (
              <div key={s.v} className="bg-white rounded-xl p-3 border border-ink-100 text-center">
                <div className="text-sm font-bold tracking-tight">{s.v}</div>
                <div className="text-[10px] text-ink-600 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터 거버넌스 (GeniusX 법규 + RFP WCAG/SSO) */}
      <section className="py-20 border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-peach-500 mb-3">DATA · LEGAL · A11Y</div>
            <h2 className="h-section text-2xl md:text-3xl">법규 준수 · 데이터 보호 · 접근성</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { t: "법정대리인 동의", d: "만 14세 미만", icon: "" },
              { t: "5년 자동 파기", d: "보관 기간 명시", icon: "" },
              { t: "익명 ID", d: "실명 미수집", icon: "" },
              { t: "IRB 심의", d: "서울교대 경유", icon: "" },
              { t: "캡처 방지", d: "스크린샷 차단", icon: "" },
              { t: "동적 문항 할당", d: "57→55 랜덤", icon: "" },
              { t: "WCAG 2.1", d: "한국형 웹 접근성", icon: "" },
              { t: "SSO 연동", d: "제닉스 포털", icon: "" },
            ].map((s) => (
              <div key={s.t} className="bg-white border border-ink-100 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xs font-bold">{s.t}</div>
                <div className="text-[10px] text-ink-600 mt-0.5">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8개월 타임라인 + 응시자 대표성 */}
      <section className="py-20 border-b border-ink-100 bg-paper-grey">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="eyebrow text-mint-600 mb-3">PILOT · M1~M8</div>
            <h2 className="h-section text-2xl md:text-3xl">파일럿 운영 · 5,000명 · 8개월</h2>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-ink-100 mb-6">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {[
                { m: "M1", t: "문항 개발" },
                { m: "M2", t: "이중 태그" },
                { m: "M3", t: "검증·IRB" },
                { m: "M4", t: "프리테스트" },
                { m: "M5", t: "모집 런칭" },
                { m: "M6", t: "본 응시" },
                { m: "M7", t: "데이터 분석" },
                { m: "M8", t: "검증 보고서" },
              ].map((m) => (
                <div key={m.m} className="bg-paper-grey rounded-lg p-2.5 text-center">
                  <div className="text-[10px] font-bold text-mint-700">{m.m}</div>
                  <div className="text-xs font-semibold mt-0.5">{m.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "도시:비도시:읍면", v: "5 : 3 : 2" },
              { l: "저소득층 비율", v: "≥ 15%" },
              { l: "일반 공립", v: "≥ 80%" },
              { l: "특수교육 대상", v: "3~5%" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl p-4 border border-ink-100 text-center">
                <div className="text-base font-bold tabular-nums tracking-tight">{s.v}</div>
                <div className="text-[10px] text-ink-600 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-paper">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="h-section text-2xl md:text-3xl mb-5">지금 시작하세요</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-mint-600 hover:bg-mint-700 text-white font-semibold px-7 py-3.5 rounded-full transition">
              회원 가입
            </Link>
            <Link href="/select" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-ink-200 hover:border-mint-500 text-ink-900 font-semibold px-7 py-3.5 rounded-full transition">
              사전 진단 시작
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
