import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, setToken, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="dropdown ms-auto p-3" data-testid="loggedInDropDown">
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
                onClick={() => navigate("/MySings")}
              >
                My Sings
              </button>
            </li>
            <li>
              <button
                className="dropdown-item "
                onClick={() => navigate("/CreateSing")}
              >
                Create Sing!
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
