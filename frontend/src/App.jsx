import { React, useState, useEffect } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Link, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [searchType, setSearchType] = useState("location");

  const handleSearchSelect = (search) => {
    setSearchType(search);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/" className="navbar-brand ms-4 nav-link fs-4">
          Home
        </Link>
        <Link to="/search" className="navbar-brand ms-4 nav-link fs-4">
          Search
        </Link>
        <Link to="/login" className="navbar-brand ms-4 nav-link fs-4">
          Login
        </Link>
        <div
          className="dropdown"
          style={{
            display: useLocation().pathname === "/search" ? "block" : "none",
          }}
        >
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Search Type
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <button
                className="dropdown-item active"
                onClick={() => handleSearchSelect("location")}
              >
                Location Search
              </button>
            </li>
            <li>
              <button
                className="dropdown-item active"
                onClick={() => handleSearchSelect("user")}
              >
                User Search
              </button>
            </li>
            <li>
              <button
                className="dropdown-item active"
                onClick={() => handleSearchSelect("keyword")}
              >
                Keyword Search
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={
            <Search searchType={searchType} setSearchType={setSearchType} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
