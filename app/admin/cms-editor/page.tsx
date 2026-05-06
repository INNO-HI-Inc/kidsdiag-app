import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CmsEditorPage() {
  return (
    <main className="bg-paper-grey min-h-screen">
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"><span className="w-1 h-1 rounded-full bg-mint-500" />FUN-005</span>
              <span className="eyebrow text-mint-600">CONTENT EDITOR</span>
            </div>
            <h1 className="h-section text-2xl">문항 편집기</h1>
            <div className="text-sm text-ink-600 mt-1">텍스트·이미지·수식·레이아웃·특수기호 + 메타데이터·지문·보기·파일 등록</div>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-semibold px-4 py-2 rounded-full bg-paper-grey text-ink-700 hover:bg-ink-100">미리보기</button>
            <button className="text-xs font-semibold px-4 py-2 rounded-full bg-mint-600 text-white hover:bg-mint-700">저장 + 검수 큐</button>
          </div>
        </div>

        {/* 메타데이터 검색 */}
        <div className="bg-white rounded-2xl border border-ink-100 p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-widest text-ink-600">메타데이터 검색</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <input placeholder="ID" className="px-3 py-2 rounded-lg border border-ink-100 text-xs" />
            <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
              <option>전체 교과</option><option>국어</option><option>수학</option><option>과학</option><option>통합사고력</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
              <option>전체 학년</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
              <option>난이도</option><option>상</option><option>중</option><option>하</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-ink-100 text-xs">
              <option>Bloom 단계</option><option>지식</option><option>이해</option><option>적용</option><option>분석</option><option>종합</option><option>평가</option>
            </select>
            <button className="px-3 py-2 rounded-lg bg-mint-600 text-white text-xs font-semibold">검색</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 좌: 편집 */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <h2 className="text-base font-bold mb-4 tracking-tight">문항 본문</h2>
              {/* 편집 툴바 */}
              <div className="flex items-center gap-1 mb-3 p-2 bg-paper-grey rounded-lg flex-wrap">
                {[
                  { t: "B", title: "굵게" },
                  { t: "I", title: "기울임" },
                  { t: "U", title: "밑줄" },
                  { t: "Σ", title: "수식" },
                  { t: "ⓒ", title: "특수기호" },
                  { t: "▦", title: "표" },
                  { t: "🖼", title: "이미지" },
                  { t: "♫", title: "음성" },
                  { t: "▶", title: "동영상" },
                ].map((b) => (
                  <button key={b.t} title={b.title} className="w-8 h-8 rounded-md bg-white border border-ink-100 hover:border-mint-300 text-sm font-bold">{b.t}</button>
                ))}
                <span className="ml-2 text-[10px] text-ink-500">텍스트·이미지·수식·레이아웃·특수기호 편집</span>
              </div>
              <textarea
                rows={6}
                defaultValue="다음 식의 값을 구하시오.\n\n  1/2 + 1/3 = ?"
                className="w-full px-4 py-3 rounded-lg border border-ink-100 text-sm font-mono"
              />
            </div>

            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <h2 className="text-base font-bold mb-4 tracking-tight">보기 (객관식)</h2>
              <div className="space-y-2">
                {["① 2/5", "② 5/6", "③ 1/6", "④ 2/6"].map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input defaultValue={c} className="flex-1 px-3 py-2 rounded-lg border border-ink-100 text-sm" />
                    <label className="flex items-center gap-1 text-xs">
                      <input type="radio" name="answer" defaultChecked={i === 1} className="accent-mint-600" />
                      정답
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <h2 className="text-base font-bold mb-4 tracking-tight">해설 + 정답채점기준</h2>
              <textarea rows={3} defaultValue="통분하면 1/2=3/6, 1/3=2/6 → 3/6+2/6=5/6" className="w-full px-3 py-2 rounded-lg border border-ink-100 text-sm mb-3" />
              <input placeholder="채점 키워드 (콤마 구분): 통분, 5/6, 분모" className="w-full px-3 py-2 rounded-lg border border-ink-100 text-sm" />
            </div>
          </div>

          {/* 우: 메타데이터 + 파일 */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <h2 className="text-base font-bold mb-4 tracking-tight">메타데이터</h2>
              <div className="space-y-3 text-xs">
                {[
                  { l: "ID", v: "MATH-5-FRAC-001" },
                  { l: "학년", v: "초5" },
                  { l: "교과", v: "수학" },
                  { l: "단원", v: "분수의 덧셈" },
                  { l: "Bloom", v: "적용" },
                  { l: "재능 태그(B)", v: "수리·논리" },
                  { l: "난이도(b)", v: "0.5" },
                  { l: "변별도(a)", v: "1.2" },
                  { l: "예상 시간", v: "60초" },
                ].map((f) => (
                  <div key={f.l} className="flex items-center gap-2">
                    <span className="w-20 text-ink-600 font-semibold">{f.l}</span>
                    <input defaultValue={f.v} className="flex-1 px-2 py-1 rounded border border-ink-100 text-xs" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-ink-100 p-5">
              <h2 className="text-base font-bold mb-3 tracking-tight">관련 파일</h2>
              <div className="space-y-2">
                {[
                  { t: "지문 음성", n: "stem_audio.mp3" },
                  { t: "동영상 설명", n: "explain.mp4" },
                  { t: "이미지 (도형)", n: "diagram.png" },
                ].map((f) => (
                  <div key={f.n} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-paper-grey">
                    <span className="font-semibold">{f.t}</span>
                    <span className="flex-1 text-ink-600 truncate">{f.n}</span>
                    <button className="text-ink-500 hover:text-peach-500">×</button>
                  </div>
                ))}
                <button className="w-full text-xs font-semibold px-3 py-2 rounded-lg border-2 border-dashed border-ink-200 text-ink-600 hover:border-mint-300">
                  + 파일 업로드 (음성·동영상·이미지)
                </button>
              </div>
            </div>

            <div className="bg-paper-grey rounded-2xl p-4 text-[10px] text-ink-700 leading-[1.6]">
              <div className="font-bold mb-1">지원 형식</div>
              · 텍스트 + Markdown / LaTeX 수식<br />
              · 이미지 PNG·JPG·SVG (≤ 2MB)<br />
              · 음성 MP3·WAV (≤ 5MB)<br />
              · 동영상 MP4 (≤ 30MB)
            </div>

            {/* 문항 보안 정책 (GeniusX Section 4.3) */}
            <div className="bg-white rounded-2xl border-2 border-peach-200 p-5">
              <h3 className="text-sm font-bold mb-3 tracking-tight">문항 보안 정책</h3>
              <div className="space-y-2.5 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-paper-grey">
                  <input type="radio" name="anchor" defaultChecked className="mt-0.5 accent-peach-400" />
                  <div>
                    <div className="font-semibold">앵커 문항 (미공개·장기 재사용)</div>
                    <div className="text-[10px] text-ink-600">전체 57문항 중 20~25개 — 리포트·해설 비공개</div>
                  </div>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-paper-grey">
                  <input type="radio" name="anchor" className="mt-0.5 accent-peach-400" />
                  <div>
                    <div className="font-semibold">공개 가능 문항</div>
                    <div className="text-[10px] text-ink-600">리포트·해설에 일부 공개 (유형별 예시만)</div>
                  </div>
                </label>
                <div className="pt-2 mt-2 border-t border-ink-100 space-y-1.5">
                  <label className="flex items-center gap-2 text-[11px]">
                    <input type="checkbox" defaultChecked className="accent-peach-400 w-3.5 h-3.5" />
                    응시 화면 캡처 방지 (스크린샷·드래그 차단)
                  </label>
                  <label className="flex items-center gap-2 text-[11px]">
                    <input type="checkbox" defaultChecked className="accent-peach-400 w-3.5 h-3.5" />
                    동적 문항 회전 (응시자별 57→55 랜덤)
                  </label>
                  <label className="flex items-center gap-2 text-[11px]">
                    <input type="checkbox" defaultChecked className="accent-peach-400 w-3.5 h-3.5" />
                    모바일 OS별 보안 테스트 통과
                  </label>
                </div>
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
