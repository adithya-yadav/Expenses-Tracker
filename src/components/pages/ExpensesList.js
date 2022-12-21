import { useContext } from "react";
import contextApi from "../../store/ContextApi";
import classes from "./ExpensesList.module.css";

const ExpensesList = () => {
  const ctx = useContext(contextApi);
  return (
    <>
      <div className={classes.list}>
        <table className="w-100">
          <thead>
            <tr>
              <td>Expense</td>
              <td>Description</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {ctx.expenses.map((exp) => {
              return (
                 <tr key={exp.amount}>
                    <td>{exp.category}</td>
                    <td>{exp.description}</td>
                    <td>$ {exp.amount}</td>
                 </tr>
              );
            })}
          </tbody>
        </table>
          <footer>Total Amount : $ {ctx.totalAmount}</footer>
      </div>
    </>
  );
};

export default ExpensesList;
