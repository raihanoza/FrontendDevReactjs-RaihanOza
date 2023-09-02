import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DetailPage from "./pages/DetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/detail/:restaurantsId",
    element: <DetailPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
