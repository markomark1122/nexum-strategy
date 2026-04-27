"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type QuestionType = "single" | "multi" | "text" | "email"

type Question = {
  key: string
  type: QuestionType
  title: string
  subtitle?: string
  options?: string[]
  placeholder?: string
  required?: boolean
}

type Answers = Record<string, string | string[]>

const questions: Question[] = [
  {
    key: "email",
    type: "email",
    title: "Where should we send your automation report?",
    subtitle: "We use this only to identify your report.",
    placeholder: "you@company.com",
    required: true,
  },
  {
    key: "business_type",
    type: "single",
    title: "What type of business are you running?",
    options: [
      "E-Commerce Store",
      "Marketing Agency",
      "SaaS / Software",
      "Local Service Business",
      "Consulting / Professional Services",
      "Other",
    ],
    required: true,
  },
  {
    key: "monthly_revenue",
    type: "single",
    title: "What is your approximate monthly revenue?",
    subtitle: "This helps estimate potential ROI.",
    options: [
      "$0 - $5k",
      "$5k - $25k",
      "$25k - $100k",
      "$100k - $500k",
      "$500k+",
      "Prefer not to say",
    ],
    required: true,
  },
  {
    key: "team_size",
    type: "single",
    title: "How many people work in or on the business?",
    options: [
      "Just me",
      "2 - 5 people",
      "6 - 15 people",
      "16 - 50 people",
      "50+ people",
    ],
    required: true,
  },
  {
    key: "tools",
    type: "multi",
    title: "Which tools are already part of your workflow?",
    subtitle: "Select all that apply.",
    options: [
      "Shopify",
      "WooCommerce",
      "Klaviyo",
      "Mailchimp",
      "HubSpot",
      "GoHighLevel",
      "Google Analytics",
      "Meta Ads",
      "TikTok Ads",
      "Zapier",
      "Make",
      "Notion",
      "Airtable",
      "Google Sheets",
      "Slack",
      "Zendesk",
      "Gorgias",
      "Stripe",
      "QuickBooks",
      "Not sure",
    ],
    required: true,
  },
  {
    key: "marketing_channels",
    type: "multi",
    title: "Which marketing channels do you currently use?",
    options: [
      "Meta ads",
      "Google ads",
      "TikTok ads",
      "SEO",
      "Email marketing",
      "SMS marketing",
      "Influencers / UGC",
      "Organic social media",
      "Affiliate marketing",
      "None yet",
    ],
    required: true,
  },
  {
    key: "biggest_bottleneck",
    type: "single",
    title: "Where is the business leaking the most money or time?",
    options: [
      "Low website conversion",
      "Expensive ad costs",
      "Weak follow-up",
      "Poor customer retention",
      "Slow customer support",
      "Manual reporting",
      "No clear tracking",
      "Too many disconnected tools",
      "I am not sure",
    ],
    required: true,
  },
  {
    key: "manual_workflow",
    type: "multi",
    title: "Where does your team spend the most manual time?",
    subtitle: "Pick the workflows that feel repetitive.",
    options: [
      "Reporting",
      "Email/SMS follow-up",
      "Customer support",
      "Lead qualification",
      "Ad creative/copy",
      "Content creation",
      "Product descriptions",
      "Data entry",
      "Client onboarding",
      "Sales follow-up",
      "Inventory/order operations",
    ],
    required: true,
  },
  {
    key: "weekly_manual_work",
    type: "single",
    title: "How much repetitive manual work happens each week?",
    options: [
      "Less than 5 hours",
      "5 - 10 hours",
      "10 - 25 hours",
      "25 - 50 hours",
      "50+ hours",
      "Not sure",
    ],
    required: true,
  },
  {
    key: "data_confidence",
    type: "single",
    title: "How confident are you in your current business data?",
    options: [
      "Very confident",
      "Somewhat confident",
      "Not confident",
      "We barely track anything",
      "Not sure",
    ],
    required: true,
  },
  {
    key: "current_ai_usage",
    type: "single",
    title: "How are you currently using AI?",
    options: [
      "Not using AI yet",
      "Using ChatGPT manually",
      "Using a few AI tools",
      "Using AI automations already",
      "Using AI across multiple workflows",
    ],
    required: true,
  },
  {
    key: "automation_priority",
    type: "single",
    title: "What would you most like AI to automate first?",
    options: [
      "Reports",
      "Emails/SMS",
      "Support replies",
      "Lead follow-up",
      "Ads/content",
      "Product pages",
      "Internal admin",
      "Customer retention",
      "Not sure",
    ],
    required: true,
  },
  {
    key: "approval_level",
    type: "single",
    title: "How much human approval should AI outputs require?",
    subtitle: "This helps calculate risk level.",
    options: [
      "Always require human approval",
      "Only customer-facing outputs",
      "Only financial/legal-sensitive outputs",
      "No approval, we want full automation",
    ],
    required: true,
  },
  {
    key: "urgency",
    type: "single",
    title: "How soon do you want to improve this?",
    options: [
      "Immediately",
      "Within 30 days",
      "Within 90 days",
      "This year",
      "Just exploring",
    ],
    required: true,
  },
  {
    key: "operations",
    type: "text",
    title: "Briefly describe your business operations.",
    subtitle: "Mention what you sell, how you market, and what feels manual or messy.",
    placeholder:
      "Example: We sell skincare through Shopify, run Meta ads, use Klaviyo, answer support manually, and build weekly reports in spreadsheets.",
    required: true,
  },
]

