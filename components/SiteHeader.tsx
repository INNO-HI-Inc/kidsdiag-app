"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type Role = "student" | "teacher" | "parent" | "admin";

const ROLE_META: Record<Role, { label: string; dot: string; href: string }> = {
  student: { label: "학생", dot: "bg-mint-500", href: "/mypage" },
  teacher: { label: "교원", dot: "bg-sky-500", href: "/teacher" },
  parent: { label: "학부모", dot: "bg-lavender-500", href: "/parent/report/child_demo" },
  admin: { label: "관리자", dot: "bg-sun-500", href: "/admin" },
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
    { href: "/teacher", label: "검사지 생성" },
    { href: "/teacher", label: "응시 결과" },
    { href: "/teacher", label: "반별 통계" },
    { href: "/board", label: "게시판" },
  ],
  parent: [
    { href: "/parent/report/child_demo", label: "자녀 결과" },
    { href: "/parent/report/child_demo", label: "학습 이력" },
    { href: "/board", label: "게시판" },
  ],
  admin: [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/cms-editor", label: "콘텐츠" },
    { href: "/admin/permissions", label: "권한·알림" },
    { href: "/admin/site", label: "사이트" },
    { href: "/admin/grading", label: "채점" },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = detectRole(pathname);
  const meta = ROLE_META[role];
  const links = MENUS[role];
  const isActive = (href: string) => pathname === href;

  // Close dropdowns on route change
  useEffect(() => {
    setRoleOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">k</div>
            <div className="font-bold text-base tracking-tight">kidsdiag</div>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink-600 px-2 py-1 rounded-full bg-paper-grey border border-ink-100">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
          {links.map((l, i) => (
            <Link
              key={`${l.label}-${i}`}
              href={l.href}
              className={`transition ${isActive(l.href) ? "text-mint-700 font-semibold" : "text-ink-700 hover:text-ink-900"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative hidden md:block">
            <button
              onClick={() => setRoleOpen(!roleOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 transition"
              aria-haspopup="true"
              aria-expanded={roleOpen}
            >
              역할 전환 <span className="text-[8px]">▾</span>
            </button>
            {roleOpen && (
              <div className="absolute right-0 top-12 bg-white border border-ink-100 rounded-2xl shadow-card p-1.5 w-48 z-50">
                {(Object.keys(ROLE_META) as Role[]).map((r) => {
                  const m = ROLE_META[r];
                  const isCurrent = r === role;
                  return (
                    <Link
                      key={r}
                      href={m.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition ${
                        isCurrent ? "bg-paper-grey font-bold" : "hover:bg-paper-grey text-ink-800"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                      <span className="flex-1">{m.label}</span>
                      {isCurrent && <span className="text-[10px] text-ink-500">현재</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/signup" className="hidden sm:inline-flex bg-mint-600 hover:bg-mint-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            가입 / SSO
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-paper-grey hover:bg-ink-100 flex items-center justify-center"
            aria-label="메뉴"
            aria-expanded={mobileOpen}
          >
            <div className="space-y-1">
              <span className={`block w-4 h-0.5 bg-ink-800 transition ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block w-4 h-0.5 bg-ink-800 transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-ink-800 transition ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {/* 역할 인디케이터 */}
            <div className="flex items-center gap-2 px-3 pb-3 border-b border-ink-100 mb-2">
              <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
              <span className="text-xs font-bold tracking-widest text-ink-700">{meta.label.toUpperCase()} MODE</span>
            </div>

            {links.map((l, i) => (
              <Link
                key={`m-${l.label}-${i}`}
                href={l.href}
                className={`block px-3 py-3 rounded-lg text-sm font-semibold ${
                  isActive(l.href) ? "bg-mint-50 text-mint-700" : "text-ink-800 hover:bg-paper-grey"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-ink-100">
              <div className="text-[10px] font-bold tracking-widest text-ink-500 px-3 mb-1.5">역할 전환</div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(ROLE_META) as Role[]).map((r) => {
                  const m = ROLE_META[r];
                  const isCurrent = r === role;
                  return (
                    <Link
                      key={r}
                      href={m.href}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                        isCurrent ? "bg-paper-grey font-bold" : "hover:bg-paper-grey text-ink-700"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                      {m.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href="/signup" className="block mt-3 text-center bg-mint-600 hover:bg-mint-700 text-white px-4 py-3 rounded-full text-sm font-bold transition">
              가입 / SSO 로그인
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
