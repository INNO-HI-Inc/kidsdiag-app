import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ManualPage() {
  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white">
              <span className="w-1 h-1 rounded-full bg-mint-500" />과업 4)
            </span>
            <span className="text-[10px] font-bold tracking-widest text-mint-700">USER GUIDE · 사용 매뉴얼</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">사용 매뉴얼 + 오프라인 설명회</h1>
          <p className="text-sm text-ink-600">
            제닉스 전문가 구성원 대상 학력 진단·학습 체계 활용 방법 안내 (RFP I.4.다.4))
          </p>
        </div>

        {/* 매뉴얼 다운로드 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4 tracking-tight">매뉴얼 다운로드</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { t: "관리자 매뉴얼", d: "회원·콘텐츠·통계·시스템 관리", p: "PDF · 64p · 12MB", role: "관리자" },
              { t: "교원 매뉴얼", d: "검사지 생성·결과 조회·알림 발송", p: "PDF · 32p · 7MB", role: "교원" },
              { t: "학부모 매뉴얼", d: "자녀 결과·이력 조회·심화 진단", p: "PDF · 18p · 4MB", role: "학부모" },
              { t: "학생 매뉴얼", d: "사전·향상·총괄·튜터 사용", p: "PDF · 14p · 3MB", role: "학생" },
              { t: "운영자 가이드 (시스템 설정)", d: "SSO 연동·접근성·보안", p: "PDF · 28p · 6MB", role: "기술" },
              { t: "전체 통합 매뉴얼", d: "위 5종 합본", p: "PDF · 156p · 32MB", role: "전체" },
            ].map((m) => (
              <div key={m.t} className="bg-paper-grey rounded-xl p-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-ink-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-ink-600">
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold tracking-tight">{m.t}</div>
                  <div className="text-[11px] text-ink-700 leading-[1.5] mt-0.5">{m.d}</div>
                  <div className="text-[10px] text-ink-500 mt-1.5 tabular-nums">{m.p}</div>
                </div>
                <button className="text-xs font-bold text-mint-700 hover:text-mint-900 flex-shrink-0">↓</button>
              </div>
            ))}
          </div>
        </div>

        {/* 오프라인 설명회 일정 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4 tracking-tight">오프라인 설명회 일정</h2>
          <div className="space-y-3">
            {[
              { d: "2026.06.10 (월)", t: "10:00 ~ 12:00", l: "제닉스 본사 5F 대회의실", topic: "관리자·운영자 대상 시스템 활용", status: "예정" },
              { d: "2026.06.11 (화)", t: "14:00 ~ 16:00", l: "제닉스 본사 5F 대회의실", topic: "교원 대상 검사지 생성·결과 분석", status: "예정" },
              { d: "2026.06.18 (화)", t: "19:00 ~ 20:30", l: "온라인 (Zoom)", topic: "학부모 설명회 — 리포트 보는 법", status: "예정" },
              { d: "2026.06.25 (화)", t: "10:00 ~ 12:00", l: "제닉스 본사 5F 대회의실", topic: "Q&A 세션 + 피드백 반영", status: "예정" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-paper-grey">
                <div className="text-center min-w-[80px]">
                  <div className="text-[10px] font-bold text-mint-700">{s.d.split(" ")[0]}</div>
                  <div className="text-[10px] text-ink-600">{s.d.split(" ")[1]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold tracking-tight">{s.topic}</div>
                  <div className="text-[11px] text-ink-600 mt-0.5">{s.t} · {s.l}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">{s.status}</span>
                <button className="text-xs font-semibold text-mint-700">신청 →</button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-ink-100 text-[11px] text-ink-600 leading-[1.6]">
            ※ RFP I.4.다.4) — 제닉스 전문가 구성원 대상 AI기반 학력 진단 및 학습 체계 활용 방법(학력 진단방법, 교육콘텐츠 활용방법, 학생 성취도 관리 등) <strong>최소 1회 이상 오프라인 설명회 실시 + 사용 매뉴얼 등 제공</strong>
          </div>
        </div>

        {/* 이해관계자 수용성 자료 (GeniusX Section 4.5) */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
          <h2 className="text-base font-bold mb-4 tracking-tight">이해관계자 수용성 자료</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-sky-50 rounded-xl p-4">
              <div className="text-[10px] font-bold tracking-widest text-sky-700 mb-2">교사용</div>
              <div className="text-sm font-bold mb-1.5">1페이지 안내자료</div>
              <p className="text-[11px] text-ink-700 leading-[1.6] mb-3">
                업무 부담 정량 제시 (교실당 실시 시간, 교사 역할 최소화)
              </p>
              <button className="text-xs font-bold text-sky-700 hover:text-sky-900">PDF 다운로드 ↓</button>
            </div>
            <div className="bg-lavender-50 rounded-xl p-4">
              <div className="text-[10px] font-bold tracking-widest text-lavender-700 mb-2">학부모용</div>
              <div className="text-sm font-bold mb-1.5">설명회 영상 (5~7분)</div>
              <p className="text-[11px] text-ink-700 leading-[1.6] mb-3">
                목적·방법·결과·개인정보·심화 진단 연계 FAQ 형식
              </p>
              <button className="text-xs font-bold text-lavender-700 hover:text-lavender-900">영상 시청 →</button>
            </div>
            <div className="bg-sun-50 rounded-xl p-4">
              <div className="text-[10px] font-bold tracking-widest text-sun-600 mb-2">교장·교감용</div>
              <div className="text-sm font-bold mb-1.5">브리핑 자료</div>
              <p className="text-[11px] text-ink-700 leading-[1.6] mb-3">
                교육청 협약 기반 외 학교장 의사결정 지원용
              </p>
              <button className="text-xs font-bold text-sun-600 hover:text-sun-700">PDF 다운로드 ↓</button>
            </div>
          </div>
        </div>

        {/* 환경 호환 안내 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7">
          <h2 className="text-base font-bold mb-4 tracking-tight">지원 환경 (RFP I.4.다.6))</h2>
          <p className="text-xs text-ink-700 leading-[1.7] mb-4">
            운영체제(Android·iOS)와 무관하게 모바일·태블릿·PC·홈페이지 등 다양한 환경에서 학습 가능.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { t: "PC", d: "Windows · macOS", icon: "PC" },
              { t: "태블릿", d: "iPad · Android Tab", icon: "TAB" },
              { t: "모바일", d: "iOS · Android", icon: "MO" },
              { t: "홈페이지", d: "모든 모던 브라우저", icon: "WEB" },
            ].map((c) => (
              <div key={c.t} className="bg-paper-grey rounded-xl p-4 text-center">
                <div className="text-[10px] font-bold tracking-widest text-ink-600 mb-1">{c.icon}</div>
                <div className="text-sm font-bold">{c.t}</div>
                <div className="text-[10px] text-ink-700 mt-0.5">{c.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Chrome", "Edge", "Safari", "Firefox", "Samsung Internet"].map((b) => (
              <span key={b} className="text-[10px] font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 rounded">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
