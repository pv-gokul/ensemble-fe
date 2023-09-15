import "./App.scss";

import { RouterProvider } from "react-router-dom";
import { router } from "./config/routing";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
