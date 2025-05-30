import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSing } from "../../helpers/useFetchSing";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function UpdateSing({ editType }) {
  const { token, userName } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();

  var { data, loading } = useFetchSing(id);

  console.error("In UpdateSing data is: ", data);

  const handleName = (e) => {
    const target = e.target.id;
    data[target] = e.target.value;
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

  var deleteString =
    editType == "created"
      ? `http://localhost:8080/api/sings/delete/${id}/${userName}`
      : `http://localhost:8080/api/users/events/delete/${userName}/${id}`;

  console.log("In updateSing deleteString is: ", deleteString);
  const handleDelete = (e) => {
    e.preventDefault();
    async function deleteSing(id) {
      await fetch(deleteString, {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${JSON.stringify(token)
            .split(":")[2]
            .split(",")[0]
            .replace(/"/g, "")}`,
        },
      })
        .then((response) => {
          console.log("Before if statement response is: ", response.status);
          if (response.ok) {
            alert("Sing Deleted. Sending you back to your sings");
            navigate("/MySings");
          } else {
            alert(
              "Something has gone awry. Do you have permission to delete this?"
            );
            console.log("Awry response was: ", response);
          }
        })
        .catch((error) => {
          alert("Something has gone awry. Is the backend up?");
        });
    }
    deleteSing(id);
  };

  var headerText = "";
  if (editType == "created") {
    headerText = "Update a Sing You Created";
  }
  if (editType == "attending") {
    headerText = "Remove from sings you're Attending";
  }
  if (editType == "attended") {
    headerText = "Remove from Sings you Attended";
  }

  return (
    <>
      <div data-testid="alternateHeading">
      <div
        className="container-md text-center"
        style={{ display: editType == "attending" ? "block" : "none" }}
      >
        <h1>{headerText}</h1>
      </div>
      <div
        className="container-md text-center"
        style={{ display: editType == "attended" ? "block" : "none" }}
      >
        <h1>{headerText}</h1>
      </div></div>



      <div className="container-md">
        <div style={{ display: editType == "created" ? "block" : "none" }}>
          <h1 className="text-center"> {headerText}</h1>
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
              data-testid="handleUpdate"
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
        <div className=" border-top mt-1 d-grid gap-2">
          <button
            type="button"
            className="btn  btn-outline-secondary"
            style={{ display: "block" }}
            onClick={(e) => handleDelete(e)}
          >
            Delete Sing!
          </button>
        </div>
      </div>
    </>
  );
}
