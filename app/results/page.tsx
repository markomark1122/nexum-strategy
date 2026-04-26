"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

type AuditOpportunity = {
  title: string
  description: string
  impact: string
  difficulty?: string
}

type AuditResult = {
  score: number
  summary: string
  problems: string[]
  opportunities: AuditOpportunity[]
  estimatedImpact: {
    timeSaved: string
    revenueUpside: string
  }
  nextStep: string
  opportunityScore?: number
  maturityStage?: string
  riskLevel?: string
  bestFirstAutomation?: string
  roadmap?: {
    week: string
    task: string
  }[]
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResultsContent />
    </Suspense>
  )
}

function ResultsContent() {
  const params = useSearchParams()
  const [audit, setAudit] = useState<AuditResult | null>(null)
  const [loading, setLoading] = useState(true)

  const data = useMemo(
    () => ({
      industry: params.get("industry") || "Ecommerce / Marketing",

      // Your newer questionnaire keys
      business_model: params.get("business_model") || "",
      monthly_revenue: params.get("monthly_revenue") || "",
      main_goal: params.get("main_goal") || "",
      marketing_channels: params.get("marketing_channels") || "",
      tools: params.get("tools") || "",
      biggest_problem: params.get("biggest_problem") || "",
      automation_interest: params.get("automation_interest") || "",
      data_quality: params.get("data_quality") || "",
      manual_work: params.get("manual_work") || "",
      team_size: params.get("team_size") || "",
      urgency: params.get("urgency") || "",

      // Fallback support for your older keys
      revenue: params.get("revenue") || params.get("monthly_revenue") || "",
      team: params.get("team") || params.get("team_size") || "",
      bottleneck: params.get("bottleneck") || params.get("biggest_problem") || "",
      errors: params.get("errors") || "",
      goal: params.get("goal") || params.get("main_goal") || "",
    }),
    [params]
  )

  useEffect(() => {
    async function fetchAudit() {
      try {
        const res = await fetch("/api/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const json = await res.json()

        const localResult = generateLocalAuditResult(data)

        setAudit({
          score: Number(json.score) || localResult.score,
          summary: json.summary || localResult.summary,
          problems: Array.isArray(json.problems) && json.problems.length > 0
            ? json.problems
            : localResult.problems,
          opportunities:
            Array.isArray(json.opportunities) && json.opportunities.length > 0
              ? json.opportunities
              : localResult.opportunities,
          estimatedImpact: json.estimatedImpact || localResult.estimatedImpact,
          nextStep: json.nextStep || localResult.nextStep,
          opportunityScore: Number(json.opportunityScore) || localResult.opportunityScore,
          maturityStage: json.maturityStage || localResult.maturityStage,
          riskLevel: json.riskLevel || localResult.riskLevel,
          bestFirstAutomation:
            json.bestFirstAutomation || localResult.bestFirstAutomation,
          roadmap:
            Array.isArray(json.roadmap) && json.roadmap.length > 0
              ? json.roadmap
              : localResult.roadmap,
        })
      } catch (error) {
        console.error("Audit fetch failed:", error)
        setAudit(generateLocalAuditResult(data))
      } finally {
        setLoading(false)
      }
    }

    fetchAudit()
  }, [data])

  if (loading) {
    return <Loading />
  }

  if (!audit) {
    return (
      <main className="page">
        <section className="card">
          <p className="badge">NEXUM STRATEGY</p>
          <h1>Something went wrong.</h1>
          <p className="muted">Please go back and try the audit again.</p>
          <a href="/audit" className="cta">
            Restart Audit →
          </a>
        </section>

        <PageStyles />
      </main>
    )
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="badge">AI BUSINESS AUDIT COMPLETE</p>

        <h1>Your AI Compatibility Report</h1>

        <p className="subtitle">
          Based on your answers, here is where AI can most likely save time,
          reduce manual work, and improve your business operations.
        </p>

        <div className="scoreGrid">
          <ScoreCard title="AI Readiness Score" value={`${audit.score}/100`} />
          <ScoreCard
            title="Automation Opportunity"
            value={`${audit.opportunityScore || 72}/100`}
          />
          <ScoreCard
            title="Estimated Time Saved"
            value={audit.estimatedImpact.timeSaved}
          />
          <ScoreCard
            title="Estimated Monthly Upside"
            value={audit.estimatedImpact.revenueUpside}
          />
        </div>
      </section>

      <section className="section">
        <div className="summaryCard">
          <div>
            <p className="label">Maturity Stage</p>
            <h2>{audit.maturityStage || "AI-Ready Foundation"}</h2>
          </div>

          <div>
            <p className="label">Risk Level</p>
            <h2>{audit.riskLevel || "Low-Medium"}</h2>
          </div>

          <div>
            <p className="label">Best First Automation</p>
            <h2>{audit.bestFirstAutomation || audit.nextStep}</h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mainCard">
          <p className="badge">SUMMARY</p>
          <h2>What this means</h2>
          <p className="largeMuted">{audit.summary}</p>
        </div>
      </section>

      <section className="section">
        <p className="badge center">KEY PROBLEMS</p>
        <h2 className="sectionTitle">What is holding you back</h2>

        <div className="problemGrid">
          {audit.problems.map((problem, index) => (
            <div key={index} className="smallCard">
              <strong>Problem {index + 1}</strong>
              <p>{problem}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <p className="badge center">TOP OPPORTUNITIES</p>
        <h2 className="sectionTitle">Recommended AI Automations</h2>

        <div className="automationGrid">
          {audit.opportunities.map((op, index) => (
            <div key={`${op.title}-${index}`} className="automationCard">
              <span className="rank">#{index + 1}</span>

              <h3>{op.title}</h3>

              <p className="muted">{op.description}</p>

              <div className="miniGrid">
                <div>
                  <span>Impact</span>
                  <strong>{op.impact}</strong>
                </div>

                <div>
                  <span>Difficulty</span>
                  <strong>{op.difficulty || "Medium"}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="badge center">IMPLEMENTATION</p>
        <h2 className="sectionTitle">30-Day AI Roadmap</h2>

        <div className="roadmap">
          {(audit.roadmap || []).map((item) => (
            <div className="roadmapItem" key={item.week}>
              <span>{item.week}</span>
              <p>{item.task}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="nextStep">
          <p className="badge">RECOMMENDED NEXT STEP</p>
          <h2>{audit.nextStep}</h2>
          <p>
            Start with one workflow first. Do not try to automate the whole
            business at once. Pick the highest-value manual process, build a
            simple AI-assisted version, test it, then expand.
          </p>

          <div className="actionRow">
            <a href="/audit" className="cta">
              Run Another Audit →
            </a>

            <button
              className="secondaryCta"
              onClick={() => window.print()}
            >
              Print / Save Report
            </button>
          </div>
        </div>
      </section>

      <p className="disclaimer">
        This audit provides informational insights only and does not constitute
        professional, financial, legal, or technical advice.
      </p>

      <PageStyles />
    </main>
  )
}

function ScoreCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="scoreCard">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

function Loading() {
  return (
    <main className="page">
      <section className="card">
        <p className="badge">NEXUM STRATEGY</p>
        <h1>Generating your AI audit...</h1>
        <p className="muted">Analyzing your business answers.</p>
      </section>

      <PageStyles />
    </main>
  )
}

function generateLocalAuditResult(data: Record<string, string>): AuditResult {
  let score = 58
  let opportunityScore = 72

  const tools = data.tools || ""
  const manualWork = data.manual_work || ""
  const dataQuality = data.data_quality || ""
  const biggestProblem = data.biggest_problem || data.bottleneck || ""
  const revenue = data.monthly_revenue || data.revenue || ""
  const urgency = data.urgency || ""

  if (tools.includes("Shopify")) score += 6
  if (tools.includes("Klaviyo")) score += 5
  if (tools.includes("HubSpot")) score += 5
  if (tools.includes("Google Analytics")) score += 5
  if (tools.includes("Zapier") || tools.includes("Make")) score += 8

  if (manualWork.includes("25 - 50") || manualWork.includes("50+")) {
    opportunityScore += 15
  }

  if (dataQuality === "Very confident") score += 10
  if (dataQuality === "Somewhat confident") score += 5

  if (
    dataQuality === "We barely track anything" ||
    dataQuality === "Not confident"
  ) {
    score -= 10
    opportunityScore += 6
  }

  if (urgency === "Immediately") opportunityScore += 8
  if (biggestProblem === "No clear data tracking") score -= 8
  if (biggestProblem === "Manual reporting") opportunityScore += 10

  score = Math.max(20, Math.min(95, score))
  opportunityScore = Math.max(35, Math.min(98, opportunityScore))

  const bestFirstAutomation = chooseBestAutomation(data)

  return {
    score,
    opportunityScore,
    summary: `Your business has a strong opportunity to use AI around ${bestFirstAutomation.toLowerCase()}. The biggest value will come from reducing manual work, improving consistency, and turning scattered business activity into repeatable workflows.`,
    problems: buildProblems(data),
    opportunities: buildOpportunities(data, bestFirstAutomation),
    estimatedImpact: {
      timeSaved: estimateTimeSaved(manualWork),
      revenueUpside: estimateRevenueUpside(revenue, manualWork),
    },
    maturityStage: getMaturityStage(score, opportunityScore),
    riskLevel: getRiskLevel(data),
    bestFirstAutomation,
    nextStep: `Start with ${bestFirstAutomation}.`,
    roadmap: [
      {
        week: "Week 1",
        task: "Map the current workflow, document each manual step, and identify where time is being wasted.",
      },
      {
        week: "Week 2",
        task: `Build a simple AI-assisted version of ${bestFirstAutomation}. Keep human approval before anything is sent to customers or clients.`,
      },
      {
        week: "Week 3",
        task: "Test the workflow with real business examples, compare output quality, and refine the prompts or automation rules.",
      },
      {
        week: "Week 4",
        task: "Roll it out, measure time saved, document the process, and choose the next automation opportunity.",
      },
    ],
  }
}

function buildProblems(data: Record<string, string>) {
  const problems = []

  if (data.biggest_problem) {
    problems.push(`Primary bottleneck detected: ${data.biggest_problem}.`)
  }

  if (
    data.data_quality === "Not confident" ||
    data.data_quality === "We barely track anything"
  ) {
    problems.push(
      "Your data quality may limit how accurate AI recommendations and automations can be."
    )
  }

  if (data.manual_work) {
    problems.push(
      `Manual work level reported: ${data.manual_work}. This creates a strong opportunity for workflow automation.`
    )
  }

  if (data.tools?.includes("Not sure")) {
    problems.push(
      "Your current tool stack is unclear, which can make automation planning harder."
    )
  }

  if (problems.length === 0) {
    problems.push(
      "Your business likely has repeated workflows that can be improved with AI, but the biggest bottleneck needs more detail."
    )
  }

  return problems.slice(0, 4)
}

function buildOpportunities(
  data: Record<string, string>,
  bestFirstAutomation: string
): AuditOpportunity[] {
  return [
    {
      title: bestFirstAutomation,
      description:
        "This is the best first workflow to improve because it matches your reported bottleneck, goal, or AI automation interest.",
      impact: "High",
      difficulty: "Medium",
    },
    {
      title: "Reporting and insight summaries",
      description:
        "Use AI to summarize marketing, sales, customer, or operational data into clear weekly action reports.",
      impact: "High",
      difficulty: "Low-Medium",
    },
    {
      title: "Email/SMS follow-up automation",
      description:
        "Use AI to create segmented follow-ups for leads, abandoned carts, previous customers, or inactive clients.",
      impact: "High",
      difficulty: "Medium",
    },
    {
      title: "Content and ad creative testing",
      description:
        "Use AI to generate hooks, ad copy, creative angles, product descriptions, and test variations faster.",
      impact: "Medium-High",
      difficulty: "Low",
    },
    {
      title: "Customer support assistant",
      description:
        "Use AI to draft replies, summarize common issues, organize FAQs, and reduce repetitive support work.",
      impact: "Medium",
      difficulty: "Medium",
    },
  ]
}

function chooseBestAutomation(data: Record<string, string>) {
  const problem = data.biggest_problem || data.bottleneck || ""
  const interest = data.automation_interest || ""

  if (problem === "Manual reporting") return "Reporting automation"
  if (interest === "Client reporting") return "Client reporting"
  if (interest === "Sales reporting") return "Sales reporting"
  if (problem === "Weak email follow-up") return "Email/SMS follow-up automation"
  if (problem === "Slow customer support") return "AI customer support assistant"
  if (problem === "Expensive ad costs") return "Ad creative testing workflow"
  if (problem === "Bad product pages") return "Product page optimization"
  if (data.main_goal === "Reduce manual work") return "Workflow automation"

  return "Customer follow-up automation"
}

function estimateTimeSaved(manualWork: string) {
  if (manualWork.includes("Less than 5")) return "2–5 hrs/week"
  if (manualWork.includes("5 - 10")) return "5–10 hrs/week"
  if (manualWork.includes("10 - 25")) return "10–25 hrs/week"
  if (manualWork.includes("25 - 50")) return "25–50 hrs/week"
  if (manualWork.includes("50+")) return "50+ hrs/week"

  return "10–25 hrs/week"
}

function estimateRevenueUpside(revenue: string, manualWork: string) {
  const highManual = manualWork.includes("25 - 50") || manualWork.includes("50+")

  if (revenue.includes("$0 - $5k")) return highManual ? "$500–$1,500/mo" : "$200–$800/mo"
  if (revenue.includes("$5k - $25k")) return highManual ? "$1,500–$4,000/mo" : "$700–$2,000/mo"
  if (revenue.includes("$25k - $100k")) return highManual ? "$3,000–$8,000/mo" : "$1,500–$4,500/mo"
  if (revenue.includes("$100k - $500k")) return highManual ? "$8,000–$20,000/mo" : "$4,000–$10,000/mo"
  if (revenue.includes("$500k+")) return highManual ? "$20,000+/mo" : "$8,000–$18,000/mo"

  return highManual ? "$3,000–$8,000/mo" : "$1,000–$4,000/mo"
}

function getMaturityStage(score: number, opportunityScore: number) {
  if (score >= 75 && opportunityScore >= 75) return "Automation-Ready"
  if (score < 55 && opportunityScore >= 75) return "Manual but Highly Automatable"
  if (score >= 65) return "AI-Assisted Operations"

  return "Early AI Readiness"
}

function getRiskLevel(data: Record<string, string>) {
  if (
    data.data_quality === "We barely track anything" ||
    data.data_quality === "Not confident"
  ) {
    return "Medium-High"
  }

  if (data.tools?.includes("Not sure")) return "Medium"

  return "Low-Medium"
}

function PageStyles() {
  return (
    <style>{`
      .page {
        min-height: 100vh;
        background:
          radial-gradient(circle at top right, rgba(14,165,255,0.18), transparent 35%),
          radial-gradient(circle at bottom left, rgba(37,99,235,0.16), transparent 35%),
          linear-gradient(180deg, #061528, #020b1c);
        color: white;
        font-family: Arial, sans-serif;
        padding-bottom: 70px;
      }

      .hero {
        max-width: 1180px;
        margin: 0 auto;
        padding: 80px 24px 40px;
        text-align: center;
      }

      .card {
        max-width: 760px;
        margin: 90px auto;
        background: rgba(7, 20, 42, 0.88);
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 24px;
        padding: 44px;
        box-shadow: 0 0 50px rgba(0,0,0,0.45);
        text-align: center;
      }

      .badge {
        color: #7dd3fc;
        letter-spacing: 2px;
        font-size: 13px;
        font-weight: 900;
        margin-bottom: 14px;
        text-transform: uppercase;
      }

      .center {
        text-align: center;
      }

      .hero h1 {
        margin: 0;
        font-size: clamp(42px, 6vw, 76px);
        line-height: 1;
        font-weight: 900;
        background: linear-gradient(135deg, #fff, #7dd3fc, #0ea5ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .subtitle {
        max-width: 780px;
        margin: 24px auto 42px;
        font-size: 21px;
        line-height: 1.5;
        color: rgba(255,255,255,0.76);
      }

      .scoreGrid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
      }

      .scoreCard,
      .summaryCard,
      .mainCard,
      .smallCard,
      .automationCard,
      .roadmapItem,
      .nextStep {
        background: rgba(255,255,255,0.045);
        border: 1px solid rgba(125,211,252,0.18);
        border-radius: 22px;
        box-shadow: 0 0 36px rgba(0,0,0,0.24);
        backdrop-filter: blur(14px);
      }

      .scoreCard {
        padding: 26px;
      }

      .scoreCard p {
        margin: 0 0 12px;
        color: rgba(255,255,255,0.65);
        font-weight: 700;
      }

      .scoreCard h2 {
        margin: 0;
        font-size: 30px;
        color: #7dd3fc;
      }

      .section {
        max-width: 1180px;
        margin: 0 auto;
        padding: 54px 24px;
      }

      .section.alt {
        max-width: none;
        padding-left: max(24px, calc((100vw - 1180px) / 2));
        padding-right: max(24px, calc((100vw - 1180px) / 2));
        background: rgba(255,255,255,0.025);
        border-top: 1px solid rgba(255,255,255,0.08);
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }

      .sectionTitle {
        text-align: center;
        margin: 0 0 34px;
        font-size: clamp(32px, 4vw, 52px);
      }

      .summaryCard {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 28px;
      }

      .label {
        margin: 0 0 8px;
        color: #7dd3fc;
        font-size: 13px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .summaryCard h2 {
        margin: 0;
        font-size: 24px;
      }

      .mainCard {
        padding: 34px;
      }

      .mainCard h2 {
        margin: 0 0 16px;
        font-size: 34px;
      }

      .largeMuted {
        margin: 0;
        color: rgba(255,255,255,0.76);
        font-size: 20px;
        line-height: 1.55;
      }

      .problemGrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }

      .smallCard {
        padding: 24px;
      }

      .smallCard strong {
        color: #7dd3fc;
      }

      .smallCard p {
        color: rgba(255,255,255,0.72);
        line-height: 1.55;
      }

      .automationGrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 22px;
      }

      .automationCard {
        padding: 28px;
      }

      .rank {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: rgba(14,165,255,0.12);
        border: 1px solid rgba(125,211,252,0.35);
        color: #7dd3fc;
        font-weight: 900;
        margin-bottom: 18px;
      }

      .automationCard h3 {
        margin: 0 0 14px;
        font-size: 26px;
      }

      .muted {
        color: rgba(255,255,255,0.72);
        line-height: 1.55;
      }

      .miniGrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        margin-top: 20px;
      }

      .miniGrid div {
        border-radius: 16px;
        background: rgba(14,165,255,0.08);
        border: 1px solid rgba(125,211,252,0.16);
        padding: 16px;
      }

      .miniGrid span {
        display: block;
        color: rgba(255,255,255,0.58);
        margin-bottom: 8px;
      }

      .miniGrid strong {
        color: white;
      }

      .roadmap {
        display: grid;
        gap: 18px;
      }

      .roadmapItem {
        padding: 24px;
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 20px;
        align-items: center;
      }

      .roadmapItem span {
        color: #7dd3fc;
        font-weight: 900;
      }

      .roadmapItem p {
        margin: 0;
        color: rgba(255,255,255,0.78);
        line-height: 1.5;
      }

      .nextStep {
        padding: 34px;
        background:
          linear-gradient(135deg, rgba(14,165,255,0.18), rgba(37,99,235,0.12));
        border: 1px solid rgba(14,165,255,0.3);
      }

      .nextStep h2 {
        margin: 0 0 16px;
        font-size: 34px;
      }

      .nextStep p {
        color: rgba(255,255,255,0.76);
        font-size: 18px;
        line-height: 1.55;
      }

      .actionRow {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 26px;
      }

      .cta,
      .secondaryCta {
        display: inline-block;
        padding: 16px 30px;
        border-radius: 999px;
        font-size: 16px;
        font-weight: 900;
        text-decoration: none;
        cursor: pointer;
      }

      .cta {
        border: none;
        background: linear-gradient(135deg, #0ea5ff, #2563eb);
        color: white;
        box-shadow: 0 0 32px rgba(14,165,255,0.45);
      }

      .secondaryCta {
        border: 1px solid rgba(125,211,252,0.3);
        background: rgba(255,255,255,0.045);
        color: white;
      }

      .disclaimer {
        max-width: 900px;
        margin: 30px auto 0;
        padding: 0 24px;
        font-size: 13px;
        color: rgba(255,255,255,0.6);
        text-align: center;
        line-height: 1.5;
      }

      @media (max-width: 900px) {
        .scoreGrid,
        .summaryCard,
        .problemGrid,
        .automationGrid {
          grid-template-columns: 1fr;
        }

        .roadmapItem {
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .hero {
          padding-top: 56px;
        }

        .card {
          margin: 50px 20px;
          padding: 30px;
        }

        .actionRow {
          flex-direction: column;
        }

        .cta,
        .secondaryCta {
          text-align: center;
        }
      }
    `}</style>
  )
}