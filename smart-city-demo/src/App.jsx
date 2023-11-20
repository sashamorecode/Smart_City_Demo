import ResourceOrderingGame from "./pages/ResourceOrderingGame";
import PickTheLargestGame from "./pages/PickTheLargestGame";
import OffsetMatchingGame from "./pages/OffsetMatching";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div style={{
        backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Aachen_Germany_Imperial-Cathedral-01.jpg/1280px-Aachen_Germany_Imperial-Cathedral-01.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        paddingBottom: "10rem",
        paddingTop: "5rem",
        paddingLeft: "15rem",
        paddingRight: "20rem",
        overflow: "hidden",
      }}>
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
