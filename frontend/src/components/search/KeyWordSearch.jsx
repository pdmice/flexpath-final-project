import React from "react";
import { useState } from "react";
import Table from "../../tables/Table";

export default function KeyWordSearch() {
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState(null);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchData(keyword) {
      await fetch(`http://localhost:8080/api/search/keyword/${keyword}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((e) => console.error("Keyword search error: ", e));
    }
    fetchData(keyword);
  };

  return (
    <div className="container">
      <h1>Enter a keyword to search.</h1>
      <p>
        You could try a city, state or just a keyword. For example, try
        "Huntsville", "Florida", or "Sacred Harp"{" "}
      </p>
      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">Keyword to search for</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            onChange={(e) => handleKeyword(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <Table data={data} />
      </div>
    </div>
  );
}
