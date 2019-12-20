import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jokes from "./components/jokes";
import Login from "./components/login";
import Register from "./components/register";

import { PrivateRoute } from "./utils/privateroute.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/jokes">
          <Route exact path="/jokes" render={props => <Jokes {...props} />} />
        </PrivateRoute>
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/" render={props => <Login {...props} />} />
      </div>
    </Router>
  );
}

export default App;
