import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/Layout/RootLayout";
import { Suspense } from "react";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import { AuthContextProvider } from "./contextProvider/AuthContextProvider";
import HomePage from "./pages/homepage/HomePage";
import TodoPage from "./pages/todoPage/TodoPage";
import TodoContextProvider from "./contextProvider/TodoContextProvider";
import About from "./pages/aboutPage/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
      },
      {
        path: "/about",
        element: <About/>,
      },

      // NOT FOUND PAGE
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Suspense>
      <AuthContextProvider>
        <TodoContextProvider>
          <RouterProvider router={router} />
        </TodoContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}
