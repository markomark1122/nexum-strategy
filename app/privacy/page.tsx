export default function PrivacyPage() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1>Privacy Policy</h1>

        <p>
          We respect your privacy. This policy explains how your data is handled.
        </p>

        <h2>1. Information Collected</h2>
        <p>
          We may collect responses you provide in the questionnaire and basic usage data.
        </p>

        <h2>2. How We Use Data</h2>
        <p>
          Data is used to generate your AI audit and improve the service.
        </p>

        <h2>3. Data Sharing</h2>
        <p>
          We do not sell your personal data. Some data may be processed through third-party AI providers.
        </p>

        <h2>4. Security</h2>
        <p>
          We take reasonable measures to protect your information but cannot guarantee absolute security.
        </p>

        <h2>5. Contact</h2>
        <p>
          If you have questions, contact us at: your@email.com
        </p>
      </div>
    </main>
  )
}

const styles = {
  main: { padding: "40px", color: "white", background: "#020b1c", minHeight: "100vh" },
  container: { maxWidth: "800px", margin: "0 auto" },
}