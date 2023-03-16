import { useSignOut, useAuthUser} from "react-auth-kit"
import { Link } from "react-router-dom"

function Navbar () {
    const signOut = useSignOut(); 
    const auth = useAuthUser()
    console.log(auth())
    return (
    <div>
        Navbar
        <Link to="/">Home</Link>
        <Link to="/profile">Profile </Link>
        <button onClick={() => signOut()}>SignOut </button>
    </div>
    )
}

export default Navbar