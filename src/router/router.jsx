import { createBrowserRouter } from "react-router-dom";
import LandingAll from "../pages/landingAll";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   loader: () => redirect("/?type=ALL"),
  // },
  {
    path: "/",
    element: <LandingAll />,
  },
]);

export default router;
