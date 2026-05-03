"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type FormState = {
  email: string
  businessType: string
  monthlyRevenue: string
  averageOrderValue: string
  monthlyOrderVolume: string
  teamSize: string
  tools: string[]
  marketingChannels: string[]

  mainGoal: string
  growthConstraint: string
  biggestBottleneck: string

  manualWorkflow: string
  weeklyManualWork: string
  customerSupportVolume: string
  repeatPurchaseRate: string
  reportingFrequency: string
  inventoryComplexity: string
  returnsIssue: string
  contentProductionLoad: string
  adTestingProcess: string

  dataConfidence: string
  currentAiUsage: string
  automationPriority: string
  approvalLevel: string
  urgency: string
  operations: string
}

type StepDef = {
  key: keyof FormState
  eyebrow: string
  title: string
  description: string
  kind: "input" | "select" | "multiselect" | "textarea"
  placeholder?: string
  options?: string[]
  required?: boolean
}

const initialForm: FormState = {
  email: "",
  businessType: "",
  monthlyRevenue: "",
  averageOrderValue: "",
  monthlyOrderVolume: "",
  teamSize: "",
  tools: [],
  marketingChannels: [],

  mainGoal: "",
  growthConstraint: "",
  biggestBottleneck: "",

  manualWorkflow: "",
  weeklyManualWork: "",
  customerSupportVolume: "",
  repeatPurchaseRate: "",
  reportingFrequency: "",
  inventoryComplexity: "",
  returnsIssue: "",
  contentProductionLoad: "",
  adTestingProcess: "",

  dataConfidence: "",
  currentAiUsage: "",
  automationPriority: "",
  approvalLevel: "",
  urgency: "",
  operations: "",
}

