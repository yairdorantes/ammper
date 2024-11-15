import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BankAccount from "../../components/specific/BankAccounts/BankAccount";
import { Anchor, Badge, Breadcrumbs, Loader } from "@mantine/core";
import NavBar from "../../components/common/NavBar";
const BelvoApiUrl = import.meta.env.VITE_BELVO_API_URL;
const username = import.meta.env.VITE_BELVO_API_ID;
const password = import.meta.env.VITE_BELVO_API_PASSWORD;

const authHeader = "Basic " + btoa(username + ":" + password);
const BankAccounts = () => {
  const { bankName } = useParams();
  const [loader, setLoader] = useState(false);
  const [bankLink, setBankLink] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const navigate = useNavigate();

  const getBankLink = () => {
    setLoader(true);
    axios
      .get(`${BelvoApiUrl}/api/links/?institution=${bankName}`, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        console.log(res.data.results[0].id);
        setBankLink(res.data.results[0].id);
      })
      .catch((err) => {
        toast.error("Error trying to get bank's link. Try with another bank");
        navigate(-1);
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  const items = [
    { title: "Banks", href: "/banks" },
    { title: "Accounts", href: `/banks/${bankName}/accounts` },
    // { title: "Transactions", href: "" },
    // { title: "use-id", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const getBankAccounts = () => {
    setLoader(true);
    axios
      .post(
        `${BelvoApiUrl}/api/accounts/`,
        { link: bankLink },
        {
          headers: { Authorization: authHeader },
        }
      )
      .then((res) => {
        console.log(res.data);
        setBankAccounts(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch bank accounts. Try with another Bank");
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (bankLink.length > 0) {
      getBankAccounts();
    }
  }, [bankLink]);

  useEffect(() => {
    if (bankName.length > 0) {
      getBankLink();
    }
  }, [bankName]);

  return (
    <div>
      <NavBar />
      <div className="fixed top-16 backdrop-blur-md bg-opacity-25 p-4 bg-black w-fit rounded-md">
        <Breadcrumbs>{items}</Breadcrumbs>
      </div>
      {/* <div className="text-center mt-5 font-extrabold text-3xl">
        <Badge variant="light" size="xl">
          {bankName} Accounts
        </Badge>
      </div> */}
      {loader && (
        <div className="absolute font-bold text-2xl top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
          Fetching Accounts, please wait...
          <Loader size={"lg"} color="red" />
        </div>
      )}
      <div className="grid w-fit  p-4 mx-auto mt-20 gap-x-6 sm:grid-cols-3 grid-cols-1  gap-y-4 justify-center items-center">
        {bankAccounts &&
          bankAccounts.map((account, index) => (
            <BankAccount key={index} link={bankLink} account={account} />
          ))}
      </div>
    </div>
  );
};

export default BankAccounts;
