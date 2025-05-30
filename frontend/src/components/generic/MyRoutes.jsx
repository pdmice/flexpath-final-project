import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "../search/Search";
import Login from "./Login";
import NotFound from "./NotFound";
import SignUp from "./Signup";
import MySings from "../userPages/MySings";
import UpdateSing from "../userPages/UpdateSing";
import CreateSing from "../userPages/CreateSing";

export default function MyRoutes({
  searchType,
  setSearchType,
  editType,
  setEditType,
  loading,
  setLoading,
  errorState,
  setErrorState,
}) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/search"
        element={
          <Search
            searchType={searchType}
            setSearchType={setSearchType}
            loading={loading}
            setLoading={setLoading}
            errorState={errorState}
            setErrorState={setErrorState}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/MySings"
        element={<MySings editType={editType} setEditType={setEditType} />}
      />
      <Route
        path="/UpdateSing/:id"
        element={<UpdateSing editType={editType} />}
      />
      <Route path="/CreateSing" element={<CreateSing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
