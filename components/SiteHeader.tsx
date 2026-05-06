"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Role = "student" | "teacher" | "parent" | "admin";

const ROLE_META: Record<Role, { label: string; color: string; bg: string; href: string }> = {
  student: { label: "학생", color: "text-mint-700", bg: "bg-mint-100", href: "/mypage" },
  teacher: { label: "교원", color: "text-sky-700", bg: "bg-sky-100", href: "/teacher" },
  parent: { label: "학부모", color: "text-lavender-700", bg: "bg-lavender-100", href: "/parent/report/child_demo" },
  admin: { label: "관리자", color: "text-sun-600", bg: "bg-sun-100", href: "/admin" },
};

const MENUS: Record<Role, { href: string; label: string }[]> = {
  student: [
    { href: "/select", label: "사전진단" },
    { href: "/improvement", label: "향상교육" },
    { href: "/summative", label: "총괄평가" },
    { href: "/board", label: "게시판" },
    { href: "/mypage", label: "마이페이지" },
  ],
  teacher: [
    { href: "/teacher", label: "사전진단" },
    { href: "/teacher", label: "향상교육" },
    { href: "/teacher", label: "총괄평가" },
    { href: "/board", label: "게시판" },
    { href: "/teacher", label: "검사지 생성" },
  ],
  parent: [
    { href: "/parent/report/child_demo", label: "사전진단" },
    { href: "/parent/report/child_demo", label: "향상교육" },
    { href: "/parent/report/child_demo", label: "총괄평가" },
    { href: "/board", label: "게시판" },
    { href: "/parent/report/child_demo", label: "자녀 이력" },
  ],
  admin: [
    { href: "/admin", label: "사전진단" },
    { href: "/admin", label: "향상교육" },
    { href: "/admin", label: "총괄평가" },
    { href: "/board", label: "게시판" },
    { href: "/admin", label: "회원관리" },
    { href: "/admin", label: "통계" },
  ],
};

function detectRole(pathname: string): Role {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/teacher")) return "teacher";
  if (pathname.startsWith("/parent")) return "parent";
  return "student";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [roleOpen, setRoleOpen] = useState(false);
  const role = detectRole(pathname);
  const meta = ROLE_META[role];
  const links = MENUS[role];
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">k</div>
            <div className="font-bold text-base tracking-tight">kidsdiag</div>
          </Link>
          <span className={`hidden sm:inline-flex items-center gap-1.5 ${meta.bg} ${meta.color} text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.color.replace("text-", "bg-")}`} />
            {meta.label.toUpperCase()}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l, i) => (
            <Link
              key={`${l.label}-${i}`}
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
            <div className="absolute right-0 top-12 bg-white border border-ink-100 rounded-2xl shadow-card p-2 w-48 z-50">
              {(Object.keys(ROLE_META) as Role[]).map((r) => {
                const m = ROLE_META[r];
                const isCurrent = r === role;
                return (
                  <Link
                    key={r}
                    href={m.href}
                    onClick={() => setRoleOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm ${
                      isCurrent ? `${m.bg} ${m.color} font-bold` : "hover:bg-paper-grey text-ink-800"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isCurrent ? m.color.replace("text-", "bg-") : "bg-ink-300"}`} />
                    <span className="flex-1">{m.label}</span>
                    {isCurrent && <span className="text-[10px]">현재</span>}
                  </Link>
                );
              })}
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
