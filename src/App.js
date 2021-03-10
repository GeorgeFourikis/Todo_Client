import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Import Components here
import Login from "./components/Login";
import Register from "./components/Register";
import TodosComponent from "./components/Todos";
import Landing from "./components/LandingPage";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3030/auth/verifyToken", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error("checkAuthenticated error: ", err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/todos" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/todos" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/todos" />
                )
              }
            />
            <Route
              exact
              path="/todos"
              render={(props) =>
                isAuthenticated ? (
                  <TodosComponent {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
