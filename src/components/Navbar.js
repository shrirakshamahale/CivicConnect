import { Link } from "react-router-dom";

const styles = {
  nav: {
    height: "70px",
    background: "linear-gradient(90deg, #0f2027, #203a43)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000

  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  }
};

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>CivicConnect</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
