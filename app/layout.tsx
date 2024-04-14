import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Alpha.K.A",
    default: "Alpha.K.A",
  },
  description: "건축 플랫폼 알파카에 오신 것을 환영합니다!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-white text-neutral-800 max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
