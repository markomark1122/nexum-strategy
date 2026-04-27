"use client"

export default function Page() {
  return (
    <main className="page">
      <section className="hero">
        <div className="textGrid">
          <div className="feature one">
            <div className="topIcon">▣</div>
            <h1>Find Wasted Time</h1>
            <p>Discover repetitive tasks costing your team hours every week.</p>
          </div>

          <div className="feature two">
            <div className="topIcon">↗</div>
            <h1>Prioritize AI Automations</h1>
            <p>See which workflows should be automated first based on impact, difficulty, and ROI.</p>
          </div>

          <div className="feature three">
            <div className="topIcon">⚙</div>
            <h1>Get a 30-Day Roadmap</h1>
            <p>Receive practical next steps, tool suggestions, and estimated savings.</p>
          </div>
        </div>

        <div className="brandBlock">
          <p className="eyebrow">FOR MARKETING & E-COMMERCE BUSINESSES</p>

          <p className="brandName">Nexum Strategy</p>

          <h1 className="brandTitle">Find What Your Business Should Automate First</h1>

          <p className="brandSubtitle">
            Get a free AI compatibility audit that shows where your business can save time,
            cut costs, and unlock growth.
          </p>

          <p className="trustLine">
            Free AI compatibility audit · Takes under 2 minutes · No credit card required
          </p>

          <a href="/scan" className="cta">
            Start Free AI Audit →
         </a>
        </div>
      </section>

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
            linear-gradient(rgba(0, 8, 25, 0.2), rgba(0, 8, 25, 0.7)),
            url('/background.png');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .textGrid {
         position: absolute;
         top: 8%;
         left: 50%;
         transform: translateX(-50%);
         width: 90%;
         max-width: 1200px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 36px;
        text-align: center;
       }

        .feature {
          opacity: 0;
          animation: dropIn 1.2s ease-out forwards;
        }

        .one { animation-delay: 0.2s; }
        .two { animation-delay: 1.2s; }
        .three { animation-delay: 2.2s; }

        .topIcon {
          width: 76px;
          height: 76px;
          margin: 0 auto 18px;
          display: grid;
          place-items: center;
          border: 1px solid #00aaff;
          border-radius: 18px;
          font-size: 34px;
          color: #14b8ff;
          box-shadow: 0 0 28px rgba(0,170,255,0.45);
          background: rgba(0, 15, 40, 0.35);
        }

        .feature h1 {
          margin: 0 0 14px;
          font-size: clamp(23px, 2.4vw, 38px);
        }

        .feature p {
          margin: 0 auto;
          max-width: 350px;
          font-size: 17px;
          line-height: 1.45;
          color: rgba(255,255,255,0.82);
        }
        .brandBlock {
         position: absolute;
         top: 55%;
         left: 50%;
         transform: translate(-50%, -50%);
         text-align: center;
         width: min(900px, 92vw);
        } 

        .eyebrow {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #7dd3fc;
          margin-bottom: 10px;
        }

        .brandName {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          color: rgba(255,255,255,0.72);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .brandTitle {
          margin: 12px 0 0;
          font-size: clamp(42px, 5.8vw, 78px);
          line-height: 1.02;
          font-weight: 900;
          background: linear-gradient(135deg, #fff, #7dd3fc, #0ea5ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brandSubtitle {
          margin: 22px auto 0;
          max-width: 900px;
          font-size: clamp(18px, 2vw, 27px);
          line-height: 1.4;
          color: rgba(255,255,255,0.86);
        }

        .trustLine {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          margin: 18px 0 24px;
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

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-110px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero {
            min-height: auto;
            padding: 42px 20px 80px;
          }

          .textGrid {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            grid-template-columns: 1fr;
            gap: 34px;
            margin-bottom: 56px;
          }

          .brandBlock {
            position: relative;
            left: auto;
            bottom: auto;
            transform: none;
            width: 100%;
            margin: 0 auto;
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