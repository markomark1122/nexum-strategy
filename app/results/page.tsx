"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type AuditResult = {
  score: number
  opportunityScore: number
  summary: string
  problems: string[]
  opportunities: {
    title: string
    description: string
    impact: string
    difficulty: string
  }[]
  estimatedImpact: {
    timeSaved: string
    revenueUpside: string
  }
  nextStep: string
  maturityStage: string
  riskLevel: string
  bestFirstAutomation: string
  roadmap: {
    week: string
    task: string
  }[]
}

type AuditAnswers = {
  email?: string
  businessType?: string
  monthlyRevenue?: string
  teamSize?: string
  tools?: string[]
  marketingChannels?: string[]
  biggestBottleneck?: string
  weeklyManualWork?: string
  automationPriority?: string
  approvalLevel?: string
  urgency?: string
}

export default function ResultsPage() {
  const [result, setResult] = useState<AuditResult | null>(null)
  const [answers, setAnswers] = useState<AuditAnswers | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const storedResult = window.sessionStorage.getItem("auditResult")
    const storedAnswers = window.sessionStorage.getItem("auditAnswers")

    if (storedResult) setResult(JSON.parse(storedResult))
    if (storedAnswers) setAnswers(JSON.parse(storedAnswers))

    setLoaded(true)
  }, [])

  const generatedOn = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [])

  const recommendedTools = useMemo(() => {
    if (!result) return []

    const automation = result.bestFirstAutomation.toLowerCase()
    const selectedTools = answers?.tools || []

    const tools = [
      {
        name: "Shopify",
        category: "Core commerce platform",
        reason:
          "Used as the central system of record for orders, products, and customer activity.",
      },
    ]

    if (
      automation.includes("email") ||
      automation.includes("follow-up") ||
      automation.includes("customer")
    ) {
      tools.push({
        name: "Klaviyo",
        category: "Retention and lifecycle automation",
        reason:
          "Well suited for email and SMS workflows such as abandoned cart, post-purchase follow-up, win-back, and segmentation.",
      })
    }

    if (automation.includes("support")) {
      tools.push({
        name: "Gorgias",
        category: "Support operations",
        reason:
          "Useful for support triage, templated responses, ticket handling, and ecommerce-specific customer service workflows.",
      })
    }

    if (
      automation.includes("report") ||
      automation.includes("workflow") ||
      automation.includes("content") ||
      automation.includes("campaign") ||
      automation.includes("creative")
    ) {
      tools.push({
        name: "Make",
        category: "Workflow orchestration",
        reason:
          "Strong fit for connecting apps, automating recurring processes, and moving information across systems.",
      })
    }

    if (selectedTools.includes("Zapier")) {
      tools.push({
        name: "Zapier",
        category: "Light automation layer",
        reason:
          "Helpful when the workflow is relatively simple and speed of setup matters more than customization depth.",
      })
    }

    const unique = new Map<string, (typeof tools)[number]>()
    tools.forEach((tool) => unique.set(tool.name, tool))
    return Array.from(unique.values())
  }, [result, answers])

  const findings = useMemo(() => {
    if (!result || !answers) return []

    return [
      {
        label: "Primary bottleneck",
        value: answers.biggestBottleneck || "Not specified",
      },
      {
        label: "Estimated manual effort",
        value: answers.weeklyManualWork || result.estimatedImpact.timeSaved,
      },
      {
        label: "Preferred outcome",
        value: answers.automationPriority || "Operational improvement",
      },
      {
        label: "Urgency",
        value: answers.urgency || "Not specified",
      },
    ]
  }, [result, answers])

  if (!loaded) {
    return (
      <main className="ns-page ns-report-page">
        <Background />
        <div className="ns-report-empty">Loading report...</div>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="ns-page ns-report-page">
        <Background />
        <div className="ns-report-empty">
          <p className="ns-report-eyebrow">No report available</p>
          <h1>No report was found in this browser session.</h1>
          <p>
            This usually means the diagnostic was not completed or the page was
            opened directly.
          </p>
          <div className="ns-report-empty-actions">
            <Link href="/scan" className="ns-report-primary-button">
              Start New Diagnostic →
            </Link>
            <Link href="/" className="ns-report-secondary-button">
              Back Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="ns-page ns-report-page">
      <Background />

      <section className="ns-report-shell">
        <div className="ns-report-topbar">
          <Link href="/" className="ns-report-brand">
            Nexum Strategy
          </Link>

          <div className="ns-report-topbar-actions">
            <Link href="/scan" className="ns-report-secondary-button">
              New Diagnostic
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="ns-report-secondary-button ns-report-print-button"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        <section className="ns-report-hero-card">
          <div className="ns-report-hero-meta">
            <div>
              <p className="ns-report-eyebrow">Automation Diagnostic Report</p>
              <h1>Ecommerce automation assessment</h1>
            </div>

            <div className="ns-report-meta-box">
              <div>
                <span>Generated</span>
                <strong>{generatedOn}</strong>
              </div>
              <div>
                <span>Prepared for</span>
                <strong>{answers?.email || "Submitted account"}</strong>
              </div>
            </div>
          </div>

          <div className="ns-report-summary-block">
            <div>
              <h2>Executive summary</h2>
              <p>{result.summary}</p>
            </div>

            <div className="ns-report-highlight-box">
              <span>Primary recommendation</span>
              <strong>{result.bestFirstAutomation}</strong>
              <p>
                Based on your inputs, this appears to be the most practical
                first automation to implement.
              </p>
            </div>
          </div>
        </section>

        <section className="ns-report-section">
          <div className="ns-report-section-heading">
            <p className="ns-report-eyebrow">Assessment snapshot</p>
            <h2>Performance indicators</h2>
          </div>

          <div className="ns-report-metric-grid">
            <MetricCard label="AI readiness score" value={`${result.score}/100`} />
            <MetricCard
              label="Automation opportunity score"
              value={`${result.opportunityScore}/100`}
            />
            <MetricCard
              label="Estimated time saved"
              value={result.estimatedImpact.timeSaved}
            />
            <MetricCard
              label="Estimated monthly upside"
              value={result.estimatedImpact.revenueUpside}
            />
          </div>

          <div className="ns-report-pill-grid">
            <PillCard label="Maturity stage" value={result.maturityStage} />
            <PillCard label="Risk level" value={result.riskLevel} />
            <PillCard
              label="Best first automation"
              value={result.bestFirstAutomation}
            />
          </div>
        </section>

        <section className="ns-report-section ns-report-two-column">
          <ReportPanel title="Business context">
            <div className="ns-report-detail-grid">
              <DetailRow label="Business type" value={answers?.businessType || "Not specified"} />
              <DetailRow label="Monthly revenue" value={answers?.monthlyRevenue || "Not specified"} />
              <DetailRow label="Team size" value={answers?.teamSize || "Not specified"} />
              <DetailRow label="Marketing channels" value={(answers?.marketingChannels || []).join(", ") || "Not specified"} />
              <DetailRow label="Current tools" value={(answers?.tools || []).join(", ") || "Not specified"} />
              <DetailRow label="Approval preference" value={answers?.approvalLevel || "Not specified"} />
            </div>
          </ReportPanel>

          <ReportPanel title="Key findings">
            <div className="ns-report-stack">
              {findings.map((item) => (
                <div key={item.label} className="ns-report-finding-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </ReportPanel>
        </section>

        <section className="ns-report-section ns-report-two-column">
          <ReportPanel title="Observed issues">
            <div className="ns-report-stack">
              {result.problems.map((problem) => (
                <div key={problem} className="ns-report-list-card">
                  {problem}
                </div>
              ))}
            </div>
          </ReportPanel>

          <ReportPanel title="Recommended automation opportunities">
            <div className="ns-report-stack">
              {result.opportunities.map((opportunity) => (
                <div key={opportunity.title} className="ns-report-list-card">
                  <h3>{opportunity.title}</h3>
                  <p>{opportunity.description}</p>
                  <div className="ns-report-tag-row">
                    <span>Impact: {opportunity.impact}</span>
                    <span>Difficulty: {opportunity.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </ReportPanel>
        </section>

        <section className="ns-report-section">
          <ReportPanel title="Recommended implementation plan">
            <div className="ns-report-roadmap-grid">
              {result.roadmap.map((item) => (
                <div key={item.week} className="ns-report-roadmap-card">
                  <span>{item.week}</span>
                  <strong>{item.task}</strong>
                </div>
              ))}
            </div>
          </ReportPanel>
        </section>

        <section className="ns-report-section ns-report-two-column">
          <ReportPanel title="Recommended tool stack">
            <div className="ns-report-stack">
              {recommendedTools.map((tool) => (
                <div key={tool.name} className="ns-report-list-card">
                  <h3>{tool.name}</h3>
                  <span className="ns-report-inline-label">{tool.category}</span>
                  <p>{tool.reason}</p>
                </div>
              ))}
            </div>
          </ReportPanel>

          <ReportPanel title="Next recommended action">
            <div className="ns-report-next-step">
              <p>{result.nextStep}</p>

              <div className="ns-report-note-box">
                <span>Professional note</span>
                <p>
                  The strongest first move is usually the one that reduces
                  repetitive workload quickly, is low-risk to implement, and can
                  be tested without disrupting the wider operation.
                </p>
              </div>
            </div>
          </ReportPanel>
        </section>

        <section className="ns-report-offer-card">
          <p className="ns-report-eyebrow">Optional next step</p>
          <h2>Turn this assessment into a full implementation roadmap.</h2>
          <p>
            If you want, the next stage can convert this diagnostic into a more
            formal execution plan with tool recommendations, workflow mapping,
            rollout steps, prompt suggestions, and success metrics.
          </p>

          <div className="ns-report-offer-grid">
            <div>Workflow mapping</div>
            <div>Tool recommendations</div>
            <div>Automation prompts</div>
            <div>30-day rollout plan</div>
            <div>Risk controls</div>
            <div>Success metrics</div>
          </div>

          <a
           href="https://buy.stripe.com/test_9B66oJb4S7Aq8mNaaefw400"
           target="_blank"
           rel="noopener noreferrer"
           className="ns-report-primary-button"
          >
            Get My AI Automation Roadmap — $49 →
          </a>
        </section>
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

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="ns-report-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function PillCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="ns-report-pill-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ns-report-detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ReportPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="ns-report-panel">
      <div className="ns-report-panel-header">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}