import React, { useContext, useState, useEffect } from "react";
import Table from "../../tables/Table";
import { AuthContext } from "../../provider/AuthProvider";

export default function MySings({ editType }) {
  const [modifiable, setModifiable] = useState(true);
  const { userName, token } = useContext(AuthContext);
  const [data, setData] = useState(null);

  console.log("In my sings userName is: ", userName);

  var strippedToken = "";

  if (token) {
    strippedToken = `${JSON.stringify(token)
      .split(":")[2]
      .split(",")[0]
      .replace(/"/g, "")}`;
  }

  async function fetchData(userName) {
    await fetch(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `${JSON.stringify(token)
          .split(":")[2]
          .split(",")[0]
          .replace(/"/g, "")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("Data is: ", data);
      })
      .catch((error) => console.error("UserSearch error was: ", error));
  }

  var url = "";
  useEffect(() => {
    if (editType === "created") {
      url = `http://localhost:8080/api/search/${userName}`;
      fetchData(userName);
    }
    if (editType === "attending") {
      url = `http://localhost:8080/api/users/events/future/${userName}`;
      fetchData(userName);
    }
    if (editType === "attended") {
      url = `http://localhost:8080/api/users/events/past/${userName}`;
      fetchData(userName);
    }
  }, [editType]);

  return (
    <>
      <div
        className="container-md"
        style={{
          display: editType === "created" ? "block" : "none",
        }}
      >
        <h1 className="text-center"> Here are all the sings you've created.</h1>
        <h3 className="text-center">
          Click on the ID number of a sing to edit or delete it.
        </h3>
        <Table modifiable={modifiable} data={data} setData={setData} />
      </div>

      <div
        className="container-md"
        style={{
          display: editType === "attending" ? "block" : "none",
        }}
      >
        <h1 className="text-center"> Here are all your upcoming sings.</h1>
        <h3 className="text-center">
          Click on the ID number of a sing to edit or delete it.
        </h3>
        <Table modifiable={modifiable} data={data} setData={setData} />
      </div>

      <div
        className="container-md"
        style={{
          display: editType === "attended" ? "block" : "none",
        }}
      >
        <h1 className="text-center"> Here are all your past sings.</h1>
        <h3 className="text-center">
          Click on the ID number of a sing to edit or delete it.
        </h3>
        <Table modifiable={modifiable} data={data} setData={setData} />
      </div>
    </>
  );
}
