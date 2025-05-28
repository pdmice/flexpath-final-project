import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export function useUUID(username) {
  const [uuid, setUUID] = useState();
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  console.log("In useUUID username is: ", username);

  useEffect(() => {
    async function fetchUUID() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${username}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${JSON.stringify(token)
                .split(":")[2]
                .split(",")[0]
                .replace(/"/g, "")}`,
            },
          }
        );
        const json = await response.json();
        console.log("Fetched JSON:", json);
        setUUID(json.uuid);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUUID();
  }, []);

  console.log("in useUUID uuid is: ", uuid);

  return { uuid };
}
