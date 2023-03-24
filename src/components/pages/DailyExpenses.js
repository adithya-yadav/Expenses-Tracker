import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/ExpenseStore";
import { makeCsv, storeExpenseInFirebase } from "../api/api";
import classes from "./DailyExpense.module.css";
import ExpensesList from "./ExpensesList";

const DailyExpense = (props) => {
  const dispatch = useDispatch();
  const selectAmount = useSelector((state) => state.expenses.totalAmount);
  const selectExpenses = useSelector((state) => state.expenses.expenses);
  const selectthemeToggle = useSelector((state) => state.expenses.themeToggle);
  const selecttheme = useSelector((state) => state.expenses.theme);
  const selectActivePremium = useSelector(state=>state.expenses.showActivePremium)
  const [expenseBox, setExpenseBox] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  if (selectAmount > 10000) {
    if (!selectthemeToggle ){ 
      dispatch(expenseActions.showActivePremium('true'))
    }
  }else if(selectAmount < 10000) {
    if (selectthemeToggle ){ 
      dispatch(expenseActions.theme())
    }
  }

  const showExpenseHandler = () => {
    setExpenseBox(true);
  };

  const activeHandler = () => {
    dispatch(expenseActions.themeToggle());
    dispatch(expenseActions.showActivePremium('false'))
  };

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    const amount = parseInt(amountRef.current.value);
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;
    const expense = {
      amount,
      description,
      category,
    };

    storeExpenseInFirebase(expense, dispatch);

    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    setExpenseBox(false);
  };

  const changeThemeHandler = () => {
    dispatch(expenseActions.theme());
  };

  const downloadExpense = document.getElementById("download");
  if (downloadExpense) {
    const blob = new Blob([makeCsv(selectExpenses,selectAmount)]);
    downloadExpense.href = URL.createObjectURL(blob);
  }

  return (
    <Fragment>
      <a
        download="file.csv"
        className={
          selecttheme ? `${classes.download} bg-success` : `${classes.download}`
        }
        id="download"
      >
        Download ExpensesList ⬇
      </a>
      {selectthemeToggle && (
        <div className="text-center mt-3">
          <button
            className={
              selecttheme
                ? "btn btn-success rounded-5 pt-3 pb-3 pe-5 ps-5"
                : "btn btn-outline-success rounded-5 pt-3 pb-3 pe-5 ps-5"
            }
            onClick={changeThemeHandler}
          >
            switch from {selecttheme ? "Dark" : "Light"} theme to {selecttheme ? "Light" : "Dark"} theme
          </button>
        </div>
      )}
      <ExpensesList />
      {selectActivePremium && (
        <div className={classes.active_premium}>
          <h2 className="text-center text-success">Activate Premium</h2>
          <div className="text-center">
            <button onClick={activeHandler}>Activate</button>
          </div>
        </div>
      )}
      {!expenseBox && (
        <footer className={classes.add_exp_btn}>
          <button
            className={selecttheme ? "bg-success" : ""}
            onClick={showExpenseHandler}
          >
            Add Expense
          </button>
        </footer>
      )}
      {expenseBox && (
        <form onSubmit={addExpenseHandler} className={classes.center}>
          <div className="d-flex m-4 p-4 w-100 justify-content-around">
            <div className={classes.element}>
              <label htmlFor="money" className="me-3 h4">
                Amount :
              </label>
              <input
                type="number"
                ref={amountRef}
                placeholder="Amount"
                id="money"
                className="p-2 pe-5 rounded-pill"
                required
              />
            </div>
            <div className={classes.element}>
              <label htmlFor="category" className="me-3 h4">
                category :
              </label>
              <select
                ref={categoryRef}
                id="category"
                className="p-2 pe-4 rounded-pill"
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>
          <div className="d-flex m-4 p-4 w-100 justify-content-around">
            <div className={`${classes.element}`}>
              <label htmlFor="description" className="me-3 h4">
                Description :
              </label>
              <input
                type="text"
                ref={descriptionRef}
                placeholder="Desccription"
                id="description"
                className="p-2 pe-4 rounded-pill"
                required
              />
            </div>
            <div className="me-5">
              <button type="submit" className="btn btn-success rounded-5">
                <h3>Add Expense</h3>
              </button>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default DailyExpense;
