import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function EditSelect({ setEditType }) {
  const handleEditType = (editType) => {
    setEditType(editType);
  };

  const navigate = useNavigate();

  const {isLoggedIn} = useContext(AuthContext)

  return (
    <div
      className="dropdown ms-2"
      data-testid="editSelectDropDown"
      style={{
        display: isLoggedIn ? "block" : "none",
      }}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="edit-selection"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sings I've...
      </button>
      <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="edit">
        <li>
          <button
            className="dropdown-item "
            onClick={() =>{ 
              navigate('/MySings', {state: {editType: "created"}})
              handleEditType("created")}}
          >
            Added to the DB
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => {
              navigate('/MySings', {state: {editType: "attending"}})
              handleEditType("attending")}}
          >
            Planned to attend
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => {
              navigate('/MySings', {state: {editType: "attended"}})
              handleEditType("attended")}}
          >
            Already Attended
          </button>
        </li>
      </ul>
    </div>
  );
}
