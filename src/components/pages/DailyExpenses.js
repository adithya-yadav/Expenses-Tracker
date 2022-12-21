import { useContext, useRef, useState } from "react";
import contextApi from "../../store/ContextApi";
import classes from "./DailyExpense.module.css";
import ExpensesList from "./ExpensesList";

const DailyExpense = () => {
  const [expenseBox, setExpenseBox] = useState(false);
  const amountRef = useRef()
  const descriptionRef = useRef()
  const categoryRef = useRef()
  const ctx = useContext(contextApi)
  const showExpenseHandler = () => {
    setExpenseBox(true);
  };
  const addExpenseHandler = (e)=>{
    e.preventDefault()
    const amount = parseInt(amountRef.current.value)
    const description = descriptionRef.current.value
    const category = categoryRef.current.value
    const expense = {
        amount,
        description,
        category
    }
    ctx.addExpenseFunc(expense)
    
  }
  return (
    <>
    <ExpensesList/>
      {!expenseBox && (
        <button
          className={`${classes.add_exp_btn} btn btn-success rounded-circle`}
          onClick={showExpenseHandler}
        >
          <h1>+</h1>
        </button>
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
              <select ref={categoryRef} id="category" className="p-2 pe-4 rounded-pill">
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
                className="p-3 pe-5 rounded-pill"
                required
              />
            </div>
            <div className="me-5">
              <button type="submit" className="btn btn-success rounded-circle">
                <h1>✓</h1>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default DailyExpense;
