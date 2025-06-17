import React from "react";
import UserSearch from "./UserSearch";
import LocationSearch from "./LocationSearch";
import KeyWordSearch from "./KeyWordSearch";
import GroupSearch from "./GroupSearch"

export default function Search({ searchType, setSearchType, loading, setLoading, errorState, setErrorState }) {
  console.error("searchtype is: ", searchType);
  return (
    <>
      <div
        className="container-md"
        style={{ display: searchType === "location" ? "block" : "none" }}
      >
        <LocationSearch loading={loading} setLoading={setLoading} errorState={errorState} setErrorState={setErrorState}/>
      </div>
      <div
        className="container-md"
        style={{ display: searchType === "user" ? "block" : "none" }}
      >
        <UserSearch loading={loading} setLoading={setLoading} errorState={errorState} setErrorState={setErrorState} />
      </div>
      *
      <div
        className="container-md"
        style={{ display: searchType === "keyword" ? "block" : "none" }}
      >
        <KeyWordSearch loading={loading} setLoading={setLoading} errorState={errorState} setErrorState={setErrorState}/>
      </div>
      <div
        className="container-md"
        style={{ display: searchType === "groups" ? "block" : "none" }}
      >
        <GroupSearch loading={loading} setLoading={setLoading} errorState={errorState} setErrorState={setErrorState}/>
      </div>
    </>
  );
}
