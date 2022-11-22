import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import pusheen from "./img/pusheen.webp";
import Home from "./pages/Home";
import All from "./pages/All";
import "./App.css";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${pusheen})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<All />} />
      </Routes>
    </div>
  );
}

export default App;
