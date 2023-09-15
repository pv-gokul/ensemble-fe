import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { router } from "./config/routing";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <Router>
      <Switch>
        <AuthLayout>
          {router.map((route) => (
            <Route
              path={route.path}
              component={route.Component}
              key={route.path}
            />
          ))}
        </AuthLayout>
      </Switch>
    </Router>
  );
}

export default App;
