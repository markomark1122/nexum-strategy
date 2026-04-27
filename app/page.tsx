
"use client"

export default function Page() {
  return (
    <main className="page">
      {/* HERO: background image only, no text, no icons, no CTA */}
      <section className="hero" />

      <section className="section">
        <p className="sectionEyebrow">WHAT YOU GET</p>
        <h2>What Your Free Audit Includes</h2>

        <div className="cards six">
          {[
            "AI Readiness Score",
            "Automation Opportunity Score",
            "Estimated Hours Wasted Weekly",
            "Estimated Monthly Cost of Inefficiency",
            "Top 5 Recommended Automations",
            "30-Day AI Implementation Roadmap",
          ].map((item) => (
            <div className="card" key={item}>
              <span className="check">✓</span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <p className="sectionEyebrow">PROCESS</p>
        <h2>How It Works</h2>

        <div className="cards threeCards">
          <div className="stepCard">
            <span className="step">1</span>
            <h3>Answer a few questions</h3>
            <p>Tell us your business type, tools, bottlenecks, and repetitive tasks.</p>
          </div>

          <div className="stepCard">
            <span className="step">2</span>
            <h3>Get your AI opportunity score</h3>
            <p>We calculate where AI can save the most time and money.</p>
          </div>

          <div className="stepCard">
            <span className="step">3</span>
            <h3>See what to automate first</h3>
            <p>Get a ranked roadmap with tools, savings, and next steps.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="sectionEyebrow">PREVIEW</p>
        <h2>Example Audit Result</h2>

        <div className="resultCard">
          <div className="resultRow">
            <span>AI Readiness Score</span>
            <strong>68/100</strong>
          </div>

          <div className="resultRow">
            <span>Automation Opportunity</span>
            <strong>High</strong>
          </div>

          <div className="resultRow">
            <span>Estimated Time Waste</span>
            <strong>24 hrs/week</strong>
          </div>

          <div className="resultRow">
            <span>Estimated Monthly Savings</span>
            <strong>$3,800–$7,200</strong>
          </div>

          <div className="resultRow">
            <span>Best First Automation</span>
            <strong>Client reporting</strong>
          </div>

          <p className="note">
            Your actual results are generated based on your business answers.
          </p>
        </div>
      </section>

      <section className="section alt">
        <p className="sectionEyebrow">TRUST</p>
        <h2>Safe to Start</h2>

        <div className="trustGrid">
          <div>No credit card required</div>
          <div>No sensitive data required for the first scan</div>
          <div>No tool connection required</div>
          <div>Instant results</div>
          <div>Built for business owners and operators</div>
        </div>
      </section>

      <section className="finalCta">
        <h2>Stop guessing where AI fits.</h2>
        <p>Run the free audit and get a clear starting point in under 2 minutes.</p>

        <a href="/scan" className="cta">
          Start Free AI Audit →
        </a>
      </section>

      <footer className="footer">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }

        .page {
          margin: 0;
          background: #020b1c;
          color: white;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        .hero {
          min-height: 100vh;
          background-image:
            linear-gradient(rgba(0, 8, 25, 0.08), rgba(0, 8, 25, 0.18)),
            url('/background.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        .section {
          padding: 96px 24px;
          max-width: 1180px;
          margin: 0 auto;
        }

        .section.alt {
          max-width: none;
          padding-left: max(24px, calc((100vw - 1180px) / 2));
          padding-right: max(24px, calc((100vw - 1180px) / 2));
          background:
            radial-gradient(circle at top right, rgba(14,165,255,0.12), transparent 35%),
            rgba(255,255,255,0.025);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .sectionEyebrow {
          margin: 0 0 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #7dd3fc;
        }

        .section h2,
        .finalCta h2 {
          margin: 0 0 40px;
          text-align: center;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1.05;
        }

        .cards {
          display: grid;
          gap: 22px;
        }

        .six {
          grid-template-columns: repeat(3, 1fr);
        }

        .threeCards {
          grid-template-columns: repeat(3, 1fr);
        }

        .card,
        .stepCard,
        .resultCard,
        .trustGrid div {
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(125,211,252,0.18);
          border-radius: 22px;
          box-shadow: 0 0 36px rgba(0,0,0,0.24);
          backdrop-filter: blur(14px);
        }

        .card {
          padding: 26px;
        }

        .check {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          margin-bottom: 18px;
          color: #7dd3fc;
          border: 1px solid rgba(125,211,252,0.35);
          background: rgba(14,165,255,0.08);
          font-weight: 900;
        }

        .card h3 {
          margin: 0;
          font-size: 20px;
        }

        .stepCard {
          padding: 30px;
        }

        .step {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          margin-bottom: 20px;
          background: rgba(14,165,255,0.12);
          border: 1px solid rgba(125,211,252,0.35);
          color: #7dd3fc;
          font-weight: 900;
        }

        .stepCard h3 {
          margin: 0 0 12px;
          font-size: 24px;
        }

        .stepCard p {
          margin: 0;
          color: rgba(255,255,255,0.72);
          line-height: 1.6;
        }

        .resultCard {
          max-width: 760px;
          margin: 0 auto;
          padding: 32px;
        }

        .resultRow {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.78);
        }

        .resultRow strong {
          color: #7dd3fc;
          text-align: right;
        }

        .note {
          margin: 24px 0 0;
          text-align: center;
          color: rgba(255,255,255,0.58);
          font-size: 14px;
        }

        .trustGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .trustGrid div {
          padding: 22px;
          text-align: center;
          color: rgba(255,255,255,0.8);
          font-weight: 700;
        }

        .finalCta {
          padding: 110px 24px;
          text-align: center;
          background:
            radial-gradient(circle at center, rgba(14,165,255,0.16), transparent 36%),
            #020b1c;
        }

        .finalCta p {
          margin: -20px auto 34px;
          max-width: 720px;
          font-size: 21px;
          color: rgba(255,255,255,0.72);
          line-height: 1.5;
        }

        .cta {
          display: inline-block;
          padding: 18px 46px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0ea5ff, #2563eb);
          color: white;
          font-size: 20px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 0 32px rgba(14,165,255,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 44px rgba(14,165,255,0.65);
        }

        .footer {
          display: flex;
          justify-content: center;
          gap: 30px;
          padding: 26px 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .footer a {
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 15px;
        }

        .footer a:hover {
          color: #7dd3fc;
        }

        @media (max-width: 900px) {
          .hero {
            min-height: 70vh;
            background-position: center;
          }

          .six,
          .threeCards,
          .trustGrid {
            grid-template-columns: 1fr;
          }

          .section {
            padding: 72px 20px;
          }

          .resultRow {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .resultRow strong {
            text-align: left;
          }
        }
      `}</style>
    </main>
  )
}
