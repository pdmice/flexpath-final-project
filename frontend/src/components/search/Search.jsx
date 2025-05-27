import React from "react";
import { useState } from "react";
import UserSearch from "./UserSearch";
import LocationSearch from "./LocationSearch";
import KeyWordSearch from "./KeyWordSearch";

export default function Search({ searchType, setSearchType }) {
  console.error("searchtype is: ", searchType);
  return (
    <>
      <div
        className="container-md"
        style={{ display: searchType === "location" ? "block" : "none" }}
      >
        <LocationSearch />
      </div>
      <div
        className="container-md"
        style={{ display: searchType === "user" ? "block" : "none" }}
      >
        <UserSearch />
      </div>
      *
      <div
        className="container-md"
        style={{ display: searchType === "keyword" ? "block" : "none" }}
      >
        <KeyWordSearch />
      </div>
    </>
  );
}
