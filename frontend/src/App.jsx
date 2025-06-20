import { React, useState , useContext} from "react";
import { Link } from "react-router-dom";
import LoginButton from "./buttons/LoginButton";
import SearchSelect from "./buttons/SearchSelect";
import EditSelect from "./buttons/EditSelect";
import MyRoutes from "./components/generic/MyRoutes";
import { AuthContext } from "./provider/AuthProvider";


function App() {
  const [searchType, setSearchType] = useState("location");
  const [editType, setEditType] = useState("created");
  const [loading, setLoading] = useState(false)
  const [errorState, setErrorState] = useState(false)
 const {authedUserName} = useContext(AuthContext)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/" className="navbar-brand ms-4 nav-link fs-4">
          Home
        </Link>
        <Link to="/search" className="navbar-brand ms-4 nav-link fs-4">
          Search
        </Link>
        <Link to="/AdminPage" className="navbar-brand ms-4 nav-link fs-4"
        style={{
                display: authedUserName === "admin" ? "block" : "none",
              }}
        >
          Admin
        </Link>
        <SearchSelect search={searchType} setSearchType={setSearchType} />
        <EditSelect editType={editType} setEditType={setEditType} />
        <LoginButton />
      </nav>
      <hr />
      <MyRoutes
        searchType={searchType}
        setSearchType={setSearchType}
        editType={editType}
        setEditType={setEditType}
        loading={loading}
        setLoading={setLoading}
        errorState={errorState}
        setErrorState={setErrorState}
      />
    </div>
  );
}

export default App;
