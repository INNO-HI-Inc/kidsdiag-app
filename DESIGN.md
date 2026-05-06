# kidsdiag — DESIGN.md

> 한국 초등 5학년 학부모·학생 대상 학력 진단·심화학습 서비스의 디자인 시스템.
> 한국창의영재교육원 × 이노하이.

---

## 1. Visual Theme & Atmosphere

**Direction: "Soft Editorial × Bright Educational"**
- 톤: 친근하지만 진중함. 초등 친화 + 학부모 신뢰감의 균형.
- "AI 진단 서비스"의 차가움 X / "어린이 학습지"의 유치함 X.
- **노트북·교실 느낌**의 도트 그리드 배경, 손글씨 같은 디테일, 종이 같은 따뜻한 oklch 베이스.
- 숨쉬는 negative space 우선 (조밀한 정보 묶음 X).
- 분위기 키워드: *환한 교실 창가, 따뜻한 햇살, 새 노트의 첫 페이지.*

**Reference vibe**:
- 클래스팅 AI (민트→라벤더 그라디언트), 노션 (warm minimalism), 콴다 (밝은 베이스)
- **회피**: 일반적 AI 사이트 (purple→white gradient, glass card 남발), 학습지 키치, fintech 차가움.

---

## 2. Color Palette & Roles

```css
/* Primary — 민트 (청량 핵심) */
--mint-50:  #edf9f6;
--mint-100: #d1f3e8;
--mint-200: #a3e6d2;
--mint-400: #3cc8a0;
--mint-500: #00c896;  /* PRIMARY */
--mint-600: #17a27e;
--mint-700: #0d7c5f;

/* Secondary — 라벤더 (차분) */
--lavender-100: #f3e8ff;
--lavender-300: #d4b6f7;
--lavender-500: #9f7aea;
--lavender-600: #805ad5;

/* Accent A — 스카이 (청량 강조) */
--sky-200: #bae6fd;
--sky-400: #38bdf8;
--sky-600: #4299e1;

/* Accent B — 버터옐로우 (따뜻한 강조) */
--sun-300: #fcd34d;
--sun-500: #ed8936;

/* Accent C — 피치 (포인트, 캐릭터 자리) */
--peach-200: #fecdd3;
--peach-500: #f43f5e;

/* Surfaces — 종이 같은 따뜻한 베이스 */
--paper:        #fffefb;  /* 진짜 흰 X, 미세한 따뜻함 */
--paper-mint:   #edf9f6;
--paper-cream:  #fffaf0;

/* Text — Carbon ink 톤 */
--ink-900: #1a1d1f;       /* 본문 핵심 */
--ink-700: #525252;
--ink-500: #9e9e9e;
```

### 역할 매핑
| 역할 | 사용 색 |
|---|---|
| Primary CTA | `mint-500` |
| Secondary CTA | `paper` + `mint-500` border |
| Hero accent | `sun-300` (노랑 액센트, 따뜻함) |
| Body link / 경로 강조 | `lavender-600` |
| 결손 경고 | `sun-500` (오렌지) |
| 정답·성공 | `mint-500` |
| 캐릭터 액센트 | `peach-200`, `sun-300` |

