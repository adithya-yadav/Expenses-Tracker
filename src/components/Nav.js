import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import NavHeaders from "./NavHeaders";
import DailyExpense from "./pages/DailyExpenses";
import Home from "./pages/Home";
import SignUpLogin from "./SignUpLogin./SignUpLogin";

const Nav = () => {
  const isLogin = useSelector(state=>state.auth.isAuthentication)

  return (
    <Fragment>
      {isLogin && (
        <>
        <NavHeaders/>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/DailyExpenses">
          <DailyExpense/>
        </Route>
        <Route path="*">
        <Redirect to="/DailyExpenses"/>
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
