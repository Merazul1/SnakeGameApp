import { useEffect, useState } from "react";
import {
  getInitialState,
  move,
  changeDirection,
  DIRECTIONS,
  GRID_SIZE,
} from "./snakeLogic";

const CELL = 20;

export default function SnakeGame() {
  const [state, setState] = useState(getInitialState());

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => move(prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Controls
  useEffect(() => {
    const handleKey = e => {
      const map = {
        ArrowUp: DIRECTIONS.UP,
        ArrowDown: DIRECTIONS.DOWN,
        ArrowLeft: DIRECTIONS.LEFT,
        ArrowRight: DIRECTIONS.RIGHT,
        w: DIRECTIONS.UP,
        s: DIRECTIONS.DOWN,
        a: DIRECTIONS.LEFT,
        d: DIRECTIONS.RIGHT,
      };

      if (map[e.key]) {
        setState(prev => ({
          ...prev,
          direction: changeDirection(prev.direction, map[e.key]),
        }));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const restart = () => setState(getInitialState());

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>⚡  SNAKE</h2>
          <span style={styles.score}>Score: {state.score}</span>
        </div>

        <div style={styles.boardWrapper}>
          <div
            style={{
              ...styles.board,
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL}px)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);

              const isSnake = state.snake.some(
                s => s.x === x && s.y === y
              );
              const isHead =
                state.snake[0].x === x && state.snake[0].y === y;
              const isFood =
                state.food.x === x && state.food.y === y;

              return (
                <div
                  key={i}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: isSnake
                      ? isHead
                        ? "#00fff7"
                        : "#00c3ff"
                      : isFood
                      ? "#ff00ff"
                      : "#020617",
                    boxShadow: isSnake
                      ? isHead
                        ? "0 0 12px #00fff7, 0 0 24px #00fff7"
                        : "0 0 8px #00c3ff"
                      : isFood
                      ? "0 0 12px #ff00ff, 0 0 24px #ff00ff"
                      : "inset 0 0 2px rgba(0,255,255,0.1)",
                    borderRadius: 3,
                  }}
                />
              );
            })}
          </div>

          {/* Overlay */}
          {state.gameOver && (
            <div style={styles.overlay}>
              <div style={styles.overlayBox}>
                <h3 style={{ color: "#ff00ff" }}>GAME OVER</h3>
                <p>Score: {state.score}</p>
                <button onClick={restart} style={styles.button}>
                  Restart
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={styles.help}>WASD / Arrow Keys</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #020617, #000000)",
    color: "#00fff7",
    fontFamily: "monospace",
  },

  card: {
    padding: 20,
    borderRadius: 12,
    border: "1px solid rgba(0,255,255,0.2)",
    boxShadow:
      "0 0 20px rgba(0,255,255,0.2), inset 0 0 20px rgba(0,255,255,0.05)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    margin: 0,
    color: "#00fff7",
    textShadow: "0 0 8px #00fff7",
  },

  score: {
    color: "#ff00ff",
    textShadow: "0 0 8px #ff00ff",
  },

  boardWrapper: {
    position: "relative",
  },

  board: {
    display: "grid",
    gap: 2,
    padding: 6,
    background: "#000",
    border: "1px solid rgba(0,255,255,0.2)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayBox: {
    padding: 20,
    border: "1px solid #ff00ff",
    boxShadow: "0 0 20px #ff00ff",
    textAlign: "center",
  },

  button: {
    marginTop: 10,
    padding: "8px 16px",
    background: "#00fff7",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 10px #00fff7",
  },

  help: {
    marginTop: 10,
    fontSize: 12,
    color: "#00c3ff",
    textAlign: "center",
  },
};