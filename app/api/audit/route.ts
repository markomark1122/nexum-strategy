import { NextResponse } from "next/server"

type AuditPayload = {
  email?: string
  businessType?: string
  monthlyRevenue?: string
  averageOrderValue?: string
  monthlyOrderVolume?: string
  teamSize?: string
  tools?: string[]
  marketingChannels?: string[]

  mainGoal?: string
  growthConstraint?: string
  biggestBottleneck?: string

  manualWorkflow?: string
  weeklyManualWork?: string
  customerSupportVolume?: string
  repeatPurchaseRate?: string
  reportingFrequency?: string
  inventoryComplexity?: string
  returnsIssue?: string
  contentProductionLoad?: string
  adTestingProcess?: string

  dataConfidence?: string
  currentAiUsage?: string
  automationPriority?: string
  approvalLevel?: string
  urgency?: string
  operations?: string

  business_model?: string
  monthly_revenue?: string
  team_size?: string
  biggest_problem?: string
  manual_work?: string
  data_quality?: string
  automation_interest?: string
}

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

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)

  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim())
  }

  return []
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
}

function cleanScore(value: unknown, fallback: number) {
  const number = Number(value)

  if (!Number.isFinite(number)) return fallback

  return Math.min(100, Math.max(0, Math.round(number)))
}

function cleanString(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback

  const trimmed = value.trim()

  return trimmed.length ? trimmed : fallback
}

function cleanStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback

  const cleaned = value
    .map((item) => String(item || "").trim())
    .filter(Boolean)

  return cleaned.length ? cleaned : fallback
}

