"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [businessType, setBusinessType] = useState("E-Commerce")
  const [operations, setOperations] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          businessType,
          operations,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Audit API failed:", data)
        throw new Error(data?.error || "Audit failed")
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("auditResult", JSON.stringify(data))
      }

      router.push("/results")
    } catch (err) {
      console.error("Submit error:", err)
      setError("Failed to perform audit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="icon">✦</div>

        <h1>AI Compatibility Audit</h1>
        <p className="subtitle">Tell us about your business to get started</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Email Address
            <input
              type="email"
              value={email}
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Business Type
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option>E-Commerce</option>
              <option>Marketing Agency</option>
              <option>SaaS / Software</option>
              <option>Local Service Business</option>
              <option>Consulting / Professional Services</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Describe Your Business Operations
            <textarea
              value={operations}
              placeholder="Example: We run ads, send email campaigns, create reports, handle support, and follow up with leads manually."
              onChange={(e) => setOperations(e.target.value)}
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Generating Audit..." : "Generate My AI Audit →"}
          </button>
        </form>
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
          padding: 40px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: min(720px, 100%);
          background: rgba(7, 20, 42, 0.9);
          border: 1px solid rgba(125,211,252,0.2);
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 0 60px rgba(0,0,0,0.45);
        }

        .icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(14,165,255,0.14);
          border: 1px solid rgba(125,211,252,0.25);
          display: grid;
          place-items: center;
          color: #38bdf8;
          font-size: 30px;
          margin-bottom: 20px;
        }

        h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 52px);
          line-height: 1;
          background: linear-gradient(135deg, #fff, #7dd3fc, #0ea5ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          margin: 14px 0 34px;
          color: rgba(255,255,255,0.7);
          font-size: 18px;
        }

        .form {
          display: grid;
          gap: 24px;
        }

        label {
          display: grid;
          gap: 10px;
          font-weight: 800;
          color: white;
        }

        input,
        select,
        textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: white;
          border-radius: 14px;
          padding: 16px 18px;
          font-size: 16px;
          outline: none;
        }

        textarea {
          min-height: 140px;
          resize: vertical;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: rgba(56,189,248,0.75);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.12);
        }

        option {
          color: black;
        }

        .error {
          color: #f87171;
          font-weight: 800;
          margin: 0;
        }

        button {
          border: none;
          border-radius: 999px;
          padding: 18px 28px;
          background: linear-gradient(135deg, #0ea5ff, #2563eb);
          color: white;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 0 32px rgba(14,165,255,0.42);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  )
}