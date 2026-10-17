import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Sidebar from "./Components/Sidebar";

const Home = lazy(() => import("./Pages/Home"));
const Games = lazy(() => import("./Pages/Games"));
const SnakeGame = lazy(() => import("./games/SnakeGame"));

function App() {
  return (
    <BrowserRouter>
      <div style={styles.layout}>
        <Sidebar />

        <div style={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/snake" element={<SnakeGame />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

const styles = {
  layout: {
    display: "flex",
  },
  content: {
    flex: 1,
    background: "#000",
    minHeight: "100vh",
    color: "#fff",
  },
};