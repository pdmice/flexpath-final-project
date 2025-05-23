import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, Route, Routes, useLocation } from "react-router-dom";

export default function LoginButton() {
  const { isLoggedIn, userName, setToken, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="dropdown ms-auto p-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {isLoggedIn ? userName : "Login"}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <button
                className="dropdown-item "
                onClick={() => handleSearchSelect("location")}
              >
                Location Search
              </button>
            </li>
            <li>
              <button
                className="dropdown-item "
                onClick={() => handleSearchSelect("user")}
              >
                User Search
              </button>
            </li>
            <li>
              <button className="dropdown-item " onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login" className="navbar-brand ms-4 nav-link fs-4 ms-auto">
          Login
        </Link>
      )}
    </>
  );
}
