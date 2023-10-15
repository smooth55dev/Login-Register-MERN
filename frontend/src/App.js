import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import all components

import Username from "./components/Auth/Username";
import Password from "./components/Auth/Password";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import Recovery from "./components/Auth/Recovery";
import PageNotFound from "./components/Auth/PageNotFound";
import Reset from "./components/Auth/Reset";

// auth middleware

import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

const router = createBrowserRouter([
  {
    path: "/", element: <Username></Username>,
  },
  {
    path: "/register", element: <Register></Register>,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery", element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
