import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editorDeleteInFirebase } from "../api/api";
import classes from "./ExpensesList.module.css";

const ExpensesList = (props) => {
  const expensesState = useSelector((state) => state.expenses);
  const themeSelect = useSelector(state=>state.expenses.theme)
  const dispatch = useDispatch();
  const [tempInput, setTempInput] = useState(null);
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();

  return (
    <>
      <div className={classes.list}>
        <table className="w-100">
          <thead className={themeSelect ? "bg-success" : ""}>
            <tr>
              <td>Expense</td>
              <td>Description</td>
              <td>Amount</td>
              <td>Edit Expense</td>
              <td>Delete Expense</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-100">
                Total Amount : $ {expensesState.totalAmount}
              </td>
            </tr>
          </tbody>
          <tfoot>
            {expensesState.expenses.map((exp) => {
              const deleteOrEditHandler = async (e) => {
                const name = e.target.name;
                if (name === "edit" && tempInput === exp.id) {
                  const category = categoryRef.current.value;
                  const description = descriptionRef.current.value;
                  const amount = parseInt(amountRef.current.value);
                    const edited = { category, description, amount };
                  if (category && description && amount) {
                    editorDeleteInFirebase(name,exp.id,dispatch,edited)
                    setTempInput(null)
                    return
                  }else{
                    alert("enter vaild input")
                  }
                }
                if (name === "edit") {
                  setTempInput(exp.id);
                }else{
                  editorDeleteInFirebase(name,exp.id,dispatch)
                }
              };
              return (
                <tr key={exp.id} className={themeSelect ? classes.theme_row_expense : ""}>
                  <td>
                    {tempInput === exp.id ? (
                      <input
                        className="w-75 form-group bg-white ps-1"
                        placeholder={exp.category}
                        ref={categoryRef}
                        type="text"
                        required
                      />
                    ) : (
                      exp.category
                    )}
                  </td>
                  <td>
                    {tempInput === exp.id ? (
                      <input
                        className="w-75 form-group bg-white ps-1"
                        placeholder={exp.description}
                        ref={descriptionRef}
                        type="text"
                        required
                      />
                    ) : (
                      exp.description
                    )}
                  </td>
                  <td>
                    {tempInput === exp.id ? (
                      <input
                        className="w-75 form-group bg-white ps-1"
                        placeholder={`$ ${exp.amount}`}
                        ref={amountRef}
                        type="number"
                        required
                      />
                    ) : (
                      `$ ${exp.amount}`
                    )}
                  </td>
                  <td>
                    <button onClick={deleteOrEditHandler} name="edit">
                      {tempInput === exp.id ? "Update" : "Edit"}
                    </button>
                  </td>
                  <td>
                    <button onClick={deleteOrEditHandler} name="delete">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ExpensesList;
