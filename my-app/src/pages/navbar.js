import { useSignOut} from "react-auth-kit"
import { Link } from "react-router-dom"

function Navbar () {
    const signOut = useSignOut(); 
    return (
    <div>
     
        <Link to="/">Home</Link>
        <Link to="/profile">Profile </Link>
        <Link to="/supplier-management">SupplierManagement</Link>
        <Link to="/ingredient-management"> IngredientManagement</Link>
        <button onClick={() => signOut()}>SignOut </button>
    </div>
    )
}

export default Navbar