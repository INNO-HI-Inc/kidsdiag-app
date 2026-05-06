"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SiteHeader() {
  const pathname = usePathname();
  const [roleOpen, setRoleOpen] = useState(false);
  const isActive = (href: string) => pathname === href;

  // PDF 학생 메뉴 구조 그대로
  const studentLinks = [
    { href: "/select", label: "사전진단" },
    { href: "/improvement", label: "향상교육" },
    { href: "/summative", label: "총괄평가" },
    { href: "/board", label: "게시판" },
    { href: "/mypage", label: "마이페이지" },
  ];

  const roles = [
    { href: "/mypage", label: "학생", icon: "" },
    { href: "/teacher", label: "교원", icon: "‍" },
    { href: "/parent/report/child_demo", label: "학부모", icon: "" },
    { href: "/admin", label: "관리자", icon: "" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">k</div>
          <div className="font-bold text-base tracking-tight">kidsdiag</div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {studentLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${isActive(l.href) ? "text-mint-600 font-semibold" : "text-ink-700 hover:text-ink-900"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 transition"
          >
            역할 전환 ▾
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-12 bg-white border border-ink-100 rounded-2xl shadow-card p-2 w-44 z-50">
              {roles.map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  onClick={() => setRoleOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-paper-grey text-sm"
                >
                  <span className="text-base">{r.icon}</span>
                  <span className="font-semibold">{r.label}</span>
                </Link>
              ))}
            </div>
          )}
          <Link href="/signup" className="bg-mint-600 hover:bg-mint-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            가입 / SSO
          </Link>
        </div>
      </div>
    </header>
  );
}
