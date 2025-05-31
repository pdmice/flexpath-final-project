import React from "react";

export default function Error() {
  return (
    <div className="container-md">
      <h1>Oh No! There's been an error!</h1>

      <p>
        Hopefully you're not seeing this. If you are, maybe some info would help:
      </p>
      <p>{message}</p>
      <p>If not, maybe just try again and go <a href="http://localhost:5173">home</a></p>
    </div>
  );
}