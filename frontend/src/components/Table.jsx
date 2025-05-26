import React, {useState} from "react";
import {Link} from "react-router-dom"
import LoadingTable from "./LoadingTable";
import { useNavigate } from "react-router-dom";

export default function Table({ data,modifiable }) {
  console.log("In the table data is: ", data);
  const [id, setId] = useState()
  const navigate= useNavigate()

  const handleClick = (ID) => {
    setId(ID)
    console.log("In handleClick id is: ",ID)
    navigate("/UpdateSing", {state: {sing: ID}})

  }

  if (data == null || data.length === 0 || data === undefined) {
    return <LoadingTable />;
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
                    <button id="modbutton" style={{display: modifiable ? "block" : "none",}} onClick={() => {handleClick(key["id"]) }}><td>{key["id"]}</td></button>
                    <td id="nomodbutton" style={{display: !modifiable ? "block" : "none",}}>{key["id"]}</td>
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
