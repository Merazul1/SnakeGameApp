import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>🎮 Game Hub</h3>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/games" style={styles.link}>Games</Link>
        <Link to="/snake" style={styles.link}>Snake</Link>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 200,
    height: "100vh",
    background: "#020617",
    color: "#00fff7",
    padding: 20,
    borderRight: "1px solid rgba(0,255,255,0.2)",
  },
  logo: {
    marginBottom: 20,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  link: {
    color: "#00fff7",
    textDecoration: "none",
  },
};