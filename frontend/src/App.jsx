import { React, useState, useEffect } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [searchType, setSearchType] = useState(true);
  const [stateLocation, setLocation] = useState(location.path);
  console.error("stateLocation is: ", stateLocation);

  useEffect(() => {
    setLocation(location.path);
  }, location.path);
  console.error("stateLocation is: ", stateLocation);
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
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          style={{
            display: stateLocation === "/search" ? "block" : "none",
          }}
          onClick={() => {
            setSearchType(!searchType);
          }}
        >
          {searchType ? "Search by User" : "Search by location"}
        </button>
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
