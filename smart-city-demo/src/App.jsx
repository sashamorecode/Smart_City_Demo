import ResourceOrderingGame from "./pages/ResourceOrderingGame";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <a href="/Smart_City_Demo/#resource-ordering-game">
              {" "}
              ResourceOrderingGame{" "}
            </a>
          }
        />
        <Route
          path="/resource-ordering-game"
          element={<ResourceOrderingGame />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
