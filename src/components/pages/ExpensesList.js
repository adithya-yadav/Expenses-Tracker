import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/ExpenseStore";
import classes from "./ExpensesList.module.css";

const ExpensesList = (props) => {
  const url = "https://myweblink-6a02d-default-rtdb.firebaseio.com/";
  const localEmail = localStorage.getItem("email");

  // const ctx = useContext(contextApi);
  const expensesState = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [tempInput, setTempInput] = useState(null);
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();

  return (
    <>
      <div className={classes.list}>
        <table className="w-100">
          <thead>
            <tr>
              <td>Expense</td>
              <td>Description</td>
              <td>Amount</td>
              <td>Edit Expense</td>
              <td>Delete Expense</td>
            </tr>
          </thead>
          <tbody className={classes.total_amount}>
            <tr>
              <td className="w-100">
                Total Amount : $ {expensesState.totalAmount}
              </td>
            </tr>
          </tbody>
          <tfoot>
            {expensesState.expenses.map((exp) => {
              const deleteOrEditHandler = async (e) => {
                let obj;
                const name = e.target.name;
                if (name === "edit" && tempInput === exp.id) {
                  const category = categoryRef.current.value;
                  const description = descriptionRef.current.value;
                  const amount = parseInt(amountRef.current.value);
                  if (category && description && amount) {
                    const edited = { category, description, amount };
                    obj = {
                      method: "PUT",
                      body: JSON.stringify(edited),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    };
                    dispatch(
                      expenseActions.deleteorEditExpense({
                        id: exp.id,
                        name: name,
                        edited: edited,
                      })
                    );
                  }else{
                    alert("enter vaild input")
                  }
                }
                if (name === "edit") {
                  setTempInput(exp.id);
                } else {
                  obj = {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  };
                  dispatch(
                    expenseActions.deleteorEditExpense({
                      id: exp.id,
                      name: name,
                    })
                  );
                }
                if (obj) {
                  try {
                    const res = await fetch(
                      `${url}${localEmail}/${exp.id}.json`,
                      obj
                    );
                    const data = await res.json();
                    if (!res.ok) {
                      throw new Error(data.error.message);
                    }else{
                      setTempInput(null);
                    }
                  } catch (err) {
                    alert(err.message);
                    return;
                  }
                }
              };
              return (
                <tr key={exp.id}>
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
