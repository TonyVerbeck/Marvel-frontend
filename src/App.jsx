import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./pages/Characters";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters search={search} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
