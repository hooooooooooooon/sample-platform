import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_DEFAULT_TITLE = "Alpha-KA App";

export const metadata: Metadata = {
  applicationName: "Alphaka",
  title: {
    default: APP_DEFAULT_TITLE,
    template: "%s | Alpha.K.A",
  },
  description: "알파카 - 건축을 위한 모든 것",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
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
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link
        href="/icons/iphonexsmax_splash.png"
        media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <body className={`${inter.className} bg-white text-neutral-800`}>
        {children}
      </body>
    </html>
  );
}
