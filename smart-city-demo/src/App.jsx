import ResourceOrderingGame from "./pages/ResourceOrderingGame";
import PickTheLargestGame from "./pages/PickTheLargestGame";
import OffsetMatchingGame from "./pages/OffsetMatching";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              homePage()
            }
          />
          <Route
            path="/resource-ordering-game"
            element={<ResourceOrderingGame />}
          />
          <Route
            path="/pick-the-largest-game"
            element={<PickTheLargestGame />}
          />
          <Route
            path="/offset-matching"
            element={<OffsetMatchingGame />}
          />
        </Routes>
      </HashRouter>
    </div>
  );

  function homePage() {
    return <Container>
      <a href="/Smart_City_Demo/#resource-ordering-game">
        {" "}
        Resource Ordering Game <br />
        {" "}
      </a>
      <a href="/Smart_City_Demo/#pick-the-largest-game">
        {" "}
        Pick The Largest Game{" "}
      </a>
      <br />
      <a href="/Smart_City_Demo/#offset-matching">
        {" "}
        Offset Matching Game{" "}
      </a>
    </Container>;
  }
}

export default App;
