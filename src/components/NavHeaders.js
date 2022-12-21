import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import contextApi from "../store/ContextApi";
import classes from "./NavHeaders.module.css";

const NavHeaders = () => {
  const ctx = useContext(contextApi);
  const logoutHandler = () => {
    ctx.isLogoutFunc();
  };
  return (
    <Fragment>
      <div className={classes.nav_headers}>
        <Link to="/DailyExpenses" className="text-white text-decoration-none h4">DailyExpenses</Link>
        <Link to="/Home" className="text-white text-decoration-none h4" >Home</Link>
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </Fragment>
  );
};

export default NavHeaders;
