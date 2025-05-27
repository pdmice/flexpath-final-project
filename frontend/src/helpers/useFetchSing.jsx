import { useState, useEffect } from "react";

export function useFetchSing(id) {
  const [data, setData] = useState();
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  console.log("useFetchSing: id is", id);

  useEffect(() => {
    async function fetchData() {
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

  return { data, loading };
}
