import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"; // Geistフォントを削除し、Interフォントをインポート
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { cn } from "@/lib/utils" // cn関数をインポート

const inter = Inter({ subsets: ["latin"] }); // Interフォントを定義

export const metadata: Metadata = {
  title: "ツインレイ診断 - 魂のつながりを診断",
  description:
    "20の質問であなたの運命の人が真のツインレイかどうかを診断します。魂のつながりを感じる特別な関係を見つけましょう。",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Googleアナリティクスとサーチコンソールの設定
  const gaMeasurementId = "G-XXXXXXXXXX"; // あなたの測定IDに置き換えてください
  const searchConsoleVerification = "YOUR_SEARCH_CONSOLE_VERIFICATION_CODE"; // あなたの認証コードに置き換えてください

  return (
    <html lang="ja" className={cn(inter.className, "antialiased")}>
      <head>
        <meta name="google-site-verification" content={searchConsoleVerification} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}