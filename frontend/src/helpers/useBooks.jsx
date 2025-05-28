import { useState, useEffect } from "react";

export function useBooks(id) {
  const [books, setBooks] = useState();
  const [errorState, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`http://localhost:8080/api/books`);
        const json = await response.json();
        console.log("Fetched JSON:", json);
        setBooks(json);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);
  console.log(books);
  return { books };
}
