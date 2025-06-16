import React, { useContext, useEffect, useState } from "react";
import Table from "../../tables/Table";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

export default function Group(){

    const{isLoggedIn, token, isAdmin, authedUserName} = useContext(AuthContext)

    const location = useLocation()
    const groupID = location.state?.groupID
    const [errorState, setErrorState] = useState()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)

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

   useEffect(() => {
    if (!groupID) return;
    fetchGroup();
   }, [groupID])



    return(
        <>
        <div className="container-md">
            <Table data={data} setData={setData} loading={loading} errorState={errorState} />
        </div>
        
        </>
    )

}