import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Banks from "../pages/banks/Banks";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/banks" element={<Banks />} />
      <Route path="/banks/:id" element={<Banks />} />
    </Routes>
  );
};

export default MyRouter;
