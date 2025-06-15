import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useUUID } from "../../helpers/useUUID";




export default function CreateCustomGroup(){

    const [groupName, setGroupName] = useState();
    const [isPublic, setIsPublic] = useState(1)
    const {authedUserName, token } = useContext(AuthContext)
    const { uuid } = useUUID(authedUserName);
    


    const handleName = (e) => {
        setGroupName(e.target.value)
    }

    const handlePublic = (e) => {
        setIsPublic(e)
    }

    var postBody = `{"uuid": "${uuid}", "isPublic":"${isPublic}", "name":"${groupName}"}`


    const handleSubmit = (e) => {
        e.preventDefault();

        async function postGroup(postBody){
            fetch(`http://localhost:8080/api/users/custom/add/${authedUserName}`,
                {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${JSON.stringify(token)
              .split(":")[2]
              .split(",")[0]
              .replace(/"/g, "")}`,
          },
          body: postBody
        })
        .then((reponse) => {
            reponse.ok ? alert("Custom Group Created") : alert("Something has gone awry")
        })
        }
        postGroup(postBody)
    }


     return (
    <>
      <div className="container-md">
        <h1 className="text-center">
          {" "}
          Create A New Grouping of Sings
        </h1>

        <p className="text-center">
          {" "}
          Give your custom group a name
        </p>
        

        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="mt-3">Name</p>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="My Custom Group"
            onChange={(e) => handleName(e)}
            required
          ></input>
          {/************************************************************* */}
             <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="makePublic"
            id="makePublic"
            data-testid="makePublic"
            onChange={() => handlePublic(1)}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Make Group Public
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="makePublic"
            id="makePrivate"
            data-testid="makePrivate"
            onChange={() => handlePublic(0)}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Make Group Private
          </label>
        </div>



          {/************************************************************** */}
          

          <div className=" border-top mt-1 d-grid gap-2">
            <button type="submit" className="btn  btn-outline-secondary">
              Create Group!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}