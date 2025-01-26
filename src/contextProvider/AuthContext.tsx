import { createContext } from "react";
import { AuthContextInterface } from "./AuthContextProvider";


const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export default AuthContext