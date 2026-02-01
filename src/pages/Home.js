import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <div style={{ ...styles.page, background: theme.bg, color: theme.text }}>
      
      {/* DARK / LIGHT TOGGLE – BOTTOM LEFT */}
      <button
        style={{
          ...styles.toggle,
          left: "20px",
          bottom: "20px",
          top: "auto",
          right: "auto"
        }}
        onClick={() => setDark(!dark)}
      >
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* HERO SECTION */}
      <section style={{ ...styles.hero, background: theme.heroBg }}>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heroText}
        >
          <h1 style={styles.heroTitle}>
            Report Problems. <br /> Get Real Solutions.
          </h1>
          <p style={styles.heroSubtitle}>
            A transparent civic engagement platform connecting citizens and authorities.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={styles.heroButton}
            onClick={() => navigate("/login")}
          >
            Get Started →
          </motion.button>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="People working together"
          style={styles.heroImage}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why CivicConnect?</h2>

        <div style={styles.grid}>
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ ...styles.card, background: theme.card }}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...styles.section, background: theme.altBg }}>
        <h2 style={styles.sectionTitle}>How It Works</h2>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            style={{ ...styles.step, background: theme.card }}
          >
            <span style={styles.stepNumber}>{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ ...styles.footer, background: theme.heroBg }}>
        © 2026 CivicConnect • Final Year Project
      </footer>
    </div>
  );
}

/* ================= DATA ================= */

const features = [
  { title: "📢 Raise Complaints", desc: "Citizens report real civic issues with proof." },
  { title: "📊 Track Progress", desc: "Live status updates and transparency." },
  { title: "✅ Verified Resolution", desc: "Authorities close issues with evidence." }
];

const steps = [
  { title: "Raise an Issue", desc: "Submit local problems via the platform." },
  { title: "Authority Review", desc: "Verified and assigned to departments." },
  { title: "Status Updates", desc: "Pending → In Progress → Resolved." },
  { title: "Proof Upload", desc: "Resolution proof ensures accountability." },
  { title: "Community Interaction", desc: "Citizens track and engage in real time." }
];

/* ================= THEMES ================= */

const darkTheme = {
  bg: "#0b1c24",
  heroBg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  altBg: "#0f2027",
  card: "#142e38",
  text: "white"
};

const lightTheme = {
  bg: "#f4f7fb",
  heroBg: "linear-gradient(135deg,#667eea,#764ba2)",
  altBg: "#e9eef6",
  card: "#ffffff",
  text: "#0f2027"
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif"
  },

  toggle: {
    position: "fixed",
    padding: "10px 16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
    zIndex: 1000
  },

  hero: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    padding: "80px 20px",
    alignItems: "center",
    justifyContent: "center"
  },

  heroText: {
    maxWidth: "520px"
  },

  heroTitle: {
    fontSize: "42px",
    lineHeight: 1.2
  },

  heroSubtitle: {
    margin: "20px 0",
    fontSize: "18px",
    opacity: 0.9
  },

  heroButton: {
    padding: "14px 30px",
    borderRadius: "30px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer"
  },

  heroImage: {
    width: "320px",
    maxWidth: "90%",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
  },

  section: {
    padding: "70px 20px",
    maxWidth: "1100px",
    margin: "0 auto"
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "30px",
    marginBottom: "40px"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px"
  },

  card: {
    width: "260px",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
    textAlign: "center"
  },

  step: {
    display: "flex",
    gap: "20px",
    padding: "25px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)"
  },

  stepNumber: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#4f9cf9",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  footer: {
    padding: "20px",
    textAlign: "center",
    fontSize: "14px"
  }
};

export default Home;
