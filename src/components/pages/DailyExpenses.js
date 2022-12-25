import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/ExpenseStore";
import classes from "./DailyExpense.module.css";
import ExpensesList from "./ExpensesList";

const DailyExpense = (props) => {
  const dispatch = useDispatch();
  const [expenseBox, setExpenseBox] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const url = "https://myweblink-6a02d-default-rtdb.firebaseio.com/";
  const localEmail = localStorage.getItem("email");

  const showExpenseHandler = () => {
    setExpenseBox(true);
  };

  useEffect(() => {
    async function getdata() {
      try {
        const res = await fetch(`${url}${localEmail}.json`);
        const data = await res.json();
        if (res.ok) {
          for (const key in data) {
            data[key]["id"] = key;
            dispatch(expenseActions.AddExpense(data[key]));
          }
        } else {
          throw new Error(data.error.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    getdata()
  }, [localEmail,dispatch]);

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
    try {
      const response = await fetch(`${url}${localEmail}.json`, {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        expense["id"] = data.name;
        dispatch(expenseActions.AddExpense(expense));
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      return alert(error.message);
    }

    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    setExpenseBox(false);
  };

  return (
    <Fragment>
      <ExpensesList />
      {!expenseBox && (
        <footer className={classes.add_exp_btn}>
          <button onClick={showExpenseHandler}>Add Expense</button>
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
    </Fragment>
  );
};

export default DailyExpense;
