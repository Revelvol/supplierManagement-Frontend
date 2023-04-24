import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const signOut = useSignOut();
  const [active, setActive ] = useState("")

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${active === "link-profile" ? "active" : ""}`}>
            <Link id="link-profile" onClick={handleClick} className="nav-link" to="/profile">Profile </Link>
          </li>
          <li className={`nav-item ${active === "link-supplier-management" ? "active" : ""}`}>
            <Link id="link-supplier-management" onClick={handleClick} className="nav-link" to="/supplier-management">SupplierManagement</Link>
          </li>
          <li className={`nav-item ${active === "link-ingredient-management" ? "active" : ""}`}>
            <Link id="link-ingredient-management" onClick={handleClick} className="nav-link" to="/ingredient-management"> IngredientManagement</Link>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-outline-danger my-2 my-sm-0"
          onClick={() => signOut()}
        >
          SignOut{" "}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
