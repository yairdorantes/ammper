import { Avatar } from "@mantine/core";
import { FaCalendarAlt, FaHashtag, FaStore, FaUser } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { LuArrowDownLeft, LuArrowUpRight } from "react-icons/lu";
import { CiTextAlignLeft } from "react-icons/ci";
import { BsCurrencyExchange } from "react-icons/bs";
interface Transaction {
  id: number;
  amount: number;
  category: string;
  description: string;
  transaction_date: string;
  type: string;
  transaction_status: string;
}
interface Props {
  transaction: Transaction;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Transaction = ({ transaction }: Props) => {
  return (
    <div>
      <div className="w-full max-w-sm mx-auto p-4 border border-gray-500 rounded-md border-opacity-40">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2
            className={`text-2xl font-bold ${
              transaction.status === "PROCESSED"
                ? "text-teal-600"
                : "text-yellow-600"
            } `}
          >
            {transaction.status}
          </h2>
          <div
            className={`font-semibold ${
              transaction.type == "OUTFLOW" ? "bg-red-500" : "bg-green-500 "
            }  rounded px-2 py-1 text-white`}
          >
            <span className="flex items-center text-sm ">
              {transaction.type == "OUTFLOW" ? (
                <LuArrowUpRight size={24} />
              ) : (
                <LuArrowDownLeft size={24} />
              )}
              {transaction.type}
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Amount</p>
            <p className="text-2xl font-bold flex  items-center">
              <FiDollarSign /> {transaction.amount}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                Category
              </span>
              <span className="font-semibold truncate">
                {transaction.category ? transaction.category : "-"}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">
                Subcategory
              </span>
              <span className="font-semibold">
                {transaction.subcategory ? transaction.subcategory : "-"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-md border  p-4">
            <Avatar src={transaction.merchant.logo}>
              <FaStore />
            </Avatar>
            <div>
              <p className="text-sm truncate font-medium leading-none">
                {transaction.merchant.name}
              </p>
              <a
                href={transaction.merchant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Visit website
              </a>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt />
                <span className="text-sm font-medium">Accounting Date</span>
              </div>
              <span className="text-sm">
                {formatDate(transaction.accounting_date)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt />
                <span className="text-sm font-medium">Value Date</span>
              </div>
              <span className="text-sm">
                {formatDate(transaction.value_date)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiDollarSign />
                <span className="text-sm font-medium">
                  Balance After Transaction
                </span>
              </div>
              <span className="text-sm font-semibold flex items-center">
                <FiDollarSign /> {transaction.balance}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CiTextAlignLeft />
                <span className="text-sm font-medium">Description</span>
              </div>
              <span className="text-sm truncate max-w-56 ">
                {transaction.description}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BsCurrencyExchange />
                <span className="text-sm font-medium">Currency</span>
              </div>
              <span className="text-sm">{transaction.currency}</span>
            </div>
          </div>
          <div className="text-xs truncate text-muted-foreground">
            Transaction ID: {transaction.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
