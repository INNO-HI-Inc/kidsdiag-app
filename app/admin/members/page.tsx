"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RolePageHeader from "@/components/RolePageHeader";

const MEMBERS = [
  { id: "S-1247", n: "김민지", role: "학생", school: "제닉스초", grade: "5", status: "활성" },
  { id: "S-1248", n: "이지훈", role: "학생", school: "제닉스초", grade: "5", status: "활성" },
  { id: "S-1249", n: "박서연", role: "학생", school: "제닉스초", grade: "5", status: "승인대기" },
  { id: "S-1250", n: "최도현", role: "학생", school: "제닉스초", grade: "5", status: "활성" },
  { id: "T-021", n: "김민수", role: "교원", school: "제닉스초", grade: "5-3", status: "활성" },
  { id: "T-022", n: "이수진", role: "교원", school: "제닉스초", grade: "5-1", status: "활성" },
  { id: "P-892", n: "김지혜", role: "학부모", school: "제닉스초", grade: "민지 母", status: "활성" },
  { id: "P-893", n: "박혜원", role: "학부모", school: "제닉스초", grade: "서연 母", status: "승인대기" },
];

export default function MembersPage() {
  const [filter, setFilter] = useState<"전체" | "학생" | "교원" | "학부모">("전체");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = filter === "전체" ? MEMBERS : MEMBERS.filter(m => m.role === filter);

  return (
    <main className="bg-paper-grey text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <RolePageHeader
          role="admin"
          title="회원 관리"
          subtitle="계정 유형별 등록 · 수정 · 삭제 · 승인"
          funBadges={[{ id: "FUN-007" }]}
          kpis={[
            { v: "5,124", l: "학생" },
            { v: "421", l: "교원" },
            { v: "2,892", l: "학부모" },
            { v: "8", l: "승인 대기" },
          ]}
          actions={
            <button onClick={() => setShowAdd(!showAdd)} className="bg-mint-600 hover:bg-mint-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition">
              + 회원 등록
            </button>
          }
        />

        {/* 등록 폼 */}
        {showAdd && (
          <div className="bg-white rounded-2xl border border-mint-300 p-6 mb-5">
            <h2 className="text-base font-bold mb-4">신규 회원 등록</h2>
            <div className="grid md:grid-cols-4 gap-3">
              <select className="px-3 py-2 rounded-lg border border-ink-100 text-sm">
                <option>계정 유형</option><option>학생</option><option>교원</option><option>학부모</option><option>관리자</option>
              </select>
              <input placeholder="성명" className="px-3 py-2 rounded-lg border border-ink-100 text-sm" />
              <select className="px-3 py-2 rounded-lg border border-ink-100 text-sm">
                <option>소속 학교</option><option>제닉스초</option>
              </select>
              <input placeholder="학년·반 (예: 5-3)" className="px-3 py-2 rounded-lg border border-ink-100 text-sm" />
              <input placeholder="이메일" className="md:col-span-2 px-3 py-2 rounded-lg border border-ink-100 text-sm" />
              <input placeholder="연락처" className="px-3 py-2 rounded-lg border border-ink-100 text-sm" />
              <button className="px-3 py-2 rounded-lg bg-mint-600 text-white text-sm font-semibold">등록</button>
            </div>
          </div>
        )}

        {/* 필터 + 검색 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-4 mb-5">
          <div className="flex gap-2 flex-wrap">
            {(["전체", "학생", "교원", "학부모"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                  filter === t ? "bg-mint-600 text-white" : "bg-paper-grey text-ink-700 hover:bg-ink-100"
                }`}
              >
                {t}
              </button>
            ))}
            <input placeholder="이름·ID 검색" className="flex-1 min-w-[200px] px-3 py-1.5 rounded-full border border-ink-100 text-xs" />
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-paper-grey text-[10px] text-ink-600 font-bold tracking-widest border-b border-ink-100">
                <tr>
                  <th className="px-5 py-3 text-left">ID</th>
                  <th className="px-5 py-3 text-left">성명</th>
                  <th className="px-5 py-3 text-left">유형</th>
                  <th className="px-5 py-3 text-left">소속</th>
                  <th className="px-5 py-3 text-left">학년·반</th>
                  <th className="px-5 py-3 text-center">상태</th>
                  <th className="px-5 py-3 text-right">관리</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => {
                  const dot = m.role === "학생" ? "bg-mint-500" : m.role === "교원" ? "bg-sky-500" : m.role === "학부모" ? "bg-lavender-500" : "bg-sun-500";
                  return (
                    <tr key={m.id} className="border-b border-ink-100 last:border-0 hover:bg-paper-grey">
                      <td className="px-5 py-3 text-xs font-mono text-ink-600">{m.id}</td>
                      <td className="px-5 py-3 text-sm font-semibold">{m.n}</td>
                      <td className="px-5 py-3 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                          {m.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-700">{m.school}</td>
                      <td className="px-5 py-3 text-xs text-ink-700">{m.grade}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.status === "활성" ? "bg-mint-50 text-mint-700" : "bg-sun-50 text-sun-600"
                        }`}>{m.status}</span>
                      </td>
                      <td className="px-5 py-3 text-right text-xs space-x-2">
                        {m.status === "승인대기" && (
                          <button className="text-mint-700 font-semibold hover:text-mint-900">승인</button>
                        )}
                        <button className="text-ink-600 hover:text-ink-900">수정</button>
                        <button className="text-peach-500 hover:text-peach-400">삭제</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Link href="/admin" className="inline-block mt-6 text-xs font-semibold text-ink-600 hover:text-ink-900">← 관리자 콘솔로</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
