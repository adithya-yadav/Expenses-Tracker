import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/Auth";
import { expenseActions } from "../store/ExpenseStore";
import classes from "./NavHeaders.module.css";

const NavHeaders = () => {
  const dispatch = useDispatch()
  const selectTheme = useSelector(state=>state.expenses.theme)

  const logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    dispatch(authActions.logout())
    dispatch(expenseActions.onLogoutDeleteExpences())
  };
  return (
    <Fragment>
      <div className={selectTheme ? `${classes.nav_headers} bg-success` : `${classes.nav_headers}`}>
        <Link to="/DailyExpenses" className={classes.header}>DailyExpenses</Link>
        <Link to="/Home"className={classes.header} >Home</Link>
          <button onClick={logoutHandler} className={classes.header}>Logout</button>
      </div>
    </Fragment>
  );
};

export default NavHeaders;
