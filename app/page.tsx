"use client"

export default function Page() {
  return (
    <main className="page">
      <section className="hero">
        <div className="heroOverlay" />

        <nav className="nav">
          <a href="/" className="logo">
            <span className="logoIcon">✦</span>
            Nexum Strategy
          </a>

          <a href="/scan" className="navCta">
            Generate My Report
          </a>
        </nav>

        <div className="heroContent">
          <p className="eyebrow">AI AUTOMATION DIAGNOSTIC FOR ECOMMERCE</p>

          <h1>
            Identify where AI can benefit your ecommerce business.
          </h1>

          <p className="heroText">
            Get a personalized automation report that identifies where your
            store may be losing time, margin, and revenue — then shows which
            workflow to improve first.
          </p>

          <div className="heroActions">
            <a href="/scan" className="primaryCta">
              Generate My Automation Report →
            </a>

            <a href="#sample" className="secondaryCta">
              View Sample Result
            </a>
          </div>

          <p className="trustLine">
            No payment required · No tool connection needed · No private files required
          </p>
        </div>
      </section>

      <section className="section">
        <p className="sectionEyebrow">WHAT IT EVALUATES</p>
        <h2>Built to identify practical automation opportunities.</h2>

        <div className="cards six">
          {[
            "Workflow repetition",
            "Manual time waste",
            "Tool compatibility",
            "Data readiness",
            "Automation risk",
            "Implementation priority",
          ].map((item) => (
            <div className="card" key={item}>
              <span className="check">✓</span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <p className="sectionEyebrow">HOW IT WORKS</p>
        <h2>A short diagnostic. A clearer automation path.</h2>

        <div className="cards threeCards">
          <div className="stepCard">
            <span className="step">1</span>
            <h3>Answer business questions</h3>
            <p>
              Share your store type, tools, bottlenecks, current workflows,
              data confidence, and automation goals.
            </p>
          </div>

          <div className="stepCard">
            <span className="step">2</span>
            <h3>Get priority scoring</h3>
            <p>
              The diagnostic evaluates readiness, opportunity, risk, effort,
              and potential business impact.
            </p>
          </div>

          <div className="stepCard">
            <span className="step">3</span>
            <h3>See what to automate first</h3>
            <p>
              Receive a ranked report with your best first automation,
              recommended tools, warnings, and next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="sample">
        <p className="sectionEyebrow">SAMPLE OUTPUT</p>
        <h2>Example automation report preview</h2>

        <div className="resultCard">
          <div className="resultRow">
            <span>AI Readiness Score</span>
            <strong>72/100</strong>
          </div>

          <div className="resultRow">
            <span>Automation Opportunity</span>
            <strong>High</strong>
          </div>

          <div className="resultRow">
            <span>Best First Automation</span>
            <strong>Email/SMS follow-up</strong>
          </div>

          <div className="resultRow">
            <span>Recommended Tools</span>
            <strong>Shopify · Klaviyo · Make</strong>
          </div>

          <div className="resultRow">
            <span>Risk Level</span>
            <strong>Low-Medium</strong>
          </div>

          <p className="note">
            This is a sample result. Your report is generated from your own
            diagnostic answers.
          </p>
        </div>
      </section>

      <section className="section alt">
        <p className="sectionEyebrow">COMMON ECOMMERCE WORKFLOWS</p>
        <h2>Where AI can usually help first</h2>

        <div className="cards threeCards">
          <div className="stepCard">
            <span className="step">01</span>
            <h3>Customer follow-up</h3>
            <p>
              Improve abandoned cart, post-purchase, win-back, and repeat
              purchase flows with better segmentation and messaging.
            </p>
          </div>

          <div className="stepCard">
            <span className="step">02</span>
            <h3>Support replies</h3>
            <p>
              Reduce repetitive support work by using AI to draft replies,
              summarize issues, and organize common questions.
            </p>
          </div>

          <div className="stepCard">
            <span className="step">03</span>
            <h3>Reporting and insights</h3>
            <p>
              Turn store, ad, email, and customer data into weekly summaries
              with practical action items.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="sectionEyebrow">SAFE TO START</p>
        <h2>No sensitive access required for the first diagnostic.</h2>

        <div className="trustGrid">
          <div>No passwords required</div>
          <div>No payment required</div>
          <div>No private files required</div>
          <div>No store connection needed</div>
          <div>Human approval recommended</div>
        </div>
      </section>

      <section className="roadmapOffer">
        <div className="offerCard">
          <p className="sectionEyebrow">NEXT STEP</p>

          <h2>Want the full implementation plan?</h2>

          <p>
            The free diagnostic identifies what to automate first. The AI
            Automation Roadmap turns that result into a practical 30-day plan
            with workflow steps, tool recommendations, prompts, risk warnings,
            and success metrics.
          </p>

          <div className="offerBullets">
            <span>Workflow map</span>
            <span>Recommended tools</span>
            <span>AI prompts</span>
            <span>30-day rollout plan</span>
            <span>Risk warnings</span>
            <span>Success metrics</span>
          </div>

          <a href="/scan" className="primaryCta">
            Start With The Free Diagnostic →
          </a>
        </div>
      </section>

      <section className="finalCta">
        <h2>Stop guessing where AI fits.</h2>
        <p>
          Generate a diagnostic report and find the highest-leverage workflow
          your ecommerce business should automate first.
        </p>

        <a href="/scan" className="primaryCta">
          Generate My Automation Report →
        </a>
      </section>

      <footer className="footer">
        <span>Nexum Strategy</span>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </footer>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .page {
          margin: 0;
          background: #020b1c;
          color: white;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        .hero {
          min-height: 100vh;
          position: relative;
          background-image:
            linear-gradient(rgba(0, 8, 25, 0.35), rgba(0, 8, 25, 0.72)),
            url('/background.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(14,165,255,0.16), transparent 38%),
            radial-gradient(circle at bottom, rgba(37,99,235,0.18), transparent 32%);
          pointer-events: none;
        }

        .nav {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          width: calc(100% - 48px);
          margin: 0 auto;
          padding: 28px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
          font-size: 20px;
          font-weight: 900;
        }

        .logoIcon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(14,165,255,0.16);
          color: #7dd3fc;
          border: 1px solid rgba(125,211,252,0.25);
          box-shadow: 0 0 24px rgba(14,165,255,0.2);
        }

        .navCta {
          color: white;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(14,165,255,0.16);
          border: 1px solid rgba(125,211,252,0.25);
          font-weight: 800;
        }

        .heroContent {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: min(980px, calc(100% - 40px));
          margin: 0 auto;
          padding: 60px 0 110px;
        }

        .eyebrow,
        .sectionEyebrow {
          color: #7dd3fc;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .eyebrow {
          margin: 0 0 18px;
          padding: 10px 18px;
          border: 1px solid rgba(125,211,252,0.22);
          border-radius: 999px;
          background: rgba(14,165,255,0.08);
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(46px, 7vw, 92px);
          line-height: 0.96;
          letter-spacing: -0.06em;
          font-weight: 950;
          background: linear-gradient(135deg, #ffffff, #7dd3fc, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .heroText {
          max-width: 820px;
          margin: 26px auto 0;
          color: rgba(255,255,255,0.8);
          font-size: clamp(18px, 2vw, 25px);
          line-height: 1.5;
        }

        .heroActions {
          margin-top: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .primaryCta,
        .secondaryCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 17px 30px;
          font-size: 17px;
          font-weight: 900;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primaryCta {
          color: white;
          background: linear-gradient(135deg, #0ea5ff, #2563eb);
          box-shadow: 0 0 32px rgba(14,165,255,0.45);
        }

        .secondaryCta {
          color: white;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.16);
        }

        .primaryCta:hover,
        .secondaryCta:hover {
          transform: translateY(-2px);
        }

        .trustLine {
          margin: 22px 0 0;
          color: rgba(255,255,255,0.62);
          font-size: 15px;
        }

        .section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 24px;
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
        }

        .section h2,
        .finalCta h2,
        .roadmapOffer h2 {
          margin: 0 auto 42px;
          max-width: 900px;
          text-align: center;
          font-size: clamp(34px, 4vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.04em;
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
        .trustGrid div,
        .offerCard {
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(125,211,252,0.18);
          border-radius: 24px;
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
          width: 48px;
          height: 48px;
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
          max-width: 820px;
          margin: 0 auto;
          padding: 34px;
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

        .roadmapOffer {
          padding: 96px 24px;
          background:
            radial-gradient(circle at center, rgba(14,165,255,0.16), transparent 36%),
            #020b1c;
        }

        .offerCard {
          max-width: 940px;
          margin: 0 auto;
          padding: 42px;
          text-align: center;
        }

        .offerCard p {
          max-width: 760px;
          margin: 0 auto 28px;
          color: rgba(255,255,255,0.74);
          font-size: 19px;
          line-height: 1.6;
        }

        .offerBullets {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: 28px 0 34px;
        }

        .offerBullets span {
          padding: 14px;
          border-radius: 14px;
          background: rgba(14,165,255,0.08);
          border: 1px solid rgba(125,211,252,0.16);
          color: rgba(255,255,255,0.82);
          font-weight: 700;
        }

        .finalCta {
          padding: 100px 24px;
          text-align: center;
        }

        .finalCta p {
          max-width: 760px;
          margin: -22px auto 34px;
          color: rgba(255,255,255,0.72);
          font-size: 21px;
          line-height: 1.5;
        }

        .footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          padding: 26px 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.72);
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
          .nav {
            width: calc(100% - 32px);
          }

          .navCta {
            display: none;
          }

          .hero {
            min-height: 92vh;
          }

          .heroContent {
            padding: 50px 0 80px;
          }

          .hero h1 {
            font-size: clamp(42px, 12vw, 64px);
          }

          .six,
          .threeCards,
          .trustGrid,
          .offerBullets {
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

          .offerCard {
            padding: 30px 22px;
          }

          .footer {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </main>
  )
}