import { ReactNode, useEffect, useState } from "react";
import { User } from "../types/types";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";

export interface AuthContextInterface {
  user: User | null;
  login: (username: string, password: string) => void;
  register: (
    username: string,
    password: string,
    comfirmPassword: string
  ) => void;
  logOut: () => void;
  error: string | null;
}

// Props for the provider
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (username: string, password: string) => {
    // Check if fields are empty
    if (!username.trim() || !password.trim()) {
      setError("Please input required fields.");
      return;
    }

    // Get saved user data from localStorage
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      setError("No user found. Please register first.");
      return;
    }

    const parsedLocalUser = JSON.parse(localUser);

    const localUsername = parsedLocalUser.username;
    const localPassword = parsedLocalUser.password;

    // Validate username
    if (username !== localUsername) {
      setError("Invalid username");
      return;
    }

    // Validate password
    if (password !== localPassword) {
      setError("Invalid password");
      return;
    }

    setUser({ username: localUsername, password: localPassword });
    setError(null);
  };

  const register = (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!username.trim()) {
      setError("Username must not empty!");
      return;
    }
    if (password.length < 5) {
      setError("Username must be greater than 5");
      return;
    }
    if (password !== confirmPassword) {
      setError("Both password should be equal");
    }

    const newAccount = {
      username,
      password,
    };
    setUser(newAccount);
    setError(null);
    localStorage.setItem("user", JSON.stringify(newAccount));
    toast.success("Successfully Registered! You may login now.");
  };

  // Logout function
  const logOut = () => {
    setUser(null); // Clear user data
    setError(null);
    localStorage.removeItem("user")
  };

  return (
    <AuthContext.Provider value={{ user, error, login, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
