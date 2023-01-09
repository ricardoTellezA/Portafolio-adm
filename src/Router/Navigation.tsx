import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Error404 from "../Components/Error404/Error404";
import "@shopify/polaris/build/esm/styles.css";
import FormUser from "../Components/FormUser/FormUser";

const Navigation = () => {


  const Router = createBrowserRouter([

    {
      path: "/user",
      element: <FormUser />,
      errorElement: <Error404 />,
    },

 

  
  ]);

  return <RouterProvider router={Router} />;
};

export default Navigation;
