import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function UserSearch() {
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
        </form>
      </div>
    </div>
  );
}
