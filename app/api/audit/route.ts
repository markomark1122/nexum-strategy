import { NextResponse } from "next/server"

type AuditInput = {
  industry?: string
  business_model?: string
  monthly_revenue?: string
  main_goal?: string
  marketing_channels?: string
  tools?: string
  biggest_problem?: string
  automation_interest?: string
  data_quality?: string
  manual_work?: string
  team_size?: string
  urgency?: string

  // older fallback keys
  revenue?: string
  team?: string
  bottleneck?: string
  errors?: string
  goal?: string
}

type AuditOpportunity = {
  title: string
  description: string
  impact: string
  difficulty: string
}

type AuditResult = {
  score: number
  opportunityScore: number
  summary: string
  problems: string[]
  opportunities: AuditOpportunity[]
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AuditInput
    const fallbackAudit = generateLocalAudit(body)

    if (!process.env.OPENAI_API_KEY) {
      console.warn("Missing OPENAI_API_KEY. Using local audit fallback.")
      return NextResponse.json(fallbackAudit)
    }

    const prompt = `
You are a senior ecommerce, marketing, and AI automation consultant.

Create a practical AI compatibility audit using these questionnaire answers:

${JSON.stringify(body, null, 2)}

Return ONLY valid JSON. Do not include markdown. Do not include explanations outside the JSON.

Use this exact JSON structure:

{
  "score": 75,
  "opportunityScore": 82,
  "summary": "Short business-specific summary.",
  "problems": [
    "Problem one",
    "Problem two",
    "Problem three"
  ],
  "opportunities": [
    {
      "title": "Opportunity title",
      "description": "Opportunity description",
      "impact": "High",
      "difficulty": "Medium"
    },
    {
      "title": "Opportunity title",
      "description": "Opportunity description",
      "impact": "Medium-High",
      "difficulty": "Low"
    },
    {
      "title": "Opportunity title",
      "description": "Opportunity description",
      "impact": "Medium",
      "difficulty": "Medium"
    }
  ],
  "estimatedImpact": {
    "timeSaved": "10-25 hrs/week",
    "revenueUpside": "$1,000-$5,000/mo"
  },
  "nextStep": "Recommended next step.",
  "maturityStage": "Automation-Ready",
  "riskLevel": "Low-Medium",
  "bestFirstAutomation": "Reporting automation",
  "roadmap": [
    {
      "week": "Week 1",
      "task": "Map the current workflow and identify manual steps."
    },
    {
      "week": "Week 2",
      "task": "Build the first AI-assisted workflow."
    },
    {
      "week": "Week 3",
      "task": "Test with real examples and improve the output."
    },
    {
      "week": "Week 4",
      "task": "Roll out the workflow and measure time saved."
    }
  ]
}

Rules:
- score must be 0-100 and represent AI readiness.
- opportunityScore must be 0-100 and represent automation potential.
- Be specific to ecommerce, marketing agencies, or online businesses.
- Focus on practical AI use cases, not vague advice.
- Mention risks if data quality or tool clarity is weak.
- Recommend one best first automation.
- Keep all text concise but useful.
`

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenAI API error:", data)
      return NextResponse.json(fallbackAudit)
    }

    let text = ""

    if (data.output_text) {
      text = data.output_text
    } else if (data.output?.length) {
      const parts = data.output[0].content || []
      text = parts.map((p: any) => p.text || "").join("")
    }

    if (!text) {
      console.error("No text returned from OpenAI:", data)
      return NextResponse.json(fallbackAudit)
    }

    try {
      const jsonStart = text.indexOf("{")
      const jsonEnd = text.lastIndexOf("}")

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON found in AI response")
      }

      const clean = text.slice(jsonStart, jsonEnd + 1)
      const parsed = JSON.parse(clean)

      const audit: AuditResult = {
        score: Number(parsed.score) || fallbackAudit.score,
        opportunityScore:
          Number(parsed.opportunityScore) || fallbackAudit.opportunityScore,
        summary: parsed.summary || fallbackAudit.summary,
        problems:
          Array.isArray(parsed.problems) && parsed.problems.length > 0
            ? parsed.problems
            : fallbackAudit.problems,
        opportunities:
          Array.isArray(parsed.opportunities) && parsed.opportunities.length > 0
            ? parsed.opportunities.map((op: any) => ({
                title: op.title || "Automation opportunity",
                description:
                  op.description ||
                  "Use AI to reduce repetitive work and improve workflow speed.",
                impact: op.impact || "Medium",
                difficulty: op.difficulty || "Medium",
              }))
            : fallbackAudit.opportunities,
        estimatedImpact: {
          timeSaved:
            parsed.estimatedImpact?.timeSaved ||
            fallbackAudit.estimatedImpact.timeSaved,
          revenueUpside:
            parsed.estimatedImpact?.revenueUpside ||
            fallbackAudit.estimatedImpact.revenueUpside,
        },
        nextStep: parsed.nextStep || fallbackAudit.nextStep,
        maturityStage: parsed.maturityStage || fallbackAudit.maturityStage,
        riskLevel: parsed.riskLevel || fallbackAudit.riskLevel,
        bestFirstAutomation:
          parsed.bestFirstAutomation || fallbackAudit.bestFirstAutomation,
        roadmap:
          Array.isArray(parsed.roadmap) && parsed.roadmap.length > 0
            ? parsed.roadmap
            : fallbackAudit.roadmap,
      }

      return NextResponse.json(audit)
    } catch (err) {
      console.error("JSON parse failed. Raw text:", text)
      return NextResponse.json(fallbackAudit)
    }
  } catch (error) {
    console.error("Audit route error:", error)

    return NextResponse.json(
      {
        error: "Failed to generate audit",
      },
      { status: 500 }
    )
  }
}

