import React, { createContext, useContext, ReactNode } from "react";
import { useMutation, useQueryClient } from "react-query";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  const loginMutation = useMutation(
    async (loginData: { username: string; password: string }) => {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
  );

  const registerMutation = useMutation(
    async (registerData: { username: string; password: string }) => {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
    }
  );

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const register = async (username: string, password: string) => {
    await registerMutation.mutateAsync({ username, password });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    queryClient.clear();
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
