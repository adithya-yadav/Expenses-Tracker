import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/Auth";
import classes from "./NavHeaders.module.css";

const NavHeaders = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    dispatch(authActions.logout())
  };
  return (
    <Fragment>
      <div className={classes.nav_headers}>
        <Link to="/DailyExpenses" className={classes.header}>DailyExpenses</Link>
        <Link to="/Home"className={classes.header} >Home</Link>
          <button onClick={logoutHandler} className={classes.header}>Logout</button>
      </div>
    </Fragment>
  );
};

export default NavHeaders;
