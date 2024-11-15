import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Transaction from "../../components/specific/transactions/Transaction";
import { Anchor, Badge, Breadcrumbs, Loader } from "@mantine/core";
import { toast } from "react-toastify";
import NavBar from "../../components/common/NavBar";
const BelvoApiUrl = import.meta.env.VITE_BELVO_API_URL;
const username = import.meta.env.VITE_BELVO_API_ID;
const password = import.meta.env.VITE_BELVO_API_PASSWORD;

const authHeader = "Basic " + btoa(username + ":" + password);

const Transactions = () => {
  const navigate = useNavigate();

  const { link, account, bankName } = useParams();
  const [loader, setLoader] = useState(false);
  const [transactions, setTransactions] = useState({});

  const getTransactions = () => {
    setLoader(true);
    axios
      .get(
        `${BelvoApiUrl}/api/transactions/?link=${link}&page_size=${10}&account=${account}`,
        {
          headers: { Authorization: authHeader },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch transactions.");
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const goBack = () => {
    navigate(-1); // Go back one page
  };
  const items = [
    { title: "Banks", href: "/banks" },
    { title: "Accounts", href: `/banks/${bankName}/accounts` },
    { title: "Transactions", href: "" },
    // { title: "use-id", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <NavBar />

      <div className="fixed top-16 backdrop-blur-md bg-opacity-25 p-4 bg-black w-fit rounded-md">
        <Breadcrumbs>{items}</Breadcrumbs>
      </div>
      {/* <div className="text-center mt-10 font-extrabold text-3xl">
        <Badge variant="light" size="xl">
          Transactions
        </Badge>
      </div> */}
      {loader === false && transactions.results?.length === 0 && (
        <div className="text-center text-xl mt-40">
          <Badge color="red" size="lg">
            Sorry, No transactions found .
            <span className="underline cursor-pointer" onClick={goBack}>
              {" "}
              Take me back
            </span>
          </Badge>
        </div>
      )}
      {loader && (
        <div className="absolute font-bold text-2xl top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
          Fetching Transactions, please wait...
          <Loader size={"lg"} color="red" />
        </div>
      )}
      <div className="p-4 grid sm:grid-cols-2 grid-cols-1 w-fit gap-5 mt-24 mx-auto ">
        {transactions.results &&
          transactions.results.map((transaction, i) => (
            <Transaction transaction={transaction} key={i} />
          ))}
      </div>
    </div>
  );
};

export default Transactions;
