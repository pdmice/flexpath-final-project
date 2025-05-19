import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function UserSearch() {
  const [userName, setUsername] = useState("user");
  const [data, setData] = useState(null);

  const handleKeyword = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchData(userName) {
      await fetch(`http://localhost:8080/api/search/${userName}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          console.log("Data is: ", data);
        })
        .catch((error) => console.error("UserSearch error was: ".error));
    }
    fetchData(userName);
  };

  return (
    <div className="container-md">
      <h1> Enter the name of a user to search</h1>
      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">User to search for</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            onChange={(e) => handleKeyword(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>
      <p>${JSON.stringify(data)}</p>
    </div>
  );
}
