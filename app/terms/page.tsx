import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="ns-page">
      <div className="ns-background">
        <div className="ns-background-image" />
        <div className="ns-background-overlay" />
        <div className="ns-glow ns-glow-one" />
        <div className="ns-glow ns-glow-two" />
      </div>

      <header className="ns-header">
        <nav className="ns-nav">
          <Link href="/" className="ns-logo">
            <span className="ns-logo-icon">✦</span>
            <span>Nexum Strategy</span>
          </Link>

          <Link href="/scan" className="ns-nav-button">
            Generate My Report
          </Link>
        </nav>
      </header>

      <section className="ns-legal-shell">
        <div className="ns-legal-card">
          <p className="ns-section-eyebrow">Terms</p>
          <h1>Terms of Use</h1>

          <div className="ns-legal-content">
            <p>
              Nexum Strategy provides an AI automation diagnostic for ecommerce businesses. The diagnostic is informational
              and is intended to help users think through automation opportunities, risks, and implementation priorities.
            </p>

            <p>
              The report does not guarantee revenue improvement, time savings, software performance, or business results.
              Users are responsible for reviewing recommendations before implementing any workflow, automation, or tool.
            </p>

            <p>
              Do not submit passwords, payment information, banking details, private customer files, or sensitive credentials
              through the diagnostic form.
            </p>

            <p>
              Any implementation work, roadmap purchase, or advisory service may be subject to additional terms, scope, and
              payment requirements.
            </p>

            <p>
              By using this site, you agree that Nexum Strategy is not liable for business losses, software errors,
              third-party platform issues, or implementation decisions made based on the diagnostic.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}