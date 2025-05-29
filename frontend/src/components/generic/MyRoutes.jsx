import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "../search/Search";
import Login from "./Login";
import NotFound from "./NotFound";
import LoginButton from "../../buttons/LoginButton";
import SearchSelect from "../../buttons/SearchSelect";
import SignUp from "./Signup";
import MySings from "../userPages/MySings";
import Settings from "../userPages/Settings";
import UpdateSing from "../userPages/UpdateSing";
import EditSelect from "../../buttons/EditSelect";
import CreateSing from "../userPages/CreateSing";

export default function MyRoutes({
  searchType,
  setSearchType,
  editType,
  setEditType,
  loading,
  setLoading
}) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/search"
        element={
          <Search searchType={searchType} setSearchType={setSearchType} loading={loading} setLoading={setLoading}/>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/MySings"
        element={<MySings editType={editType} setEditType={setEditType} />}
      />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/UpdateSing/:id" element={<UpdateSing editType={editType}/>} />
      <Route path="/CreateSing" element={<CreateSing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