### Do's
- 한 화면당 dominant color는 1~2개 (지배적 mint + 1 sub)
- 액센트는 sharp하게 (timid X)
- Background: 흰 X, **paper(#fffefb)** 또는 paper-mint

### Don'ts
- ❌ Purple → white 그라데이션 (cliché)
- ❌ 회색 텍스트 위에 보라 강조 (AI 사이트 인상)
- ❌ 4가지 이상 액센트 동시 사용

---

## 3. Typography Rules

**Korean stack**: Pretendard Variable (이미 import)
**Display contrast**: 같은 Pretendard지만 weight 극단 활용 — Display는 `font-weight: 900`, Body는 `300~500`. 천편일률 `font-bold` X.

**Numerical/Latin display**: 한글과 함께 영문/숫자가 나오면 **Inter 회피**, 대신 시스템 폰트 또는 거리 둔 letter-spacing.

```css
/* Display */
.h1 { font-family: "Pretendard Variable"; font-weight: 900; letter-spacing: -0.04em; line-height: 1.05; }
.h2 { font-family: "Pretendard Variable"; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }

/* Body */
.body-lg { font-family: "Pretendard Variable"; font-weight: 400; line-height: 1.7; }
.body    { font-family: "Pretendard Variable"; font-weight: 400; line-height: 1.65; letter-spacing: -0.01em; }

/* Eyebrow / labels — 영문 라벨만 */
.eyebrow { font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; }

/* Quote / editorial accent */
.editorial-italic { font-style: italic; font-weight: 500; }
```

### Type Scale (rem 기반, mobile-first)
| 레벨 | 모바일 | 데스크톱 |
|---|---|---|
| Hero h1 | 2.5rem | 4rem |
| Section h2 | 1.875rem | 2.5rem |
| h3 | 1.25rem | 1.5rem |
| body-lg | 1.125rem | 1.25rem |
| body | 0.9375rem | 1rem |
| eyebrow | 0.6875rem | 0.6875rem |

---

## 4. Component Stylings

### Buttons (Pill 형, 두께감)
- Primary: `bg-mint-500 text-white px-7 py-4 rounded-full font-extrabold shadow-pop`
- 호버: `bg-mint-600 + translate-y-[-1px]`
- Secondary: `bg-paper border-2 border-mint-200 text-mint-700 rounded-full font-extrabold`
- Ghost: 텍스트만 + 호버 underline

### Cards
- 기본: `bg-paper rounded-3xl border border-mint-100 shadow-card`
- Hover: `border-mint-300 -translate-y-1`
- 코너: `rounded-2xl` 또는 `rounded-3xl` (작은 corner X)

### Inputs / Choices
- `rounded-2xl border-2`
- 선택 상태: `border-mint-500 bg-mint-50`

### Badges / Pills
- `rounded-full px-2.5 py-0.5 text-[11px] font-extrabold`
- Eyebrow와 동일 letter-spacing

### Sticker / 캐릭터 자리 (시그니처 디테일)
- 회전된 작은 사각/원 (10~16deg)
- `rounded-3xl` 큰 패드
- animate-float / animate-wiggle (sparingly)

---

## 5. Layout Principles

**Asymmetric, breathing space.**

- 최대 너비: `max-w-6xl` (1152px)
- 섹션 padding: `py-16 md:py-24` (생각보다 크게)
- 인접 섹션은 **다른 surface**: paper → paper-mint → paper → paper-cream → paper
- Hero: 그리드 깨기 — 텍스트 좌측 정렬 + 우측 카드는 `rotate-[-2deg]` 또는 한 칸 떨어진 위치
- 한 섹션에 정보 카드 4개 이상 X. (3 또는 4까지만)

### 그리드 패턴
- 12 col 데스크톱
- 모바일: 1 col
- 태블릿: 2 col

### 도트 그리드 배경 (시그니처)
일부 섹션에 `bg-dot` 클래스로 미세한 노트북 도트 배경 (atmosphere).

---

## 6. Depth & Elevation

```css
--shadow-card:    0 1px 2px rgba(0,0,0,.04), 0 8px 16px rgba(0,0,0,.04);
--shadow-soft:    0 4px 24px rgba(0,200,150,.10);
--shadow-pop:     0 8px 24px rgba(0,200,150,.28);   /* mint glow */
--shadow-lavender: 0 8px 24px rgba(159,122,234,.25);
--shadow-warm:    0 8px 24px rgba(252,211,77,.4);
```

### 위계
- 페이지 배경: 그림자 X
- 카드: shadow-card
- 띄운 카드: shadow-soft
- Primary CTA / Hero mock: shadow-pop
- Floating sticker: shadow-soft + slight blur

---

## 7. Do's and Don'ts

### Do
✅ 한 페이지에 **하나의 강한 시각적 모먼트** (Hero mock card)
✅ 색은 dominant 1 + sub 1 + sharp accent
✅ 한국어 폰트 weight 극단 사용 (300 vs 900)
✅ 따뜻한 paper 베이스 (#fffefb)
✅ 손글씨 디테일: 키워드 아래 hand-drawn squiggle SVG
✅ 미세한 회전 (1~3deg) 으로 "사람 손" 느낌
✅ 도트 그리드 배경으로 노트북 atmosphere
✅ 적당한 화이트 스페이스 — 정보 묶지 말 것

### Don't
❌ Purple→white gradient (AI cliché)
❌ Inter / Roboto / Arial
❌ 모든 글자 `font-bold`
❌ 4개 이상 액센트 색 한 화면
❌ 카드에 다 같은 그림자 적용
❌ 이모지 과다 (한 섹션 1~2개로 제한)
❌ Glass card 남발
❌ 둥근 너무 작은 corner (4~8px) — 우리는 16~32px

---

## 8. Responsive Behavior

| Breakpoint | 최소 너비 | 비고 |
|---|---|---|
| sm | 640px | 1 col → 2 col 일부 |
| md | 768px | grid 본격 시작 |
| lg | 1024px | hero 2 col |
| xl | 1280px | max-w 적용 |

- 터치 타겟 최소 44x44px (학생도 사용)
- 모바일 Hero: 텍스트 → mockup 순서 (mockup 큰 사이즈)
- 모바일 카드 hover X (focus-visible 사용)

---

## 9. Agent Prompt Guide

```markdown
# When generating new pages or components for kidsdiag:

1. Read DESIGN.md tokens. NEVER hardcode hex.
2. Color: dominant mint + 1 sub (lavender or sun). Avoid 4+ accents.
3. Use paper (#fffefb) as bg, NOT pure white.
4. Korean text: extreme weight contrast (display 900, body 400).
5. NO Inter. NO purple→white gradient. NO emoji-heavy decoration.
6. Asymmetric Hero: rotated card, broken grid.
7. Atmosphere: dotted bg pattern, soft gradient blob, subtle noise.
8. Components from this DESIGN.md, not arbitrary shadcn copies.
9. Animation: ONE high-impact moment per page (staggered reveal).
10. Mobile first. 44px touch targets minimum.
```

---

## 10. Identity Detail (시그니처)

**시그니처 모티브**: 손글씨 squiggle underline + 회전 sticker badge.

```html
<!-- Hand-drawn underline under hero keyword -->
<svg class="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
  <path d="M2,8 Q50,2 100,8 T198,8" stroke="#fcd34d" stroke-width="3" fill="none" stroke-linecap="round" />
</svg>

<!-- Floating sticker (회전된 노란 사각) -->
<div class="absolute -top-4 -left-4 w-16 h-16 rounded-3xl bg-sun-300 rotate-[-12deg] shadow-warm flex items-center justify-center text-3xl">
  🧒
</div>
```
