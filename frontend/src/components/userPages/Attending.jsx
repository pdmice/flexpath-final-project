import React , {useContext, useState} from "react";
import Table from "../../tables/Table";
import { AuthContext } from "../../provider/AuthProvider";

export default async function Attending(){
    const [data, setData] = useState(null)

    const {userName, token} = useContext(AuthContext)

    async function fetchData() {
        await fetch(`http://localhost:8080/api/users/events/${userName}`, {
      mode: "cors",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${JSON.stringify(token)
          .split(":")[2]
          .split(",")[0]
          .replace(/"/g, "")}`,
      }})
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("Data is: ", data);
      })
      .catch((error) => console.error("UserSearch error was: ".error));
    }

    return(
        <>
        <Table data={data} />
        </>
    )


}