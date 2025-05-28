import { React, useState, useEffect, useContext } from "react";
import Home from "./components/generic/Home";
import Search from "./components/search/Search";
import Login from "./components/generic/Login";
import NotFound from "./components/generic/NotFound";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthContext } from "./provider/AuthProvider";
import LoginButton from "./buttons/LoginButton";
import SearchSelect from "./buttons/SearchSelect";
import SignUp from "./components/generic/Signup";
import MySings from "./components/userPages/MySings";
import Settings from "./components/userPages/Settings";
import UpdateSing from "./components/userPages/UpdateSing";
import EditSelect from "./buttons/EditSelect";
import CreateSing from "./components/userPages/CreateSing";

function App() {
  const [searchType, setSearchType] = useState("location");
  const [editType, setEditType] = useState("created");

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
        <EditSelect editType={editType} EditSelect={setEditType} />
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
        <Route
          path="/MySings"
          element={<MySings editType={editType} setEditType={setEditType} />}
        />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/UpdateSing/:id" element={<UpdateSing />} />
        <Route path="/CreateSing" element={<CreateSing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
