import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/Logout";
import { motion } from "framer-motion";

function ComplaintsFeed() {
  const [complaints, setComplaints] = useState([]);
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setComplaints(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    await deleteDoc(doc(db, "complaints", id));
  };

  return (
    <div style={styles.page}>
      {/* BLURRED BACKGROUND */}
      <div style={styles.bgImage}></div>
      <div style={styles.overlay}></div>

      {/* THEME TOGGLE */}
      <button style={styles.toggle} onClick={() => setDark(!dark)}>
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <h2 style={styles.heading}>All Complaints</h2>
        <button style={styles.logoutBtn} onClick={() => logoutUser(navigate)}>
          Logout
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {complaints.length === 0 && (
          <p style={styles.empty}>No complaints yet.</p>
        )}

        {complaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ ...styles.card, background: theme.card, color: theme.text }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>

            {c.imageUrl && (
              <img src={c.imageUrl} alt="complaint" style={styles.image} />
            )}

            <div style={styles.footer}>
              <span
                style={{
                  ...styles.status,
                  background: statusColor[c.status] || "#6b7280"
                }}
              >
                {c.status}
              </span>

              <button
                onClick={() => handleDelete(c.id)}
                style={styles.deleteBtn}
              >
                🗑 Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* THEMES */
const darkTheme = {
  card: "rgba(15,32,39,0.95)",
  text: "white"
};
const lightTheme = {
  card: "rgba(255,255,255,0.95)",
  text: "#0f2027"
};

/* STATUS COLORS */
const statusColor = {
  Pending: "#f59e0b",
  "In Progress": "#3b82f6",
  Resolved: "#22c55e"
};

/* STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    position: "relative"
  },

  // 🚿 SANITATION / NIGHT WORKERS
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1581574200731-3f9b30d4e38a)", // water/sanitation workers
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(6px)",      // ✅ BLUR ONLY BACKGROUND
    transform: "scale(1.1)",  // avoid edge blur
    zIndex: 0
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(5,10,20,0.92), rgba(15,32,39,0.88))",
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
    zIndex: 3
  },

  topBar: {
    zIndex: 2,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  heading: {
    fontSize: "30px",
    background: "linear-gradient(135deg,#4f9cf9,#22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  list: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    margin: "0 auto"
  },

  card: {
    padding: "22px",
    borderRadius: "18px",
    marginBottom: "22px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)"
  },

  image: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px"
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  status: {
    padding: "6px 14px",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold"
  },

  deleteBtn: {
    padding: "8px 14px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  empty: {
    textAlign: "center",
    color: "white",
    opacity: 0.85
  }
};

export default ComplaintsFeed;
