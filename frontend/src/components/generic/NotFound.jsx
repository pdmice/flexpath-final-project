import React from "react";

import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation()
  return (
    <div className="container">
      <h1> Sorry, We couldn't find {location.pathname.slice(1)}</h1>
    </div>
  );
}
