import React from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import Table from "../../tables/Table";
import { useNavigate } from "react-router-dom";
import Group from "./Group";



export default function Groups(){
    const {authedUserName, token} = useContext(AuthContext)
    const [singIds, setSingIds] = useState([])
    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([])
    const [groupID, setGroupID] = useState()
    const navigate = useNavigate()

     var strippedToken = "";

  if (token) {
    strippedToken = `${JSON.stringify(token)
      .split(":")[2]
      .split(",")[0]
      .replace(/"/g, "")}`;
  }

//Get a list of GroupIds

    const customGroupIdArray = () => {
        async function getIds(){
            await fetch(`http://localhost:8080/api/users/custom/get/${authedUserName}`,
                {
        headers: {
          Accept: "application/json",
          Authorization: strippedToken,
        },}
            )
            .then((response) => {
                if (response.ok){
                    console.log("In groups fetch reponse was ok.")
                    return response.json()

                }else{throw new Error("Failed to fetch group IDs")}
            })
            .then((json) =>{ 
                console.log(json)
                setGroups(json)})
            .catch((e) => {console.error("Failed to get groupIDs: ", e)}) 
} 
    getIds()
    }

    var idArr = [];

    
    console.log("idArr is ", idArr)
    useEffect(() => {
        setSingIds(() => customGroupIdArray())
        for (let i =0; i < groups.length; i++){
            idArr.push(groups[i].id)
    }

    }, [authedUserName])
    

/* 
useEffect(() => {
  if (groups.length === 0) return;

  Promise.all(
    groups.map((group) =>
      fetch(
        `http://localhost:8080/api/users/custom/getCustomGroupSingList/${authedUserName}/${group.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: strippedToken,
          },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch sings");
          return res.json();
        })
        .then((sings) => (sings))
        .catch((e) => {
          console.error(`Error fetching sings for group ${group.id}`, e);
          return { groupId: group.id, sings: [] }; 
        })
    )
  ).then((results) => {
    console.error("Results are: ", results)
    setData(results); 
  });
}, [groups]); */

console.log("In groups data is: ", data)


    return(
        <>
        <h1 className="text-center">Here are all of your custom groups</h1>
        {groups.map((group, i) => {
            var num = parseInt(group.id)
            console.log("num is: ", num)
            return(
            <>
            <div className="container-md pt-5" key={group.id}>
                <button 
                className="btn btn-outline-secondary"
                onClick={() => {navigate("/Group", {state: {groupID: num}})}}
                >
                <h4 className="text-center">{group.name}</h4>
                </button>
            </div> 
            
            </>)  
        })}
        </>
    
    )
}