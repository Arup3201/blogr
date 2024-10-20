import { createContext } from "react";

export const AuthContext = createContext({
  isLoading: false,
  setIsLoading: function (state) {
    return { isLoading: state };
  },
});
