import React from "react";
import { useState, useContext } from "react";
import Table from "../tables/Table";
import LoggedInTable from "../tables/LoggedInTable";
import PublicGroups from "../components/userPages/PublicGroups";
import { AuthContext } from "../provider/AuthProvider";
import AdminGroups from "./AdminGroups";
import AdminGroup from "./AdminGroup";

export default function AdminGroupSearch({loading,setLoading,errorState,setErrorState}) {
  const [userSearch, setUserSearch] = useState(null);
  const [data, setData] = useState(null);
  const [modifiable, setModifiable] = useState(true);
  const { isLoggedIn , token} = useContext(AuthContext);

  

  const handleKeyword = (e) => {
    setUserSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorState(false);
    async function fetchData(keyword) {
      await fetch(`http://localhost:8080/api/users/custom/get/${userSearch}`,
        {headers: {
        Accept: "application/json",
        Authorization: `${JSON.stringify(token)
          .split(":")[2]
          .split(",")[0]
          .replace(/"/g, "")}`,
      }}
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorState(true);
            return response.json();
          }
        })
        .then((json) => setData(json))
        .finally(() => setLoading(false))
        .catch((e) => console.error("Group search error: ", e));
    }
    fetchData(userSearch);
  };

  return (
    <div className="container">
      <h1 className="text-center">User Group Search</h1>
      
      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
         
          <input
            type="text"
            className="form-control"
            placeholder="Search by user"
            onChange={(e) => handleKeyword(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2 ">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="container-md mt-3">
        <AdminGroup data={data} />
      </div>
      
    </div>
  );
}
