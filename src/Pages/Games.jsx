import { Link } from "react-router-dom";

export default function Games() {
  return (
    <div style={styles.container}>
      <h2>🎮 Select a Game</h2>

      <div style={styles.grid}>
        <Link to="/snake" style={styles.card}>
          🐍 Snake
        </Link>

        {/* Future games */}
        <div style={styles.cardDisabled}>🚧 Coming Soon</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 20,
    background: "#020617",
    border: "1px solid rgba(0,255,255,0.2)",
    color: "#00fff7",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "none",
  },
  cardDisabled: {
    padding: 20,
    background: "#111",
    color: "#555",
    textAlign: "center",
  },
};