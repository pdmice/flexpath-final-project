import React from "react";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Table from "../tables/Table";
import AdminTable from "./AdminTable";


export default function AdminGroupTable({groupID}){

     const{isLoggedIn, token, isAdmin, authedUserName} = useContext(AuthContext)
    
        const location = useLocation()
        const [errorState, setErrorState] = useState()
        const [data, setData] = useState();
        const [loading, setLoading] = useState(true)
        const [groupName, setGroupName] = useState();
    
            console.error("In group location.pathname is:", location.pathname)
    
    
        var strippedToken;
        if (token) {
        strippedToken = `${JSON.stringify(token)
          .split(":")[2]
          .split(",")[0]
          .replace(/"/g, "")}`;
      }
        
        const fetchGroup = () => {
            async function getGroup(){
               await fetch(`http://localhost:8080/api/users/custom/getCustomGroupSingList/${authedUserName}/${groupID}`, {
            headers: {
              Accept: "application/json",
              Authorization: strippedToken,
            },
          })
          .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                setErrorState(true);
                return response.json();
              }
            })
            .then((json) => {
              setData(json);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              setErrorState(true)
            });      
            }
            getGroup()
        }
    
        const fetchGroupName = () => {
          async function getGroupName(){
               await fetch(`http://localhost:8080/api/users/custom/${authedUserName}/getGroupById/${groupID}`, {
            headers: {
              Accept: "application/json",
              Authorization: strippedToken,
            },
          })
          .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                console.error("Something went awry getting group name")
                return response.json();
              }
            })
            .then((json) => {
              console.log("In getGroupName json is:", json)
              setGroupName(json.name);
            })
            .catch((error) => {
              setLoading(false);
              setErrorState(true)
            });      
            }
            getGroupName()
        }
    
       useEffect(() => {
        if (!groupID) return;
        fetchGroup();
        fetchGroupName()
       }, [groupID])
    
    
    
    
        return(
            <>
            <div className="container-md">
        
                <AdminTable data={data} setData={setData} loading={loading} errorState={errorState} path={location.pathname} modifiable={true} groupID={groupID}/>
            </div>
            
            </>
        )

    
}