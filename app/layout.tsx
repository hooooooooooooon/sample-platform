import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Alpha.K.A",
    default: "Alpha.K.A",
  },
  description: "알파카 - 건축을 위한 모든 것",
  icons: {
    other: [
      {
        url: "/icons/iphonexsmax_splash.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
        rel: "apple-touch-startup-image",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#4169E1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-neutral-800`}>
        {children}
      </body>
    </html>
  );
}
