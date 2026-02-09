import { createBrowserRouter, redirect } from "react-router-dom";
import LandingAll from "../pages/landingAll";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/landing?type=ALL"),
  },
  {
    path: "/landing",
    element: <LandingAll />,
  },
]);

export default router;
