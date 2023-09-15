import { CreateWorkflow, LoginPage } from "../pages";
import Home from "../pages/home/Home";
import Console from "../pages/console/Console";

const router = [
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
  {
    path: "/console",
    Component: Console,
  },
];

export { router };
