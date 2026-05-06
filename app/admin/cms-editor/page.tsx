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
              <div className="space-y-2 text-xs">
                {[
                  { l: "ID", v: "MATH-5-FRAC-001", grp: "기본" },
                  { l: "학년", v: "초5", grp: "기본" },
                  { l: "교과", v: "수학", grp: "기본" },
                  { l: "단원", v: "분수의 덧셈", grp: "기본" },
                  { l: "탐구요소", v: "추론·상상", grp: "PDF 9종" },
                  { l: "탐구과정", v: "검증·과정", grp: "PDF 9종" },
                  { l: "난이도", v: "중", grp: "PDF 9종" },
                  { l: "소요시간", v: "60초", grp: "PDF 9종" },
                  { l: "실시방법", v: "지필", grp: "PDF 9종" },
                  { l: "배점", v: "3점", grp: "PDF 9종" },
                  { l: "Bloom 분류", v: "적용", grp: "PDF 9종" },
                  { l: "재능영역(B)", v: "수리·논리", grp: "PDF 9종" },
                  { l: "문항형태", v: "단순풀이", grp: "PDF 9종" },
                  { l: "성취기준 코드(A)", v: "5수01-04", grp: "태그 A" },
                  { l: "성취수준(A)", v: "B", grp: "태그 A" },
                  { l: "출제 의도", v: "통분 후 분수 덧셈", grp: "태그 A" },
                  { l: "재능 Primary(B)", v: "수리·논리", grp: "태그 B" },
                  { l: "재능 Secondary(B)", v: "공간·시각", grp: "태그 B" },
                  { l: "발달민감기 대응", v: "4~7세 지속 분화", grp: "태그 B" },
                  { l: "하위 역량", v: "패턴 인식", grp: "태그 B" },
                  { l: "변별도(a)", v: "1.2", grp: "IRT" },
                  { l: "난이도(b)", v: "0.5", grp: "IRT" },
                  { l: "추측도(c)", v: "0.20", grp: "IRT" },
                ].map((f) => (
                  <div key={f.l} className="flex items-center gap-2">
                    <span className="w-24 text-ink-600 font-semibold">{f.l}</span>
                    <input defaultValue={f.v} className="flex-1 px-2 py-1 rounded border border-ink-100 text-[10px]" />
                    <span className="text-[9px] text-ink-400 w-12 text-right">{f.grp}</span>
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

            {/* 이중 태그 3단 검증 (GeniusX Section 3.4) */}
            <div className="bg-white rounded-2xl border-2 border-mint-200 p-5">
              <h3 className="text-sm font-bold mb-3 tracking-tight">이중 태그 3단 검증</h3>
              <div className="space-y-3">
                {[
                  { n: "1차", t: "문항 개발자 초안 태깅", d: "본인이 태그 A·B 초안 부여", status: "완료", color: "bg-mint-50 text-mint-700" },
                  { n: "2차", t: "전문가 + 자문위원 독립 태깅", d: "교육과정 전문가 + 뇌과학 자문위원이 각자 독립 태깅 → Cohen's Kappa ≥ 0.7 도달까지 조정 반복", status: "진행중", color: "bg-sky-50 text-sky-700" },
                  { n: "3차", t: "파일럿 데이터 실증 검증", d: "동일 재능 태그 문항 간 내적 일관성 α ≥ 0.7, CFA CFI ≥ 0.90 · RMSEA ≤ 0.08 확인. 미달 시 태그 재조정", status: "대기", color: "bg-paper-grey text-ink-600" },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-3 p-3 rounded-lg bg-paper-grey">
                    <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full ${s.color} flex-shrink-0`}>{s.n}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold">{s.t}</div>
                      <div className="text-[11px] text-ink-700 leading-[1.5] mt-0.5">{s.d}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-ink-500 flex-shrink-0">{s.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-ink-600 bg-paper-grey rounded-lg p-2.5">
                현재 Cohen's Kappa: <strong className="text-mint-700">0.84</strong> (목표 ≥ 0.7) · 합격
              </div>
            </div>

            {/* 문항 검토 등급 (GeniusX Section 1.4) */}
            <div className="bg-white rounded-2xl border-2 border-sun-200 p-5">
              <h3 className="text-sm font-bold mb-3 tracking-tight">문항 검토 등급</h3>
              <div className="space-y-2">
                {[
                  { n: "모범", count: "1문항 (7번)", action: "정답 표현만 미세 수정 후 핵심 앵커 문항으로 투입", color: "bg-mint-50 text-mint-700" },
                  { n: "수정 후 수용", count: "6문항 (2·3·4·5·6·8번)", action: "각 문항별 시간·전제·어휘 조정. 재능진단 매핑 태그 신규 부여", color: "bg-sky-50 text-sky-700" },
                  { n: "구조적 재작성", count: "2문항 (1·9번)", action: "정답 개념 자체를 재설계. 출제 의도 재정의부터 시작", color: "bg-sun-50 text-sun-600" },
                  { n: "교육과정 초과", count: "1문항 (10번)", action: "부력은 중학교 이후 내용. 본 파일럿에서 폐기 또는 영재 문항으로 분리", color: "bg-peach-100 text-peach-500" },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-3 p-2.5 rounded-lg bg-paper-grey">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.color} flex-shrink-0`}>{s.n}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">{s.count}</div>
                      <div className="text-[10px] text-ink-700 leading-[1.5] mt-0.5">{s.action}</div>
                    </div>
                  </div>
                ))}
              </div>
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
