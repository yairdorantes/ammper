import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Transaction from "../../components/specific/transactions/Transaction";
import { Anchor, Badge, Breadcrumbs, Button, Loader } from "@mantine/core";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loaderMore, setLoaderMore] = useState(false);

  const getTransactions = () => {
    setLoader(true);
    axios
      .get(
        `${BelvoApiUrl}/api/transactions/?link=${link}&page=1&page_size=${limit}&account=${account}`,
        {
          headers: { Authorization: authHeader },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
        if (res.data.results?.length === 0) {
          toast.info("No transactions found for this account.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch transactions.");
      })
      .finally(() => setLoader(false));
  };
  const getMoreTransactions = () => {
    setLoaderMore(true);
    axios
      .get(
        `${BelvoApiUrl}/api/transactions/?link=${link}&page_size=${limit}&page=${
          page + 1
        }&account=${account}`,
        {
          headers: { Authorization: authHeader },
        }
      )
      .then((res) => {
        setPage(page + 1);
        const results = res.data.results;
        const previousData = transactions.results;
        const newData = [...results, ...previousData];
        console.log(results, previousData);
        setTransactions({ ...transactions, results: newData });
        // if (res.data.results?.length === 0) {
        //   toast.info("No transactions found for this account.");
        // }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch transactions.");
      })
      .finally(() => setLoaderMore(false));
  };
  useEffect(() => {
    getTransactions();
  }, []);
  const goBack = () => {
    navigate(-1);
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
      <div className="text-center mt-28 font-extrabold text-3xl">
        <Badge variant="light" size="xl">
          Transactions
        </Badge>
      </div>
      {loader === false && transactions.results?.length === 0 && (
        <div className="text-center text-xl mt-40">
          <Badge color="red" size="lg">
            Sorry, No transactions found.
            <span className="underline cursor-pointer" onClick={goBack}>
              {" "}
              Take me back
            </span>
          </Badge>
        </div>
      )}
      {loader && (
        <div className="absolute flex items-center justify-start flex-col font-bold sm:text-2xl text-sm top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
          Fetching Transactions this could take a long time, please wait...
          <Loader size={"lg"} color="red" />
        </div>
      )}

      <div className="p-4 grid sm:grid-cols-2 grid-cols-1 w-fit gap-5  mx-auto ">
        {transactions.results &&
          transactions.results.map((transaction, i) => (
            <Transaction transaction={transaction} key={i} />
          ))}
      </div>
      <div className="flex justify-center mb-5">
        <Button disabled={loaderMore} onClick={getMoreTransactions}>
          {loaderMore ? <Loader size="sm" color="red" /> : "Load more"}
        </Button>
      </div>
    </div>
  );
};

export default Transactions;
