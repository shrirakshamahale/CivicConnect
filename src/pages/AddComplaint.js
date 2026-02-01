import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { motion } from "framer-motion";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  marginBottom: "12px"
};

function AddComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDiNwJjuxv8YSTehAVx7H3ma-nY1CybqUs"
  });

  // 📍 GET LIVE LOCATION
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => alert("Location permission denied")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !location) {
      setMsg("❌ Fill all fields, image & location");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "civicconnect");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw10o9ta2/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();

      await addDoc(collection(db, "complaints"), {
        title,
        description,
        imageUrl: data.secure_url,
        location,
        status: "pending",
        userId: auth.currentUser.uid,
        createdAt: Timestamp.now()
      });

      setMsg("✅ Complaint submitted!");
      setTimeout(() => navigate("/complaints"), 1200);
    } catch (err) {
      console.error(err);
      setMsg("❌ Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* BACKGROUND */}
      <div style={styles.bg}></div>
      <div style={styles.overlay}></div>

      {/* FORM CARD */}
      <motion.form
        style={styles.card}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.heading}>➕ Add New Complaint</h2>

        <input
          placeholder="Complaint title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />

        <button type="button" onClick={getLocation} style={styles.locBtn}>
          📍 Use My Location
        </button>

        {/* MAP PREVIEW */}
        {isLoaded && location && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={16}
          >
            <Marker position={location} />
          </GoogleMap>
        )}

        <button disabled={loading} style={styles.button}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {msg && <p style={styles.msg}>{msg}</p>}
      </motion.form>
    </div>
  );
}

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

  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1581574200731-3f9b30d4e38a)", // people working
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

  card: {
    position: "relative",
    zIndex: 2,
    width: "420px",
    maxWidth: "100%",
    padding: "28px",
    background: "rgba(15,32,39,0.95)",
    color: "white",
    borderRadius: "18px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)"
  },

  heading: {
    marginBottom: "16px",
    textAlign: "center",
    fontSize: "24px"
  },

  input: {
    width: "100%",
    padding: "11px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  textarea: {
    width: "100%",
    padding: "11px",
    height: "90px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  locBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    background: "rgba(59,130,246,0.15)",
    border: "1px solid #3b82f6",
    color: "#3b82f6",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg,#4f9cf9,#22c55e)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    fontWeight: "bold"
  },

  msg: {
    marginTop: "12px",
    textAlign: "center",
    fontWeight: "bold"
  }
};

export default AddComplaint;
