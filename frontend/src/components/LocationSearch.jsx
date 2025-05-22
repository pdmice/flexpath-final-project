import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Table from "./Table";
import "react-datepicker/dist/react-datepicker.css";

export default function LocationSearch() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [radius, setRadius] = useState(100);
  const [searchString, setSearchString] = useState(
    "39.89243631917957, -95.86952041568385"
  );
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleDate = (range) => {
    const [startDate, endDate] = range;
    let start = new Date(startDate).toISOString("yyyy-MM-dd").split("T")[0];
    let end = new Date(endDate).toISOString("yyyy-MM-dd").split("T")[0];
    console.log("Parsed dates are: ", start, end);
    setStartDate(start);
    setEndDate(end);
  };

  const handleKeyword = (e) => {
    async function fetchGPS(e) {
      console.error("e.targetvalue is: ", e.target.value);
      await fetch(
        `https://geocode.maps.co/search?postalcode${e.target.value}=&api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => setSearchString(json))
        .catch((e) => console.log("fetchGPS error: ", e));
    }

    //setSearchString(e.target.value);
  };

  const handleRadius = (e) => {
    setRadius(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postQuery = `{"searchStart":"${startDate}" ,
        "searchEnd": "${endDate}",
        "searchRadius": ${radius},
        "searchLocation":"${searchString}"}`;

    async function fetchData(post) {
      await fetch("http://localhost:8080/api/search", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: postQuery,
      })
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error("Fetch error was: ", error));
    }
    fetchData(postQuery);
    console.log("postQuery is: ", postQuery);
    console.log("Data is: ", data);
  };

  console.log("Data is: ", data);
  console.log("searchString is:", searchString);

  return (
    <div className="container-md">
      <h1>Find a Sing to Attend</h1>
      <p>
        Use this form to find a sing that lines up with your travel plans. Just enter a zip code
        and the dates for where you'll be and how far you're willing to travel in miles. Distance is 
        as the crow flies, so actual travel distance will be longer.
      </p>

      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">Where will you be?</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip-code"
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
      <div>
        <Table data={data} />
      </div>
    </div>
  );
}
