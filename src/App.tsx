import MyRouter from "./router/MyRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="">
      <MyRouter />
      <ToastContainer />
    </div>
  );
};

export default App;
