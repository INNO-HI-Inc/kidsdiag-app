import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const MATRIX = [
  { feature: "사전·사후 검사 응시", student: true, teacher: false, parent: false, admin: false },
  { feature: "응시 결과 조회 (본인)", student: true, teacher: false, parent: false, admin: false },
  { feature: "검사지 생성 (3영역)", student: false, teacher: "등록한 학생만", parent: false, admin: true },
  { feature: "응시 결과 조회 (학생들)", student: false, teacher: "등록 학생만", parent: "자녀만", admin: true },
  { feature: "답안 등록·수동 채점", student: false, teacher: false, parent: false, admin: true },
  { feature: "콘텐츠 관리 (CMS)", student: false, teacher: false, parent: false, admin: true },
  { feature: "회원 관리 (등록·수정·삭제·승인)", student: false, teacher: false, parent: false, admin: true },
  { feature: "통계·엑셀 다운로드", student: false, teacher: "본인 반", parent: false, admin: true },
  { feature: "알림 발송", student: false, teacher: "본인 반", parent: false, admin: true },
  { feature: "공지사항 관리", student: false, teacher: false, parent: false, admin: true },
  { feature: "학교 이미지·로고 관리", student: false, teacher: false, parent: false, admin: true },
  { feature: "학습 이력 조회 (본인)", student: true, teacher: false, parent: "자녀만", admin: true },
];

const cell = (v: boolean | string) => {
  if (v === true) return <span className="text-mint-700 font-bold">●</span>;
  if (v === false) return <span className="text-ink-300">·</span>;
  return <span className="text-[10px] font-semibold text-sun-600">{v}</span>;
};

export default function PermissionsPage() {
  return (
    <main className="bg-paper-grey min-h-screen">
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-lavender-500" />FUN-007</span>
            <span className="eyebrow text-mint-600">PERMISSIONS · 권한 관리</span>
          </div>
          <h1 className="h-section text-2xl">권한 매트릭스 + 알림 발송</h1>
          <div className="text-sm text-ink-600 mt-1">학생·교원·학부모·관리자 4역할 RBAC</div>
        </div>

        {/* 권한 매트릭스 */}
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden mb-6">
          <div className="px-6 py-3 bg-paper-grey border-b border-ink-100">
            <h2 className="text-sm font-bold tracking-tight">권한 매트릭스</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-bold tracking-widest text-ink-600 border-b border-ink-100">
                  <th className="px-6 py-3 text-left">기능</th>
                  <th className="px-3 py-3 text-center bg-mint-50">학생</th>
                  <th className="px-3 py-3 text-center bg-sky-50">교원</th>
                  <th className="px-3 py-3 text-center bg-lavender-50">학부모</th>
                  <th className="px-3 py-3 text-center bg-sun-50">관리자</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row.feature} className="border-b border-ink-100 last:border-0 hover:bg-paper-grey">
                    <td className="px-6 py-3 text-xs font-semibold">{row.feature}</td>
                    <td className="px-3 py-3 text-center text-base">{cell(row.student)}</td>
                    <td className="px-3 py-3 text-center text-base">{cell(row.teacher)}</td>
                    <td className="px-3 py-3 text-center text-base">{cell(row.parent)}</td>
                    <td className="px-3 py-3 text-center text-base">{cell(row.admin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-paper-grey border-t border-ink-100 text-[10px] text-ink-600 flex gap-4">
            <span><span className="text-mint-700 font-bold">●</span> 가능</span>
            <span><span className="text-sun-600 font-bold">조건부</span> 등록자 한정</span>
            <span><span className="text-ink-300">·</span> 불가</span>
          </div>
        </div>

        {/* 학생 검색 + 알림 발송 폼 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="text-base font-bold mb-4 tracking-tight">대상자별 검색</h2>
            <div className="space-y-2 mb-4">
              <input placeholder="이름·학번 검색" className="w-full px-3 py-2 rounded-lg border border-ink-100 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
                  <option>전체 학교</option><option>제닉스초</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
                  <option>전체 학년</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
                  <option>전체 성별</option><option>여</option><option>남</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
                  <option>진단 상태</option><option>완료</option><option>진행</option><option>미응시</option>
                </select>
              </div>
              <button className="w-full px-3 py-2 rounded-lg bg-mint-600 text-white text-sm font-semibold">검색</button>
            </div>
            <div className="text-xs space-y-1.5 max-h-48 overflow-y-auto">
              {[
                "홍길동 · 5-3 · 진단 완료",
                "김철수 · 5-3 · 진단 완료",
                "이영희 · 5-3 · 진단 진행",
                "박지수 · 5-3 · 진단 완료",
                "최민호 · 5-3 · 진단 완료",
                "정수영 · 5-3 · 미응시",
              ].map((s, i) => (
                <label key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-paper-grey cursor-pointer">
                  <input type="checkbox" className="accent-mint-600" />
                  <span className="font-semibold">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="text-base font-bold mb-4 tracking-tight">알림 발송 폼</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold tracking-widest text-ink-600">제목</label>
                <input defaultValue="사후 진단 응시 안내" className="w-full px-3 py-2 mt-1 rounded-lg border border-ink-100 text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-ink-600">내용</label>
                <textarea rows={4} defaultValue="향상 교육이 충분히 진행되어 사후 진단 응시를 권장합니다. 5월 20일까지 응시 부탁드립니다." className="w-full px-3 py-2 mt-1 rounded-lg border border-ink-100 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" defaultChecked className="accent-mint-600" /> 앱 푸시</label>
                <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" defaultChecked className="accent-mint-600" /> 학부모 SMS</label>
                <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" className="accent-mint-600" /> 이메일</label>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-lg bg-paper-grey text-ink-700 text-sm font-semibold">초안 저장</button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-mint-600 text-white text-sm font-semibold">발송 (선택 6명)</button>
              </div>
            </div>
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
