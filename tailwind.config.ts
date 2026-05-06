import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    "bg-mint-100", "bg-mint-200", "bg-mint-500", "bg-mint-600", "text-mint-500", "text-mint-600", "text-mint-700",
    "bg-lavender-100", "bg-lavender-300", "bg-lavender-500", "text-lavender-600", "text-lavender-700",
    "bg-sky-100", "bg-sky-200", "bg-sky-400", "text-sky-600", "text-sky-700",
    "bg-sun-100", "bg-sun-300", "bg-sun-500", "text-sun-600",
    "bg-peach-200", "bg-peach-400", "text-peach-500",
    "bg-success-500", "text-success-600",
    "rotate-[-2deg]", "rotate-[2deg]", "rotate-[-3deg]", "rotate-[3deg]", "rotate-[-12deg]",
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#fffefb", mint: "#edf9f6", cream: "#fffaf0", grey: "#F9F9FA" },
        // === Jobda 다크 (강조용) ===
        carbon: {
          900: "#121619",
          800: "#1c2024",
          700: "#252a30",
          600: "#3b4148",
          500: "#656a71",
        },
        // === 메인 민트 (잡다 #15C480과 호환) ===
        mint: {
          50: "#edf9f6", 100: "#d1f3e8", 200: "#a3e6d2", 300: "#6dd6b8", 400: "#3cc8a0",
          500: "#00c896", 600: "#15c480", 700: "#0d7c5f", 800: "#0a6248",
        },
        primary: {
          50: "#edf9f6", 100: "#d1f3e8", 200: "#a3e6d2", 300: "#6dd6b8", 400: "#3cc8a0",
          500: "#00c896", 600: "#15c480", 700: "#0d7c5f", 800: "#0a6248", 900: "#085037",
        },
        // === 잡다 노랑 (#FFC82A) ===
        accent: {
          100: "#FFEEC7",
          300: "#FFDA67",
          500: "#FFC82A",
          600: "#FFAD24",
          700: "#CA7300",
        },
        lavender: {
          50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d4b6f7", 400: "#b794f4",
          500: "#9f7aea", 600: "#805ad5", 700: "#6b46c1",
        },
        sky: {
          50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8",
          500: "#3987F8", 600: "#4299e1", 700: "#0369a1",
        },
        sun: {
          50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24",
          500: "#ed8936", 600: "#dd6b20",
        },
        peach: { 100: "#ffe4e6", 200: "#fecdd3", 400: "#fb7185", 500: "#f43f5e" },
        success: { 50: "#ecfdf5", 100: "#d1fae5", 500: "#10b981", 600: "#059669" },
        warning: { 50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 600: "#d97706" },
        ink: {
          900: "#1a1d1f", 800: "#3a3d3f", 700: "#525252", 600: "#757575",
          500: "#9e9e9e", 400: "#bdbdbd", 300: "#c8c8c8", 200: "#e0e0e0", 100: "#f5f5f5",
        },
      },
      fontFamily: { sans: ["A2G", "Pretendard Variable", "Pretendard", "ui-sans-serif", "system-ui"] },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #00c896 0%, #9f7aea 100%)",
        "sky-mint-gradient": "linear-gradient(120deg, #00c896 0%, #4299e1 100%)",
        "carbon-gradient": "linear-gradient(135deg, #121619 0%, #252a30 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.04), 0 8px 16px rgba(0,0,0,.04)",
        soft: "0 4px 24px rgba(0,200,150,.10)",
        pop: "0 8px 24px rgba(0,200,150,.28)",
        carbon: "0 8px 24px rgba(18,22,25,.25)",
        accent: "0 8px 24px rgba(255,200,42,.35)",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        wiggle: { "0%, 100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
