import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nexum Strategy | AI Automation Diagnostic for Ecommerce",
  description:
    "Identify which ecommerce workflows AI should automate first, estimate potential impact, and generate a practical implementation roadmap.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}