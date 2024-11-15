import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const useStore = create((set) => {
  let token = localStorage.getItem("authToken");
  if (token) {
    const data = jwtDecode(token);
    token = data;
  } else token = null;
  return {
    user: token || null,
    setUser: (data: object) => {
      localStorage.setItem("authToken", data.access);
      const userData = jwtDecode(data.access);
      set({ user: userData });
    },

    logout: () => {
      localStorage.removeItem("authToken");
      return Promise.resolve();
    },
  };
});

export default useStore;
