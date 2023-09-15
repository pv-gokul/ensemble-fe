import { createBrowserRouter } from "react-router-dom";

import { CreateWorkflow, LoginPage } from "../pages";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/createWorkflow",
    Component: CreateWorkflow,
  },
  {
    path: "/home",
    Component: Home,
  },
]);

export { router }
