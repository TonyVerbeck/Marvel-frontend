import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./pages/Characters";
import CharacterId from "./pages/CharacterId";
import Comics from "./pages/Comics";
import ComicId from "./pages/ComicId";
import Home from "./pages/Home";
// import Post from "./components/Posts";
// import Pagination from "./components/Pagination";
// import Cookies from "js-cookie";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  // const [token, setToken] = useState(Cookies.get("tokenMarvel") || null);

  // const handleToken = (token) => {
  //   if (token) {
  //     Cookies.set("tokenMarvel", token, { expires: 30 });
  //     setToken(token);
  //   } else {
  //     Cookies.remove("tokenMarvel");
  //     setToken(null);
  //   }

  return (
    <>
      <Router>
        <Header

        // token={token}
        // handleToken={handleToken}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={<Characters search={search} setSearch={setSearch} />}
          />
          <Route path="/comics/:characterId" element={<CharacterId />} />
          <Route
            path="/comics"
            element={<Comics search={search} setSearch={setSearch} />}
          />
          <Route path="/comic/:comicId" element={<ComicId />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
