import React, {useContext, useState, useEffect} from "react";
import Table from "./Table";
import { AuthContext } from "../provider/AuthProvider";
import UpdateSing from "./UpdateSing";

export default function MySings(){

    const [modifiable, setModifiable] = useState(true)
    const {userName} = useContext(AuthContext)
    const [data, setData] = useState(null)
    console.log("In my sings userName is: ", userName)
   
        async function fetchData(userName) {
          await fetch(`http://localhost:8080/api/search/${userName}`, {mode: "cors"})
            .then((response) => response.json())
            .then((json) => {
              setData(json);
              console.log("Data is: ", data);
            })
            .catch((error) => console.error("UserSearch error was: ".error));
        }
        
        useEffect(() => {if (userName) fetchData(userName)},[userName])


    return(
        <>
        <div className="container-md">
        <h1 className="text-center"> Here are all the sings you've created.</h1>
        <h3 className="text-center">Click on the ID number of a sing to edit it.</h3>
        <Table modifiable={modifiable} data={data}/>
        </div>
        </>
    )
}