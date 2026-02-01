import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [dark, setDark] = useState(true);

  const theme = dark ? darkTheme : lightTheme;

  // 🔐 EMAIL LOGIN
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const role = localStorage.getItem("role");
      localStorage.setItem("isLoggedIn", "true");

      role === "authority" ? navigate("/authority") : navigate("/dashboard");
    } catch (error) {
      setMsg("❌ Invalid email or password");
    }
  };

  // 🔵 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "citizen");

      navigate("/dashboard");
    } catch (error) {
      setMsg("❌ Google login failed");
    }
  };

  return (
    <div style={{ ...styles.page, background: theme.bg }}>
      
      {/* THEME TOGGLE – BOTTOM LEFT */}
      <button
        style={{ ...styles.toggle }}
        onClick={() => setDark(!dark)}
      >
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* OVERLAY */}
      <div style={styles.overlay}></div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ ...styles.card, background: theme.card, color: theme.text }}
      >
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to CivicConnect</p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </motion.button>

        <p style={styles.or}>OR</p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          style={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={{ width: "18px" }}
          />
          Continue with Google
        </motion.button>

        {msg && <p style={styles.error}>{msg}</p>}

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}

/* ================= THEMES ================= */

const darkTheme = {
  bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  card: "rgba(20,46,56,0.9)",
  text: "white"
};

const lightTheme = {
  bg: "linear-gradient(135deg,#667eea,#764ba2)",
  card: "white",
  text: "#0f2027"
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "20px"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)"
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
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
    zIndex: 10
  },

  card: {
    width: "360px",
    maxWidth: "100%",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
    zIndex: 2,
    backdropFilter: "blur(10px)"
  },

  title: {
    textAlign: "center",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: "22px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4f9cf9",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  or: {
    textAlign: "center",
    margin: "16px 0",
    opacity: 0.7
  },

  googleBtn: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    background: "white"
  },

  error: {
    color: "tomato",
    textAlign: "center",
    marginTop: "10px"
  },

  footer: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "14px"
  },

  link: {
    color: "#4f9cf9",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Login;