export default function ScanPage() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const current = questions[step]
  const progress = Math.round(((step + 1) / questions.length) * 100)

  function currentValue() {
    return answers[current.key]
  }

  function hasAnswer() {
    const value = currentValue()

    if (!current.required) return true
    if (!value) return false
    if (Array.isArray(value)) return value.length > 0
    return value.trim().length > 0
  }

  function setSingleAnswer(value: string) {
    setAnswers((prev) => ({
      ...prev,
      [current.key]: value,
    }))
  }

  function toggleMultiAnswer(value: string) {
    const existing = answers[current.key]
    const list = Array.isArray(existing) ? existing : []

    const next = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value]

    setAnswers((prev) => ({
      ...prev,
      [current.key]: next,
    }))
  }

  function isSelected(option: string) {
    const value = currentValue()

    if (Array.isArray(value)) return value.includes(option)

    return value === option
  }

  function nextStep() {
    setError("")

    if (!hasAnswer()) {
      setError("Please answer this question before continuing.")
      return
    }

    if (step < questions.length - 1) {
      setStep(step + 1)
      return
    }

    submitAudit()
  }

  function previousStep() {
    setError("")

    if (step === 0) {
      router.push("/")
      return
    }

    setStep(step - 1)
  }

  async function submitAudit() {
    setLoading(true)
    setError("")

    try {
      const payload = normalizeAnswers(answers)

      const res = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Audit API failed:", data)
        throw new Error(data?.error || "Audit failed")
      }

      sessionStorage.setItem("auditResult", JSON.stringify(data))
      sessionStorage.setItem("auditAnswers", JSON.stringify(payload))

      router.push("/results")
    } catch (err) {
      console.error("Submit error:", err)
      setError("Failed to generate the report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="shell">
        <div className="topBar">
          <a href="/" className="brand">
            Nexum Strategy
          </a>

          <div className="progressMeta">
            <span>
              Step {step + 1} of {questions.length}
            </span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${progress}%` }} />
        </div>

        <div className="layout">
          <aside className="sidePanel">
            <p className="eyebrow">AI Automation Diagnostic</p>
            <h1>Generate your automation report.</h1>
            <p>
              Answer a short sequence of questions so Nexum can identify your
              highest-value AI automation opportunities, risks, and next steps.
            </p>

            <div className="sideStats">
              <div>
                <strong>7</strong>
                <span>Diagnostic areas</span>
              </div>
              <div>
                <strong>30</strong>
                <span>Day roadmap</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Payment required</span>
              </div>
            </div>
          </aside>

          <section className="card">
            <p className="questionType">
              {current.type === "multi"
                ? "Select all that apply"
                : current.type === "text"
                  ? "Short answer"
                  : current.type === "email"
                    ? "Email"
                    : "Select one"}
            </p>

            <h2>{current.title}</h2>

            {current.subtitle && <p className="subtitle">{current.subtitle}</p>}

            {current.type === "single" && (
              <div className="options">
                {current.options?.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`option ${isSelected(option) ? "selected" : ""}`}
                    onClick={() => setSingleAnswer(option)}
                  >
                    <span>{option}</span>
                    {isSelected(option) && <strong>✓</strong>}
                  </button>
                ))}
              </div>
            )}

            {current.type === "multi" && (
              <div className="options">
                {current.options?.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`option ${isSelected(option) ? "selected" : ""}`}
                    onClick={() => toggleMultiAnswer(option)}
                  >
                    <span>{option}</span>
                    {isSelected(option) && <strong>✓</strong>}
                  </button>
                ))}
              </div>
            )}

            {current.type === "text" && (
              <textarea
                value={(currentValue() as string) || ""}
                placeholder={current.placeholder}
                onChange={(e) => setSingleAnswer(e.target.value)}
              />
            )}

            {current.type === "email" && (
              <input
                type="email"
                value={(currentValue() as string) || ""}
                placeholder={current.placeholder}
                onChange={(e) => setSingleAnswer(e.target.value)}
              />
            )}

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button type="button" className="back" onClick={previousStep}>
                ← Back
              </button>

              <button
                type="button"
                className="next"
                onClick={nextStep}
                disabled={loading}
              >
                {loading
                  ? "Generating Report..."
                  : step === questions.length - 1
                    ? "Generate My Report →"
                    : "Next →"}
              </button>
            </div>
          </section>
        </div>
      </section>

      <style>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(14,165,255,0.2), transparent 35%),
            radial-gradient(circle at bottom left, rgba(37,99,235,0.18), transparent 35%),
            linear-gradient(180deg, #061528, #020b1c);
          color: white;
          font-family: Arial, sans-serif;
          padding: 28px 20px 60px;
        }

        .shell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 18px;
        }

        .brand {
          color: white;
          text-decoration: none;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .progressMeta {
          display: flex;
          gap: 12px;
          color: rgba(255,255,255,0.65);
          font-size: 14px;
        }

        .progressMeta strong {
          color: #7dd3fc;
        }

        .progressTrack {
          width: 100%;
          height: 9px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 38px;
        }

        .progressFill {
          height: 100%;
          background: linear-gradient(135deg, #38bdf8, #2563eb);
          transition: width 0.25s ease;
          box-shadow: 0 0 24px rgba(56,189,248,0.45);
        }

        .layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 28px;
          align-items: start;
        }

        .sidePanel,
        .card {
          background: rgba(7, 20, 42, 0.88);
          border: 1px solid rgba(125,211,252,0.18);
          border-radius: 28px;
          box-shadow: 0 0 60px rgba(0,0,0,0.38);
          backdrop-filter: blur(16px);
        }

        .sidePanel {
          padding: 34px;
          position: sticky;
          top: 24px;
        }

        .eyebrow,
        .questionType {
          color: #7dd3fc;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.16em;
          font-weight: 900;
          margin: 0 0 14px;
        }

        .sidePanel h1 {
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.02;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #fff, #7dd3fc, #0ea5ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidePanel p {
          color: rgba(255,255,255,0.72);
          line-height: 1.6;
          margin: 0;
        }

        .sideStats {
          display: grid;
          gap: 14px;
          margin-top: 30px;
        }

        .sideStats div {
          padding: 16px;
          border-radius: 18px;
          border: 1px solid rgba(125,211,252,0.14);
          background: rgba(255,255,255,0.04);
        }

        .sideStats strong {
          display: block;
          color: #7dd3fc;
          font-size: 24px;
        }

        .sideStats span {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
        }

        .card {
          padding: 38px;
        }

        .card h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.1;
        }

        .subtitle {
          color: rgba(255,255,255,0.66);
          font-size: 17px;
          line-height: 1.5;
          margin: 14px 0 28px;
        }

        .options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 28px;
        }

        .option {
          min-height: 66px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.045);
          color: white;
          border-radius: 18px;
          padding: 18px;
          text-align: left;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .option.selected {
          border-color: rgba(56,189,248,0.9);
          background: rgba(14,165,255,0.16);
          box-shadow: 0 0 28px rgba(14,165,255,0.16);
        }

        .option strong {
          color: #7dd3fc;
        }

        input,
        textarea {
          width: 100%;
          margin-top: 28px;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.045);
          color: white;
          border-radius: 18px;
          padding: 18px;
          font-size: 16px;
          outline: none;
        }

        textarea {
          min-height: 180px;
          resize: vertical;
          line-height: 1.5;
        }

        input:focus,
        textarea:focus {
          border-color: rgba(56,189,248,0.75);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.12);
        }

        .error {
          color: #f87171;
          font-weight: 800;
          margin: 22px 0 0;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 34px;
        }

        .back,
        .next {
          border: none;
          border-radius: 999px;
          padding: 16px 28px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .back {
          background: rgba(255,255,255,0.045);
          color: white;
          border: 1px solid rgba(255,255,255,0.14);
        }

        .next {
          background: linear-gradient(135deg, #0ea5ff, #2563eb);
          color: white;
          box-shadow: 0 0 32px rgba(14,165,255,0.42);
        }

        .next:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .sidePanel {
            position: relative;
            top: auto;
          }

          .options {
            grid-template-columns: 1fr;
          }

          .topBar {
            align-items: flex-start;
            flex-direction: column;
          }

          .actions {
            flex-direction: column;
          }

          .back,
          .next {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}

function normalizeAnswers(answers: Answers) {
  return {
    email: toStringValue(answers.email),
    businessType: toStringValue(answers.business_type),
    monthlyRevenue: toStringValue(answers.monthly_revenue),
    teamSize: toStringValue(answers.team_size),
    tools: toStringValue(answers.tools),
    marketingChannels: toStringValue(answers.marketing_channels),
    biggestBottleneck: toStringValue(answers.biggest_bottleneck),
    manualWorkflow: toStringValue(answers.manual_workflow),
    weeklyManualWork: toStringValue(answers.weekly_manual_work),
    dataConfidence: toStringValue(answers.data_confidence),
    currentAiUsage: toStringValue(answers.current_ai_usage),
    automationPriority: toStringValue(answers.automation_priority),
    approvalLevel: toStringValue(answers.approval_level),
    urgency: toStringValue(answers.urgency),
    operations: toStringValue(answers.operations),

    // Compatibility keys for your current API fallback
    business_model: toStringValue(answers.business_type),
    monthly_revenue: toStringValue(answers.monthly_revenue),
    team_size: toStringValue(answers.team_size),
    tools_legacy: toStringValue(answers.tools),
    biggest_problem: toStringValue(answers.biggest_bottleneck),
    manual_work: toStringValue(answers.weekly_manual_work),
    data_quality: toStringValue(answers.data_confidence),
    automation_interest: toStringValue(answers.automation_priority),
  }
}

function toStringValue(value: string | string[] | undefined) {
  if (!value) return ""
  if (Array.isArray(value)) return value.join(", ")
  return value
}