function getAnswerText(payload: AuditPayload) {
  return [
    payload.email,
    payload.businessType,
    payload.monthlyRevenue,
    payload.averageOrderValue,
    payload.monthlyOrderVolume,
    payload.teamSize,
    normalizeArray(payload.tools).join(" "),
    normalizeArray(payload.marketingChannels).join(" "),
    payload.mainGoal,
    payload.growthConstraint,
    payload.biggestBottleneck,
    payload.manualWorkflow,
    payload.weeklyManualWork,
    payload.customerSupportVolume,
    payload.repeatPurchaseRate,
    payload.reportingFrequency,
    payload.inventoryComplexity,
    payload.returnsIssue,
    payload.contentProductionLoad,
    payload.adTestingProcess,
    payload.dataConfidence,
    payload.currentAiUsage,
    payload.automationPriority,
    payload.approvalLevel,
    payload.urgency,
    payload.operations,
    payload.business_model,
    payload.monthly_revenue,
    payload.team_size,
    payload.biggest_problem,
    payload.manual_work,
    payload.data_quality,
    payload.automation_interest,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

function chooseBestFirstAutomation(payload: AuditPayload) {
  const text = getAnswerText(payload)

  const supportSignals = [
    "support",
    "tickets",
    "customer service",
    "gorgias",
    "zendesk",
    "returns",
    "exchanges",
    "order status",
    "shipping",
    "faq",
  ]

  const retentionSignals = [
    "repeat",
    "retention",
    "email",
    "sms",
    "klaviyo",
    "abandoned cart",
    "post-purchase",
    "winback",
    "follow-up",
    "follow up",
    "customers buy once",
  ]

  const reportingSignals = [
    "report",
    "reporting",
    "analytics",
    "data",
    "spreadsheet",
    "google sheets",
    "dashboard",
    "kpi",
    "metrics",
    "weekly reports",
  ]

  const adsSignals = [
    "ads",
    "ad performance",
    "meta ads",
    "google ads",
    "tiktok ads",
    "creative",
    "campaign",
    "roas",
    "testing",
    "traffic is too expensive",
  ]

  const contentSignals = [
    "content",
    "product description",
    "copy",
    "social",
    "instagram",
    "tiktok",
    "creative workload",
    "blog",
  ]

  const inventorySignals = [
    "inventory",
    "fulfillment",
    "stockout",
    "stockouts",
    "sku",
    "variants",
    "warehouse",
  ]

  if (includesAny(text, supportSignals)) return "AI customer support triage and reply assistant"
  if (includesAny(text, retentionSignals)) return "Email/SMS retention and customer follow-up automation"
  if (includesAny(text, reportingSignals)) return "Weekly performance reporting and insight automation"
  if (includesAny(text, adsSignals)) return "Ad creative testing and campaign review workflow"
  if (includesAny(text, contentSignals)) return "AI-assisted content production workflow"
  if (includesAny(text, inventorySignals)) return "Inventory and fulfillment exception monitoring"

  return "Priority workflow automation"
}

function scoreRevenue(payload: AuditPayload) {
  const revenue = `${payload.monthlyRevenue || payload.monthly_revenue || ""}`.toLowerCase()

  if (includesAny(revenue, ["500k"])) return 20
  if (includesAny(revenue, ["250k"])) return 18
  if (includesAny(revenue, ["100k"])) return 16
  if (includesAny(revenue, ["50k", "25k"])) return 13
  if (includesAny(revenue, ["10k"])) return 10
  if (includesAny(revenue, ["under"])) return 7

  return 10
}

function scoreOrderVolume(payload: AuditPayload) {
  const volume = `${payload.monthlyOrderVolume || ""}`.toLowerCase()

  if (includesAny(volume, ["5,000", "5000"])) return 18
  if (includesAny(volume, ["1,000", "1000"])) return 16
  if (includesAny(volume, ["500"])) return 13
  if (includesAny(volume, ["100"])) return 9
  if (includesAny(volume, ["under"])) return 6

  return 9
}

function scoreManualWork(payload: AuditPayload) {
  const manual = `${payload.manualWorkflow || payload.manual_work || ""} ${payload.weeklyManualWork || ""}`.toLowerCase()

  if (includesAny(manual, ["30", "40", "50"])) return 20
  if (includesAny(manual, ["20"])) return 17
  if (includesAny(manual, ["10", "15"])) return 14
  if (includesAny(manual, ["5"])) return 10
  if (payload.manualWorkflow || payload.manual_work) return 8

  return 5
}

function scoreData(payload: AuditPayload) {
  const data = `${payload.dataConfidence || payload.data_quality || ""}`.toLowerCase()

  if (includesAny(data, ["high", "clean", "organized"])) return 17
  if (includesAny(data, ["medium", "usable", "imperfect"])) return 12
  if (includesAny(data, ["low", "messy", "scattered"])) return 6

  return 10
}

function scoreUrgency(payload: AuditPayload) {
  const urgency = `${payload.urgency || ""} ${payload.automationPriority || payload.automation_interest || ""}`.toLowerCase()

  if (includesAny(urgency, ["immediate", "this month", "increase revenue", "save time", "scale"])) return 17
  if (includesAny(urgency, ["quarter", "improve", "reporting"])) return 12
  if (includesAny(urgency, ["exploring"])) return 7

  return 10
}

function scoreTools(payload: AuditPayload) {
  const tools = normalizeArray(payload.tools).join(" ").toLowerCase()

  if (
    includesAny(tools, [
      "shopify",
      "klaviyo",
      "gorgias",
      "make",
      "zapier",
      "google sheets",
      "meta ads",
      "google ads",
      "airtable",
    ])
  ) {
    return 16
  }

  if (tools.trim()) return 10

  return 6
}

function getMaturityStage(score: number) {
  if (score >= 82) return "Automation-ready"
  if (score >= 65) return "Strong foundation"
  if (score >= 48) return "Manual but ready to improve"

  return "Early-stage operations"
}

function getRiskLevel(payload: AuditPayload) {
  const approval = `${payload.approvalLevel || ""}`.toLowerCase()
  const data = `${payload.dataConfidence || payload.data_quality || ""}`.toLowerCase()
  const inventory = `${payload.inventoryComplexity || ""}`.toLowerCase()
  const returns = `${payload.returnsIssue || ""}`.toLowerCase()

  if (
    includesAny(approval, ["mostly automated"]) ||
    includesAny(data, ["low", "messy", "scattered"]) ||
    includesAny(inventory, ["difficult"]) ||
    includesAny(returns, ["high"])
  ) {
    return "Medium-High"
  }

  if (
    includesAny(approval, ["human approval", "human review"]) &&
    includesAny(data, ["high", "clean", "organized"])
  ) {
    return "Low"
  }

  return "Low-Medium"
}

function getEstimatedTimeSaved(payload: AuditPayload) {
  const manual = `${payload.weeklyManualWork || ""}`.toLowerCase()
  const support = `${payload.customerSupportVolume || ""}`.toLowerCase()
  const reporting = `${payload.reportingFrequency || ""}`.toLowerCase()

  if (includesAny(manual, ["30"]) || includesAny(support, ["50+"])) return "18-35 hours/month"
  if (includesAny(manual, ["20"]) || includesAny(reporting, ["weekly reports manually"])) return "12-24 hours/month"
  if (includesAny(manual, ["10"])) return "6-14 hours/month"
  if (includesAny(manual, ["5"])) return "3-8 hours/month"

  return "4-10 hours/month"
}

function getRevenueUpside(payload: AuditPayload, bestFirstAutomation: string) {
  const revenue = `${payload.monthlyRevenue || payload.monthly_revenue || ""}`.toLowerCase()
  const aov = `${payload.averageOrderValue || ""}`.toLowerCase()
  const automation = bestFirstAutomation.toLowerCase()

  const revenueLarge = includesAny(revenue, ["250k", "500k"])
  const revenueMid = includesAny(revenue, ["50k", "100k"])
  const revenueSmall = includesAny(revenue, ["10k", "25k"])

  const retentionOrAds =
    includesAny(automation, ["retention", "email", "sms", "ad", "campaign", "creative"]) ||
    includesAny(aov, ["100", "200", "500"])

  if (revenueLarge && retentionOrAds) return "$3,000-$18,000/month"
  if (revenueLarge) return "$2,000-$10,000/month"
  if (revenueMid && retentionOrAds) return "$1,000-$7,500/month"
  if (revenueMid) return "$750-$4,500/month"
  if (revenueSmall) return "$250-$2,000/month"

  return "Varies by order volume, margin, traffic quality, and current workflow maturity"
}

function getProblems(payload: AuditPayload, bestFirstAutomation: string) {
  const problems: string[] = []

  if (payload.growthConstraint) {
    problems.push(`Growth constraint identified: ${payload.growthConstraint}.`)
  }

  if (payload.biggestBottleneck || payload.biggest_problem) {
    problems.push(`Primary operational bottleneck: ${payload.biggestBottleneck || payload.biggest_problem}.`)
  }

  if (payload.manualWorkflow || payload.manual_work) {
    problems.push(`Manual workflow creating drag: ${payload.manualWorkflow || payload.manual_work}.`)
  }

  if (payload.reportingFrequency && !payload.reportingFrequency.toLowerCase().includes("automated")) {
    problems.push(`Reporting process appears to require manual review: ${payload.reportingFrequency}.`)
  }

  if (payload.customerSupportVolume && !payload.customerSupportVolume.toLowerCase().includes("very low")) {
    problems.push(`Support workload may be creating repeatable tasks that should be triaged or drafted with AI: ${payload.customerSupportVolume}.`)
  }

  if (payload.repeatPurchaseRate && payload.repeatPurchaseRate.toLowerCase().includes("weak")) {
    problems.push("Repeat purchase behavior appears weak, which may indicate a lifecycle marketing or post-purchase follow-up opportunity.")
  }

  if (payload.adTestingProcess && !payload.adTestingProcess.toLowerCase().includes("strong") && !payload.adTestingProcess.toLowerCase().includes("do not run")) {
    problems.push(`Ad testing may lack a consistent feedback loop: ${payload.adTestingProcess}.`)
  }

  if (payload.contentProductionLoad && includesAny(payload.contentProductionLoad.toLowerCase(), ["high", "very high"])) {
    problems.push(`Content production is likely slowing campaign velocity: ${payload.contentProductionLoad}.`)
  }

  if (!problems.length) {
    problems.push("The business has automation potential, but the highest-friction workflow needs more operational detail before implementation.")
  }

  problems.push(`The recommended first automation is ${bestFirstAutomation} because it is most aligned with the current bottleneck and likely implementation path.`)

  return problems.slice(0, 7)
}

function getOpportunities(payload: AuditPayload, bestFirstAutomation: string): AuditResult["opportunities"] {
  const automation = bestFirstAutomation.toLowerCase()

  if (automation.includes("support")) {
    return [
      {
        title: "AI-assisted support triage",
        description:
          "Classify incoming support messages by topic, urgency, and order status so the team can prioritize faster and reduce manual sorting.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Approved support reply drafts",
        description:
          "Generate draft replies for common questions such as order status, returns, exchanges, sizing, product details, and shipping without sending automatically.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Support insight reporting",
        description:
          "Summarize recurring customer questions weekly so marketing, product, and operations can fix root causes instead of only replying to tickets.",
        impact: "Medium",
        difficulty: "Low-Medium",
      },
    ]
  }

  if (automation.includes("retention") || automation.includes("email") || automation.includes("sms")) {
    return [
      {
        title: "Lifecycle follow-up automation",
        description:
          "Build segmented abandoned cart, post-purchase, repeat purchase, and win-back flows based on customer behavior and order history.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Customer segmentation workflow",
        description:
          "Use purchase behavior, product interest, order value, and engagement to group customers into segments that receive more relevant messaging.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Retention performance review",
        description:
          "Create a recurring report showing which flows drive revenue, which segments underperform, and where the next retention experiment should focus.",
        impact: "Medium-High",
        difficulty: "Low-Medium",
      },
    ]
  }

  if (automation.includes("report")) {
    return [
      {
        title: "Weekly ecommerce performance report",
        description:
          "Automatically summarize revenue, conversion, AOV, order volume, email/SMS performance, ad performance, and support signals into one weekly operating report.",
        impact: "High",
        difficulty: "Low-Medium",
      },
      {
        title: "Exception alert workflow",
        description:
          "Flag unusual drops in conversion, sales, traffic, ROAS, order volume, fulfillment, or support volume so the team can act faster.",
        impact: "Medium-High",
        difficulty: "Medium",
      },
      {
        title: "Decision summary assistant",
        description:
          "Turn raw numbers into clear actions: what changed, why it may have changed, and what should be reviewed next.",
        impact: "High",
        difficulty: "Medium",
      },
    ]
  }

  if (automation.includes("ad") || automation.includes("campaign") || automation.includes("creative")) {
    return [
      {
        title: "Ad creative testing workflow",
        description:
          "Generate structured creative hypotheses, hooks, angles, and test plans based on product benefits, customer objections, and prior campaign performance.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Campaign review automation",
        description:
          "Summarize weekly campaign performance and identify which campaigns need new creative, budget changes, landing page review, or audience testing.",
        impact: "High",
        difficulty: "Medium",
      },
      {
        title: "Creative learning library",
        description:
          "Capture winning hooks, offers, visuals, and objections so future ads are informed by actual performance instead of starting from scratch.",
        impact: "Medium-High",
        difficulty: "Low-Medium",
      },
    ]
  }

  if (automation.includes("content")) {
    return [
      {
        title: "Product content production workflow",
        description:
          "Turn product details, reviews, objections, and FAQs into draft product descriptions, ad copy, email copy, and social content.",
        impact: "Medium-High",
        difficulty: "Low-Medium",
      },
      {
        title: "Campaign content repurposing",
        description:
          "Repurpose one product or campaign angle into multiple formats for email, ads, social, SMS, and landing page sections.",
        impact: "Medium",
        difficulty: "Low",
      },
      {
        title: "Content calendar assistant",
        description:
          "Create a repeatable planning workflow for promotional periods, product launches, seasonal campaigns, and retention campaigns.",
        impact: "Medium",
        difficulty: "Low",
      },
    ]
  }

  if (automation.includes("inventory") || automation.includes("fulfillment")) {
    return [
      {
        title: "Inventory exception monitoring",
        description:
          "Flag products or variants with stockout risk, unusual order movement, fulfillment delays, or repeated customer questions.",
        impact: "Medium-High",
        difficulty: "Medium",
      },
      {
        title: "Fulfillment issue summary",
        description:
          "Summarize fulfillment, shipping, and order-status issues so the team can identify recurring operational problems faster.",
        impact: "Medium",
        difficulty: "Medium",
      },
      {
        title: "Customer update workflow",
        description:
          "Create approved templates and triggers for customer communication around shipping delays, returns, exchanges, or stock issues.",
        impact: "Medium-High",
        difficulty: "Medium",
      },
    ]
  }

  return [
    {
      title: "Priority workflow automation",
      description:
        "Map the highest-friction workflow, identify its trigger, define the approval point, and automate the first repeatable step.",
      impact: "Medium-High",
      difficulty: "Medium",
    },
    {
      title: "Operational reporting workflow",
      description:
        "Create a recurring report that converts scattered ecommerce data into clear next actions.",
      impact: "Medium",
      difficulty: "Low-Medium",
    },
    {
      title: "Customer communication workflow",
      description:
        "Improve customer follow-up, internal handoffs, or support response consistency with human-reviewed AI assistance.",
      impact: "Medium",
      difficulty: "Medium",
    },
  ]
}

function getRoadmap(bestFirstAutomation: string) {
  return [
    {
      week: "Week 1",
      task: `Map the current ${bestFirstAutomation.toLowerCase()} workflow. Define the trigger, owner, tools, manual steps, approval point, and success metric.`,
    },
    {
      week: "Week 2",
      task:
        "Build the first controlled version using existing tools. Keep the automation narrow, human-reviewed, and measurable.",
    },
    {
      week: "Week 3",
      task:
        "Test with real examples, document edge cases, improve prompts/rules, and confirm that no sensitive customer-facing step runs without approval.",
    },
    {
      week: "Week 4",
      task:
        "Launch the workflow, monitor time saved and business impact, then decide whether to expand, refine, or move to the next workflow.",
    },
  ]
}

function buildFallbackAudit(payload: AuditPayload): AuditResult {
  const bestFirstAutomation = chooseBestFirstAutomation(payload)

  const score =
    scoreRevenue(payload) +
    scoreOrderVolume(payload) +
    scoreManualWork(payload) +
    scoreData(payload) +
    scoreUrgency(payload) +
    scoreTools(payload)

  const readinessScore = Math.min(96, Math.max(32, score))

  const opportunityScore = Math.min(
    98,
    Math.max(
      45,
      scoreManualWork(payload) * 2 +
        scoreOrderVolume(payload) +
        scoreUrgency(payload) +
        scoreRevenue(payload)
    )
  )

  return {
    score: readinessScore,
    opportunityScore,
    summary: `The strongest first automation opportunity appears to be ${bestFirstAutomation}. This recommendation is based on the business model, current tools, order volume, manual workload, growth constraint, data confidence, and urgency. The first implementation should stay narrow, measurable, and human-reviewed so the business can validate value before expanding automation across the operation.`,
    problems: getProblems(payload, bestFirstAutomation),
    opportunities: getOpportunities(payload, bestFirstAutomation),
    estimatedImpact: {
      timeSaved: getEstimatedTimeSaved(payload),
      revenueUpside: getRevenueUpside(payload, bestFirstAutomation),
    },
    nextStep: `Start by documenting the current ${bestFirstAutomation.toLowerCase()} workflow. Capture the trigger, manual steps, data sources, owner, customer-facing risk, approval checkpoint, and the one metric that will prove the automation is worth expanding.`,
    maturityStage: getMaturityStage(readinessScore),
    riskLevel: getRiskLevel(payload),
    bestFirstAutomation,
    roadmap: getRoadmap(bestFirstAutomation),
  }
}

function validateAuditResult(value: unknown, fallback: AuditResult): AuditResult {
  const input = value as Partial<AuditResult>

  return {
    score: cleanScore(input?.score, fallback.score),
    opportunityScore: cleanScore(input?.opportunityScore, fallback.opportunityScore),
    summary: cleanString(input?.summary, fallback.summary),
    problems: cleanStringArray(input?.problems, fallback.problems).slice(0, 8),
    opportunities: Array.isArray(input?.opportunities) && input.opportunities.length
      ? input.opportunities.slice(0, 5).map((item, index) => ({
          title: cleanString(item?.title, fallback.opportunities[index]?.title || "Recommended automation opportunity"),
          description: cleanString(item?.description, fallback.opportunities[index]?.description || "A practical automation opportunity based on the diagnostic answers."),
          impact: cleanString(item?.impact, fallback.opportunities[index]?.impact || "Medium"),
          difficulty: cleanString(item?.difficulty, fallback.opportunities[index]?.difficulty || "Medium"),
        }))
      : fallback.opportunities,
    estimatedImpact: {
      timeSaved: cleanString(input?.estimatedImpact?.timeSaved, fallback.estimatedImpact.timeSaved),
      revenueUpside: cleanString(input?.estimatedImpact?.revenueUpside, fallback.estimatedImpact.revenueUpside),
    },
    nextStep: cleanString(input?.nextStep, fallback.nextStep),
    maturityStage: cleanString(input?.maturityStage, fallback.maturityStage),
    riskLevel: cleanString(input?.riskLevel, fallback.riskLevel),
    bestFirstAutomation: cleanString(input?.bestFirstAutomation, fallback.bestFirstAutomation),
    roadmap: Array.isArray(input?.roadmap) && input.roadmap.length
      ? input.roadmap.slice(0, 6).map((item, index) => ({
          week: cleanString(item?.week, fallback.roadmap[index]?.week || `Step ${index + 1}`),
          task: cleanString(item?.task, fallback.roadmap[index]?.task || "Implement the next controlled automation step."),
        }))
      : fallback.roadmap,
  }
}

function buildAiPrompt(payload: AuditPayload, fallback: AuditResult) {
  return `
You are an ecommerce automation strategist producing a professional diagnostic report for an ecommerce operator.

Analyze the submission like a consultant. Do not give generic AI advice. Do not recommend automating everything. Choose one best first automation. Make the reasoning specific to the user's tools, revenue stage, order volume, support volume, retention situation, reporting process, ad testing process, content workload, inventory/returns complexity, data confidence, approval preference, and urgency.

The report should feel specific enough that someone would pay for the next roadmap.

Rules:
- Return valid JSON only.
- Match the exact schema.
- Keep recommendations practical for ecommerce.
- Use direct, professional language.
- Do not invent exact financials beyond ranges.
- Keep customer-facing automations human-reviewed when risk is unclear.
- Identify operational friction and highest-leverage next action.
- Do not recommend automating payment, banking, or sensitive settings.
- Do not make fake claims, fake stats, or fake testimonials.
- If data is weak, mention that implementation should begin with reporting/data cleanup or human-reviewed workflows.
- Prefer one focused first automation over broad transformation.

Fallback report for reference:
${JSON.stringify(fallback, null, 2)}

Diagnostic answers:
${JSON.stringify(payload, null, 2)}
`.trim()
}

const auditSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "score",
    "opportunityScore",
    "summary",
    "problems",
    "opportunities",
    "estimatedImpact",
    "nextStep",
    "maturityStage",
    "riskLevel",
    "bestFirstAutomation",
    "roadmap",
  ],
  properties: {
    score: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    opportunityScore: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    summary: {
      type: "string",
    },
    problems: {
      type: "array",
      minItems: 3,
      maxItems: 8,
      items: {
        type: "string",
      },
    },
    opportunities: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "description", "impact", "difficulty"],
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          impact: {
            type: "string",
          },
          difficulty: {
            type: "string",
          },
        },
      },
    },
    estimatedImpact: {
      type: "object",
      additionalProperties: false,
      required: ["timeSaved", "revenueUpside"],
      properties: {
        timeSaved: {
          type: "string",
        },
        revenueUpside: {
          type: "string",
        },
      },
    },
    nextStep: {
      type: "string",
    },
    maturityStage: {
      type: "string",
    },
    riskLevel: {
      type: "string",
    },
    bestFirstAutomation: {
      type: "string",
    },
    roadmap: {
      type: "array",
      minItems: 4,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["week", "task"],
        properties: {
          week: {
            type: "string",
          },
          task: {
            type: "string",
          },
        },
      },
    },
  },
}

