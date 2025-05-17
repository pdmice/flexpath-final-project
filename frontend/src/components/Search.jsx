import React from "react";
import { useState } from "react";
import UserSearch from "./UserSearch";
import LocationSearch from "./LocationSearch";

export default function Search() {
  const [searchType, setSearchType] = useState(true);

  return (
    <>
      <div
        className="container-md"
        style={{ display: searchType ? "block" : "none" }}
      >
        <LocationSearch />
      </div>

      <div
        className="container-md"
        style={{ display: !searchType ? "block" : "none" }}
      >
        <UserSearch />
      </div>
    </>
  );
}
