import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchSelect({ setSearchType }) {
  const handleSearchSelect = (search) => {
    setSearchType(search);
  };

  return (
    <div
      className="dropdown"
      data-testid="searchSelectDropDown"
      style={{
        display: useLocation().pathname === "/search" ? "block" : "none",
      }}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Search Type
      </button>
      <ul
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton2"
      >
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleSearchSelect("location")}
          >
            Location Search
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleSearchSelect("user")}
          >
            User Search
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleSearchSelect("keyword")}
          >
            Keyword Search
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleSearchSelect("groups")}
          >
            Group Search
          </button>
        </li>
      </ul>
    </div>
  );
}
