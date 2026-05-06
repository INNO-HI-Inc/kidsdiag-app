import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SiteSettingsPage() {
  return (
    <main className="bg-paper-grey min-h-screen">
      <SiteHeader />
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-sun-500" />FUN-008</span>
            <span className="eyebrow text-mint-600">SITE SETTINGS · 시스템 관리</span>
          </div>
          <h1 className="h-section text-2xl">홈페이지 관리</h1>
          <div className="text-sm text-ink-600 mt-1">학교 이미지(로고·배너) · 기타 문구 수정 · 공지사항 · 게시판</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* 학교 이미지 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">학교 이미지</h2>
              <span className="text-[10px] font-bold text-sun-600 bg-sun-50 px-2 py-0.5 rounded-full">FUN-008</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold tracking-widest text-ink-600">로고 (PNG / SVG · ≤ 1MB)</label>
                <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-paper-grey">
                  <div className="w-14 h-14 rounded-xl bg-carbon-900 text-white flex items-center justify-center font-bold">
                    제닉스
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-semibold">genix_logo.svg</div>
                    <div className="text-ink-500">현재 사용 중</div>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white border border-ink-100 hover:border-mint-300">변경</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest text-ink-600">배너 이미지 (1920×320 권장)</label>
                <div className="mt-2 aspect-[6/1] rounded-xl bg-gradient-to-r from-mint-200 via-sky-200 to-lavender-200 flex items-center justify-center">
                  <span className="text-xs text-ink-700 font-semibold">현재 배너 미리보기</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 text-xs px-3 py-2 rounded-lg bg-paper-grey text-ink-700">변경</button>
                  <button className="flex-1 text-xs px-3 py-2 rounded-lg bg-paper-grey text-ink-700">초기화</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-widest text-ink-600">파비콘 (32×32)</label>
                <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-paper-grey">
                  <div className="w-8 h-8 rounded-md bg-mint-500" />
                  <span className="text-xs flex-1">favicon.ico</span>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white border border-ink-100">변경</button>
                </div>
              </div>
            </div>
          </div>

          {/* 사이트 문구 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6">
            <h2 className="text-base font-bold tracking-tight mb-4">기타 문구 수정</h2>
            <div className="space-y-3 text-xs">
              {[
                { l: "사이트 제목", v: "kidsdiag — AI 기반 초등학력 진단·학습시스템" },
                { l: "메타 디스크립션", v: "(주)제닉스 초3~6 학력 진단 + GeniusX 재능 진단" },
                { l: "헤더 슬로건", v: "초등 3~6학년 학력·재능 이중 진단" },
                { l: "푸터 저작권", v: "© 2026 (주)제닉스" },
                { l: "문의 이메일", v: "support@genix.kr" },
                { l: "고객센터 전화", v: "1588-0000" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-[10px] font-bold tracking-widest text-ink-600">{f.l}</label>
                  <input defaultValue={f.v} className="w-full mt-1 px-3 py-2 rounded-lg border border-ink-100" />
                </div>
              ))}
              <button className="w-full mt-3 px-3 py-2 rounded-lg bg-mint-600 text-white text-sm font-semibold">저장</button>
            </div>
          </div>

          {/* 공지사항 관리 */}
          <div className="bg-white rounded-2xl border border-ink-100 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold tracking-tight">공지사항 · Q&A 게시판 관리</h2>
              <Link href="/board" className="text-xs font-semibold text-mint-700 hover:text-mint-900">게시판 보기 →</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              {[
                { t: "공지", v: "12", l: "전체" },
                { t: "Q&A", v: "47", l: "전체" },
                { t: "답변 대기", v: "3", l: "처리 필요" },
              ].map((s) => (
                <div key={s.t} className="bg-paper-grey rounded-xl p-3 text-center">
                  <div className="text-[10px] font-bold tracking-widest text-ink-600">{s.t.toUpperCase()}</div>
                  <div className="text-xl font-bold tabular-nums tracking-tight mt-0.5">{s.v}</div>
                  <div className="text-[10px] text-ink-600">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2.5 rounded-lg bg-mint-50 text-mint-700 text-xs font-semibold">+ 공지 작성</button>
              <button className="flex-1 px-3 py-2.5 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold">Q&A 답변</button>
              <button className="flex-1 px-3 py-2.5 rounded-lg bg-paper-grey text-ink-700 text-xs font-semibold">게시판 설정</button>
            </div>
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
