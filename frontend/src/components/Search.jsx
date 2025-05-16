import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [radius, setRadius] = useState(100);
  const [searchString, setSearchString] = useState(
    "39.89243631917957, -95.86952041568385"
  );

  const handleDate = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleKeyword = (e) => {
    setSearchString(e.target.value);
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
  };

  /*
  TODO: Add a regex to decide how to submit the search
  In handleSubmit, I have 2 queries built, a post that will send a complete searchObject as expected in a post to /api/search.
  If the other fields are blank we'll send a get request to /api/searches with the searchString as a PathVariable and return a list of
  sings by user
  */
  const handleSubmit = () => {
    const postQuery = `{"searchStart":${startDate} ,
    "searchEnd": ${endDate},
    "searchRadius": ${radius},
    "searchLocation": ${searchString}`;

    console.error("postQuery is: ", postQuery);

    const getQuery = `localhost:8080/api/search/${searchString}`;
    console.error("GetQuery is: ", getQuery);
  };

  return (
    <div className="container-md">
      <h1>Find a Sing to Attend</h1>
      <p>
        Use this form to find a sing that lines up with your travel plans. You
        can also Enter a username in the location field and leave the rest blank
        to find sings from people you know.
      </p>

      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">Where will you be?</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            onChange={(e) => handleKeyword(e)}
          ></input>
          <p className="mt-3">How far can you travel?</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Search Radius in Miles"
            onChange={(e) => handleRadius(e)}
          ></input>
          <p className="=mt-3">When are you going to be around?</p>
          <DatePicker
            selected={startDate}
            onChange={handleDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
