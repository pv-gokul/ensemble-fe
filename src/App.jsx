import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { router } from "./config/routing";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <Router>
      <AuthLayout>
        <Switch>
          {router.map((route) => (
            <Route key={route.path} path={route.path} exact component={route.Component} />
          ))}
        </Switch>
      </AuthLayout>
    </Router>
  );
}

export default App;
