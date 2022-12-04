import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "../Components/Auth/Register/Register";
import '@shopify/polaris/build/esm/styles.css';

const Navigation = () => {
  const Router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
      //   errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={Router} />;
};

export default Navigation;
