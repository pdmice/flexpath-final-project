import React from "react";

export default function LoadingTable({ data, loading, errorState }) {
  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Added By</td>
            <td>Date</td>
            <td>Start Time</td>
            <td>End Time</td>
            <td>Primary Book</td>
            <td>Secondary Book</td>
          </tr>
        </thead>
      </table>
      <h4
        className="text-center"
        style={{ display: loading ? "block" : "none" }}
      >
        Loading...
      </h4>
      <h4
        className="text-center"
        style={{ display: !loading ? "block" : "none" }}
      >
        No Data Returned
      </h4>
      <h4
        claparameterssName="text-center text-danger"
        style={{ display: errorState ? "block" : "none" }}
      >
        Error
      </h4>
    </div>
  );
}
