import { useContext } from "react";
import TodoContext from "../contextProvider/TodoContext";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
