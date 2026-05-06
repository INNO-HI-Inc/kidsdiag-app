"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const links = [
    { href: "/select", label: "사전진단" },
    { href: "/features", label: "향상교육" },
    { href: "/mypage", label: "마이페이지" },
    { href: "/teacher", label: "교원" },
    { href: "/admin", label: "관리자" },
    { href: "/board", label: "게시판" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-sm">k</div>
          <div className="font-bold text-base tracking-tight">kidsdiag</div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${isActive(l.href) ? "text-mint-600 font-semibold" : "text-ink-700 hover:text-ink-900"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/signup" className="bg-mint-600 hover:bg-mint-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
          가입 / 로그인
        </Link>
      </div>
    </header>
  );
}
