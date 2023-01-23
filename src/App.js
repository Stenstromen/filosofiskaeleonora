import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import pusheen from "./img/pusheen.webp";
import Home from "./pages/Home";
import All from "./pages/All";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    return window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  useEffect(() => {
    return window.addEventListener("resize", () => {
      window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${pusheen})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "40% 75%" : null,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route path="/:id" element={<Home isMobile={isMobile} />} />
        <Route path="/all" element={<All isMobile={isMobile} />} />
      </Routes>
    </div>
  );
}

export default App;
