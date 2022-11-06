import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import MainApp from "./MainApp";
import Board from "./Games/Tetris/Board";
import Snake from "./Games/Snake/components/Snake";
import FlappyBird from "./Games/FlappyBird/Game";
import LyricsGame from "./Games/LyricGame/LyricsGame";

import "./tetris.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/dashboard" element={<Dashboard code={code} />} />
        <Route
          path="/tetris"
          element={
            <div className="t-parent">
              <Board />
            </div>
          }
        />
        <Route
          path="/snake"
          element={
            <div className="t-parent">
              <Snake
                color1="#434fd8"
                color2="#ff6d6d"
                backgroundColor="#ebebeb"
              />
            </div>
          }
        />
        <Route
          path="/flappyBird"
          element={
            <div className="t-parent">
              <FlappyBird />
            </div>
          }
        />
        <Route
          path="/lyricGame"
          element={
            <div className="t-parent">
              <LyricsGame />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
