import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kidsdiag — 초5 학력진단",
  description: "한국창의영재교육원 검수 + AI 진단으로 자녀의 학력을 정밀 진단",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
