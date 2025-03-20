import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OoqatBor - Food Donation App",
  description: "A food donation app for mystery boxes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="max-w-md mx-auto h-[100dvh] overflow-hidden flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'