import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/" className="navbar-brand ms-4 nav-link fs-4">
          Home
        </Link>
        <Link to="/search" className="navbar-brand ms-4 nav-link fs-4">
          Search
        </Link>
        <Link to="/" className="navbar-brand ms-4 nav-link fs-4">
          Login
        </Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
