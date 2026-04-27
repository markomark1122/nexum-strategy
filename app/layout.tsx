import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexum Strategy | AI Automation Diagnostic for Ecommerce",
  description:
    "Identify which ecommerce workflows AI should automate first, estimate potential impact, and generate a practical implementation roadmap.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* MAIN CONTENT */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* FOOTER */}
        <footer
          style={{
            padding: "20px",
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "#020b1c",
          }}
        >
          <a href="/terms" style={{ marginRight: "20px", color: "white" }}>
            Terms
          </a>
          <a href="/privacy" style={{ color: "white" }}>
            Privacy
          </a>
        </footer>

      </body>
    </html>
  );
}