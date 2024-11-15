import { Navigate, Outlet } from "react-router-dom";
import useStore from "../store/authStore";

const AuthRoutes = () => {
  let { user } = useStore();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
