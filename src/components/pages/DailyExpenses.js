import { useState } from "react";
import classes from "./DailyExpense.module.css";

const DailyExpense = () => {
  const [expenseBox, setExpenseBox] = useState(false);
  const showExpenseHandler = () => {
    setExpenseBox(true);
  };
  return (
    <>
      {!expenseBox && (
        <button
          className={`${classes.add_exp_btn} btn btn-success rounded-circle`}
          onClick={showExpenseHandler}
        >
          <h1>+</h1>
        </button>
      )}
      {expenseBox && (
        <div className={classes.center}>
          <div className="d-flex m-4 p-4 w-100 justify-content-between">
            <div className={classes.element}>
              <label htmlFor="money" className="me-3">
                money
              </label>
              <input
                type="number"
                id="money"
                className="p-2 pe-5 rounded-pill"
                required
              />
            </div>
            <div className={classes.element}>
              <label htmlFor="category" className="me-3">
                category
              </label>
              <select id="category" className="p-2 pe-4 rounded-pill">
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>
          <div className="d-flex m-4 p-4 w-100 justify-content-between">
            <div className={`${classes.element}`}>
              <label htmlFor="description" className="me-3">
                description
              </label>
              <input
                type="text"
                id="description"
                className="p-3 pe-5 ps-5 rounded-pill"
                required
              />
            </div>
            <div className="me-5">
              <button className="btn btn-success rounded-circle">
                <h1>✓</h1>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyExpense;