const scanSteps: StepDef[] = [
  {
    key: "email",
    eyebrow: "Email",
    title: "Where should we send your automation report?",
    description: "We use this to identify your report and connect the diagnostic to your submission.",
    kind: "input",
    placeholder: "you@company.com",
    required: true,
  },
  {
    key: "businessType",
    eyebrow: "Business model",
    title: "What kind of ecommerce business do you run?",
    description: "Different ecommerce models usually have different automation priorities.",
    kind: "select",
    required: true,
    options: [
      "Fashion / apparel",
      "Beauty / skincare",
      "Food / beverage",
      "Home goods",
      "Health / wellness",
      "Supplements",
      "Electronics",
      "Pet products",
      "Digital products",
      "General ecommerce",
      "Other",
    ],
  },
  {
    key: "monthlyRevenue",
    eyebrow: "Revenue",
    title: "What is your approximate monthly revenue?",
    description: "This helps estimate automation upside and the right level of implementation effort.",
    kind: "select",
    required: true,
    options: [
      "Under $10k",
      "$10k-$25k",
      "$25k-$50k",
      "$50k-$100k",
      "$100k-$250k",
      "$250k-$500k",
      "$500k+",
    ],
  },
  {
    key: "averageOrderValue",
    eyebrow: "Order value",
    title: "What is your average order value?",
    description: "AOV helps identify whether the biggest opportunity is retention, conversion, upsells, or support efficiency.",
    kind: "select",
    required: true,
    options: [
      "Under $25",
      "$25-$50",
      "$50-$100",
      "$100-$200",
      "$200-$500",
      "$500+",
      "Not sure",
    ],
  },
  {
    key: "monthlyOrderVolume",
    eyebrow: "Order volume",
    title: "How many orders do you process per month?",
    description: "Order volume affects support load, fulfillment complexity, and automation impact.",
    kind: "select",
    required: true,
    options: [
      "Under 100",
      "100-500",
      "500-1,000",
      "1,000-5,000",
      "5,000+",
      "Not sure",
    ],
  },
  {
    key: "teamSize",
    eyebrow: "Team size",
    title: "How large is your team?",
    description: "Smaller teams usually benefit most from removing repetitive admin and customer-facing work first.",
    kind: "select",
    required: true,
    options: [
      "Solo founder",
      "2-5 people",
      "6-15 people",
      "16-50 people",
      "50+ people",
    ],
  },
  {
    key: "tools",
    eyebrow: "Tools",
    title: "Which tools are already part of your workflow?",
    description: "Select everything you currently use. This helps recommend automations that fit your current stack.",
    kind: "multiselect",
    required: true,
    options: [
      "Shopify",
      "WooCommerce",
      "Klaviyo",
      "Mailchimp",
      "Gorgias",
      "Zendesk",
      "Make",
      "Zapier",
      "Google Sheets",
      "Airtable",
      "Meta Ads",
      "Google Ads",
      "TikTok Ads",
      "HubSpot",
      "Notion",
      "Other",
    ],
  },
  {
    key: "marketingChannels",
    eyebrow: "Channels",
    title: "Which channels currently drive traffic or sales?",
    description: "This helps identify whether your best first automation is acquisition, retention, reporting, or support.",
    kind: "multiselect",
    required: true,
    options: [
      "Email",
      "SMS",
      "Meta Ads",
      "Google Ads",
      "TikTok",
      "Instagram",
      "SEO",
      "Influencers",
      "Amazon",
      "Wholesale",
      "Organic social",
      "Referral / affiliate",
    ],
  },
  {
    key: "mainGoal",
    eyebrow: "Main goal",
    title: "What is the main business outcome you want right now?",
    description: "The report will prioritize automation opportunities around this outcome.",
    kind: "select",
    required: true,
    options: [
      "Increase revenue",
      "Improve profit margin",
      "Save team time",
      "Reduce customer support workload",
      "Improve retention",
      "Improve ad performance",
      "Scale without hiring",
      "Get better reporting",
    ],
  },
  {
    key: "growthConstraint",
    eyebrow: "Growth constraint",
    title: "What is currently limiting growth the most?",
    description: "This helps separate revenue problems from operational problems.",
    kind: "select",
    required: true,
    options: [
      "Traffic is too expensive",
      "Conversion rate is too low",
      "Customers do not buy again",
      "Support volume is too high",
      "Reporting is too manual",
      "Fulfillment / operations are messy",
      "Content production is too slow",
      "I do not know what is limiting growth",
    ],
  },
  {
    key: "biggestBottleneck",
    eyebrow: "Bottleneck",
    title: "Where does the business feel most stuck operationally?",
    description: "Choose the area where speed, consistency, or scale breaks down most often.",
    kind: "select",
    required: true,
    options: [
      "Customer follow-up",
      "Support replies",
      "Reporting and insights",
      "Ad performance",
      "Content production",
      "Operations / admin",
      "Inventory / fulfillment",
      "Returns / exchanges",
      "Lead qualification",
      "Retention",
    ],
  },
  {
    key: "manualWorkflow",
    eyebrow: "Manual workflow",
    title: "What repetitive task is still being done manually?",
    description: "Describe one repeated workflow that eats time every week.",
    kind: "textarea",
    required: true,
    placeholder:
      "Example: Every Monday I manually pull Shopify, Klaviyo, and ad data into a spreadsheet and summarize the numbers.",
  },
  {
    key: "weeklyManualWork",
    eyebrow: "Time cost",
    title: "How much manual work does that create each week?",
    description: "This helps estimate time savings and implementation priority.",
    kind: "select",
    required: true,
    options: [
      "Under 5 hours",
      "5-10 hours",
      "10-20 hours",
      "20-30 hours",
      "30+ hours",
    ],
  },
  {
    key: "customerSupportVolume",
    eyebrow: "Support load",
    title: "How much customer support volume do you handle?",
    description: "Support volume helps determine whether an AI support assistant should be prioritized.",
    kind: "select",
    required: true,
    options: [
      "Very low - a few messages per week",
      "Low - a few messages per day",
      "Medium - 10-50 tickets per day",
      "High - 50+ tickets per day",
      "Not sure",
    ],
  },
  {
    key: "repeatPurchaseRate",
    eyebrow: "Retention",
    title: "How strong is your repeat purchase behavior?",
    description: "Retention issues often point toward email/SMS automation, segmentation, and post-purchase workflows.",
    kind: "select",
    required: true,
    options: [
      "Weak - most customers buy once",
      "Average - some customers return",
      "Strong - repeat customers are important",
      "Not sure",
      "Not applicable",
    ],
  },
  {
    key: "reportingFrequency",
    eyebrow: "Reporting",
    title: "How do you currently review performance?",
    description: "Manual reporting and scattered metrics are common automation opportunities.",
    kind: "select",
    required: true,
    options: [
      "I rarely review reports",
      "I check dashboards manually",
      "I build weekly reports manually",
      "Someone on the team prepares reports",
      "Reporting is already automated",
      "Not sure",
    ],
  },
  {
    key: "inventoryComplexity",
    eyebrow: "Inventory",
    title: "How complex is inventory or fulfillment?",
    description: "Inventory and fulfillment complexity can affect which automations are safe to start with.",
    kind: "select",
    required: true,
    options: [
      "Simple - few products",
      "Moderate - multiple SKUs",
      "Complex - many SKUs or variants",
      "Difficult - stockouts or fulfillment issues happen often",
      "Not applicable",
    ],
  },
  {
    key: "returnsIssue",
    eyebrow: "Returns",
    title: "Are returns, exchanges, or order issues a problem?",
    description: "Returns and order-status requests can create major support and operations drag.",
    kind: "select",
    required: true,
    options: [
      "Not a major issue",
      "Somewhat manual",
      "Frequent customer questions",
      "High return/exchange workload",
      "Not sure",
    ],
  },
  {
    key: "contentProductionLoad",
    eyebrow: "Content",
    title: "How heavy is your content production workload?",
    description: "Content bottlenecks can point toward AI-assisted product copy, email, social, and ad creative workflows.",
    kind: "select",
    required: true,
    options: [
      "Low - content is manageable",
      "Medium - content takes time",
      "High - content slows marketing down",
      "Very high - we constantly need new creative",
      "Not a priority",
    ],
  },
  {
    key: "adTestingProcess",
    eyebrow: "Ad testing",
    title: "How structured is your ad testing process?",
    description: "If campaigns or creatives are reviewed manually, an AI-assisted testing workflow may be high leverage.",
    kind: "select",
    required: true,
    options: [
      "No structured testing process",
      "We test occasionally",
      "We test regularly but analysis is manual",
      "We have a strong testing process",
      "We do not run ads",
    ],
  },
  {
    key: "dataConfidence",
    eyebrow: "Data quality",
    title: "How confident are you in your current data quality?",
    description: "Clean, reliable data lowers automation risk.",
    kind: "select",
    required: true,
    options: [
      "Low - messy or scattered",
      "Medium - usable but imperfect",
      "High - clean and organized",
      "Not sure",
    ],
  },
  {
    key: "currentAiUsage",
    eyebrow: "Current AI usage",
    title: "How much AI are you already using today?",
    description: "This helps judge readiness and likely speed of implementation.",
    kind: "select",
    required: true,
    options: [
      "None",
      "Occasional ChatGPT use",
      "AI tools in marketing",
      "AI tools in operations",
      "Multiple AI workflows already",
    ],
  },
  {
    key: "automationPriority",
    eyebrow: "Automation priority",
    title: "What should the first automation accomplish?",
    description: "Choose the main outcome you want from the first workflow.",
    kind: "select",
    required: true,
    options: [
      "Save time",
      "Increase revenue",
      "Improve customer experience",
      "Reduce errors",
      "Improve reporting",
      "Scale without hiring",
    ],
  },
  {
    key: "approvalLevel",
    eyebrow: "Approval level",
    title: "How much human approval should the workflow keep?",
    description: "This helps estimate risk and how aggressive the first automation should be.",
    kind: "select",
    required: true,
    options: [
      "Human approval before anything sends",
      "Human review for sensitive tasks only",
      "Mostly automated once tested",
      "Not sure yet",
    ],
  },
  {
    key: "urgency",
    eyebrow: "Urgency",
    title: "How soon do you want to act on this?",
    description: "Urgency influences what we recommend as the first practical move.",
    kind: "select",
    required: true,
    options: [
      "Immediate",
      "This month",
      "This quarter",
      "Exploring for later",
    ],
  },
  {
    key: "operations",
    eyebrow: "Operations",
    title: "Describe your current operation in your own words.",
    description: "Give enough context for the report to feel specific, not generic.",
    kind: "textarea",
    required: true,
    placeholder:
      "Describe your store, tools, repeated tasks, bottlenecks, customer flow, reporting process, marketing workflow, and where work gets stuck.",
  },
]

