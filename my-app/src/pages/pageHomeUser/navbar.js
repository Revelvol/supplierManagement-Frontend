import { useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

function Navbar() {
  const signOut = useSignOut();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/supplier-management">SupplierManagement</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ingredient-management"> IngredientManagement</Link>
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
