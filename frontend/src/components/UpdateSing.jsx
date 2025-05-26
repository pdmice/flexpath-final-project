import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFetchSing } from "../helpers/useFetchSing";
import { useEffect, useState } from "react";
export default function UpdateSing() {
  const location = useLocation();
  const { id } = useParams();

  const data = useFetchSing(id);

  console.error("In UpdateSing data is: ", data);
  return (
    <>
      <div className="container-md">
        <h1 className="text-center"> Update Sings You've Created</h1>
        <p className="text-center">You are modifying:</p>
        <p className="text-center">{JSON.stringify(data.name)}</p>
        <p className="text-center">
          {" "}
          Type a new value into each box to change it, or leave it blank leave
          that field unchanged.
        </p>
        <form onSubmit={(e) => handleUpdate(e)}>
          <p className="mt-3">Name</p>
          <input
            type="text"
            className="form-control"
            placeholder={loading ? "Loading... " : JSON.stringify(data.name)}
            onChange={(e) => handleName(e)}
          ></input>
          <p className="mt-3">Date (In the form of yyyy-mm-dd)</p>
          <input
            type="text"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.start_date)
            }
            onChange={(e) => handleDate(e)}
          ></input>
          <p className="mt-3">Starting Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.start_time)
            }
            onChange={(e) => handleStartTime(e)}
          ></input>
          <p className="mt-3">End Time (In the form of HH:MM:SS)</p>
          <input
            type="text"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.end_time)
            }
            onChange={(e) => handleEndTime(e)}
          ></input>
          <p className="mt-3">Primary Book</p>
          <input
            type="text"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.primary_book)
            }
            onChange={(e) => handlePrimaryBook(e)}
          ></input>
          <p className="mt-3">Secondary Book</p>
          <input
            type="text"
            className="form-control"
            placeholder={
              loading ? "Loading... " : JSON.stringify(data.secondary_book)
            }
            onChange={(e) => handleEndTime(e)}
          ></input>
          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
