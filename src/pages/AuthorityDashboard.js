import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/Logout";
import { motion } from "framer-motion";

function AuthorityDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComplaints(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "complaints", id), {
      status: newStatus,
      updatedAt: Timestamp.now()
    });
  };

  const uploadProgressImage = async (id, file) => {
    if (!file) return;
    try {
      setUploadingId(id);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "civicconnect");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw10o9ta2/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();

      await updateDoc(doc(db, "complaints", id), {
        progressImageUrl: data.secure_url,
        status: "resolved",
        authorityName: "Municipal Authority",
        updatedAt: Timestamp.now()
      });

      alert("✅ Work completed & proof uploaded");
    } catch {
      alert("Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    await deleteDoc(doc(db, "complaints", id));
  };

  return (
    <div style={styles.page}>
      {/* BACKGROUND */}
      <div style={styles.bg}></div>
      <div style={styles.overlay}></div>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <h2 style={styles.heading}>🏛 Authority Dashboard</h2>
        <button onClick={() => logoutUser(navigate)} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* COMPLAINTS */}
      <div style={styles.list}>
        {complaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={styles.card}
          >
            <h3 style={styles.title}>{c.title}</h3>
            <p style={styles.desc}>{c.description}</p>

            {c.imageUrl && (
              <>
                <p style={styles.label}>Before</p>
                <img src={c.imageUrl} alt="" style={styles.image} />
              </>
            )}

            {c.progressImageUrl && (
              <>
                <p style={styles.label}>After</p>
                <img src={c.progressImageUrl} alt="" style={styles.image} />
              </>
            )}

            <div style={styles.row}>
              <span
                style={{
                  ...styles.status,
                  background: statusColor[c.status] || "#6b7280"
                }}
              >
                {c.status}
              </span>

              <select
                value={c.status}
                onChange={(e) => updateStatus(c.id, e.target.value)}
                style={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadProgressImage(c.id, e.target.files[0])}
              style={styles.file}
            />

            {uploadingId === c.id && (
              <p style={styles.uploading}>Uploading proof…</p>
            )}

            {c.location && (
              <a
                href={`https://www.google.com/maps?q=${c.location.lat},${c.location.lng}`}
                target="_blank"
                rel="noreferrer"
                style={styles.map}
              >
                📍 View Location
              </a>
            )}

            {/* 🔴 DELETE – LEFT SIDE */}
            <div style={styles.bottomRow}>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteComplaint(c.id)}
              >
                🗑 Delete Complaint
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ===== COLORS ===== */
const statusColor = {
  pending: "#f59e0b",
  "in-progress": "#3b82f6",
  resolved: "#22c55e"
};

/* ===== STYLES ===== */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    position: "relative"
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1581574200731-3f9b30d4e38a)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(6px)",
    transform: "scale(1.1)"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(10,20,30,0.9)"
  },

  topBar: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  heading: {
    fontSize: "32px",
    color: "white"
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  list: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1000px",
    margin: "0 auto"
  },

  card: {
    background: "rgba(15,32,39,0.95)",
    color: "white",
    padding: "26px",
    borderRadius: "18px",
    marginBottom: "26px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.45)"
  },

  title: { fontSize: "22px", marginBottom: "6px" },
  desc: { opacity: 0.9, marginBottom: "12px" },
  label: { fontWeight: "bold", marginTop: "10px" },

  image: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "6px"
  },

  row: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "14px"
  },

  bottomRow: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-start"   // ✅ LEFT ALIGN
  },

  status: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "bold"
  },

  select: {
    padding: "8px",
    borderRadius: "6px"
  },

  file: { marginTop: "14px" },

  uploading: { marginTop: "6px", color: "#fbbf24" },

  map: {
    display: "inline-block",
    marginTop: "10px",
    color: "#60a5fa",
    fontWeight: "bold",
    textDecoration: "none"
  },

  deleteBtn: {
    padding: "10px 16px",
    background: "#ef4444",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default AuthorityDashboard;
