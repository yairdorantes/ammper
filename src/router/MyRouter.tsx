import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Banks from "../pages/banks/Banks";
import BankAccounts from "../pages/banks/BankAccounts";
import Transactions from "../pages/transactions/Transactions";
import AuthRoutes from "./AuthRoutes";
import Page404 from "../pages/404/Page404";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AuthRoutes />}>
        <Route path="/banks" element={<Banks />} />
        <Route path="/banks/:bankName/accounts/" element={<BankAccounts />} />
        <Route
          path="/banks/:bankName/accounts/:account/transactions/:link"
          element={<Transactions />}
        />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default MyRouter;
