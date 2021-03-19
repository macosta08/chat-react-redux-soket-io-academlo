import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { ChatScreen } from "../components/chat/ChatScreen";
import { JoinScreen } from "../components/auth/JoinScreen";
export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/chat" component={ChatScreen} />
          <Route exact path="/singup" component={RegisterScreen} />
          <Route exact path="/join" component={JoinScreen} />
          <Redirect to="/join" />
        </Switch>
      </div>
    </Router>
  );
};
