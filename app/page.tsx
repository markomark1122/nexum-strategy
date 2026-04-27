"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
});

export default function HomePage() {
  const [liveCount, setLiveCount] = useState(231);
  const liveRef = useRef(231);
  const targetRef = useRef(231);

  useEffect(() => {
    function animateCount() {
      if (liveRef.current < targetRef.current) {
        liveRef.current++;
        setLiveCount(liveRef.current);
        setTimeout(animateCount, 120);
      } else {
        const wait = Math.floor(Math.random() * 18000) + 7000;
        setTimeout(() => {
          targetRef.current += Math.floor(Math.random() * 3) + 1;
          animateCount();
        }, wait);
      }
    }
    const t = setTimeout(() => {
      targetRef.current += 2;
      animateCount();
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${syne.variable} ${dmSans.variable}`} style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          Nexum<span style={styles.logoAccent}>.</span>
        </div>
        <Link href="/scan" style={styles.navCta}>
          Get Free Audit →
        </Link>
      </nav>

      {/* LIVE BAR */}
      <div style={styles.liveBar}>
        <div style={styles.liveDot} />
        <span style={styles.liveText}>Live right now —</span>
        <span style={styles.liveCount}>{liveCount}</span>
        <span style={styles.liveText}>stores audited this month</span>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.eyebrow}>
          <div style={styles.eyebrowDot} />
          Free AI Audit for Ecommerce Stores
        </div>
        <h1 style={styles.h1}>
          Your store is losing money.<br />
          <em style={styles.accent}>AI can stop it.</em>
        </h1>
        <p style={styles.heroSub}>
          We audit your ecommerce business in 2 minutes and show you exactly
          where AI can recover lost revenue — for free, no strings attached.
        </p>
        <div style={styles.ctaGroup}>
          <Link href="/scan" style={styles.primaryBtn}>
            Run My Free Audit →
          </Link>
          <span style={styles.trustLine}>
            No credit card · No tool connection needed · Instant results
          </span>
        </div>

        {/* PREVIEW CARD */}
        <div style={styles.heroPreview}>
          <div style={styles.previewLabel}>
            Example Audit Result — Shopify Store · $42k/mo revenue
          </div>
          <div style={styles.previewRow}>
            {[
              { label: "AI Score", val: "74", sub: "/100", color: "#5af7b0" },
              { label: "Hours Lost/wk", val: "31", color: "#f7b25a" },
              { label: "Est. Monthly Loss", val: "$6,200", color: "#fff", small: true },
            ].map((m) => (
              <div key={m.label} style={styles.previewMetric}>
                <div style={styles.metricLabel}>{m.label}</div>
                <div
                  style={{
                    ...styles.metricVal,
                    color: m.color,
                    fontSize: m.small ? "15px" : undefined,
                    paddingTop: m.small ? "3px" : undefined,
                  }}
                >
                  {m.val}
                  {m.sub && (
                    <span style={{ fontSize: "13px", opacity: 0.5 }}>{m.sub}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {[
            { label: "Abandoned Cart Recovery", impact: "High Impact", pct: "88%", color: "#5af7b0" },
            { label: "Customer Support Automation", impact: "Medium", pct: "62%", color: "#f7b25a" },
            { label: "Ad Targeting Optimization", impact: "Review", pct: "44%", color: "#f77b5a" },
          ].map((b) => (
            <div key={b.label} style={styles.barWrap}>
              <div style={styles.barLabelRow}>
                <span style={styles.barLabelLeft}>{b.label}</span>
                <span style={{ ...styles.barLabelRight, color: b.color }}>{b.impact}</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: b.pct, background: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* PAIN SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>The Problem</div>
        <h2 style={styles.sectionTitle}>
          Most stores bleed revenue in<br />the same 4 places
        </h2>
        <p style={styles.sectionSub}>
          You&apos;re not failing — you&apos;re just running on manual when you should be
          running on AI.
        </p>
        <div style={styles.painGrid}>
          {[
            {
              icon: "🛒",
              title: "Abandoned carts with no follow-up",
              desc: "The average store loses 70% of carts. AI recovers them automatically.",
            },
            {
              icon: "📦",
              title: "Overstocking the wrong products",
              desc: "Gut-feel inventory decisions cost stores thousands every quarter.",
            },
            {
              icon: "💬",
              title: "Support tickets eating your hours",
              desc: "80% of support questions are the same. AI handles them in seconds.",
            },
            {
              icon: "📣",
              title: "Ad spend with no smart targeting",
              desc: "Spray-and-pray ads. AI cuts waste and finds your best buyers.",
            },
          ].map((p) => (
            <div key={p.title} style={styles.painCard}>
              <div style={styles.painIcon}>{p.icon}</div>
              <div style={styles.painTitle}>{p.title}</div>
              <div style={styles.painDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>How It Works</div>
        <h2 style={styles.sectionTitle}>
          From zero to your AI roadmap<br />in under 2 minutes
        </h2>
        <p style={styles.sectionSub}>
          No jargon. No fluff. Just a clear picture of where AI fits your store.
        </p>
        <div style={styles.stepsWrap}>
          {[
            {
              n: "1",
              title: "Tell us about your store",
              desc: "Answer 6 quick questions about your platform, team size, tools you use, and biggest headaches. Takes under 90 seconds.",
            },
            {
              n: "2",
              title: "AI calculates your opportunity score",
              desc: "Our model maps your answers against 50+ ecommerce AI use cases and ranks them by your ROI — not generic advice.",
            },
            {
              n: "3",
              title: "Get your personalized roadmap",
              desc: "See exactly which automations to build first, what tools to use, and how much time and money you'll save — with a 30-day action plan.",
            },
          ].map((s) => (
            <div key={s.n} style={styles.step}>
              <div style={styles.stepNum}>{s.n}</div>
              <div>
                <div style={styles.stepTitle}>{s.title}</div>
                <div style={styles.stepDesc}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF STATS */}
      <div style={styles.socialProof}>
        <div style={styles.statsRow}>
          {[
            { val: "$4.2k", label: "avg monthly savings identified per audit" },
            { val: "2min", label: "average time to complete the audit" },
            { val: "100%", label: "free — no catch, no credit card" },
          ].map((s) => (
            <div key={s.val} style={{ textAlign: "center" }}>
              <span style={styles.bigStat}>{s.val}</span>
              <div style={styles.bigStatLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>What store owners say</div>
        <div style={styles.testiGrid}>
          {[
            {
              quote:
                "I had no idea we were leaving $4k a month on the table just from abandoned carts. Nexum showed us exactly what to fix in 2 minutes.",
              initials: "JM",
              name: "Jake M.",
              biz: "Apparel store · Shopify · $68k/mo",
              result: "+$4,200/mo recovered",
            },
            {
              quote:
                "The audit flagged our support queue immediately. We were spending 22 hours a week answering the same questions. That's fixed now.",
              initials: "SR",
              name: "Sofia R.",
              biz: "Beauty brand · WooCommerce · $31k/mo",
              result: "22 hrs/week saved",
            },
            {
              quote:
                "Honestly thought AI was hype for small stores. The roadmap they gave us was specific and we implemented the first automation in one week.",
              initials: "TK",
              name: "Tom K.",
              biz: "Home goods · Shopify · $89k/mo",
              result: "3.1x ROAS improvement",
            },
          ].map((t) => (
            <div key={t.name} style={styles.testiCard}>
              <p style={styles.testiQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div style={styles.testiAuthor}>
                <div style={styles.testiAvatar}>{t.initials}</div>
                <div>
                  <div style={styles.testiName}>{t.name}</div>
                  <div style={styles.testiBiz}>{t.biz}</div>
                </div>
              </div>
              <div style={styles.testiResult}>{t.result}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* BOTTOM CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h2 style={styles.ctaTitle}>
            Stop guessing.<br />Start knowing.
          </h2>
          <p style={styles.ctaP}>
            Run the free audit and get a ranked, specific plan for where AI fits
            your ecommerce store — in the next 2 minutes.
          </p>
          <div style={styles.checklist}>
            {[
              "AI Readiness Score (0–100)",
              "Hours wasted weekly — calculated",
              "Estimated monthly revenue being lost",
              "Top 5 automations ranked by impact",
              "Your 30-day AI implementation roadmap",
            ].map((item) => (
              <div key={item} style={styles.checkItem}>
                <div style={styles.checkMark}>✓</div>
                <span style={{ fontSize: "13px", color: "rgba(232,230,224,0.65)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <Link href="/scan" style={{ ...styles.primaryBtn, display: "block", textAlign: "center", width: "100%" }}>
            Run My Free AI Audit →
          </Link>
          <div style={{ marginTop: "12px", fontSize: "11px", color: "rgba(232,230,224,0.3)", textAlign: "center" }}>
            For ecommerce &amp; marketing businesses · Instant results · No credit card
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ ...styles.logo, color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
          Nexum<span style={{ color: "#5af7b0", opacity: 0.6 }}>.</span>
        </div>
        <div style={styles.footerLinks}>
          <Link href="/terms" style={styles.footerLink}>Terms</Link>
          <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "var(--font-dm), DM Sans, sans-serif",
    background: "#06080f",
    color: "#e8e6e0",
    minHeight: "100vh",
    lineHeight: 1.6,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.2rem 2.5rem",
    borderBottom: "0.5px solid rgba(255,255,255,0.08)",
  },
  logo: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontWeight: 800,
    fontSize: "18px",
    letterSpacing: "-0.5px",
    color: "#fff",
  },
  logoAccent: { color: "#5af7b0" },
  navCta: {
    background: "#5af7b0",
    color: "#06080f",
    border: "none",
    padding: "8px 20px",
    borderRadius: "40px",
    fontFamily: "var(--font-dm), sans-serif",
    fontWeight: 500,
    fontSize: "13px",
    cursor: "pointer",
    letterSpacing: "0.2px",
  },
  liveBar: {
    background: "rgba(90,247,176,0.08)",
    borderBottom: "0.5px solid rgba(90,247,176,0.15)",
    padding: "10px 2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#5af7b0",
    animation: "pulse 1.5s infinite",
  },
  liveText: { fontSize: "12px", color: "rgba(232,230,224,0.6)" },
  liveCount: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "#5af7b0",
  },
  hero: {
    position: "relative",
    padding: "5rem 2.5rem 4rem",
    textAlign: "center",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "600px",
    background: "radial-gradient(ellipse, rgba(90,247,176,0.10) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(90,247,176,0.1)",
    border: "0.5px solid rgba(90,247,176,0.3)",
    color: "#5af7b0",
    padding: "5px 14px",
    borderRadius: "40px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#5af7b0",
    animation: "pulse 2s infinite",
  },
  h1: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "clamp(36px, 6vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-2px",
    color: "#ffffff",
    marginBottom: "1.25rem",
    maxWidth: "680px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  accent: { fontStyle: "normal", color: "#5af7b0" },
  heroSub: {
    fontSize: "16px",
    color: "rgba(232,230,224,0.6)",
    maxWidth: "480px",
    margin: "0 auto 2.5rem",
    fontWeight: 300,
    lineHeight: 1.7,
  },
  ctaGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  primaryBtn: {
    background: "#5af7b0",
    color: "#06080f",
    border: "none",
    padding: "14px 32px",
    borderRadius: "40px",
    fontFamily: "var(--font-dm), sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "-0.2px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  trustLine: { fontSize: "12px", color: "rgba(232,230,224,0.35)" },
  heroPreview: {
    marginTop: "3.5rem",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "1.5rem",
    maxWidth: "560px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
  },
  previewLabel: {
    fontSize: "10px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "rgba(232,230,224,0.3)",
    marginBottom: "1rem",
  },
  previewRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" },
  previewMetric: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "10px",
    padding: "12px",
    border: "0.5px solid rgba(255,255,255,0.07)",
  },
  metricLabel: {
    fontSize: "10px",
    color: "rgba(232,230,224,0.4)",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  metricVal: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
  },
  barWrap: { marginBottom: "8px" },
  barLabelRow: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(232,230,224,0.45)", marginBottom: "5px" },
  barLabelLeft: {},
  barLabelRight: { fontWeight: 500 },
  barTrack: { background: "rgba(255,255,255,0.07)", borderRadius: "4px", height: "6px", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: "4px" },
  divider: { height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "0 2.5rem" },
  section: { padding: "4rem 2.5rem" },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(232,230,224,0.3)",
    marginBottom: "0.75rem",
    textAlign: "center",
  },
  sectionTitle: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "clamp(24px, 4vw, 34px)",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "-1px",
    color: "#fff",
    marginBottom: "0.75rem",
    lineHeight: 1.15,
  },
  sectionSub: {
    textAlign: "center",
    fontSize: "14px",
    color: "rgba(232,230,224,0.45)",
    maxWidth: "380px",
    margin: "0 auto 3rem",
    lineHeight: 1.6,
  },
  painGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "12px",
    maxWidth: "680px",
    margin: "0 auto",
  },
  painCard: {
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "1.25rem",
  },
  painIcon: { fontSize: "20px", marginBottom: "8px" },
  painTitle: { fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "4px" },
  painDesc: { fontSize: "12px", color: "rgba(232,230,224,0.4)", lineHeight: 1.5 },
  stepsWrap: { maxWidth: "560px", margin: "0 auto" },
  step: { display: "grid", gridTemplateColumns: "48px 1fr", gap: "16px", marginBottom: "2rem", alignItems: "start" },
  stepNum: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "0.5px solid rgba(90,247,176,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "#5af7b0",
    flexShrink: 0,
    marginTop: "2px",
  },
  stepTitle: { fontSize: "15px", fontWeight: 500, color: "#fff", marginBottom: "4px", letterSpacing: "-0.3px" },
  stepDesc: { fontSize: "13px", color: "rgba(232,230,224,0.45)", lineHeight: 1.55 },
  socialProof: {
    background: "rgba(90,247,176,0.06)",
    borderTop: "0.5px solid rgba(90,247,176,0.15)",
    borderBottom: "0.5px solid rgba(90,247,176,0.15)",
    padding: "2.5rem",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "1rem",
    maxWidth: "560px",
    margin: "0 auto",
  },
  bigStat: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "clamp(32px, 5vw, 48px)",
    fontWeight: 800,
    color: "#5af7b0",
    letterSpacing: "-2px",
    display: "block",
  },
  bigStatLabel: { fontSize: "12px", color: "rgba(232,230,224,0.5)", marginTop: "4px" },
  testiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  testiCard: {
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "1.1rem",
  },
  testiQuote: { fontSize: "12px", color: "rgba(232,230,224,0.6)", lineHeight: 1.6, marginBottom: "12px", fontStyle: "italic", fontWeight: 300 },
  testiAuthor: { display: "flex", alignItems: "center", gap: "8px" },
  testiAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(90,247,176,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 700,
    color: "#5af7b0",
    flexShrink: 0,
  },
  testiName: { fontSize: "11px", fontWeight: 500, color: "#fff" },
  testiBiz: { fontSize: "10px", color: "rgba(232,230,224,0.35)" },
  testiResult: {
    display: "inline-block",
    background: "rgba(90,247,176,0.1)",
    border: "0.5px solid rgba(90,247,176,0.2)",
    color: "#5af7b0",
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
    marginTop: "8px",
    fontWeight: 500,
  },
  ctaSection: { padding: "4rem 2.5rem", textAlign: "center" },
  ctaBox: {
    background: "rgba(90,247,176,0.07)",
    border: "0.5px solid rgba(90,247,176,0.2)",
    borderRadius: "20px",
    padding: "3rem 2rem",
    maxWidth: "520px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-1px",
    marginBottom: "0.75rem",
    lineHeight: 1.15,
  },
  ctaP: { fontSize: "13px", color: "rgba(232,230,224,0.5)", marginBottom: "2rem", lineHeight: 1.6 },
  checklist: { textAlign: "left", marginBottom: "2rem" },
  checkItem: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  checkMark: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "rgba(90,247,176,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "9px",
    color: "#5af7b0",
  },
  footer: {
    padding: "1.5rem 2.5rem",
    borderTop: "0.5px solid rgba(255,255,255,0.07)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLinks: { display: "flex", gap: "16px" },
  footerLink: { fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none" },
};
