"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

type AnswerValue = string | string[]
const questions = [
  // 1. BUSINESS TYPE (FIRST)
  {
    key: "business_model",
    question: "What type of ecommerce/ marketing business do you run?",
    multiple: false,
    options: [
      "Single-brand online store",
      "Multi-brand retailer",
      "Dropshipping store",
      "Subscription ecommerce",
      "Digital products",
      "Local business selling online",
      "Marketplace seller",
      "Other",
    ],
  },

  // 2. REVENUE
  {
    key: "monthly_revenue",
    question: "What is your approximate monthly online revenue?",
    multiple: false,
    options: [
      "$0 - $5k",
      "$5k - $25k",
      "$25k - $100k",
      "$100k - $500k",
      "$500k+",
      "Prefer not to say",
    ],
  },

  // 3. GOAL
  {
    key: "main_goal",
    question: "What is your main growth goal right now?",
    multiple: false,
    options: [
      "Get more traffic",
      "Increase conversion rate",
      "Improve paid ads performance",
      "Recover abandoned carts",
      "Increase repeat purchases",
      "Improve email/SMS marketing",
      "Reduce manual work",
      "Understand customers better",
    ],
  },

  // 4. CHANNELS
  {
    key: "marketing_channels",
    question: "Which marketing channels do you currently use?",
    multiple: true,
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
  },

  // 5. TOOLS
  {
    key: "tools",
    question: "Which tools are already part of your stack?",
    multiple: true,
    options: [
      "Shopify",
      "WooCommerce",
      "Klaviyo",
      "Mailchimp",
      "HubSpot",
      "Google Analytics",
      "Meta Pixel",
      "TikTok Pixel",
      "Zapier",
      "Not sure",
    ],
  },

  // 6. PROBLEM
  {
    key: "biggest_problem",
    question: "Where is your business leaking the most money?",
    multiple: false,
    options: [
      "Low website conversion",
      "Expensive ad costs",
      "Weak email follow-up",
      "Poor customer retention",
      "Slow customer support",
      "Bad product pages",
      "No clear data tracking",
      "I do not know",
    ],
  },

  // 7. AI INTEREST
  {
    key: "automation_interest",
    question: "What would you most like AI to automate first?",
    multiple: false,
    options: [
      "Ad copy and creative testing",
      "Email/SMS campaigns",
      "Customer support replies",
      "Product descriptions",
      "Lead generation",
      "Customer segmentation",
      "Sales reporting",
      "Personalized recommendations",
    ],
  },

  // 8. DATA
  {
    key: "data_quality",
    question: "How confident are you in your current marketing data?",
    multiple: false,
    options: [
      "Very confident",
      "Somewhat confident",
      "Not confident",
      "We barely track anything",
      "I am not sure",
    ],
  },

  // 9. URGENCY
  {
    key: "urgency",
    question: "How soon do you want to improve this?",
    multiple: false,
    options: [
      "Immediately",
      "Within 30 days",
      "Within 90 days",
      "This year",
      "Just exploring",
    ],
  },
]

export default function ScanPage() {
  const params = useSearchParams()
  const industry = params.get("industry") || "E-Commerce"
  params.get("industry") ||
  
  "Ecommerce / Marketing"

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})

  const current = questions[step]
  const currentAnswer = answers[current.key]

  function isSelected(option: string) {
    if (current.multiple) {
      return Array.isArray(currentAnswer) && currentAnswer.includes(option)
    }

    return currentAnswer === option
  }

  function hasAnswer() {
    if (!currentAnswer) return false
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0
    return Boolean(currentAnswer)
  }

  function selectAnswer(option: string) {
    if (current.multiple) {
      const previous = Array.isArray(currentAnswer) ? currentAnswer : []

      setAnswers({
        ...answers,
        [current.key]: previous.includes(option)
          ? previous.filter((item) => item !== option)
          : [...previous, option],
      })

      return
    }

    setAnswers({
      ...answers,
      [current.key]: option,
    })
  }

  function buildResultsQuery() {
    const query = new URLSearchParams()
    query.set("industry", industry)

    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query.set(key, value.join(","))
      } else {
        query.set(key, value)
      }
    })

    return query.toString()
  }

  function nextQuestion() {
    if (!hasAnswer()) {
      alert("Please select at least one answer first.")
      return
    }

    if (step === questions.length - 1) {
      window.location.href = `/results?${buildResultsQuery()}`
      return
    }

    setStep(step + 1)
  }

  function backQuestion() {
    if (step === 0) {
      window.location.href = "/"
      return
    }

    setStep(step - 1)
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <h1 style={styles.logo}>AI Business Audit</h1>
          <span style={styles.industry}>{industry}</span>
        </div>

        <p style={styles.progress}>
         Question {step + 2} of {questions.length + 1}
        </p>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((step + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <section style={styles.card}>
          <p style={styles.label}>
            {current.multiple ? "Select all that apply" : "Select one answer"}
          </p>

          <h2 style={styles.question}>{current.question}</h2>

          <div style={styles.grid}>
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => selectAnswer(option)}
                style={{
                  ...styles.option,
                  ...(isSelected(option) ? styles.selectedOption : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={styles.actions}>
            <button style={styles.backButton} onClick={backQuestion}>
              ← Back
            </button>

            <button
              style={{
                ...styles.nextButton,
                opacity: hasAnswer() ? 1 : 0.5,
              }}
              onClick={nextQuestion}
            >
              {step === questions.length - 1
                ? "Generate Audit →"
                : "Next Question →"}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(0,140,255,0.18), transparent 45%), linear-gradient(180deg, #061528, #020b1c)",
    color: "white",
    padding: "70px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "950px",
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  logo: {
    fontSize: "22px",
    margin: 0,
  },
  industry: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "14px",
  },
  progress: {
    textAlign: "center" as const,
    color: "rgba(255,255,255,0.65)",
    marginBottom: "14px",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "34px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(135deg, #0ea5ff, #2563eb)",
    transition: "width 0.3s ease",
  },
  card: {
    background: "rgba(7, 20, 42, 0.85)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "18px",
    padding: "36px",
    boxShadow: "0 0 45px rgba(0,0,0,0.35)",
  },
  label: {
    color: "#0ea5ff",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  },
  question: {
    fontSize: "32px",
    marginBottom: "30px",
    lineHeight: "1.2",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "18px",
  },
  option: {
    padding: "22px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "left" as const,
  },
  selectedOption: {
    border: "2px solid #0ea5ff",
    background: "rgba(14,165,255,0.16)",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "34px",
    gap: "16px",
  },
  backButton: {
    padding: "16px 26px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  nextButton: {
    padding: "16px 34px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #0ea5ff, #2563eb)",
    color: "white",
    fontSize: "18px",
    fontWeight: "800",
    cursor: "pointer",
  },
}