async function generateAiAudit(payload: AuditPayload, fallback: AuditResult): Promise<AuditResult> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn("OPENAI_API_KEY is missing. Using fallback audit.")
    return fallback
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
        input: [
          {
            role: "system",
            content:
              "You create professional ecommerce AI automation diagnostic reports. You return only valid JSON matching the requested schema.",
          },
          {
            role: "user",
            content: buildAiPrompt(payload, fallback),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "nexum_audit_result",
            strict: true,
            schema: auditSchema,
          },
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenAI audit generation failed:", errorText)
      return fallback
    }

    const data = await response.json()

    const outputText =
      typeof data.output_text === "string"
        ? data.output_text
        : data.output
            ?.flatMap((item: any) => item.content || [])
            ?.map((content: any) => content.text || "")
            ?.join("") || ""

    if (!outputText) {
      console.error("OpenAI response did not include output text.")
      return fallback
    }

    const parsed = JSON.parse(outputText)

    return validateAuditResult(parsed, fallback)
  } catch (error) {
    console.error("AI audit generation error:", error)
    return fallback
  }
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatList(items: string[]) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
}

function buildEmailHtml(payload: AuditPayload, result: AuditResult) {
  const tools = normalizeArray(payload.tools)
  const channels = normalizeArray(payload.marketingChannels)

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="max-width:760px;margin:0 auto;padding:28px;">
          <div style="background:#020b1c;color:#ffffff;border-radius:22px;padding:28px;margin-bottom:20px;">
            <p style="margin:0 0 10px;color:#7dd3fc;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Nexum Strategy</p>
            <h1 style="margin:0;font-size:30px;line-height:1.2;">New Ecommerce Automation Diagnostic</h1>
            <p style="margin:14px 0 0;color:rgba(255,255,255,0.72);line-height:1.6;">A new visitor completed the diagnostic.</p>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;margin-bottom:20px;">
            <h2 style="margin:0 0 16px;">Lead Information</h2>
            <p><strong>Email:</strong> ${escapeHtml(payload.email || "Not provided")}</p>
            <p><strong>Business type:</strong> ${escapeHtml(payload.businessType || payload.business_model || "Not provided")}</p>
            <p><strong>Monthly revenue:</strong> ${escapeHtml(payload.monthlyRevenue || payload.monthly_revenue || "Not provided")}</p>
            <p><strong>Average order value:</strong> ${escapeHtml(payload.averageOrderValue || "Not provided")}</p>
            <p><strong>Monthly order volume:</strong> ${escapeHtml(payload.monthlyOrderVolume || "Not provided")}</p>
            <p><strong>Team size:</strong> ${escapeHtml(payload.teamSize || payload.team_size || "Not provided")}</p>
            <p><strong>Tools:</strong> ${escapeHtml(tools.join(", ") || "Not provided")}</p>
            <p><strong>Marketing channels:</strong> ${escapeHtml(channels.join(", ") || "Not provided")}</p>
            <p><strong>Main goal:</strong> ${escapeHtml(payload.mainGoal || "Not provided")}</p>
            <p><strong>Growth constraint:</strong> ${escapeHtml(payload.growthConstraint || "Not provided")}</p>
            <p><strong>Biggest bottleneck:</strong> ${escapeHtml(payload.biggestBottleneck || payload.biggest_problem || "Not provided")}</p>
            <p><strong>Manual workflow:</strong> ${escapeHtml(payload.manualWorkflow || payload.manual_work || "Not provided")}</p>
            <p><strong>Weekly manual work:</strong> ${escapeHtml(payload.weeklyManualWork || "Not provided")}</p>
            <p><strong>Support volume:</strong> ${escapeHtml(payload.customerSupportVolume || "Not provided")}</p>
            <p><strong>Retention:</strong> ${escapeHtml(payload.repeatPurchaseRate || "Not provided")}</p>
            <p><strong>Reporting:</strong> ${escapeHtml(payload.reportingFrequency || "Not provided")}</p>
            <p><strong>Inventory complexity:</strong> ${escapeHtml(payload.inventoryComplexity || "Not provided")}</p>
            <p><strong>Returns issue:</strong> ${escapeHtml(payload.returnsIssue || "Not provided")}</p>
            <p><strong>Content workload:</strong> ${escapeHtml(payload.contentProductionLoad || "Not provided")}</p>
            <p><strong>Ad testing:</strong> ${escapeHtml(payload.adTestingProcess || "Not provided")}</p>
            <p><strong>Data confidence:</strong> ${escapeHtml(payload.dataConfidence || payload.data_quality || "Not provided")}</p>
            <p><strong>Approval level:</strong> ${escapeHtml(payload.approvalLevel || "Not provided")}</p>
            <p><strong>Urgency:</strong> ${escapeHtml(payload.urgency || "Not provided")}</p>
            <p><strong>Operations:</strong><br/>${escapeHtml(payload.operations || "Not provided")}</p>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;margin-bottom:20px;">
            <h2 style="margin:0 0 16px;">Report Summary</h2>
            <p><strong>AI Readiness Score:</strong> ${escapeHtml(result.score)}/100</p>
            <p><strong>Opportunity Score:</strong> ${escapeHtml(result.opportunityScore)}/100</p>
            <p><strong>Best First Automation:</strong> ${escapeHtml(result.bestFirstAutomation)}</p>
            <p><strong>Maturity Stage:</strong> ${escapeHtml(result.maturityStage)}</p>
            <p><strong>Risk Level:</strong> ${escapeHtml(result.riskLevel)}</p>
            <p><strong>Estimated Time Saved:</strong> ${escapeHtml(result.estimatedImpact.timeSaved)}</p>
            <p><strong>Estimated Monthly Upside:</strong> ${escapeHtml(result.estimatedImpact.revenueUpside)}</p>
            <p style="line-height:1.7;color:#334155;">${escapeHtml(result.summary)}</p>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;margin-bottom:20px;">
            <h2 style="margin:0 0 16px;">Operational Findings</h2>
            <ul style="line-height:1.7;color:#334155;">${formatList(result.problems)}</ul>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;margin-bottom:20px;">
            <h2 style="margin:0 0 16px;">Recommended Opportunities</h2>
            ${result.opportunities
              .map(
                (item) => `
                <div style="margin:0 0 16px;padding:16px;border:1px solid #dbeafe;border-radius:12px;">
                  <h3 style="margin:0 0 8px;color:#0f172a;">${escapeHtml(item.title)}</h3>
                  <p style="margin:0 0 8px;color:#334155;line-height:1.6;">${escapeHtml(item.description)}</p>
                  <p style="margin:0;color:#475569;"><strong>Impact:</strong> ${escapeHtml(item.impact)} · <strong>Difficulty:</strong> ${escapeHtml(item.difficulty)}</p>
                </div>`
              )
              .join("")}
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;margin-bottom:20px;">
            <h2 style="margin:0 0 16px;">Roadmap</h2>
            ${result.roadmap
              .map(
                (item) => `
                <p style="line-height:1.7;color:#334155;"><strong>${escapeHtml(item.week)}:</strong> ${escapeHtml(item.task)}</p>`
              )
              .join("")}
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;">
            <h2 style="margin:0 0 16px;">Next Step</h2>
            <p style="line-height:1.7;color:#334155;">${escapeHtml(result.nextStep)}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function buildEmailText(payload: AuditPayload, result: AuditResult) {
  return `
New Nexum Strategy Diagnostic

Email: ${payload.email || "Not provided"}
Business type: ${payload.businessType || payload.business_model || "Not provided"}
Monthly revenue: ${payload.monthlyRevenue || payload.monthly_revenue || "Not provided"}
Average order value: ${payload.averageOrderValue || "Not provided"}
Monthly order volume: ${payload.monthlyOrderVolume || "Not provided"}
Team size: ${payload.teamSize || payload.team_size || "Not provided"}
Tools: ${normalizeArray(payload.tools).join(", ") || "Not provided"}
Marketing channels: ${normalizeArray(payload.marketingChannels).join(", ") || "Not provided"}
Main goal: ${payload.mainGoal || "Not provided"}
Growth constraint: ${payload.growthConstraint || "Not provided"}
Bottleneck: ${payload.biggestBottleneck || payload.biggest_problem || "Not provided"}
Manual workflow: ${payload.manualWorkflow || payload.manual_work || "Not provided"}
Weekly manual work: ${payload.weeklyManualWork || "Not provided"}
Support volume: ${payload.customerSupportVolume || "Not provided"}
Repeat purchase: ${payload.repeatPurchaseRate || "Not provided"}
Reporting: ${payload.reportingFrequency || "Not provided"}
Inventory complexity: ${payload.inventoryComplexity || "Not provided"}
Returns issue: ${payload.returnsIssue || "Not provided"}
Content workload: ${payload.contentProductionLoad || "Not provided"}
Ad testing: ${payload.adTestingProcess || "Not provided"}
Data confidence: ${payload.dataConfidence || payload.data_quality || "Not provided"}
Approval level: ${payload.approvalLevel || "Not provided"}
Urgency: ${payload.urgency || "Not provided"}

REPORT
AI Readiness Score: ${result.score}/100
Opportunity Score: ${result.opportunityScore}/100
Best First Automation: ${result.bestFirstAutomation}
Maturity Stage: ${result.maturityStage}
Risk Level: ${result.riskLevel}
Estimated Time Saved: ${result.estimatedImpact.timeSaved}
Estimated Monthly Upside: ${result.estimatedImpact.revenueUpside}

Summary:
${result.summary}

Operational Findings:
${result.problems.map((problem) => `- ${problem}`).join("\n")}

Recommended Opportunities:
${result.opportunities
  .map((item) => `- ${item.title}: ${item.description} Impact: ${item.impact}. Difficulty: ${item.difficulty}.`)
  .join("\n")}

Roadmap:
${result.roadmap.map((item) => `- ${item.week}: ${item.task}`).join("\n")}

Next Step:
${result.nextStep}
  `.trim()
}

async function sendAuditEmail(payload: AuditPayload, result: AuditResult) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing. Audit email was not sent.")
    return
  }

  const to = process.env.AUDIT_RECIPIENT_EMAIL || "mark1320198@gmail.com"
  const from = process.env.AUDIT_FROM_EMAIL || "Nexum Strategy <onboarding@resend.dev>"
  const leadEmail = payload.email ? ` from ${payload.email}` : ""
  const subject = `New Nexum Diagnostic${leadEmail}: ${result.bestFirstAutomation}`

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html: buildEmailHtml(payload, result),
        text: buildEmailText(payload, result),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Audit email failed:", errorText)
    }
  } catch (error) {
    console.error("Audit email request failed:", error)
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AuditPayload
    const fallbackAudit = buildFallbackAudit(payload)
    const finalAudit = await generateAiAudit(payload, fallbackAudit)

    await sendAuditEmail(payload, finalAudit)

    return NextResponse.json(finalAudit, { status: 200 })
  } catch (error) {
    console.error("Audit route failed:", error)

    const fallbackAudit = buildFallbackAudit({
      operations: "General ecommerce workflow automation",
    })

    return NextResponse.json(fallbackAudit, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. Use POST to generate an automation diagnostic.",
    },
    { status: 405 }
  )
}