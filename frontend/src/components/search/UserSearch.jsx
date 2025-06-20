import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Table from "../../tables/Table";
import LoggedInTable from "../../tables/LoggedInTable";
import { AuthContext } from "../../provider/AuthProvider";

export default function UserSearch({
  loading,
  setLoading,
  errorState,
  setErrorState,
}) {
  const [userName, setUsername] = useState("user");
  const [searchType, setSearchType] = useState("");
  const [data, setData] = useState(null);
  const [modifiable, setModifiable] = useState(true);

  const { token, isLoggedIn } = useContext(AuthContext);

  const handleKeyword = (e) => {
    setUsername(e.target.value);
  };
  useEffect(() => {
    setData(null);
  }, [userName, searchType]);

  var strippedToken = "";

  if (token) {
    strippedToken = `${JSON.stringify(token)
      .split(":")[2]
      .split(",")[0]
      .replace(/"/g, "")}`;
  }

  const handleSubmit = (e) => {
    setLoading(true);
    setErrorState(false);
    e.preventDefault();
    var queryString;

    if (searchType === "created") {
      queryString = `http://localhost:8080/api/search/${userName}`;
      console.log("In handleSearchType queryString is: ", queryString);
    } else if (searchType === "attending") {
      isLoggedIn
        ? (queryString = `http://localhost:8080/api/users/events/public/future/${userName}`)
        : alert("You need to login for that!");
    } else if (searchType === "attended") {
      isLoggedIn
        ? (queryString = `http://localhost:8080/api/users/events/public/past/${userName}`)
        : alert("You need to login for that");
    }

    if (!searchType) {
      alert("Select How you wish to search");
    }
    async function fetchData(userName) {
      await fetch(queryString, {
        headers: {
          Accept: "application/json",
          strippedToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorState(true);
            return response.json();
          }
        })
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchData(userName);
  };

  return (
    <div className="container">
      <h1 className="text-center"> Enter the name of a user to search</h1>
      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">
            Use this form to find sings your buddies are going to. You can
            search by sings that a user created, is planning to attend, or has
            attended
          </p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by users"
            onChange={(e) => handleKeyword(e)}
          ></input>
          {/********************************************** */}

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
              onClick={() => setSearchType("created")}
            >
              Created BY
            </button>
          </li>
          <li>
            <button
              className="dropdown-item "
              onClick={() => setSearchType("attending")}
            >
              Attending
            </button>
          </li>
          <li>
            <button
              className="dropdown-item "
              onClick={() => setSearchType("attended")}
            >
              Attended
            </button>
          </li>
        </ul>
      </div>

          {/*********************************************** */}
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>

      {/************************************************************************************************ */}


      {/*************************************************************************************************** */}

      <div>
        {isLoggedIn ? (
          <LoggedInTable
            data={data}
            setData={setData}
            loading={loading}
            modifiable={modifiable}
            errorState={errorState}
          />
        ) : (
          <Table
            data={data}
            setData={setData}
            loading={loading}
            errorState={errorState}
          />
        )}
      </div>
    </div>
  );
}
