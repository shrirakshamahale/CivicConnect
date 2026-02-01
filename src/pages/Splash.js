import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); // ✅ 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={styles.content}
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.logo}
        >
          CivicConnect
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={styles.tagline}
        >
          Connecting Citizens & Authorities Transparently
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={styles.loader}
        />
      </motion.div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1494526585095-c41746248156)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.65)"
  },

  content: {
    zIndex: 2,
    textAlign: "center",
    color: "white",
    padding: "40px",
    backdropFilter: "blur(6px)"
  },

  logo: {
    fontSize: "52px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "15px"
  },

  tagline: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "30px"
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    margin: "0 auto",
    animation: "spin 1s linear infinite"
  }
};

export default Splash;
