import { useEffect, useState } from "react";
import BankCard from "../../components/specific/banks/BankCard";
import axios from "axios";
import { toast } from "react-toastify";
const BelvoApiUrl = import.meta.env.VITE_BELVO_API_URL;
const username = import.meta.env.VITE_BELVO_API_ID;
const password = import.meta.env.VITE_BELVO_API_PASSWORD;

const authHeader = "Basic " + btoa(username + ":" + password);
const Banks = () => {
  const [banksData, setBanksData] = useState({});
  const [loader, setLoader] = useState(false);
  const getBanks = () => {
    setLoader(true);
    axios
      .get(`${BelvoApiUrl}/api/institutions/`, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        console.log(res.data); // Logs the fetched banks data
        setBanksData(res.data);
      })
      .catch((err) => {
        console.log(err); // Logs any errors
        toast.error("Failed to fetch banks");
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getBanks();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-6 sm:p-24 p-6">
        {loader && <div>Loading...</div>}
        {banksData.results &&
          banksData.results.map((bank, index) => (
            <BankCard key={index} bank={bank} />
          ))}
      </div>
    </div>
  );
};

export default Banks;
