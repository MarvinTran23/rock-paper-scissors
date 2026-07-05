import { NavLink, Route, Routes } from "react-router-dom";
import Play from "./pages/Play";
import Highscore from "./pages/Highscore";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <nav className="flex justify-center gap-10 p-4 border-b">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Play
        </NavLink>

        <NavLink
          to="/highscore"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Highscore
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Play />} />
        <Route path="/highscore" element={<Highscore />} />
      </Routes>

    </div>
  );
}

export default App;