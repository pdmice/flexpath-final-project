import React from "react";
import {useLocation} from "react-router-dom"

export default function UpdateSing(){

    const location = useLocation() 
    console.log("In UpdateSing id is: ", location.state?.sing)

    const handleUpdate = (e) => {
        console.log("handle the thing here.")
    }
    

    return (
        <>
        
        <div className="container-md">
        <h1> A page to update your sings will go here</h1>
        <p> You are modifying {location.state?.sing}</p>
        <p> Type a new value into each box to change it, or leave it blank leave that field unchanged.</p>
            <form onSubmit={(e) => handleUpdate(e)}>
            <p className="mt-3">Name</p>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Date (In the form of yyyy-mm-dd)</p>
          <input
            type="text"
            className="form-control"
            placeholder="Date"
            onChange={(e) => handleDate(e)}
          ></input>
          <p className="mt-3">Starting Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            className="form-control"
            placeholder="Start Time"
            onChange={(e) => handleStartTime(e)}
          ></input>
          <p className="mt-3">End Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            className="form-control"
            placeholder="End Time"
            onChange={(e) => handleEndTime(e)}
          ></input>
          <p className="mt-3">Primary Book</p>
          <input
            type="text"
            className="form-control"
            placeholder="Primary Book"
            onChange={(e) => handlePrimaryBook(e)}
          ></input>
          <p className="mt-3">Secondary Book</p>
          <input
            type="text"
            className="form-control"
            placeholder="Secondary Book"
            onChange={(e) => handleEndTime(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Search
            </button>
          </div>
          
            </form>
        </div>
        </>

    )
}