import { createContext, useState } from "react";

export const AuthContext = createContext({
  auth: {},
  setAuth: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
