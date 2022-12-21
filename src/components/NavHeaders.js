import { Fragment, useContext } from "react";
import contextApi from "../store/ContextApi";
import classes from "./NavHeaders.module.css";

const NavHeaders = () => {
    const ctx = useContext(contextApi)
    const logoutHandler = ()=>{
        ctx.isLogoutFunc()
    }
  return (
    <Fragment>
      <div className={classes.nav_headers}>
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </Fragment>
  );
};

export default NavHeaders;
