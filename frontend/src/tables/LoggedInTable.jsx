import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoadingTable from "./LoadingTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function LoggedInTable({ data, modifiable , loading}) {
  console.log("In the table data is: ", data);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const { isLoggedIn, userName, token } = useContext(AuthContext);

  const handleClick = (ID) => {
    setId(ID);
    console.log("In handleClick id is: ", ID);
    addToMySings(userName, isPublic, ID);
  };

  var isPublic = 0;
  async function addToMySings() {
    await fetch(
      `http://localhost:8080/api/users/${userName}/events/${isPublic}/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `${JSON.stringify(token)
            .split(":")[2]
            .split(",")[0]
            .replace(/"/g, "")}`,
        },
      }
    ).then((response) => {
      response.ok
        ? alert("Sing added to your list")
        : alert("something went wrong");
    });
  }

  if (data == null || data.length === 0 || data === undefined) {
    return <LoadingTable loading={loading}/>;
  } else {
    return (
      <>
        <div className="container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {/* {Object.keys(data[1]).map((key) => (
                  <th>{key}</th>
                ))} */}
                <td>ID</td>
                <td>Name</td>
                <td>Added By</td>
                <td>Date</td>
                {/* <td>End Date</td> */}
                <td>Start Time</td>
                <td>End Time</td>
                <td>Primary Book</td>
                <td>Secondary Book</td>
                {/* <td>Location</td> */}
              </tr>
            </thead>
            <tbody>
              {data.map((key, val) => {
                return (
                  <tr key={val}>
                    <button
                      id="modbutton"
                      style={{ display: modifiable ? "block" : "none" }}
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#isPublicModal"
                      onClick={() => {
                        setId(key["id"]);
                      }}
                    >
                      <td>{key["id"]}</td>
                    </button>
                    <td
                      id="nomodbutton"
                      style={{ display: !modifiable ? "block" : "none" }}
                    >
                      {key["id"]}
                    </td>
                    <td>{key["name"]}</td>
                    <td>{key["owner_id"]}</td>
                    <td>{key["start_date"]}</td>
                    {/* <td>{key["end_date"]}</td>
                    <td>{key["when_description"]}</td> */}
                    <td>{key["start_time"]}</td>
                    <td>{key["end_time"]}</td>
                    <td>{key["primary_book"]}</td>
                    <td>{key["secondary_book"]}</td>
                    {/* <td>{key["contact_email"]}</td>
                    <td>{key["user_added_note"]}</td> */}
                    {/* <td>{key["location"]}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------------------------------- */}

        <div
          class="modal fade"
          id="isPublicModal"
          tabindex="-1"
          aria-labelledby="isPublic Modal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Make attendance public?
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="no"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    isPublic = 0;
                    handleClick();
                  }}
                  data-bs-dismiss="modal"
                >
                  No thanks!
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    isPublic = 1;
                    handleClick();
                  }}
                  data-bs-dismiss="modal"
                >
                  Yes please!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------- */}
      </>
    );
  }
}
