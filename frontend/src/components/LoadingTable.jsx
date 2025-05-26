import React from "react";

export default function LoadingTable(data) {
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
    </div>
  );
}
