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
        <Link to="/DailyExpenses" className={classes.header}>DailyExpenses</Link>
        <Link to="/Home"className={classes.header} >Home</Link>
        {/* <div className={classes.header}> */}
          <button onClick={logoutHandler} className={classes.header}>Logout</button>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default NavHeaders;
