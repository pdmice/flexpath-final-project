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
        Edit Selection
      </button>
      <ul
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby="edit"
      >
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleEditType("created")}
          >
            Sings I've Added
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleEditType("attending")}
          >
            Sings I'm Going to
          </button>
        </li>
        <li>
          <button
            className="dropdown-item "
            onClick={() => handleEditType("attended")}
          >
            Sings I've Gone To
          </button>
        </li>
      </ul>
    </div>
  );
}
