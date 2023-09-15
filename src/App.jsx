import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/home/Home";
import Console from "./pages/console/Console";
import AiModelsList from "./pages/ai-models/AiModelsList";
import { CreateWorkflow, LoginPage } from "./pages";
import Compare from "./pages/compare/Compare";
import WorkflowTest from "./pages/workflow-test/WorkflowTest";
import TemplatesList from "./pages/templates-list/TemplatesList";

import NoAuthLayout from "./layout/NoAuthLayout";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  return (
    <BrowserRouter>
      {isAuth ? (
        <AuthLayout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/console" element={<Console />} />
            <Route path="/models" element={<AiModelsList />} />
            <Route path="/createWorkflow" element={<CreateWorkflow />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/workflow/test/:id" element={<WorkflowTest />} />
            <Route path="/workflow/edit/:id" element={<CreateWorkflow />} />
            <Route path="/templates" element={<TemplatesList />} />
          </Routes>
        </AuthLayout>
      ) : (
        <NoAuthLayout>
          <Routes>
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        </NoAuthLayout>
      )}
    </BrowserRouter>
  );
}

export default App;
