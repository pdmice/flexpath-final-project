/* import React, { useState, useEffect } from "react";

export default function useFetchSing(id) {
  const [data, setData] = useState();
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  console.error("In fetchSing id is: ", id);

  useEffect(() => {
    async function fetchData() {
      console.error(
        "***********************************************************Entering fetchData *******************************************************************"
      );
      await fetch(`http://localhost:8080/api/search/id/${id}`)
        .then((response) =>
          console.log("In fetchSing response.json is: ", response.json())
        )
        .then((json) => {
          setData(json);
          console.log("Data is: ", data);
          setLoading(false);
        })
        .catch((error) => console.error("UserSearch error was: ", error));
    }
    fetchData();
  }, [id]);

  console.log("In fetchSing data is: ", data);

  return { data, loading };
}
 */

import { useState, useEffect } from "react";

export function useFetchSing(id) {
  const [data, setData] = useState();
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  console.log("useFetchSing: id is", id);

  console.log("About to fire useEffect");

  useEffect(() => {
    console.log("🔥 useEffect (no deps) ran on mount");
  }, []);

  /* useEffect(() => {
    if (!id) {
      console.warn("useFetchSing: id is falsy, skipping fetch");
      return;
    }

    async function fetchData() {
      console.error("✅ Entering fetchData");

      try {
        const response = await fetch(
          `http://localhost:8080/api/search/id/${id}`
        );
        const json = await response.json();
        console.log("Fetched JSON:", json);
        setData(json);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { data, loading, error: errorState }; */
}
