import { NextResponse } from "next/server"

type AuditInput = {
  email?: string
  businessType?: string
  operations?: string

  // Optional fallback fields if your form changes later
  industry?: string
  business_model?: string
  monthly_revenue?: string
  main_goal?: string
  tools?: string
  biggest_problem?: string
  automation_interest?: string
  data_quality?: string
  manual_work?: string
  team_size?: string
  urgency?: string
}

export async function POST(req: Request) {
  try {
    let body: AuditInput = {}

    try {
      body = await req.json()
    } catch {
      body = {}
    }

    const audit = createFallbackAudit(body)

    return NextResponse.json(audit, { status: 200 })
  } catch (error) {
    console.error("Unexpected audit route error:", error)

    return NextResponse.json(
      createFallbackAudit({
        businessType: "Unknown business",
        operations: "Unable to read form answers.",
      }),
      { status: 200 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  )
}

function createFallbackAudit(input: AuditInput) {
  const businessType =
    input.businessType ||
    input.business_model ||
    input.industry ||
    "your business"

  const operations = input.operations || ""
  const lowerOps = operations.toLowerCase()

  let bestFirstAutomation = "Workflow automation"
  let score = 72
  let opportunityScore = 84

  if (lowerOps.includes("email") || lowerOps.includes("sms")) {
    bestFirstAutomation = "Email/SMS automation"
    opportunityScore = 88
  } else if (
    lowerOps.includes("support") ||
    lowerOps.includes("customer service") ||
    lowerOps.includes("tickets")
  ) {
    bestFirstAutomation = "AI customer support assistant"
    opportunityScore = 86
  } else if (
    lowerOps.includes("ad") ||
    lowerOps.includes("ads") ||
    lowerOps.includes("marketing") ||
    lowerOps.includes("campaign")
  ) {
    bestFirstAutomation = "Ad creative and campaign testing"
    opportunityScore = 85
  } else if (
    lowerOps.includes("report") ||
    lowerOps.includes("analytics") ||
    lowerOps.includes("data")
  ) {
    bestFirstAutomation = "Reporting automation"
    opportunityScore = 87
  } else if (
    lowerOps.includes("content") ||
    lowerOps.includes("blog") ||
    lowerOps.includes("social")
  ) {
    bestFirstAutomation = "Content production workflow"
    opportunityScore = 83
  } else if (
    lowerOps.includes("shopify") ||
    lowerOps.includes("ecommerce") ||
    lowerOps.includes("e-commerce") ||
    lowerOps.includes("store")
  ) {
    bestFirstAutomation = "Customer follow-up automation"
    opportunityScore = 86
  }

  if (businessType.toLowerCase().includes("marketing")) {
    score = 76
  }

  if (
    businessType.toLowerCase().includes("ecommerce") ||
    businessType.toLowerCase().includes("e-commerce")
  ) {
    score = 74
  }

  return {
    score,
    opportunityScore,
    summary: `${businessType} has strong AI automation potential. The clearest opportunity is to reduce repetitive work, improve follow-up, and create more consistent marketing or operational workflows. Start with one workflow first instead of trying to automate everything at once.`,
    problems: [
      "Manual tasks may be slowing down growth and taking time away from higher-value work.",
      "Some workflows likely depend on repeated human effort that could be assisted by AI.",
      "The business may benefit from clearer systems for reporting, customer communication, and follow-up.",
    ],
    opportunities: [
      {
        title: bestFirstAutomation,
        description:
          "Start with the workflow most closely connected to your current operations and biggest bottleneck.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Reporting and insight summaries",
        description:
          "Use AI to summarize sales, marketing, customer, or campaign activity into weekly action reports.",
        impact: "High",
        difficulty: "Low-Medium",
      },
      {
        title: "Customer follow-up automation",
        description:
          "Use AI to draft and personalize follow-ups for leads, customers, abandoned carts, or inactive buyers.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Content and ad copy generation",
        description:
          "Use AI to create content drafts, campaign ideas, ad hooks, product descriptions, and creative testing angles.",
        impact: "Medium-High",
        difficulty: "Low",
      },
      {
        title: "Customer support assistant",
        description:
          "Use AI to draft replies, organize FAQs, summarize customer issues, and reduce repetitive support work.",
        impact: "Medium",
        difficulty: "Medium",
      },
    ],
    estimatedImpact: {
      timeSaved: "10–25 hrs/week",
      revenueUpside: "$1,000–$5,000/mo",
    },
    nextStep: `Start with ${bestFirstAutomation}. Build a simple version first, keep human approval in place, and measure time saved before expanding.`,
    maturityStage: "Automation-Ready",
    riskLevel: "Low-Medium",
    bestFirstAutomation,
    roadmap: [
      {
        week: "Week 1",
        task: "Map the current workflow and identify the most repetitive manual steps.",
      },
      {
        week: "Week 2",
        task: `Build a simple AI-assisted version of ${bestFirstAutomation}.`,
      },
      {
        week: "Week 3",
        task: "Test the workflow with real examples and improve the output quality.",
      },
      {
        week: "Week 4",
        task: "Roll out the workflow, measure time saved, and choose the next automation.",
      },
    ],
  }
}