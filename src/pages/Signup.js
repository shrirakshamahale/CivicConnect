import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Authority fields
  const [authorityId, setAuthorityId] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [proofFile, setProofFile] = useState(null);

  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      localStorage.setItem("role", role);

      if (role === "authority") {
        const authorityData = {
          authorityId,
          department,
          city,
          proofFileName: proofFile?.name || null
        };

        localStorage.setItem("authorityData", JSON.stringify(authorityData));
        localStorage.setItem("authorityStatus", "pending");
      }

      setMsg("✅ Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg("❌ " + err.message);
    }
  };

  const theme = darkMode ? dark : light;

  return (
    <div style={{ ...styles.page, ...theme.page }}>
      {/* Theme Toggle */}
      <button
        style={{ ...styles.toggle, ...theme.toggle }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌞 Light" : "🌙 Dark"}
      </button>

      <div style={{ ...styles.card, ...theme.card }}>
        <h2 style={{ ...styles.title, ...theme.text }}>
          Create your account
        </h2>

        <p style={{ ...styles.subtitle, ...theme.subText }}>
          Be a part of transparent civic engagement
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ ...styles.input, ...theme.input }}
        >
          <option value="citizen">Citizen</option>
          <option value="authority">Authority</option>
        </select>

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, ...theme.input }}
        />

        <input
          type="password"
          placeholder="Create password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, ...theme.input }}
        />

        {role === "authority" && (
          <div style={{ ...styles.authorityBox, ...theme.box }}>
            <h4 style={{ ...styles.sectionTitle, ...theme.text }}>
              Authority Details
            </h4>

            <input
              placeholder="Authority ID"
              onChange={(e) => setAuthorityId(e.target.value)}
              style={{ ...styles.input, ...theme.input }}
            />

            <input
              placeholder="Department Name"
              onChange={(e) => setDepartment(e.target.value)}
              style={{ ...styles.input, ...theme.input }}
            />

            <input
              placeholder="City / Jurisdiction"
              onChange={(e) => setCity(e.target.value)}
              style={{ ...styles.input, ...theme.input }}
            />

            <input
              type="file"
              onChange={(e) => setProofFile(e.target.files[0])}
              style={styles.fileInput}
            />

            <p style={styles.note}>
              ⚠️ Authority accounts are reviewed before activation
            </p>
          </div>
        )}

        <button
          onClick={handleSignup}
          style={{ ...styles.button, ...theme.button }}
        >
          Create Account
        </button>

        {msg && (
          <p style={{ ...styles.msg, ...theme.text }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

/* =================== BASE STYLES =================== */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    position: "relative"
  },

  toggle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px"
  },

  card: {
    width: "420px",
    padding: "36px",
    borderRadius: "20px",
    boxShadow: "0 30px 70px rgba(0,0,0,0.35)"
  },

  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "6px"
  },

  subtitle: {
    textAlign: "center",
    fontSize: "15px",
    marginBottom: "26px"
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none"
  },

  fileInput: {
    marginBottom: "10px"
  },

  authorityBox: {
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "18px"
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },

  note: {
    fontSize: "12px",
    color: "#f59e0b"
  },

  msg: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500"
  }
};

/* =================== LIGHT THEME =================== */

const light = {
  page: {
    background: "linear-gradient(135deg, #e0e7ff, #fdf2f8)"
  },
  card: {
    background: "white"
  },
  input: {
    border: "1px solid #ddd",
    background: "#fafafa",
    color: "#000"
  },
  text: {
    color: "#0f172a"
  },
  subText: {
    color: "#555"
  },
  box: {
    background: "#f8fafc",
    border: "1px solid #e5e7eb"
  },
  button: {
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "white"
  },
  toggle: {
    background: "white",
    color: "#000"
  }
};

/* =================== DARK THEME =================== */

const dark = {
  page: {
    background: "linear-gradient(135deg, #020617, #0f172a)"
  },
  card: {
    background: "#020617"
  },
  input: {
    border: "1px solid #334155",
    background: "#020617",
    color: "white"
  },
  text: {
    color: "white"
  },
  subText: {
    color: "#cbd5f5"
  },
  box: {
    background: "#020617",
    border: "1px solid #334155"
  },
  button: {
    background: "linear-gradient(90deg,#22d3ee,#38bdf8)",
    color: "#020617"
  },
  toggle: {
    background: "#020617",
    color: "white"
  }
};

export default Signup;
