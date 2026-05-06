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
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
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

        {/* CBT 응답 데이터 계층 L1·L2·L3 (GeniusX Section 3.3) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">CBT 응답 데이터 계층 (L1·L2·L3)</h2>
          <div className="space-y-3">
            {[
              {
                tier: "L1",
                name: "정답 신호",
                signals: "정답 여부 · 부분점수 · 선택형 응답값",
                priority: "필수",
                phase: "1단계 차원 1 재능 + 학력 성취도",
                color: "bg-mint-50 border-mint-300",
                priorityColor: "bg-mint-500 text-white",
              },
              {
                tier: "L2",
                name: "시간 신호",
                signals: "총 응답시간 · 첫 클릭 · 검토시간 · 블록별 시간 분포",
                priority: "필수",
                phase: "1단계 간접 + 2단계 F1 주의·작업기억",
                color: "bg-sky-50 border-sky-300",
                priorityColor: "bg-sky-500 text-white",
              },
              {
                tier: "L3",
                name: "행동 신호",
                signals: "재검토 횟수 · 선택지 변경 · 서술 입력 궤적 · 스크롤 패턴",
                priority: "권장",
                phase: "2·3단계 F1 메타인지·인지유연성",
                color: "bg-lavender-50 border-lavender-300",
                priorityColor: "bg-sun-500 text-white",
              },
            ].map((t) => (
              <div key={t.tier} className={`${t.color} border-2 rounded-xl p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold tabular-nums tracking-tight">{t.tier}</span>
                  <span className="font-bold text-sm">{t.name}</span>
                  <span className={`ml-auto text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full ${t.priorityColor}`}>
                    {t.priority}
                  </span>
                </div>
                <div className="text-xs text-ink-700 mb-1.5">{t.signals}</div>
                <div className="text-[11px] text-ink-600 pt-2 border-t border-ink-100/50">활용 단계: {t.phase}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-ink-600 leading-[1.6] bg-paper-grey rounded-xl p-3">
            L3 행동 신호는 1단계에서 직접 활용하지 않더라도 <strong className="text-ink-900">저장 스키마만 미리 구축</strong>해 두어 2·3단계 별도 개발 부담 없이 활용 가능한 사전 축적 자산이 됨.
          </div>
        </div>

        {/* 검증 체계 5지표 (GeniusX Section 3.5) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">검증 체계 — 5개 핵심 지표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] text-ink-500 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="pb-2 text-left">검증 대상</th>
                  <th className="pb-2 text-left">지표</th>
                  <th className="pb-2 text-left">합격 기준</th>
                  <th className="pb-2 text-center">현재값</th>
                  <th className="pb-2 text-right">상태</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { d: "학력진단 타당도", m: "Cronbach's α", c: "≥ 0.80", v: "0.84", ok: true },
                  { d: "학력진단 IRT", m: "변별도 / 난이도 / 추측도", c: "a≥0.5 · b∈[-2,2] · c≤0.25", v: "OK", ok: true },
                  { d: "학력진단 적합도", m: "Infit / Outfit MNSQ", c: "∈ [0.7, 1.3]", v: "0.92", ok: true },
                  { d: "재능 매핑 타당도", m: "CFA · CFI / RMSEA", c: "CFI ≥ 0.90, RMSEA ≤ 0.08", v: "0.92 · 0.06", ok: true },
                  { d: "이중 매핑 직교성 (최우선)", m: "학력 × 재능 상관 r", c: "r ∈ [0.3, 0.6]", v: "0.42", ok: true },
                  { d: "발달 차이 검증", m: "Levene's Test", c: "p < 0.05 분산 차이 유의", v: "p=0.03", ok: true },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-ink-100 last:border-0">
                    <td className="py-2.5 text-xs font-semibold">{r.d}</td>
                    <td className="py-2.5 text-xs text-ink-700">{r.m}</td>
                    <td className="py-2.5 text-[11px] text-ink-600 font-mono">{r.c}</td>
                    <td className="py-2.5 text-center text-xs font-bold tabular-nums">{r.v}</td>
                    <td className="py-2.5 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.ok ? "bg-mint-50 text-mint-700" : "bg-peach-100 text-peach-500"}`}>
                        {r.ok ? "통과" : "미달"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* B플랜 — 실패 시나리오 (GeniusX Section 4.7) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4">B플랜 — 실패 시나리오 대응</h2>
          <div className="space-y-2.5">
            {[
              { fail: "학력진단 α < 0.80", action: "저성능 문항 식별 → 뱅크 제외 → 잔여 문항 재분석. 학력진단 자체 유효 판정." },
              { fail: "이중 매핑 r > 0.8 (같은 것 측정)", action: "재능 태그 재구성 + Phase 1 CBT 행동 로그 기반 F1 지표 도입으로 차별화 확보. 1단계 재능진단은 프리뷰 수준 유지." },
              { fail: "이중 매핑 r < 0.2 (무의미)", action: "태그 B의 타당도 근본 문제. 1단계 재능진단 보고 중단, 학력진단 단독 서비스 전환. 태그 체계 전면 재설계 후 재시도." },
              { fail: "CFA 미달", action: "오히려 긍정 신호 가능 — GeniusX 8재능 구조가 한국 3·4학년 데이터에 완전 맞지 않음을 시사. 데이터 기반 구조 수정으로 학술 논문화 기회." },
              { fail: "응시자 4,000명 미만 확보", action: "기간 2주 연장 + 모집 채널 확장. 최악 시 파일럿 범위 축소 (3학년만, 2,500명)로 학년 내 분석 심화." },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-paper-grey">
                <div className="w-1.5 h-1.5 rounded-full bg-peach-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-peach-500 mb-1">{r.fail}</div>
                  <div className="text-xs text-ink-700 leading-[1.6]">{r.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 1·2 자산 이전 설계 (GeniusX Section 4.8) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold tracking-tight">Phase 1·2 자산 이전 설계</h2>
            <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2 py-0.5 rounded-full">285,000건 응답 + 행동 로그</span>
          </div>
          <p className="text-xs text-ink-700 leading-[1.7] mb-4">
            본 파일럿의 가장 큰 숨은 자산은 5,000명 × 57문항 = 285,000건 응답 데이터 + 행동 로그입니다. Phase 1·2로 이전하는 설계가 처음부터 구축되어 재활용 가능합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { t: "IRT 모수 초기값", d: "Phase 1 상용 서비스 문항의 사전 난이도·변별도 추정치", icon: "α·β" },
              { t: "재능 프로파일 기저 분포", d: "학부모 리포트 '또래 비교' 백분위 산출 기준", icon: "P" },
              { t: "F1 행동 로그 학습 데이터", d: "Phase 1 F1 간접 지표 머신러닝 모델 학습 데이터", icon: "ML" },
              { t: "종단 추적 기반", d: "동의자 대상 1년 후 재응시로 발달 궤적 실증", icon: "1yr" },
              { t: "학술 논문 ① 파일럿 타당화", d: "박민구 교수 책임연구원 체제, 학회 발표·논문화", icon: "P1" },
              { t: "학술 논문 ② Ver.4 민감기 이론 실증", d: "3·4학년 프로파일 변별도 차이 데이터 기반", icon: "P2" },
            ].map((a) => (
              <div key={a.t} className="bg-paper-grey rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-ink-100 flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-ink-600">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold mb-0.5">{a.t}</div>
                  <div className="text-[11px] text-ink-700 leading-[1.5]">{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 일괄 다운로드 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7">
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
