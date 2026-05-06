import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RolePageHeader from "@/components/RolePageHeader";

export default function ReportPage() {
  return (
    <main className="bg-paper-grey min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <RolePageHeader
          role="admin"
          title="운영 결과 보고서 + Raw 데이터"
          subtitle="프로그램 운영 종료시 학습 참여율·결과분석 등 학습 전반 자료 + 시각화 보고서 + Raw 데이터"
          funBadges={[{ id: "FUN-006" }]}
          kpis={[
            { v: "5,124", l: "총 응시자" },
            { v: "73%", l: "참여율" },
            { v: "+15.4p", l: "평균 향상도" },
            { v: "4.6/5", l: "리포트 만족도" },
          ]}
          actions={
            <button className="bg-mint-600 hover:bg-mint-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition">
              종합 보고서 생성 (PDF)
            </button>
          }
        />

        {/* 시각화 보고서 항목 */}
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <h2 className="text-base font-bold mb-4">시각화 자료 (도표·그래프)</h2>
            <ul className="space-y-2 text-sm">
              {[
                { t: "학년별 응시자 분포 (막대)", n: "4개 학년" },
                { t: "성별·소득분위 분포 (도넛)", n: "5,124명" },
                { t: "교과별 평균 마스터리 (방사형)", n: "4교과" },
                { t: "5단계 수준 분포 (히트맵)", n: "최우수~기초미달" },
                { t: "사전→사후 향상도 곡선", n: "월별 추이" },
                { t: "학교별 TOP 20 (가로 막대)", n: "127개교" },
                { t: "재능 8차원 레이더 (전체 평균)", n: "5측정+3미발현" },
                { t: "참여율·완료율 (라인)", n: "주차별" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
                  <span className="flex-1 text-sm font-semibold">{c.t}</span>
                  <span className="text-xs text-ink-600 tabular-nums">{c.n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <h2 className="text-base font-bold mb-4">Raw 데이터 (학생 시험·보완 학습)</h2>
            <ul className="space-y-2 text-sm">
              {[
                { t: "응답 답안 데이터", n: "292,068행", f: "CSV·JSON" },
                { t: "응시 행동 로그", n: "1.2M행", f: "JSON" },
                { t: "AI 튜터 대화 로그", n: "18,247건", f: "JSON" },
                { t: "동영상 시청 기록", n: "147,892건", f: "CSV" },
                { t: "오답 노트 데이터", n: "23,418건", f: "CSV" },
                { t: "사전→사후 결과 매핑", n: "5,124행", f: "Excel" },
                { t: "재능 프로파일 데이터", n: "5,124행", f: "Excel·JSON" },
                { t: "학습 콘텐츠 메타데이터", n: "1,431행", f: "Excel" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-3 py-2 border-b border-ink-100 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className="flex-1 text-sm font-semibold">{c.t}</span>
                  <span className="text-xs text-ink-600 tabular-nums">{c.n}</span>
                  <button className="text-[10px] font-bold text-sky-700 hover:text-sky-900">{c.f} ↓</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 종합 보고서 구조 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">종합 운영 보고서 구조 (PDF 5장)</h2>
          <ol className="grid md:grid-cols-5 gap-3">
            {[
              { n: "1", t: "운영 개요", d: "기간·대상·범위" },
              { n: "2", t: "참여율 분석", d: "응시·완료·이탈" },
              { n: "3", t: "학력 결과", d: "교과·수준·향상도" },
              { n: "4", t: "재능 분석", d: "8차원 분포" },
              { n: "5", t: "정책 제언", d: "후속 운영 제안" },
            ].map((c) => (
              <li key={c.n} className="bg-paper-grey rounded-xl p-4">
                <div className="text-2xl font-bold text-ink-300 tabular-nums">{c.n}</div>
                <div className="text-sm font-bold mt-1 tracking-tight">{c.t}</div>
                <div className="text-[10px] text-ink-600 mt-0.5">{c.d}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* 일괄 다운로드 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-7">
          <h2 className="text-base font-bold mb-4">일괄 다운로드</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { t: "전체 ZIP 패키지", d: "보고서 + Raw 데이터", color: "bg-carbon-900 text-white" },
              { t: "Excel 통합본", d: "8개 시트", color: "bg-mint-50 text-mint-700" },
              { t: "CSV 묶음", d: "원본 데이터 ZIP", color: "bg-sky-50 text-sky-700" },
              { t: "JSON 묶음", d: "API 호환 포맷", color: "bg-lavender-50 text-lavender-700" },
            ].map((c) => (
              <button key={c.t} className={`${c.color} rounded-xl p-4 text-left hover:-translate-y-0.5 transition`}>
                <div className="text-sm font-bold">{c.t}</div>
                <div className="text-[10px] mt-0.5 opacity-80">{c.d}</div>
              </button>
            ))}
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
