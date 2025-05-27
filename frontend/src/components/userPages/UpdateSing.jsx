import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSing } from "../../helpers/useFetchSing";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function UpdateSing() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    role,
    setRole,
    userName,
    setUserName,
    loginFailed,
    setLoginFailed,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  var { data, loading } = useFetchSing(id);
  var dataToSend = "";

  console.error("In UpdateSing data is: ", data);

  const handleName = (e) => {
    const target = e.target.id;
    console.log("In handleNmae target is: ", target);
    data[target] = e.target.value;
    console.log("in handleName data.target is: ", data.target);
    console.log("in handleName data is: ", data);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    async function postData(data) {
      const post = `${JSON.stringify(data)}`;
      await fetch(
        `http://localhost:8080/api/sings/update/${JSON.stringify(data.id)}`,
        {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${JSON.stringify(token)
              .split(":")[2]
              .split(",")[0]
              .replace(/"/g, "")}`,
          },
          body: post,
        }
      )
        .then((response) => {
          response.ok ? navigate("/MySings") : navigate("/Error");
        })
        .catch((error) => console.error(error));
    }
    postData(data);
  };

  return (
    <>
      <div className="container-md">
        <h1 className="text-center"> Update Sings You've Created</h1>
        <p className="text-center">You are modifying:</p>
        <p className="text-center">
          {loading ? "loading... " : JSON.stringify(data.name)}
        </p>
        <p className="text-center">
          {" "}
          Type a new value into each box to change it, or leave it blank leave
          that field unchanged.
        </p>
        <form onSubmit={(e) => handleUpdate(e)}>
          <p className="mt-3">Name</p>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder={loading ? "Loading... " : JSON.stringify(data.name)}
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Date (In the form of yyyy-mm-dd)</p>
          <input
            type="text"
            id="start_date"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.start_date)
            }
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Starting Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            id="start_time"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.start_time)
            }
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">End Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            id="end_time"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.end_time)
            }
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Primary Book</p>
          <input
            type="text"
            id="primary_book"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.primary_book)
            }
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Secondary Book</p>
          <input
            type="text"
            id="secondary_book"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.secondary_book)
            }
            onChange={(e) => handleName(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
