/* import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = useContext();

const [token, setToken_] = useState(localStorage.getItem("token"))
const [header, setHeader] = useState(`token: ${token}`)

const AuthProvider = ({ children }) => {

}

const setToken = (newToken) => {
    setToken_(newToken)
}

useEffect(() =>{
    if (token) {
        setHeader(`token: ${token}`)
        localStorage.setItem('token',token)
    }else{
        localStorage.removeItem('token')
    }
}, [token]);

const contextValue = useMemo(
    () => ({token, setToken}),[token]
);

return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
)

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider; */
