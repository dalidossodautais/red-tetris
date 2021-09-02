import React, { useContext, useEffect } from "react";
import {
  HashRouter,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import {
  handlePath,
  handleUsername,
  unhandlePath,
  unhandleUsername,
} from "./middleware";
import Home from "./pages/Home";
import Room from "./pages/Room";
import WelcomeModal from "./pages/WelcomeModal";
import Provider, { Context } from "./Provider";

function AppSub() {
  const { setPathError, setTheme, setUsername, setUsernameError } = useContext(
    Context
  );
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    handlePath(history, location, setPathError);
    return () => {
      unhandlePath();
    };
  }, [history, location, setPathError]);
  useEffect(() => {
    handleUsername(setUsername, setUsernameError);
    return () => {
      unhandleUsername();
    };
  }, [setUsername, setUsernameError]);
  return (
    <>
      <Header onClick={setTheme}>Red Tetris</Header>
      <WelcomeModal />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Room />
        </Route>
      </Switch>
    </>
  );
}

export default function App() {
  return (
    <Provider>
      <HashRouter hashType="noslash">
        <AppSub />
      </HashRouter>
    </Provider>
  );
}
