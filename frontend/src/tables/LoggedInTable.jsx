import React, { useContext, useState, useEffect } from "react";
import LoadingTable from "./LoadingTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import sortSingsByDate from "../helpers/sortSings";

export default function LoggedInTable({
  data,
  setData,
  modifiable,
  loading,
  errorState,
}) {
  console.log("In the table data is: ", data);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const { isLoggedIn, userName, token, authedUserName } =
    useContext(AuthContext);

  const handleUpdate = (ID) => {
    setData(ID);
    navigate(`/UpdateSing/${id}`);
  };

  const handleClick = (ID) => {
    setId(ID);
    addToMySings(userName, isPublic, ID);
  };

  const handleRadio = (ORDER) => {
    setOrder(ORDER);
  };

  useEffect(() => {
    if (data && order) {
      setData(sortSingsByDate(data, order));
    }
  }, [order]);

  var isPublic = 0;

  var strippedToken = JSON.stringify(token)
    .split(":")[2]
    .split(",")[0]
    .replace(/"/g, "");

  console.log("In loggedInTable stripped token is: ", strippedToken);
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

  if (
    data == null ||
    data.length === 0 ||
    data === undefined ||
    errorState == true
  ) {
    return <LoadingTable loading={loading} errorState={errorState} />;
  } else {
    return (
      <>
      <h3 className="text-center">Click the ID name of a sing to add it to your events</h3>
      <h3 className="text-center" style={{
                  display: authedUserName === "admin" ? "block" : "none",
                }}>You're admin, click on ID to update a sings details (or add to your events)</h3>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortByDate"
            id="sortAscending"
            data-testid="sortAscending"
            onChange={() => handleRadio("asc")}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Sort Ascending
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortByDate"
            id="sortDescending"
            data-testid="sortDesc"
            onChange={() => handleRadio("desc")}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Sort Descending
          </label>
        </div>
        {/* 
          I'm leaving a bunch of the table and the .map to populate itcommented here instead or removing, plan to use it later
        */}
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
                      data-testid="tableButton"
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
                  data-testid="modal"
                  aria-label="no"
                ></button>
              </div>
              <div class="modal-body">
                Would you like to include this in the list of your sings other
                people can see?
              </div>
              <div class="modal-footer">
                {/**======================================================================= */}

                <button
                 style={{
                  display: authedUserName === "admin" ? "block" : "none",
                }}
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    isPublic = 0;
                    handleUpdate();
                  }}
                  data-bs-dismiss="modal"
                >
                  Edit This sing
                </button>

                {/**======================================================================= */}
                <button
                 
                  type="button"
                  data-testid="modal"
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
      </>
    );
  }
}
