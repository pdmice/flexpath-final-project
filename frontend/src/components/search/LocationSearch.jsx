import React, { useContext } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Table from "../../tables/Table";
import LoggedInTable from "../../tables/LoggedInTable";
import { AuthContext } from "../../provider/AuthProvider";
import "react-datepicker/dist/react-datepicker.css";

export default function LocationSearch({
  loading,
  setLoading,
  errorState,
  setErrorState,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [radius, setRadius] = useState(100);
  const [searchString, setSearchString] = useState(
    "39.89243631917957, -95.86952041568385"
  );
  const [data, setData] = useState(null);
  const [modifiable, setModifiable] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

  /*                  YOU   BROKE THE API KEY TO TEST!

                        FIX THE COMMENTS HERE!


                        */

  //const API_KEY = "aslkjd;lskdfj;slkd";
  const { isLoggedIn } = useContext(AuthContext);
  const [zipCode, setZipCode] = useState();

  const handleDate = (range) => {
    const [startDate, endDate] = range;
    let start = new Date(startDate).toISOString("yyyy-MM-dd").split("T")[0];
    let end = new Date(endDate).toISOString("yyyy-MM-dd").split("T")[0];
    setStartDate(start);
    setEndDate(end);
  };

  const handleZipCode = (e) => {
    setZipCode(e.target.value);

    async function fetchGPS() {
      await fetch(
        `https://geocode.maps.co/search?postalcode=${e.target.value}=&api_key=${API_KEY}`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setSearchString(`${json[0].lat}:${json[0].lon}`);
        })
        .catch((e) => console.log("fetchGPS error: ", e));
    }
    //Add a stupid simple de-bounce kinda thing to not get rate-limited by geocoding api
    setTimeout(() => {
      fetchGPS();
    }, 700);
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

    console.log("In handleSubmit postQuery is: ", postQuery);

    async function fetchData(post) {
      setLoading(true);
      setErrorState(false);
      await fetch("http://localhost:8080/api/search", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: postQuery,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setErrorState(true);
            return response.json();
          }
        })
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((error) => console.error("Fetch error was: ", error));
    }
    fetchData(postQuery);
    console.log("postQuery is: ", postQuery);
    console.log("Data is: ", data);
  };

  console.log("Data is: ", data);
  console.log("searchString is:", searchString);
  console.log("searchString is a: ", typeof searchString);

  return (
    <div className="container-md">
      <h1 className="text-center">Find a Sing to Attend</h1>
      <p>
        Use this form to find a sing that lines up with your travel plans. Just
        enter a zip code and the dates for where you'll be and how far you're
        willing to travel in miles. Distance is as the crow flies, so actual
        travel distance will be longer.
      </p>
      <p>
        If you're logged in, you can also click the ID number of a sing to add
        it to your list of sings to attend.
      </p>
      <hr />

      <div className="row-align-items-center>">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">Where will you be?</p>
          <input
            type="text"
            className="form-control"
            placeholder="Search by  5 digit zip-code like 90210"
            onChange={(e) => handleZipCode(e)}
          ></input>
          <p className="mt-3">How far (in miles) can you travel?</p>
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
        {isLoggedIn ? (
          <LoggedInTable
            data={data}
            setData={setData}
            modifiable={modifiable}
            loading={loading}
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
      </div>
    </div>
  );
}
