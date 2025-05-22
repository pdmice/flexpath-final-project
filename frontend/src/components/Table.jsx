import React from "react";
import LoadingTable from "./LoadingTable";

export default function Table({ data }) {
  console.log("In the table data is: ", data);

  if (data == null || data.length === 0 || data === undefined) {
    return <LoadingTable />;
  } else {
    return (
      <>
        <div className="container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {Object.keys(data[1]).map((key) => (
                  <th>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((key, val) => {
                return (
                  <tr key={val}>
                    {key["id"]}
                    <td>{key["name"]}</td>
                    <td>{key["owner_id"]}</td>
                    <td>{key["start_date"]}</td>
                    <td>{key["end_date"]}</td>
                    <td>{key["when_description"]}</td>
                    <td>{key["start_time"]}</td>
                    <td>{key["end_time"]}</td>
                    <td>{key["primary_book"]}</td>
                    <td>{key["secondary_book"]}</td>
                    <td>{key["contact_email"]}</td>
                    <td>{key["user_added_note"]}</td>
                    <td>{key["location"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
