import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/Logout";
import { motion } from "framer-motion";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  const theme = dark ? darkTheme : lightTheme;

  return (
    <div style={styles.page}>
      
      {/* BACKGROUND IMAGE – ROAD / CIVIC WORK */}
      <div style={styles.bgImage}></div>
      <div style={styles.overlay}></div>

      {/* THEME TOGGLE */}
      <button style={styles.toggle} onClick={() => setDark(!dark)}>
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <button onClick={() => logoutUser(navigate)} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ ...styles.content, background: theme.card, color: theme.text }}
      >
        <h1 style={styles.title}>Citizen Dashboard</h1>

        <p style={styles.subtitle}>
          Report civic issues and track road, water, and public works progress
        </p>

        <div style={styles.actions}>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={styles.primaryBtn}
            onClick={() => navigate("/add-complaint")}
          >
            ➕ Add New Complaint
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={styles.secondaryBtn}
            onClick={() => navigate("/complaints")}
          >
            📋 View All Complaints
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= THEMES ================= */

const darkTheme = {
  card: "rgba(15, 32, 39, 0.93)",
  text: "white"
};

const lightTheme = {
  card: "rgba(255,255,255,0.95)",
  text: "#0f2027"
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1590650153855-d9e808231d41)", // 👷 road construction
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(15,32,39,0.85), rgba(79,156,249,0.55))",
    zIndex: 1
  },

  toggle: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    padding: "10px 16px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    zIndex: 3,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  },

  topBar: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 3
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "linear-gradient(135deg,#dc2626,#ef4444)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 6px 14px rgba(0,0,0,0.3)"
  },

  content: {
    zIndex: 2,
    padding: "42px",
    borderRadius: "22px",
    width: "100%",
    maxWidth: "620px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    boxShadow: "0 35px 70px rgba(0,0,0,0.45)"
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
    background: "linear-gradient(135deg,#4f9cf9,#22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  subtitle: {
    opacity: 0.9,
    marginBottom: "34px"
  },

  actions: {
    display: "flex",
    gap: "22px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "15px 30px",
    background: "linear-gradient(135deg,#4f9cf9,#22c55e)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  },

  secondaryBtn: {
    padding: "15px 30px",
    background: "transparent",
    color: "#22c55e",
    border: "2px solid #22c55e",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Dashboard;
