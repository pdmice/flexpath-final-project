import React, { useContext } from "react";
import {useState} from "react"
import {useLocation} from "react-router-dom"
import Groups from "./Groups";

export default function EditGroup(){
    const location = useLocation();
    const singID = location.state?.singID
    
    console.log("In Edit Group singID is: ", singID)


    return(
        <>
        <h1 className="text-center"> Click one of you Groups </h1>
        <Groups singID={singID}/>
        </>
    )

}