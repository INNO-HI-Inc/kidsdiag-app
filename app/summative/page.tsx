import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SummativePage() {
  return (
    <main className="bg-paper text-ink-900 min-h-screen">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-mint-500" />FUN-001</span>
            <span className="eyebrow text-accent-700">총괄평가 · POST DIAGNOSIS</span>
          </div>
          <h1 className="h-section text-3xl mb-3">사후 진단</h1>
          <p className="text-sm text-ink-700 leading-[1.7]">
            진단 검사 영역과 동일한 영역 사후 검사<br />
            사전 진단 대비 향상도 정량 측정
          </p>
        </div>

        {/* 사전 진단 결과 요약 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold tracking-tight"> 사전 진단 결과</h2>
            <span className="text-[10px] text-ink-600">2026.05.06 응시</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "국어", v: 71, color: "text-lavender-700" },
              { name: "과학", v: 65, color: "text-sky-700" },
              { name: "수학", v: 78, color: "text-mint-700" },
              { name: "통합", v: 82, color: "text-sun-600" },
            ].map((s) => (
              <div key={s.name} className="text-center bg-paper-grey rounded-xl p-3">
                <div className="text-[10px] text-ink-600 mb-1">{s.name}</div>
                <div className={`text-2xl font-bold ${s.color} tabular-nums`}>{s.v}<span className="text-xs">%</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* 사후 진단 안내 */}
        <div className="bg-gradient-to-br from-mint-50 to-lavender-50 border-2 border-mint-300 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl"></span>
            <h2 className="text-base font-bold tracking-tight">사후 진단 안내</h2>
          </div>
          <ul className="space-y-2 text-sm text-ink-800">
            {[
              "사전 진단과 동일한 4개 블록 / 57문항 / 45분",
              "동일한 영역 응시로 향상도 정량 측정",
              "수직 척도화(Vertical Scaling)로 학년 간 동일 척도 구축",
              "응시 후 사전→사후 비교 성장 그래프 자동 생성",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-mint-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5 flex-shrink-0">{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* 학습 진척 표시 */}
        <div className="bg-white border-2 border-ink-100 rounded-2xl p-6 mb-6">
          <h2 className="text-base font-bold mb-4 tracking-tight">학습 진척</h2>
          <div className="space-y-3">
            {[
              { name: "동영상 강의 시청", v: 18, max: 20 },
              { name: "AI 튜터 대화", v: 23, max: 30 },
              { name: "오답 노트 복습", v: 12, max: 15 },
              { name: "유사 문항 풀이", v: 47, max: 60 },
            ].map((p) => {
              const pct = (p.v / p.max) * 100;
              return (
                <div key={p.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{p.name}</span>
                    <span className="font-bold tabular-nums">{p.v} / {p.max}</span>
                  </div>
                  <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-mint-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-ink-100 text-center">
            <div className="text-xs text-ink-600 mb-1">학습 완료율</div>
            <div className="text-2xl font-bold text-mint-700 tabular-nums">82%</div>
            <div className="text-[10px] text-ink-500 mt-1">사후 진단 응시 권장 시점</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/mypage" className="flex-1 text-center px-6 py-3.5 rounded-full bg-paper-grey hover:bg-ink-100 text-ink-700 font-semibold transition">
            나중에
          </Link>
          <Link href="/diagnose/demo" className="flex-1 text-center px-6 py-3.5 rounded-full bg-mint-600 hover:bg-mint-700 text-white font-bold transition shadow-pop">
            사후 진단 시작 →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
