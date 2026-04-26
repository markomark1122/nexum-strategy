export default function TermsPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1>Terms of Service</h1>

        <p>
          By using this website and AI Business Audit tool, you agree to the following terms.
        </p>

        <h2>1. No Professional Advice</h2>
        <p>
          The audit results generated are for informational purposes only and do not
          constitute legal, financial, or business advice.
        </p>

        <h2>2. Use at Your Own Risk</h2>
        <p>
          You are responsible for any decisions made based on the output of this tool.
        </p>

        <h2>3. Accuracy</h2>
        <p>
          We do not guarantee the accuracy, completeness, or reliability of AI-generated insights.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, design, and software belong to this platform and may not be copied or redistributed.
        </p>

        <h2>5. Changes</h2>
        <p>
          We may update these terms at any time without prior notice.
        </p>
      </div>
    </main>
  )
}

const styles = {
  main: { padding: "40px", color: "white", background: "#020b1c", minHeight: "100vh" },
  container: { maxWidth: "800px", margin: "0 auto" },
}