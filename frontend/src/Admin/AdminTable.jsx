import React, { useContext, useEffect, useState } from "react";
import LoadingTable from "../tables/LoadingTable";
import { useNavigate } from "react-router-dom";
import sortSingsByDate from "../helpers/sortSings";
import { AuthContext } from "../provider/AuthProvider";

export default function AdminTable({
  data,
  setData,
  modifiable,
  loading,
  errorState,
  groupID
}) {
  console.log("In the table data is: ", data);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const {authedUserName, token}= useContext(AuthContext)

  const handleClick = (ID) => {
    setId(ID);
    console.log("In handleClick id is: ", ID);
    navigate(`/UpdateSing/${ID}`);
  };

  const handleRadio = (ORDER) => {
    setOrder(ORDER);
    console.log("order is: ", order);
  };

  const deleteSingFromGroup = (ID) => {
    /* setId(ID) */
        async function removeFromGroup() {
        await fetch(
      `http://localhost:8080/api/users/custom/deleteSing/${ID}/${groupID}/${authedUserName}`,
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
      if (response.ok){
        alert("Sing removed from group")
        setData((prevData) => prevData.filter((item) => item.id !== ID));
        }else{alert("something went wrong");}
        
    });
  }
  removeFromGroup();
  }


  

  useEffect(() => {
    if (data && order) {
      setData(sortSingsByDate(data, order));
    }
  }, [order, data]);

  if (
    data == null ||
    data.length === 0 ||
    data === undefined ||
    errorState == true ||
    Array.isArray(data) != true
  ) {
    return <LoadingTable loading={loading} errorState={errorState} />;
  } else {
    return (
      <>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortByDate"
            id="sortAscending"
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
            onChange={() => handleRadio("desc")}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Sort Descending
          </label>
        </div>

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
                      className="btn btn-outline-secondary"
                      style={{ display: modifiable ? "block" : "none" }}
                      onClick={() => {
                        /* setId(key["id"]) */
                        deleteSingFromGroup(key["id"]);
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
      </>
    );
  }
}
