import React from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import Table from "../../tables/Table";
import { useNavigate, useLocation } from "react-router-dom";
import Group from "./Group";
import GroupTable from "../../tables/GroupTable";


export default function PublicGroups({data}){

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

    var idArr = [];

    
    /* console.log("idArr is ", idArr)
    useEffect(() => {
        setSingIds(() => customGroupIdArray())
        for (let i =0; i < groups.length; i++){
            idArr.push(groups[i].id)
    }

    }, [authedUserName]) */
    



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
                <h4 className="text-center">{group.name}</h4>
                <GroupTable groupID={group.id} />
                </>
            )  
        })}
        
        </>
    
    )}
    else{
    return(<h3>Groups will go here</h3>)
    }
}