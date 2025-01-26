import { ReactNode, useEffect, useState } from "react";
import { ListContainer } from "../types/types";
import TodoContext from "./TodoContext";
import toast from "react-hot-toast";

export interface TodoListContextInterface {
  todo: ListContainer[];
  addList: (listName: string) => void;
  deleteList: (id: number) => void;
  addTodoInList: (listId: number, title: string) => void;
  deleteTodoInList: (listId: number, todoId: number) => void;
  setAsComplete: (listId: number, todoId: number) => void;
  editList: (listId: number, newName: string) => void;
  editTodoInList: (listId: number, todoId: number, newList: string) => void;
}

interface TodoContextProviderProps {
  children: ReactNode;
}

export default function TodoContextProvider({
  children,
}: TodoContextProviderProps) {
  const [todo, setTodo] = useState<ListContainer[]>([]);

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    console.log("Loaded from localStorage:", storedList);
    if (storedList) {
      setTodo(JSON.parse(storedList));
    }
  }, []);

  const addList = (listName: string) => {
    if (!listName.trim()) return;

    // Update the todo state and immediately persist to localStorage
    setTodo((prev) => {
      const newTodo = [
        ...prev,
        {
          id: Date.now(),
          listName,
          addedDate: new Date(),
          todos: [],
        },
      ];

      // Persist the updated state to localStorage
      localStorage.setItem("todoList", JSON.stringify(newTodo));
      return newTodo; //
    });
    toast.success("Added New List");
  };

  const editList = (listId: number, newName: string) => {
    if (!newName.trim()) return;

    setTodo((prev) => {
      const updatedTodo = prev.map((list) =>
        list.id === listId ? { ...list, listName: newName } : list
      );

      // Persist the updated state to localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedTodo));
      return updatedTodo; //
    });
    toast.success("Updated List");
  };

  const deleteList = (id: number) => {
    setTodo((prev) => {
      const updatedTodo = prev.filter((list) => list.id !== id);
      localStorage.setItem("todoList", JSON.stringify(updatedTodo)); // Persist updated state to localStorage
      return updatedTodo;
    });
    toast.success("Succesfully Deleted List");
  };

  const addTodoInList = (listId: number, title: string) => {
    setTodo((prev) => {
      const updatedTodos = prev.map((list) =>
        list.id === listId
          ? {
              ...list, // Ensure a new object for the updated list
              todos: [
                ...list.todos, // Ensure a new array for todos
                {
                  id: Date.now(),
                  title,
                  completed: false,
                },
              ],
            }
          : list
      );

      localStorage.setItem("todoList", JSON.stringify(updatedTodos)); // Persist in localStorage
      return updatedTodos; // Return a new reference
    });
  };

  const editTodoInList = (listId: number, todoId: number, newList: string) => {
    setTodo((prev) => {
      const updatedTodo = prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((prev) =>
                prev.id === todoId
                  ? {
                      ...prev,
                      title: newList,
                    }
                  : prev
              ),
            }
          : list
      );

      localStorage.setItem("todoList", JSON.stringify(updatedTodo)); // Persist in localStorage
      return updatedTodo; // Return a new reference
    });
  };

  const deleteTodoInList = (listId: number, todoId: number) => {
    setTodo((prev) => {
      const updatedTodos = prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.filter((todo) => todo.id !== todoId),
            }
          : list
      );

      localStorage.setItem("todoList", JSON.stringify(updatedTodos)); // Persist in localStorage
      return updatedTodos; // Return a new reference
    });
  };

  const setAsComplete = (listId: number, todoId: number) => {
    setTodo((prev) => {
      const updatedTodos = prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : list
      );

      localStorage.setItem("todoList", JSON.stringify(updatedTodos)); // Persist in localStorage
      return updatedTodos; // Return a new reference
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        addList,
        deleteList,
        addTodoInList,
        deleteTodoInList,
        setAsComplete,
        editList,
        editTodoInList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
