import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PreferencesProvider } from "@/lib/contexts/PreferencesContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Healthify - Your Personal Health Command Center",
  description: "AI-powered health tracking and nutrition analysis platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  )
}