export default function ScanPage() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const step = scanSteps[stepIndex]
  const isLastStep = stepIndex === scanSteps.length - 1
  const progress = Math.round(((stepIndex + 1) / scanSteps.length) * 100)

  function updateStringField(key: keyof FormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function toggleArrayValue(key: "tools" | "marketingChannels", value: string) {
    setForm((previous) => {
      const exists = previous[key].includes(value)

      return {
        ...previous,
        [key]: exists
          ? previous[key].filter((item) => item !== value)
          : [...previous[key], value],
      }
    })
  }

  function validateCurrentStep() {
    setError("")

    const value = form[step.key]

    if (!step.required) return true

    if (step.kind === "input" || step.kind === "select" || step.kind === "textarea") {
      if (typeof value !== "string" || !value.trim()) {
        setError("Answer this question to continue.")
        return false
      }
    }

    if (step.kind === "multiselect") {
      if (!Array.isArray(value) || value.length === 0) {
        setError("Select at least one option to continue.")
        return false
      }
    }

    if (step.key === "email") {
      const email = String(value).trim()

      if (!email.includes("@") || !email.includes(".")) {
        setError("Enter a valid email address.")
        return false
      }
    }

    if (step.key === "manualWorkflow" && String(value).trim().length < 12) {
      setError("Add a little more detail about the manual workflow.")
      return false
    }

    if (step.key === "operations" && String(value).trim().length < 30) {
      setError("Add more detail so the report can be specific.")
      return false
    }

    return true
  }

  async function handleNext() {
    if (!validateCurrentStep()) return

    if (!isLastStep) {
      setStepIndex((previous) => previous + 1)
      return
    }

    await submitDiagnostic()
  }

  function handleBack() {
    setError("")
    setStepIndex((previous) => Math.max(0, previous - 1))
  }

  async function submitDiagnostic() {
    setLoading(true)
    setError("")

    const payload = {
      ...form,

      business_model: form.businessType,
      monthly_revenue: form.monthlyRevenue,
      team_size: form.teamSize,
      biggest_problem: form.biggestBottleneck,
      manual_work: form.manualWorkflow,
      data_quality: form.dataConfidence,
      automation_interest: form.automationPriority,
    }

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Could not generate report.")
      }

      window.sessionStorage.setItem("auditResult", JSON.stringify(data))
      window.sessionStorage.setItem("auditAnswers", JSON.stringify(payload))

      router.push("/results?generated=true")
    } catch (err) {
      console.error(err)
      setError("Something went wrong generating your report. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="ns-page ns-scan-page">
      <Background />

      <section className="ns-scan-shell">
        <div className="ns-scan-topbar">
          <Link href="/" className="ns-scan-brand">
            Nexum Strategy
          </Link>

          <div className="ns-scan-step-meta">
            <span>
              Step {stepIndex + 1} of {scanSteps.length}
            </span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className="ns-scan-progress">
          <div
            className="ns-scan-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="ns-scan-grid">
          <aside className="ns-scan-sidecard">
            <p className="ns-scan-kicker">AI Automation Diagnostic</p>

            <h1 className="ns-scan-side-title">
              Generate your <span>automation</span> report.
            </h1>

            <p className="ns-scan-side-copy">
              Answer a focused sequence of ecommerce questions so Nexum can identify your highest-value AI automation opportunities, risks, and next steps.
            </p>

            <div className="ns-scan-side-stats">
              <div className="ns-scan-stat">
                <strong>{scanSteps.length}</strong>
                <span>Diagnostic questions</span>
              </div>

              <div className="ns-scan-stat">
                <strong>30</strong>
                <span>Day roadmap</span>
              </div>

              <div className="ns-scan-stat">
                <strong>0</strong>
                <span>Payment required</span>
              </div>
            </div>
          </aside>

          <div className="ns-scan-formcard">
            <p className="ns-scan-question-kicker">{step.eyebrow}</p>

            <h2 className="ns-scan-question-title">{step.title}</h2>

            <p className="ns-scan-question-copy">{step.description}</p>

            <div className="ns-scan-control-wrap">
              {step.kind === "input" && (
                <input
                  className="ns-scan-input"
                  type={step.key === "email" ? "email" : "text"}
                  value={String(form[step.key] ?? "")}
                  onChange={(event) =>
                    updateStringField(step.key, event.target.value)
                  }
                  placeholder={step.placeholder}
                />
              )}

              {step.kind === "select" && (
                <select
                  className="ns-scan-input"
                  value={String(form[step.key] ?? "")}
                  onChange={(event) =>
                    updateStringField(step.key, event.target.value)
                  }
                >
                  <option value="">Select one</option>
                  {step.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {step.kind === "textarea" && (
                <textarea
                  className="ns-scan-textarea"
                  value={String(form[step.key] ?? "")}
                  onChange={(event) =>
                    updateStringField(step.key, event.target.value)
                  }
                  placeholder={step.placeholder}
                  rows={5}
                />
              )}

              {step.kind === "multiselect" && (
                <div className="ns-scan-options">
                  {step.options?.map((option) => {
                    const selected =
                      step.key === "tools" || step.key === "marketingChannels"
                        ? form[step.key].includes(option)
                        : false

                    return (
                      <button
                        key={option}
                        type="button"
                        className={
                          selected
                            ? "ns-scan-option ns-scan-option-selected"
                            : "ns-scan-option"
                        }
                        onClick={() => {
                          if (step.key === "tools" || step.key === "marketingChannels") {
                            toggleArrayValue(step.key, option)
                          }
                        }}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {error && <p className="ns-scan-error">{error}</p>}

            <div className="ns-scan-actions">
              <button
                type="button"
                onClick={handleBack}
                disabled={stepIndex === 0 || loading}
                className="ns-scan-back"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="ns-scan-next"
              >
                {loading
                  ? "Generating..."
                  : isLastStep
                    ? "Generate Report →"
                    : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Background() {
  return (
    <div className="ns-background">
      <div className="ns-background-image" />
      <div className="ns-background-overlay" />
      <div className="ns-glow ns-glow-one" />
      <div className="ns-glow ns-glow-two" />
    </div>
  )
}