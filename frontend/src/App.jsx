import { React, useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";
import LoginButton from "./components/LoginButton";
import SearchSelect from "./components/SearchSelect";
import SignUp from "./components/Signup";
import MySings from "./components/MySings";
import Settings from "./components/Settings"
import UpdateSing from "./components/UpdateSing";

function App() {
  const [searchType, setSearchType] = useState("location");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/" className="navbar-brand ms-4 nav-link fs-4">
          Home
        </Link>
        <Link to="/search" className="navbar-brand ms-4 nav-link fs-4">
          Search
        </Link>
        <SearchSelect search={searchType} setSearchType={setSearchType} />
        <LoginButton />
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/MySings" element={<MySings />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/UpdateSing/:id" element={<UpdateSing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
