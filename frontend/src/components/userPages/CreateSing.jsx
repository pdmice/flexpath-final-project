import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSing } from "../../helpers/useFetchSing";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useBooks } from "../../helpers/useBooks";
import { useUUID } from "../../helpers/useUUID";

export default function CreateSing() {
  const {
    isLoggedIn,
    token,
    userName,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  var { data } = useFetchSing(1);
  const { books } = useBooks();
  const { uuid } = useUUID(userName);

  console.log("In createsing uuid is: ", uuid);
  console.log("in createsing books is:", books);
  console.log("In createSing token is: ", token)

  console.error("In CreateSing data is: ", data); 

  const handleName = (e) => {
    const target = e.target.id;
    data.owner_id = uuid;
    data.id = "";
    data[target] = e.target.value;
  };

  const handlePublic = (num) => {
    data.isPublic = num;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      async function postData(data) {
        const post = `${JSON.stringify(data)}`;
        console.log("In handleSubmit post is: ", post)
        console.log("In handleSubmit token is: ", token)
        await fetch(`http://localhost:8080/api/sings/create`, {
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
        })
          .then((response) => {
            response.ok ? navigate("/MySings", {state: {editType: "created"}}) : navigate("/Error");
          })
          .catch((error) => {
            alert("Something went wrong. Are you logged in?");
            console.error(error);
          });
      }
      postData(data);
    } else {
      alert("You need to login to create a sing");
    }
  };

  return (
    <>
      <div className="container-md">
        <h1 className="text-center">
          {" "}
          Publish A New Sing For People To Come To
        </h1>

        <p className="text-center">
          {" "}
          Enter the information for your sing in the boxes, then hit submit.
        </p>
        {/********************************************************************* */}

          <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="makePublic"
            id="makePublic"
            data-testid="makePublic"
            onChange={() => handlePublic(1)}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Make Sing Publically viewable
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="makePublic"
            id="makePrivate"
            data-testid="makePrivate"
            onChange={() => handlePublic(0)}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Make sing private
          </label>
        </div>

        {/************************************************************************ */}
        <form onSubmit={(e) => handleUpdate(e)}>
          <p className="mt-3">Name</p>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Good time fun singing"
            onChange={(e) => handleName(e)}
            required
          ></input>
          <p className="mt-3">Date (In the form of yyyy-mm-dd)</p>
          <input
            type="text"
            id="start_date"
            className="form-control"
            placeholder="2025-01-01"
            onChange={(e) => handleName(e)}
            required
          ></input>
          <p className="mt-3">Starting Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            id="start_time"
            className="form-control"
            placeholder="09:30:00"
            onChange={(e) => handleName(e)}
            required
          ></input>
          <p className="mt-3">End Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            id="end_time"
            className="form-control"
            placeholder="11:30:00"
            onChange={(e) => handleName(e)}
            required
          ></input>
          <p className="mt-3">Primary Book</p>
          <select
            className="form-select"
            name="primary_book"
            id="primary_book"
            defaultValue={10}
            onChange={(e) => handleName(e)}
            required
          >
            {Array.isArray(books) ? (
              books.map((i) => <option value={i.id}>{i.name}</option>)
            ) : (
              <p>Loading Books...</p>
            )}
          </select>
          <p className="mt-3">Secondary Book</p>
          <select
            className="form-select"
            name="secondary_book"
            id="secondary_book"
            defaultValue={1}
            onChange={(e) => handleName(e)}
            required
          >
            {Array.isArray(books) ? (
              books.map((i) => <option value={i.id}>{i.name}</option>)
            ) : (
              <p>Loading Books...</p>
            )}
          </select>

          <p className="mt-3">Latitude</p>
          <input
            type="text"
            id="longitude"
            className="form-control"
            placeholder="38.62742847136166"
            onChange={(e) => handleName(e)}
            required
          ></input>
          <p className="mt-3">Longitude</p>
          <input
            type="text"
            id="latitude"
            className="form-control"
            placeholder="92.68662020167139"
            onChange={(e) => handleName(e)}
            required
          ></input>

          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Publish Sing!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
