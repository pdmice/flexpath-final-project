import React from "react";
import {useState, useEffect, useContext} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import AdminGroupSearch from "./AdminUserGroupSearch";

export default function AdminPage(){

const navigate = useNavigate()
const {authedUserName} = useContext(AuthContext)
const [loading,setLoading] = useState()
const [errorState, setErrorState] = useState()
console.log("In adminPage authedUsername is: ", authedUserName)

useEffect(() => {
    if (authedUserName !== "admin"){
    navigate("/Login")
}
}, [authedUserName])


    return(
        <>
        <AdminGroupSearch loading={loading} setLoading={setLoading} errorState={errorState} setErrorState={setErrorState}/>
        </>
    )
}