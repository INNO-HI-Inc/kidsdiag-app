import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-paper border-t border-ink-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-carbon-900 flex items-center justify-center text-white font-bold text-xs">k</div>
            <div className="font-bold tracking-tight">kidsdiag</div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-ink-700 font-medium">
            <Link href="/features" className="hover:text-ink-900 transition">기능</Link>
            <Link href="/how-it-works" className="hover:text-ink-900 transition">진행 흐름</Link>
            <Link href="/institutions" className="hover:text-ink-900 transition">기관용</Link>
            <Link href="/faq" className="hover:text-ink-900 transition">FAQ</Link>
            <a href="mailto:hello@kidsdiag.kr" className="hover:text-ink-900 transition">문의</a>
          </div>
        </div>
        <div className="pt-6 border-t border-ink-100 flex flex-col md:flex-row justify-between gap-2 text-xs text-ink-500 font-normal">
          <div>© 2026 이노하이 / 한국창의영재교육원 · 베타 v0.7</div>
          <div>2022 개정 교육과정 · 개인정보보호법 준수</div>
        </div>
      </div>
    </footer>
  );
}
