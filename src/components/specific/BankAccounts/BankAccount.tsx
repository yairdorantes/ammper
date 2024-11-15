import { Badge } from "@mantine/core";
import { AiTwotoneBank } from "react-icons/ai";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
interface Account {
  agency: string;
  balance: {
    current: number;
    available: number;
  };
  balance_type: string;
  bank_product_id: string;
  category: string;
  collected_at: string; // ISO date string
  created_at: string; // ISO date string
  credit_data: string; // Assuming `credit_data` can have a structure or be null
  currency: string;
  id: string; // UUID
  institution: {
    name: string;
    type: string;
  };
  internal_identification: string;
  last_accessed_at: string; // ISO date string
  link: string; // UUID
  loan_data: {
    collected_at: string; // ISO date string
    credit_limit: number;
    cutting_day: string;
    cutting_date: string; // ISO date string
    next_payment_date: string; // ISO date string
  } | null; // Assuming `loan_data` can be null
  name: string;
  number: string;
  public_identification_name: string;
  public_identification_value: string;
  type: string;
}

interface Props {
  account: Account;
  link: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BankAccount = ({ account, link }: Props) => {
  return (
    <Link
      to={`/banks/${account.institution.name}/accounts/${account.id}/transactions/${link}`}
    >
      <div className="w-full   max-w-sm mx-auto p-4 border border-gray-400 rounded-md border-opacity-30">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-2xl font-bold truncate">{account.name}</h2>
          <Badge size="sm" variant="outline">
            {account.category}
          </Badge>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <AiTwotoneBank color="yellow" size={24} />
            <div>
              <p className="text-sm font-bold leading-none">
                {account.institution.name}
              </p>
              <p className="text-sm text-gray-300">
                Agency: {account.agency ? account.agency : "-"}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-teal-400">Current Balance</p>
              <p className="text-xl font-bold flex text-teal-400 items-center">
                <FiDollarSign /> {account.balance.current}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-blue-400">
                Available Balance
              </p>
              <p className="text-lg text-blue-400 font-bold flex items-center">
                {" "}
                <FiDollarSign /> {account.balance.available}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Account Number
              </span>
              <span className="font-semibold">{account.number}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">
                Public ID
              </span>
              <span className="font-semibold">
                {account.public_identification_value}
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FaCreditCard />
                <span className="text-sm">
                  Credit Limit:{" "}
                  {account.loan_data?.credit_limit
                    ? account.loan_data?.credit_limit.toLocaleString()
                    : "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt />
                <span className="text-sm">
                  Cutting Day:{" "}
                  {account.loan_data?.cutting_day
                    ? account.loan_data?.cutting_day
                    : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FiDollarSign />
              <span className="text-sm">
                Next Payment:{" "}
                {account.loan_data?.next_payment_date
                  ? formatDate(account.loan_data?.next_payment_date)
                  : "-"}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Last accessed:{" "}
            {account.loan_data && formatDate(account.last_accessed_at)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BankAccount;
