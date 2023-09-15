import { CreateWorkflow, LoginPage } from "../pages";
import Home from "../pages/home/Home";
import Console from "../pages/console/Console";
import Compare from "../pages/compare/Compare";
import WorkflowTest from "../pages/workflow-test/WorkflowTest";
import AiModelsList from "../pages/ai-models/AiModelsList";

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
  {
    path: "/compare",
    Component: Compare,
  },
  {
    path:"/workflow/test/:id",
    Component: WorkflowTest
  },
  {
    path: "/models",
    Component: AiModelsList,
  }
];

export { router };
