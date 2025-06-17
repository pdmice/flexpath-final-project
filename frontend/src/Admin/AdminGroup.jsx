import React from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GroupTable from "../tables/GroupTable";
import AdminGroupTable from "./AdminGroupTable";

export default function AdminGroup({data}){

    const {authedUserName, token} = useContext(AuthContext)
    const [singIds, setSingIds] = useState([])
    const [groups, setGroups] = useState([]);
    const [groupID, setGroupID] = useState()
    const [id,setId] = useState()
    const navigate = useNavigate()

    const location = useLocation();
    const singID = location.state?.singID
    console.log("In PublicGroups data is: ", data)

    useEffect(() => {
        setGroups(data)
    }, [data])


  var strippedToken = "";
  if (token) {
    strippedToken = `${JSON.stringify(token)
      .split(":")[2]
      .split(",")[0]
      .replace(/"/g, "")}`;
  }

   const handleDeleteGroup =  (group) => {
        async function deleteGroup(){
            await fetch(`http://localhost:8080/api/users/custom/${authedUserName}/deleteGroup/${group}`, {
        headers: {
          Accept: "application/json",
          Authorization: strippedToken,
        },}
         )
         .then((response) => {
            if (response.ok){
                alert("Group deleted")
            }
         })
         .catch((error) => {alert("Error deleting group was:", error)})
        }
        deleteGroup()
     }

     const handleClick = (group) => {
        alert("Test deleting group: " + groupID)
     }



console.log("In groups data is: ", data)

    if (groups && groups.length > 0){
    return(
        <>
        <h2 className="text-center">Here are the Public groups for that user</h2>
        {groups.map((group, i) => {
            var num = parseInt(group.id)
            console.log("num is: ", num)
            return(
                <>
                <button
                      id="modalbutton"
                      data-testid="deleteGroupButton"
            
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteFromGroupModal"
                      onClick={() => {
                        setGroupID(group.id);
                      }} 
                    >
                <h4 className="text-center">{group.name}</h4>
                </button>
                <AdminGroupTable groupID={group.id} />


                {/****************************************** */}

          


                {/******************************************** */}
                </>
            )  
        })}


              <div
          class="modal fade"
          id="deleteFromGroupModal"
          tabindex="-1"
          aria-labelledby="isPublic Modal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 className="text-center" id="exampleModalLabel">
                  Delete
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
                Delete this group?
              
              </div>
              <div class="modal-footer d-flex justify-content-center flex-wrap gap-2">

             <button
                 
                  type="button"
                  data-testid="modal"
                  class="btn btn-danger"
                  onClick={() => {
                    handleDeleteGroup(groupID) 
                    /* handleClick(groupID) */
                  }}
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>



        
        </>
    
    )}
    else{
    return(<h3>No Groups Found</h3>)
    }
}