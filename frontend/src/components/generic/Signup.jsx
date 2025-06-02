import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function postUser(userName, Password) {
      const post = `{"uuid":"","username":"${userName}","password":"${password}"}`;
      await fetch("http://localhost:8080/api/users", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: post,
      })
        .then((response) => {
          if (response.ok) {
            alert("Account created. You can log in now");
            navigate("/Login");
          } else {
            navigate("/Error");
          }
        })
        .catch((error) => console.error(error));
    }
    postUser(userName, password);
  };

  return (
    <>
      <div className="container-sm">
        <h4>Enter a username and password to sign up</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="text"
              id="username"
              placeholder="username"
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
              placeholder="password"
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
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
