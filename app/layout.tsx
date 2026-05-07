import type { Metadata } from "next";
import "./globals.css";
import A11yToggle from "@/components/A11yToggle";

export const metadata: Metadata = {
  title: "제닉스 — AI 기반 초등학력 진단·학습시스템",
  description: "(주)제닉스 초3~6 학력+재능 이중 진단 · 4교과 57문항 45분",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <A11yToggle />
      </body>
    </html>
  );
}
