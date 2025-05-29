import React from "react";
import { useLocation } from "react-router-dom";

export default function EditSelect({ setEditType }) {
  const handleEditType = (editType) => {
    setEditType(editType);
  };

  return (
    <div
      className="dropdown"
      style={{
        display: useLocation().pathname === "/MySings" ? "block" : "none",
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
            onClick={() => handleEditType("created")}
          >
            Added to the DB
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleEditType("attending")}
          >
            Planned to attend
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleEditType("attended")}
          >
            Already Attended
          </button>
        </li>
      </ul>
    </div>
  );
}