function generateLocalAudit(data: AuditInput): AuditResult {
  const tools = data.tools || ""
  const revenue = data.monthly_revenue || data.revenue || ""
  const manualWork = data.manual_work || ""
  const dataQuality = data.data_quality || ""
  const biggestProblem = data.biggest_problem || data.bottleneck || ""
  const automationInterest = data.automation_interest || ""
  const mainGoal = data.main_goal || data.goal || ""
  const urgency = data.urgency || ""
  const teamSize = data.team_size || data.team || ""

  let score = 58
  let opportunityScore = 72

  if (tools.includes("Shopify")) score += 6
  if (tools.includes("WooCommerce")) score += 4
  if (tools.includes("Klaviyo")) score += 6
  if (tools.includes("Mailchimp")) score += 4
  if (tools.includes("HubSpot")) score += 6
  if (tools.includes("Google Analytics")) score += 7
  if (tools.includes("Meta Pixel")) score += 4
  if (tools.includes("TikTok Pixel")) score += 4
  if (tools.includes("Zapier")) score += 8
  if (tools.includes("Make")) score += 8
  if (tools.includes("Not sure")) score -= 8

  if (dataQuality === "Very confident") score += 10
  if (dataQuality === "Somewhat confident") score += 5

  if (dataQuality === "Not confident") {
    score -= 8
    opportunityScore += 5
  }

  if (dataQuality === "We barely track anything") {
    score -= 12
    opportunityScore += 8
  }

  if (manualWork.includes("10 - 25")) opportunityScore += 8
  if (manualWork.includes("25 - 50")) opportunityScore += 15
  if (manualWork.includes("50+")) opportunityScore += 20

  if (urgency === "Immediately") opportunityScore += 8
  if (urgency === "Within 30 days") opportunityScore += 5

  if (biggestProblem === "Manual reporting") opportunityScore += 10
  if (biggestProblem === "No clear data tracking") score -= 8
  if (biggestProblem === "Expensive ad costs") opportunityScore += 7
  if (biggestProblem === "Weak email follow-up") opportunityScore += 7
  if (biggestProblem === "Slow customer support") opportunityScore += 6

  score = clamp(score, 20, 95)
  opportunityScore = clamp(opportunityScore, 35, 98)

  const bestFirstAutomation = chooseBestAutomation({
    biggestProblem,
    automationInterest,
    mainGoal,
  })

  return {
    score,
    opportunityScore,
    summary: buildSummary({
      score,
      opportunityScore,
      bestFirstAutomation,
    }),
    problems: buildProblems({
      biggestProblem,
      dataQuality,
      manualWork,
      tools,
      teamSize,
    }),
    opportunities: buildOpportunities(bestFirstAutomation, biggestProblem),
    estimatedImpact: {
      timeSaved: estimateTimeSaved(manualWork),
      revenueUpside: estimateRevenueUpside(revenue, manualWork),
    },
    nextStep: `Start with ${bestFirstAutomation}. Build a simple version first, keep human approval in place, then measure time saved before expanding.`,
    maturityStage: getMaturityStage(score, opportunityScore),
    riskLevel: getRiskLevel(dataQuality, tools),
    bestFirstAutomation,
    roadmap: buildRoadmap(bestFirstAutomation),
  }
}

