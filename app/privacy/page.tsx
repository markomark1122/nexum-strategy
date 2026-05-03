import Link from "next/link"

export default function PrivacyPage() {
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
          <p className="ns-section-eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>

          <div className="ns-legal-content">
            <p>
              Nexum Strategy uses submitted form information to generate an automation diagnostic. This may include your email,
              business type, revenue range, tools, bottlenecks, workflow descriptions, and automation priorities.
            </p>

            <p>
              The first diagnostic does not require passwords, payment information, private business files, or direct store
              connection.
            </p>

            <p>
              Submitted information may be used to generate your report, improve the diagnostic experience, and follow up if you
              request additional services or a roadmap.
            </p>

            <p>
              Do not submit sensitive customer data, passwords, banking information, payment details, or private credentials.
            </p>

            <p>
              If third-party services are added later, such as payment processing, analytics, email storage, or database storage,
              this policy should be updated to describe those providers and how data is handled.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}