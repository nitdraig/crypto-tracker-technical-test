import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const isTokenValid = true;
      setIsAuthenticated(isTokenValid);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      const isTokenValid = true;
      setIsAuthenticated(isTokenValid);
    } else {
      setIsAuthenticated(false);
    }
    localStorage.setItem("token", newToken || "");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