function chooseBestAutomation(input: {
  biggestProblem: string
  automationInterest: string
  mainGoal: string
}) {
  const { biggestProblem, automationInterest, mainGoal } = input

  if (biggestProblem === "Manual reporting") return "Reporting automation"
  if (automationInterest === "Client reporting") return "Client reporting"
  if (automationInterest === "Sales reporting") return "Sales reporting"
  if (automationInterest === "Email/SMS campaigns") return "Email/SMS campaign automation"
  if (automationInterest === "Customer support replies") {
    return "AI customer support assistant"
  }
  if (automationInterest === "Product descriptions") {
    return "Product page optimization"
  }
  if (automationInterest === "Ad copy and creative testing") {
    return "Ad creative testing workflow"
  }
  if (automationInterest === "Customer segmentation") {
    return "Customer segmentation automation"
  }
  if (automationInterest === "Personalized recommendations") {
    return "Personalized product recommendations"
  }

  if (biggestProblem === "Weak email follow-up") {
    return "Email/SMS follow-up automation"
  }
  if (biggestProblem === "Slow customer support") {
    return "AI customer support assistant"
  }
  if (biggestProblem === "Expensive ad costs") {
    return "Ad creative testing workflow"
  }
  if (biggestProblem === "Bad product pages") {
    return "Product page optimization"
  }
  if (biggestProblem === "Poor customer retention") {
    return "Retention automation"
  }
  if (biggestProblem === "Low website conversion") {
    return "Conversion optimization workflow"
  }

  if (mainGoal === "Reduce manual work") return "Workflow automation"
  if (mainGoal === "Improve email/SMS marketing") {
    return "Email/SMS campaign automation"
  }
  if (mainGoal === "Recover abandoned carts") {
    return "Abandoned cart recovery automation"
  }
  if (mainGoal === "Increase repeat purchases") {
    return "Customer retention automation"
  }

  return "Customer follow-up automation"
}

function buildSummary(input: {
  score: number
  opportunityScore: number
  bestFirstAutomation: string
}) {
  const readiness =
    input.score >= 75
      ? "Your business already has a strong foundation for AI adoption."
      : input.score >= 55
        ? "Your business has a workable foundation for AI, but a few gaps need attention."
        : "Your business has AI potential, but the foundation needs cleanup before deeper automation."

  const opportunity =
    input.opportunityScore >= 80
      ? "The automation opportunity is high because your answers suggest meaningful repetitive work or operational friction."
      : "The automation opportunity is moderate and should start with one focused workflow."

  return `${readiness} ${opportunity} The strongest first move is ${input.bestFirstAutomation.toLowerCase()}.`
}

function buildProblems(input: {
  biggestProblem: string
  dataQuality: string
  manualWork: string
  tools: string
  teamSize: string
}) {
  const problems: string[] = []

  if (input.biggestProblem) {
    problems.push(`Primary bottleneck detected: ${input.biggestProblem}.`)
  }

  if (input.manualWork) {
    problems.push(
      `Manual work level reported: ${input.manualWork}. This suggests there may be workflow inefficiencies that AI can reduce.`
    )
  }

  if (
    input.dataQuality === "Not confident" ||
    input.dataQuality === "We barely track anything" ||
    input.dataQuality === "I am not sure"
  ) {
    problems.push(
      "Your data confidence is low, which can limit the accuracy of AI recommendations, reporting, and personalization."
    )
  }

  if (input.tools.includes("Not sure")) {
    problems.push(
      "Your current tool stack is unclear, which makes automation planning harder."
    )
  }

  if (input.teamSize === "Just me" || input.teamSize === "2 - 5 people") {
    problems.push(
      "A small team means manual work can quickly become a growth bottleneck."
    )
  }

  if (problems.length === 0) {
    problems.push(
      "Your business likely has repetitive workflows that can be improved with AI, but the main bottleneck needs more detail."
    )
  }

  return problems.slice(0, 4)
}

