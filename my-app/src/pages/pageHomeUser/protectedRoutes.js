import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./navbar";

const ProtectedRoutes = ({auth}) => {
    return (auth === true ? <>
        <Navbar />
        <Outlet />
      </> : <Navigate to="/login" />)
}
export default ProtectedRoutes;
