export function generateResults(data: any) {
  const { industry, revenue, team, bottleneck } = data

  let score = 50
  let opportunities: any[] = []
  let impact = {
    timeSaved: 0,
    revenueGain: 0,
  }

  // ===== SCORE LOGIC =====

  if (team === "Solo") score += 5
  if (team === "2–5 people") score += 10
  if (team === "6–20 people") score += 15
  if (team === "20+ people") score += 20

  if (revenue === "$50k–$200k") score += 15
  if (revenue === "$200k+") score += 20

  if (bottleneck === "Customer support") score += 10
  if (bottleneck === "Marketing") score += 10

  // ===== INDUSTRY MAPPING =====

  if (industry === "E-Commerce") {
    opportunities.push(
      {
        title: "AI Customer Support",
        description: "Automate support with AI chatbots (Gorgias / Zendesk)",
        impact: "Save 15–25 hours/week",
      },
      {
        title: "Email Automation",
        description: "Use AI segmentation for personalized campaigns",
        impact: "+10–25% revenue increase",
      },
      {
        title: "Order Automation",
        description: "Automate fulfillment workflows (Shopify Flow)",
        impact: "Reduce manual operations",
      }
    )

    impact.timeSaved = 40
    impact.revenueGain = 5000
  }

  if (industry === "SaaS / Technology") {
    opportunities.push(
      {
        title: "User Onboarding Automation",
        description: "AI-driven onboarding flows",
        impact: "Increase retention by 15%",
      },
      {
        title: "Churn Prediction",
        description: "AI identifies users likely to leave",
        impact: "Reduce churn by 10–20%",
      },
      {
        title: "CRM Automation",
        description: "Automate sales pipelines",
        impact: "Save 10–20 hours/week",
      }
    )

    impact.timeSaved = 30
    impact.revenueGain = 8000
  }

  // Default fallback
  if (opportunities.length === 0) {
    opportunities.push(
      {
        title: "Workflow Automation",
        description: "Automate repetitive tasks with Zapier",
        impact: "Save 10–20 hours/week",
      },
      {
        title: "AI Content Generation",
        description: "Automate content and marketing",
        impact: "Increase output by 3x",
      },
      {
        title: "Data Automation",
        description: "Automate reporting and analytics",
        impact: "Better decision making",
      }
    )
    if (opportunities.length === 0) {
  opportunities.push(
    {
      title: "Workflow Automation",
      description: "Automate repetitive tasks with Zapier or Make",
      impact: "Save 10–20 hours/week",
    },
    {
      title: "AI Content Generation",
      description: "Automate content, emails, and marketing workflows",
      impact: "Increase output by 2–3x",
    },
    {
      title: "Reporting Automation",
      description: "Automate dashboards and weekly business reports",
      impact: "Improve decision speed",
    }
  )

  impact.timeSaved = 20
  impact.revenueGain = 2000
}
  }

  return {
    score: Math.min(score, 100),
    opportunities,
    impact,
  }
}