function buildOpportunities(
  bestFirstAutomation: string,
  biggestProblem: string
): AuditOpportunity[] {
  const opportunities: AuditOpportunity[] = [
    {
      title: bestFirstAutomation,
      description:
        "This is the best first workflow to improve because it matches your reported goal, bottleneck, or automation interest.",
      impact: "High",
      difficulty: "Medium",
    },
    {
      title: "Reporting and insight summaries",
      description:
        "Use AI to summarize sales, marketing, customer, or campaign data into weekly action reports.",
      impact: "High",
      difficulty: "Low-Medium",
    },
    {
      title: "Email/SMS follow-up automation",
      description:
        "Use AI to generate segmented follow-ups for abandoned carts, inactive leads, repeat customers, or client prospects.",
      impact: "High",
      difficulty: "Medium",
    },
    {
      title: "Ad copy and creative testing",
      description:
        "Use AI to generate hooks, ad variations, product angles, and testing plans faster.",
      impact: "Medium-High",
      difficulty: "Low",
    },
    {
      title: "Customer support assistant",
      description:
        "Use AI to draft replies, organize FAQs, summarize support trends, and reduce repetitive support work.",
      impact: "Medium",
      difficulty: "Medium",
    },
  ]

  if (biggestProblem === "No clear data tracking") {
    opportunities.unshift({
      title: "Data tracking cleanup",
      description:
        "Before advanced AI, clean up tracking so recommendations, reports, and automations are based on usable data.",
      impact: "High",
      difficulty: "Medium",
    })
  }

  return opportunities.slice(0, 5)
}

function buildRoadmap(bestFirstAutomation: string) {
  return [
    {
      week: "Week 1",
      task: "Map your current workflow, document each manual step, and identify where time is being wasted.",
    },
    {
      week: "Week 2",
      task: `Build a simple AI-assisted version of ${bestFirstAutomation}. Keep human approval before anything goes to customers or clients.`,
    },
    {
      week: "Week 3",
      task: "Test the workflow with real examples, compare output quality, and adjust prompts, rules, or approval steps.",
    },
    {
      week: "Week 4",
      task: "Roll out the workflow, measure time saved, document the process, and choose the next automation opportunity.",
    },
  ]
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

  if (revenue.includes("$0 - $5k")) {
    return highManual ? "$500–$1,500/mo" : "$200–$800/mo"
  }

  if (revenue.includes("$5k - $25k")) {
    return highManual ? "$1,500–$4,000/mo" : "$700–$2,000/mo"
  }

  if (revenue.includes("$25k - $100k")) {
    return highManual ? "$3,000–$8,000/mo" : "$1,500–$4,500/mo"
  }

  if (revenue.includes("$100k - $500k")) {
    return highManual ? "$8,000–$20,000/mo" : "$4,000–$10,000/mo"
  }

  if (revenue.includes("$500k+")) {
    return highManual ? "$20,000+/mo" : "$8,000–$18,000/mo"
  }

  return highManual ? "$3,000–$8,000/mo" : "$1,000–$4,000/mo"
}

function getMaturityStage(score: number, opportunityScore: number) {
  if (score >= 75 && opportunityScore >= 75) return "Automation-Ready"
  if (score < 55 && opportunityScore >= 75) return "Manual but Highly Automatable"
  if (score >= 65) return "AI-Assisted Operations"
  return "Early AI Readiness"
}

function getRiskLevel(dataQuality: string, tools: string) {
  if (dataQuality === "We barely track anything" || dataQuality === "Not confident") {
    return "Medium-High"
  }

  if (tools.includes("Not sure")) return "Medium"

  return "Low-Medium"
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}