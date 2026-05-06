import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function BoardPage() {
  const notices = [
    { tag: "공지", t: "5월 사전 진단 일정 안내", date: "2026.05.04", new: true },
    { tag: "안내", t: "AI 학습도우미 사용 가이드 업데이트", date: "2026.05.02", new: true },
    { tag: "공지", t: "학부모 설명회 개최 (5/18)", date: "2026.04.28", new: false },
    { tag: "안내", t: "동영상 강의 라이브러리 50편 추가", date: "2026.04.20", new: false },
    { tag: "공지", t: "시범 운영 6,000명 모집 마감 (4/30)", date: "2026.04.10", new: false },
  ];

  const qnas = [
    { tag: "답변완료", t: "사후 진단은 언제 받을 수 있나요?", date: "2026.05.03", count: 2 },
    { tag: "답변완료", t: "재능 진단은 어떻게 신청하나요?", date: "2026.05.02", count: 1 },
    { tag: "답변대기", t: "AI 튜터가 작동하지 않습니다", date: "2026.05.01", count: 0 },
    { tag: "답변완료", t: "엑셀 다운로드 안내", date: "2026.04.30", count: 3 },
    { tag: "답변완료", t: "법정대리인 동의 절차 문의", date: "2026.04.28", count: 1 },
  ];

  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="eyebrow text-mint-600 mb-3">BOARD · FUN-008</div>
          <h1 className="h-section text-3xl md:text-4xl">게시판</h1>
          <p className="text-ink-700 mt-3">공지사항 · Q&A · 학교별 안내</p>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-8 border-b-2 border-ink-100">
          <button className="px-5 py-3 text-sm font-bold text-mint-700 border-b-2 border-mint-600 -mb-0.5">
             공지사항
          </button>
          <button className="px-5 py-3 text-sm font-semibold text-ink-500 hover:text-ink-900">
             Q&amp;A
          </button>
          <button className="px-5 py-3 text-sm font-semibold text-ink-500 hover:text-ink-900">
             학교별 안내
          </button>
        </div>

        {/* 공지 리스트 */}
        <div className="bg-white rounded-3xl border-2 border-ink-100 overflow-hidden mb-8">
          <div className="px-6 py-3 bg-paper-grey border-b border-ink-100 grid grid-cols-12 gap-3 text-[10px] font-bold tracking-widest text-ink-600">
            <div className="col-span-2">분류</div>
            <div className="col-span-7">제목</div>
            <div className="col-span-3 text-right">등록일</div>
          </div>
          {notices.map((n, i) => (
            <div key={i} className="px-6 py-4 grid grid-cols-12 gap-3 items-center border-b border-ink-100 last:border-0 hover:bg-paper-grey transition cursor-pointer">
              <div className="col-span-2">
                <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full ${
                  n.tag === "공지" ? "bg-mint-50 text-mint-700" : "bg-sky-50 text-sky-700"
                }`}>
                  {n.tag}
                </span>
              </div>
              <div className="col-span-7 flex items-center gap-2">
                <span className="text-sm font-semibold">{n.t}</span>
                {n.new && <span className="text-[9px] font-bold bg-peach-400 text-white px-1.5 py-0.5 rounded">NEW</span>}
              </div>
              <div className="col-span-3 text-right text-xs text-ink-500 tabular-nums">{n.date}</div>
            </div>
          ))}
        </div>

        {/* Q&A 미니 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl border-2 border-ink-100 p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold tracking-tight"> 자주 묻는 질문 (Q&A)</h2>
              <button className="text-xs font-semibold text-mint-700 hover:text-mint-900">전체 보기 →</button>
            </div>
            <ul className="space-y-3">
              {qnas.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5 pb-3 border-b border-ink-100 last:border-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${
                    q.tag === "답변완료" ? "bg-mint-50 text-mint-700" : "bg-sun-50 text-sun-600"
                  }`}>
                    {q.tag}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-0.5">{q.t}</div>
                    <div className="text-[10px] text-ink-500 tabular-nums">{q.date} · 답변 {q.count}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-mint-50 to-sky-50 rounded-3xl p-7 border-2 border-mint-200">
            <h2 className="text-lg font-bold mb-3 tracking-tight"> 문의 채널</h2>
            <p className="text-xs text-ink-700 leading-[1.7] mb-5">
              학습·진단 관련 문의, 시스템 오류 신고는 아래로 접수해주세요.
            </p>
            <div className="space-y-2.5">
              {[
                { icon: "", l: "이메일", v: "support@kidsdiag.com" },
                { icon: "", l: "전화", v: "1588-0000 (평일 9~18시)" },
                { icon: "", l: "카카오톡", v: "@kidsdiag" },
              ].map((c) => (
                <div key={c.l} className="bg-white rounded-xl p-3 flex items-center gap-3">
                  <div className="text-xl">{c.icon}</div>
                  <div className="flex-1">
                    <div className="text-[10px] text-ink-600 font-semibold">{c.l}</div>
                    <div className="text-sm font-bold">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full bg-mint-600 hover:bg-mint-700 text-white font-bold px-6 py-3 rounded-full text-sm transition">
              + 새 문의 작성
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
