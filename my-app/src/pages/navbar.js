import { useSignOut, useAuthUser} from "react-auth-kit"
import { Link } from "react-router-dom"

function Navbar () {
    const signOut = useSignOut(); 
    const auth = useAuthUser()
    return (
    <div>
        Navbar
        <Link to="/">Home</Link>
        <Link to="/profile">Profile </Link>
        <Link to="/supplier-management">SupplierManagement</Link>
        <button onClick={() => signOut()}>SignOut </button>
    </div>
    )
}

export default Navbar