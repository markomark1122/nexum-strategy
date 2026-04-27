"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

type Selections = Record<string, string | string[]>;

const STEPS = 6;

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  function selectOpt(group: string, val: string) {
    setSelections((prev) => ({ ...prev, [group]: val }));
  }

  function toggleMulti(group: string, val: string) {
    setMultiSelections((prev) => {
      const curr = prev[group] || [];
      return {
        ...prev,
        [group]: curr.includes(val) ? curr.filter((v) => v !== val) : [...curr, val],
      };
    });
  }

  function goNext() {
    if (step < STEPS) setStep((s) => s + 1);
  }

  function goPrev() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const progressSteps = Array.from({ length: STEPS }, (_, i) => i + 1);

  if (submitted) {
    return (
      <div className={`${syne.variable} ${dmSans.variable}`} style={styles.root}>
        <nav style={styles.nav}>
          <div style={styles.logo}>Nexum<span style={styles.logoAccent}>.</span></div>
          <Link href="/" style={styles.backBtn}>← Back to home</Link>
        </nav>
        <div style={styles.liveBar}>
          <div style={styles.liveDot} />
          <span style={styles.liveText}>Live right now —</span>
          <span style={styles.liveCount}>{liveCount}</span>
          <span style={styles.liveText}>stores audited this month</span>
        </div>
        <div style={styles.resultWrap}>
          <div style={styles.resultHeader}>
            <div style={styles.scoreRing}>
              <div style={styles.ringBg} />
              <div style={styles.ringFill} />
              <span style={styles.scoreNum}>74</span>
            </div>
            <h2 style={styles.resultName}>
              {name ? `${name}'s AI Audit is Ready` : "Your AI Audit is Ready"}
            </h2>
            <p style={styles.resultSub}>
              Based on your answers, here&apos;s where AI can help your store most
            </p>
          </div>

          <div style={styles.resultMetrics}>
            {[
              { val: "74/100", label: "AI readiness score", color: "#5af7b0" },
              { val: "28 hrs", label: "lost per week", color: "#f7b25a" },
              { val: "$5,400", label: "monthly opportunity", color: "#fff" },
            ].map((m) => (
              <div key={m.label} style={styles.rMetric}>
                <span style={{ ...styles.rMetricVal, color: m.color }}>{m.val}</span>
                <span style={styles.rMetricLabel}>{m.label}</span>
              </div>
            ))}
          </div>

          <div style={styles.automationsCard}>
            <div style={styles.automationsTitle}>Top automations for your store</div>
            {[
              { label: "Abandoned cart AI recovery", impact: "High impact", pct: "91%", color: "#5af7b0" },
              { label: "AI customer support agent", impact: "High impact", pct: "78%", color: "#5af7b0" },
              { label: "Ad targeting optimization", impact: "Medium", pct: "55%", color: "#f7b25a" },
            ].map((b) => (
              <div key={b.label} style={{ marginBottom: "12px" }}>
                <div style={styles.barLabelRow}>
                  <span style={{ fontSize: "12px", color: "rgba(232,230,224,0.5)" }}>{b.label}</span>
                  <span style={{ fontSize: "12px", color: b.color, fontWeight: 500 }}>{b.impact}</span>
                </div>
                <div style={styles.barTrack}>
                  <div style={{ ...styles.barFill, width: b.pct, background: b.color }} />
                </div>
              </div>
            ))}
          </div>

          <button style={styles.resultCta}>
            Book My Free Strategy Call →
          </button>
          <div style={{ textAlign: "center", fontSize: "11px", color: "rgba(232,230,224,0.25)", marginTop: "10px" }}>
            Full 30-day roadmap sent to your email
          </div>
        </div>

        <TestimonialsSection />
        <style>{keyframes}</style>
      </div>
    );
  }

  return (
    <div className={`${syne.variable} ${dmSans.variable}`} style={styles.root}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Nexum<span style={styles.logoAccent}>.</span></div>
        <Link href="/" style={styles.backBtn}>← Back to home</Link>
      </nav>

      <div style={styles.liveBar}>
        <div style={styles.liveDot} />
        <span style={styles.liveText}>Live right now —</span>
        <span style={styles.liveCount}>{liveCount}</span>
        <span style={styles.liveText}>stores audited this month</span>
      </div>

      <div style={styles.scanWrap}>
        <div style={styles.eyebrow}>Free AI Audit</div>
        <h1 style={styles.scanTitle}>
          Let&apos;s find your<br />
          <em style={styles.accent}>hidden revenue.</em>
        </h1>
        <p style={styles.scanSub}>6 quick questions · Instant results · No credit card</p>

        {/* PROGRESS */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={styles.progressSteps}>
            {progressSteps.map((n) => (
              <div
                key={n}
                style={{
                  ...styles.pStep,
                  background:
                    n < step
                      ? "#5af7b0"
                      : n === step
                      ? "rgba(90,247,176,0.5)"
                      : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>
          <div style={styles.progressLabel}>
            Step <span style={{ color: "#5af7b0" }}>{step}</span> of {STEPS}
          </div>
        </div>

        {/* STEP 1 — Platform */}
        {step === 1 && (
          <StepFade>
            <div style={styles.fieldLabel}>About your store</div>
            <div style={styles.fieldQ}>What platform does your store run on?</div>
            <div style={styles.optionGrid}>
              {[
                { icon: "🛍", title: "Shopify", desc: "Shopify or Shopify Plus" },
                { icon: "🛒", title: "WooCommerce", desc: "WordPress-based store" },
                { icon: "📦", title: "BigCommerce", desc: "BigCommerce platform" },
                { icon: "⚙️", title: "Custom / Other", desc: "Built in-house or other" },
              ].map((o) => (
                <OptBtn
                  key={o.title}
                  selected={selections["platform"] === o.title}
                  onClick={() => selectOpt("platform", o.title)}
                >
                  <span style={{ fontSize: "18px", marginBottom: "6px", display: "block" }}>{o.icon}</span>
                  <span style={styles.optTitle}>{o.title}</span>
                  <span style={styles.optDesc}>{o.desc}</span>
                </OptBtn>
              ))}
            </div>
            <NavBtns onNext={goNext} />
          </StepFade>
        )}

        {/* STEP 2 — Revenue */}
        {step === 2 && (
          <StepFade>
            <div style={styles.fieldLabel}>Store size</div>
            <div style={styles.fieldQ}>What&apos;s your average monthly revenue?</div>
            <div style={styles.optionGrid}>
              {[
                { title: "Under $10k/mo", desc: "Early stage" },
                { title: "$10k – $50k/mo", desc: "Growing store" },
                { title: "$50k – $200k/mo", desc: "Established brand" },
                { title: "$200k+/mo", desc: "High-volume store" },
              ].map((o) => (
                <OptBtn
                  key={o.title}
                  selected={selections["revenue"] === o.title}
                  onClick={() => selectOpt("revenue", o.title)}
                >
                  <span style={styles.optTitle}>{o.title}</span>
                  <span style={styles.optDesc}>{o.desc}</span>
                </OptBtn>
              ))}
            </div>
            <NavBtns onNext={goNext} onPrev={goPrev} />
          </StepFade>
        )}

        {/* STEP 3 — Pain points */}
        {step === 3 && (
          <StepFade>
            <div style={styles.fieldLabel}>Your biggest pains</div>
            <div style={styles.fieldQ}>Where does your team waste the most time? (pick all that apply)</div>
            <div style={styles.checkboxList}>
              {[
                "Answering the same customer support questions",
                "Writing product descriptions and ad copy",
                "Managing abandoned cart follow-ups manually",
                "Guessing on inventory and restocking",
                "Manually managing ad campaigns and budgets",
              ].map((item) => {
                const selected = (multiSelections["pains"] || []).includes(item);
                return (
                  <ChkBtn
                    key={item}
                    selected={selected}
                    onClick={() => toggleMulti("pains", item)}
                    label={item}
                  />
                );
              })}
            </div>
            <NavBtns onNext={goNext} onPrev={goPrev} />
          </StepFade>
        )}

        {/* STEP 4 — Tools */}
        {step === 4 && (
          <StepFade>
            <div style={styles.fieldLabel}>Your tools</div>
            <div style={styles.fieldQ}>Which tools does your store currently use?</div>
            <div style={styles.checkboxList}>
              {[
                "Klaviyo or similar email/SMS platform",
                "Meta or Google Ads",
                "Gorgias, Zendesk or similar helpdesk",
                "Yotpo, Loox or review platform",
                "None of the above / just the basics",
              ].map((item) => {
                const selected = (multiSelections["tools"] || []).includes(item);
                return (
                  <ChkBtn
                    key={item}
                    selected={selected}
                    onClick={() => toggleMulti("tools", item)}
                    label={item}
                  />
                );
              })}
            </div>
            <NavBtns onNext={goNext} onPrev={goPrev} />
          </StepFade>
        )}

        {/* STEP 5 — Team */}
        {step === 5 && (
          <StepFade>
            <div style={styles.fieldLabel}>Team size</div>
            <div style={styles.fieldQ}>How many people work in your business?</div>
            <div style={styles.optionGrid}>
              {[
                { title: "Just me", desc: "Solo operator" },
                { title: "2 – 5 people", desc: "Small team" },
                { title: "6 – 20 people", desc: "Growing team" },
                { title: "20+ people", desc: "Larger org" },
              ].map((o) => (
                <OptBtn
                  key={o.title}
                  selected={selections["team"] === o.title}
                  onClick={() => selectOpt("team", o.title)}
                >
                  <span style={styles.optTitle}>{o.title}</span>
                  <span style={styles.optDesc}>{o.desc}</span>
                </OptBtn>
              ))}
            </div>
            <NavBtns onNext={goNext} onPrev={goPrev} />
          </StepFade>
        )}

        {/* STEP 6 — Email */}
        {step === 6 && (
          <StepFade>
            <div style={styles.fieldLabel}>Almost done</div>
            <div style={styles.fieldQ}>Where should we send your full audit report?</div>
            <div style={{ marginBottom: "2rem" }}>
              <input
                style={{ ...styles.styledInput, marginBottom: "10px" }}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                style={styles.styledInput}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ fontSize: "11px", color: "rgba(232,230,224,0.25)", marginTop: "8px" }}>
                No spam. One email with your results. Unsubscribe anytime.
              </div>
            </div>
            <NavBtns onNext={handleSubmit} onPrev={goPrev} nextLabel="Generate My AI Audit →" />
          </StepFade>
        )}
      </div>

      <div style={styles.divider} />
      <TestimonialsSection />
      <style>{keyframes}</style>
    </div>
  );
}

/* ── Sub-components ── */

function StepFade({ children }: { children: React.ReactNode }) {
  return <div style={styles.stepFade}>{children}</div>;
}

function OptBtn({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.optBtn,
        borderColor: selected ? "#5af7b0" : "rgba(255,255,255,0.12)",
        background: selected ? "rgba(90,247,176,0.1)" : "rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </button>
  );
}

function ChkBtn({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.chkBtn,
        borderColor: selected ? "#5af7b0" : "rgba(255,255,255,0.1)",
        background: selected ? "rgba(90,247,176,0.07)" : "rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          ...styles.chkBox,
          background: selected ? "rgba(90,247,176,0.2)" : "transparent",
          borderColor: selected ? "#5af7b0" : "rgba(255,255,255,0.2)",
        }}
      >
        {selected && <span style={{ fontSize: "10px", color: "#5af7b0" }}>✓</span>}
      </div>
      <span style={styles.chkLabel}>{label}</span>
    </button>
  );
}

function NavBtns({
  onNext,
  onPrev,
  nextLabel = "Continue →",
}: {
  onNext: () => void;
  onPrev?: () => void;
  nextLabel?: string;
}) {
  return (
    <div style={styles.navBtns}>
      {onPrev && (
        <button onClick={onPrev} style={styles.prevBtn}>
          ← Back
        </button>
      )}
      <button onClick={onNext} style={styles.nextBtn}>
        {nextLabel}
      </button>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: "3rem 2.5rem" }}>
      <div style={styles.testiLabel}>What store owners say after their audit</div>
      <div style={styles.testiGrid}>
        {[
          {
            quote: "I had no idea we were leaving $4k a month on the table just from abandoned carts. Nexum showed us exactly what to fix in 2 minutes.",
            initials: "JM",
            name: "Jake M.",
            biz: "Apparel store · Shopify · $68k/mo",
            result: "+$4,200/mo recovered",
          },
          {
            quote: "The audit flagged our support queue immediately. We were spending 22 hours a week answering the same questions. That's fixed now.",
            initials: "SR",
            name: "Sofia R.",
            biz: "Beauty brand · WooCommerce · $31k/mo",
            result: "22 hrs/week saved",
          },
          {
            quote: "Honestly thought AI was hype for small stores. The roadmap they gave us was specific and we implemented the first automation in one week.",
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
  );
}

const keyframes = `
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
  @keyframes fadein { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none; }
  input::placeholder { color: rgba(232,230,224,0.25); }
  input:focus { outline: none; border-color: rgba(90,247,176,0.5) !important; }
`;

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
  backBtn: {
    fontSize: "12px",
    color: "rgba(232,230,224,0.4)",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "var(--font-dm), sans-serif",
    textDecoration: "none",
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
  scanWrap: { maxWidth: "580px", margin: "0 auto", padding: "3rem 2rem 4rem" },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(90,247,176,0.1)",
    border: "0.5px solid rgba(90,247,176,0.25)",
    color: "#5af7b0",
    padding: "4px 12px",
    borderRadius: "40px",
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "1.2rem",
  },
  scanTitle: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "clamp(28px, 5vw, 38px)",
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-1.5px",
    lineHeight: 1.08,
    marginBottom: "0.6rem",
  },
  accent: { fontStyle: "normal", color: "#5af7b0" },
  scanSub: { fontSize: "14px", color: "rgba(232,230,224,0.45)", marginBottom: "2.5rem", fontWeight: 300 },
  progressSteps: { display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" },
  pStep: { flex: 1, height: "3px", borderRadius: "4px", transition: "background 0.4s" },
  progressLabel: { fontSize: "11px", color: "rgba(232,230,224,0.35)", letterSpacing: "0.3px" },
  stepFade: { animation: "fadein 0.35s ease" },
  fieldLabel: {
    fontSize: "12px",
    fontWeight: 500,
    color: "rgba(232,230,224,0.5)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: "10px",
    display: "block",
  },
  fieldQ: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
    marginBottom: "1.5rem",
    lineHeight: 1.25,
  },
  optionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "2rem" },
  optBtn: {
    border: "0.5px solid",
    borderRadius: "12px",
    padding: "14px 16px",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
    fontFamily: "var(--font-dm), sans-serif",
  },
  optTitle: { fontSize: "13px", fontWeight: 500, color: "#fff", display: "block" },
  optDesc: { fontSize: "11px", color: "rgba(232,230,224,0.4)", marginTop: "2px", display: "block" },
  checkboxList: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "2rem" },
  chkBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "0.5px solid",
    borderRadius: "10px",
    padding: "12px 14px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "var(--font-dm), sans-serif",
    width: "100%",
    textAlign: "left",
  },
  chkBox: {
    width: "18px",
    height: "18px",
    borderRadius: "5px",
    border: "0.5px solid",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  chkLabel: { fontSize: "13px", color: "#e8e6e0", fontWeight: 400 },
  navBtns: { display: "flex", gap: "10px", marginTop: "0.5rem" },
  nextBtn: {
    flex: 1,
    background: "#5af7b0",
    color: "#06080f",
    border: "none",
    padding: "14px",
    borderRadius: "40px",
    fontFamily: "var(--font-dm), sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  prevBtn: {
    background: "transparent",
    color: "rgba(232,230,224,0.4)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    padding: "14px 20px",
    borderRadius: "40px",
    fontFamily: "var(--font-dm), sans-serif",
    fontSize: "14px",
    cursor: "pointer",
  },
  styledInput: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "14px 16px",
    fontFamily: "var(--font-dm), sans-serif",
    fontSize: "14px",
    color: "#e8e6e0",
    outline: "none",
    display: "block",
    transition: "border 0.2s",
  },
  divider: { height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 2.5rem" },

  /* Result screen */
  resultWrap: { maxWidth: "580px", margin: "0 auto", padding: "3rem 2rem 4rem" },
  resultHeader: { textAlign: "center", marginBottom: "2rem" },
  scoreRing: {
    width: "100px",
    height: "100px",
    margin: "0 auto 1rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ringBg: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "3px solid rgba(90,247,176,0.15)",
  },
  ringFill: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: "#5af7b0",
    borderRightColor: "#5af7b0",
    transform: "rotate(-30deg)",
  },
  scoreNum: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: "#5af7b0",
  },
  resultName: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
    marginBottom: "4px",
  },
  resultSub: { fontSize: "13px", color: "rgba(232,230,224,0.45)" },
  resultMetrics: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "1.5rem" },
  rMetric: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
    border: "0.5px solid rgba(255,255,255,0.07)",
    display: "flex",
    flexDirection: "column",
  },
  rMetricVal: {
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    display: "block",
  },
  rMetricLabel: { fontSize: "10px", color: "rgba(232,230,224,0.35)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "3px", display: "block" },
  automationsCard: {
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "1.25rem",
    marginBottom: "1rem",
  },
  automationsTitle: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(232,230,224,0.3)", marginBottom: "12px" },
  barLabelRow: { display: "flex", justifyContent: "space-between", marginBottom: "5px" },
  barTrack: { background: "rgba(255,255,255,0.07)", borderRadius: "4px", height: "5px" },
  barFill: { height: "100%", borderRadius: "4px" },
  resultCta: {
    background: "#5af7b0",
    color: "#06080f",
    border: "none",
    width: "100%",
    padding: "15px",
    borderRadius: "40px",
    fontFamily: "var(--font-syne), Syne, sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "-0.3px",
    marginTop: "1.5rem",
  },

  /* Testimonials */
  testiLabel: { fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(232,230,224,0.25)", textAlign: "center", marginBottom: "1.5rem" },
  testiGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" },
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
};
