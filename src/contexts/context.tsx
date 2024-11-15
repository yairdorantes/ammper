import { ReactNode } from "react";
import { Provider } from "zustand";
import useAuthStore from "../store/authStore";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={useAuthStore}>{children}</Provider>;
};

export default StoreProvider;
