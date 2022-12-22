import { useContext, useRef, useState } from "react";
import contextApi from "../../store/ContextApi";
import classes from "./ExpensesList.module.css";

const ExpensesList = (props) => {
  const ctx = useContext(contextApi);
  const [tempInput,setTempInput] = useState(null)
  const categoryRef = useRef()
  const descriptionRef = useRef()
  const amountRef = useRef()

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
        <tbody className={classes.total_amount}><tr><td className="w-100">Total Amount : $ {ctx.totalAmount}</td></tr></tbody>
          <tfoot>
            {ctx.expenses.map((exp) => {
                  const deleteOrEditHandler=(e)=>{
                    const name = e.target.name
                    if(name === 'edit'&& tempInput == exp.id){
                        const category = categoryRef.current.value
                        const description = descriptionRef.current.value
                        const amount = parseInt(amountRef.current.value)
                        if(category && description && amount){
                            ctx.deleteOrEditExpense(exp.id,name,{category,description,amount})
                        }
                            setTempInput(null)
                            return;
                    }
                    if(name==="edit"){
                        setTempInput(exp.id)
                    }else {
                        ctx.deleteOrEditExpense(exp.id,name)
                    }
                   
                  }
              return (
                <tr key={exp.id}>
                  <td>{tempInput ===exp.id ? <input className="w-75 form-group bg-white ps-1" placeholder={exp.category} ref={categoryRef} type="text" required /> : exp.category}</td>
                  <td>{tempInput ===exp.id ? <input className="w-75 form-group bg-white ps-1" placeholder={exp.description} ref={descriptionRef} type="text" required /> : exp.description}</td>
                  <td>{tempInput ===exp.id ? <input className="w-75 form-group bg-white ps-1" placeholder={`$ ${exp.amount}`} ref={amountRef} type="number" required /> :`$ ${exp.amount}`}</td>
                  <td><button onClick={deleteOrEditHandler} name="edit">{tempInput ===exp.id ? "Update" :"Edit"}</button></td>
                  <td><button onClick={deleteOrEditHandler} name='delete'>Delete</button></td>
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
