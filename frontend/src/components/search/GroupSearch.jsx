import React from "react";
import { useState, useContext } from "react";
import Table from "../../tables/Table";
import LoggedInTable from "../../tables/LoggedInTable";
import { AuthContext } from "../../provider/AuthProvider";
import PublicGroups from "../userPages/PublicGroups"

export default function KeyWordSearch({
  loading,
  setLoading,
  errorState,
  setErrorState,
}) {
  const [userSearch, setUserSearch] = useState(null);
  const [data, setData] = useState(null);
  const [modifiable, setModifiable] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  const handleKeyword = (e) => {
    setUserSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorState(false);
    async function fetchData(keyword) {
      await fetch(`http://localhost:8080/api/users/custom/get/public/${userSearch}`)
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
      <p className="pt-2">
        Use this form to search for groups that other users have created.
      </p>
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
        <PublicGroups data={data} />
      </div>
      {/* <div className="container">
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
      </div> */}
    </div>
  );
}
