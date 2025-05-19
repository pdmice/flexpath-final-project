import React from "react";

export default function LoadingTable(data) {
  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td>name</td>
            <td>owner_id</td>
            <td>start_date</td>
            <td>end_date</td>
            <td>when_description</td>
            <td>start_time</td>
            <td>end_time</td>
            <td>primary_book</td>
            <td>secondary_book</td>
            <td>contact_email</td>
            <td>user_added_note</td>
            <td>location</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
