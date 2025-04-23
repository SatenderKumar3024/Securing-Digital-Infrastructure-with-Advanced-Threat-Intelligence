import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Satender Kumar | Cybersecurity Specialist",
  description: "Information Security Analyst specializing in cloud security, SIEM, and threat detection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
