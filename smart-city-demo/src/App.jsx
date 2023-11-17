import ResourceOrderingGame from "./pages/ResourceOrderingGame";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Smart_City_Demo"
          element={
            <a href="/Smart_City_Demo/resource-ordering-game">
              {" "}
              ResourceOrderingGame{" "}
            </a>
          }
        />
        <Route
          path="/Smart_City_Demo/resource-ordering-game"
          element={<ResourceOrderingGame />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
