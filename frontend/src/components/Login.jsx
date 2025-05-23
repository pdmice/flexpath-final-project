import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {Link} from 'react-router-dom'

export default function Login() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    role,
    setRole,
    userName,
    setUserName,
  } = useContext(AuthContext);

  const [password, setPassword] = useState(null);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function login(username, password) {
      const login = `{"username": "${userName}", "password":"${password}"}`;
      await fetch("http://localhost:5174/auth/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: login,
      })
        .then((response) => response.json())
        .then((json) => {
          setToken(json);
          setIsLoggedIn(true);
        })
        .catch((error) => console.error("Login error: ", error));
    }
    login(userName, password);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="container-sm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="text"
            id="username"
            className="form-control"
            onChange={(e) => handleUserName(e)}
          />
          <label className="form-label" htmlFor="Username">
            Username
          </label>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={(e) => handlePassword(e)}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn  btn-outline-secondary"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            <Link to="/SignUp">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
