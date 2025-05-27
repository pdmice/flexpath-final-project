import { useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";


export function useChangeSing(data) {
  /* const [data, setData] = useState(); */
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  const {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    role,
    setRole,
    userName,
    setUserName,
    loginFailed,
    setLoginFailed,
  } = useContext(AuthContext);


  console.log("useChangeSing: data is", data);

  useEffect(() => {
    async function postData() {
        const post = `${JSON.stringify(data)}`;
        await fetch(`http://localhost:8080/api/sings/update/${JSON.stringify(data.id)}`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: post,
        })
          .then((response) => {
            response.ok ? navigate("/MySings") : navigate("/Error");
          })
          .catch((error) => console.error(error));
      }
      postData();
  }, [data]);

  return { };
}
