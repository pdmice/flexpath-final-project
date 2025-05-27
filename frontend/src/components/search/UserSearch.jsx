import React, { useContext } from "react";
import { useState } from "react";
import Table from "../../tables/Table";
import { AuthContext } from "../../provider/AuthProvider";

export default function UserSearch() {
  const [userName, setUsername] = useState("user");
  /* const [searchType, setSearchType] = useState(""); */
  const [data, setData] = useState(null);

  const { token, isLoggedIn } = useContext(AuthContext);

  const handleKeyword = (e) => {
    setUsername(e.target.value);
  };

  var queryString = "";
  var searchType = "";
  const handleSearchType = (type) => {
    searchType = type;
    if (searchType === "created") {
      queryString = `http://localhost:8080/api/search/${userName}`;
      console.log("In handleSearchType queryString is: ", queryString);
    } else if (searchType === "attending") {
      isLoggedIn
        ? (queryString = `http://localhost:8080/api/users/events/public/${userName}`)
        : alert("You need to login for that!");
    } else if (searchType === "attended") {
      isLoggedIn
        ? (queryString = `http://localhost:8080/api/users/events/public/${userName}`)
        : alert("You need to login for that");
    } else {
      alert("handleSearchType has gone awry");
    }
    console.log("searchType is: ", searchType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In handleSubmit userName is: ", userName);
    console.log("In handleSubmit queryString is: ", queryString);
    async function fetchData(userName) {
      await fetch(queryString, {
        headers: {
          Accept: "application/json",
          Authorization: `${JSON.stringify(token)
            .split(":")[2]
            .split(",")[0]
            .replace(/"/g, "")}`,
        },
      })
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
    <div className="container">
      <h1 className="text-center"> Enter the name of a user to search</h1>
      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">User to search for</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by users"
            onChange={(e) => handleKeyword(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>

      {/*============================================================================================*/}

      <div className="dropdown ms-auto pt-2">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {searchType ? searchType : "Type of User Search"}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="dropdownMenuButton2"
        >
          <li>
            <button
              className="dropdown-item "
              onClick={() => handleSearchType("created")}
            >
              Created BY
            </button>
          </li>
          <li>
            <button
              className="dropdown-item "
              onClick={() => handleSearchType("attending")}
            >
              Attending
            </button>
          </li>
          <li>
            <button
              className="dropdown-item "
              onClick={() => handleSearchType("attended")}
            >
              Attended
            </button>
          </li>
        </ul>
      </div>

      {/*============================================================================================*/}

      <div className="container">
        <Table data={data} />
      </div>
    </div>
  );
}
