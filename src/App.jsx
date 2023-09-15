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
              key={route.path}
              path={route.path}
              exact
              component={route.Component}
            />
          ))}
        </AuthLayout>
      </Switch>
    </Router>
  );
}

export default App;
