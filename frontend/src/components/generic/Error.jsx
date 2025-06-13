import React from "react";

export default function Error(message) {

  var errorMessage;
  if (message){errorMessage = message}else{errorMessage = "No error specified"}
  console.log("message is: ", errorMessage)
  return (
    <div className="container-md">
      <h1>Oh No! There's been an error!</h1>

      <p>
        Hopefully you're not seeing this. If you are, maybe some info would help:
      </p>
      <p>{errorMessage[0]}</p>
      <p>If not, maybe just try again and go <a href="http://localhost:5173">home</a></p>
    </div>
  );
}