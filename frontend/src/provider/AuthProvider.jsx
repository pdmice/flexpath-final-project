import React, { createContext } from "react";
import { useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const jwt = localStorage.getItem("jwt");
  const [token, setToken] = useState(jwt ? jwt : null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loginFailed, setLoginFailed] = useState(false);
  const [authedUserName, setAuthedUserName] = useState(null)
  
  
  
  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsLoggedIn,
          isAdmin,
          setIsAdmin,
          role,
          setRole,
          userName,
          setUserName,
          loginFailed,
          setLoginFailed,
          authedUserName,
          setAuthedUserName
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
