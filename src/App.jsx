import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/home/Home";
import Console from "./pages/console/Console";
import AiModelsList from "./pages/ai-models/AiModelsList";
import { CreateWorkflow, LoginPage } from "./pages";
import Compare from "./pages/compare/Compare";
import WorkflowTest from "./pages/workflow-test/WorkflowTest";

function App() {
  return (
    <BrowserRouter>
      <AuthLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/console" element={<Console />} />
          <Route path="/models" element={<AiModelsList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createWorkflow" element={<CreateWorkflow />} />
          <Route path="/workflow/edit/:id" element={<CreateWorkflow />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/workflow/test/:id" element={<WorkflowTest />} />
        </Routes>
      </AuthLayout>
    </BrowserRouter>
  );
}

export default App;
