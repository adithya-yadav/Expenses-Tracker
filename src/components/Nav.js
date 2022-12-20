import { Fragment, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import contextApi from "../store/ContextApi";
import Home from "./pages/Home";
import SignUpLogin from "./SignUpLogin./SignUpLogin";

const Nav = () => {
  const ctx = useContext(contextApi);
  const { isLogin } = ctx;
  return (
    <Fragment>
      {isLogin && (
        <>
        <Route path="/Home">
          <Home />
          <>hello</>
        </Route>
        <Route path="*">
        <Redirect to="/Home"/>
      </Route>
        </>
      )}

      {!isLogin && (
        <>
          <Route path="/loginSignup">
            <SignUpLogin />
          </Route>
          <Route path="*">
            <Redirect to="/loginSignup" />
          </Route>
        </>
      )}
    </Fragment>
  );
};

export default Nav;
