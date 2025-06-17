import React from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import Table from "../../tables/Table";
import { useNavigate, useLocation } from "react-router-dom";
import Group from "./Group";



export default function Groups(){
    const {authedUserName, token} = useContext(AuthContext)
    const [singIds, setSingIds] = useState([])
    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([])
    const [groupID, setGroupID] = useState()
    const [id,setId] = useState()
    const navigate = useNavigate()

    const location = useLocation();
    const singID = location.state?.singID
    console.log("In groups singID is:", singID)
    

     var strippedToken = "";


     

  if (token) {
    strippedToken = `${JSON.stringify(token)
      .split(":")[2]
      .split(",")[0]
      .replace(/"/g, "")}`;
  }

  const handleAddToCustom =  (e) => {
        e.preventDefault();
        async function addToCustom(){
            await fetch(`http://localhost:8080/api/users/custom/addSing/${singID}/${id}/${authedUserName}`, {
        headers: {
          Accept: "application/json",
          Authorization: strippedToken,
        },}
         )
         .then((response) => {
            if (response.ok){
                alert("Sing added to group")
                navigate("/Group", {state: {groupID: id}})
            }
         })
         .catch((error) => {alert("Error adding sing to group was:", error)})
        }
        addToCustom()
     }

     const handleDeleteGroup =  (e) => {
        e.preventDefault();
        async function deleteGroup(){
            await fetch(`http://localhost:8080/api/users/custom/${authedUserName}/deleteGroup/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: strippedToken,
        },}
         )
         .then((response) => {
            if (response.ok){
                alert("Group deleted")
                customGroupIdArray();
            }
         })
         .catch((error) => {alert("Error deleting group was:", error)})
        }
        deleteGroup()
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
                      id="modbutton"
                      data-testid="groupButton"
                      /* style={{ display: modifiable ? "block" : "none" }} */
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#groupModal"
                       onClick={() => {
                        setId(num);
                      }} 
                    >
                <h4 className="text-center">{group.name}</h4>
                </button>
            </div> 


        <div
          class="modal fade"
          id="groupModal"
          tabindex="-1"
          aria-labelledby="group Modal"
          aria-hidden="true"
        >
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h5 className="text-center" id="exampleModalLabel">
                  Do Something With a group
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  data-testid="modal"
                  aria-label="no"
                ></button>
            </div>
            <div class="modal-body">
               Click the relevant button to add/delete a group,
               or add or delete a sing from a group
              </div>
              <div class="modal-footer">
                <button
                 style={{ display: singID ? "block" : "none" }}
                  type="button"
                  data-testid="modal"
                  class="btn btn-secondary"
                  onClick={(e) => {
                    handleAddToCustom(e);
                  }}
                  data-bs-dismiss="modal"
                >
                  Add Sing  to group
                </button>
                <button
                 
                  type="button"
                  data-testid="modal"
                  class="btn btn-secondary"
                  onClick={(e) => {
                    navigate("/Group", {state: {groupID: id}});
                  }}
                  data-bs-dismiss="modal"
                >
                  View Group
                </button>

                <button
                 
                  type="button"
                  data-testid="modal"
                  class="btn btn-danger"
                  onClick={(e) => {
                    handleDeleteGroup(e);
                  }}
                  data-bs-dismiss="modal"
                >
                  Delete Group
                </button>

              </div>

        </div>
        </div>
        </div>
            
            </>)  
        })}
        </>
    
    )
}