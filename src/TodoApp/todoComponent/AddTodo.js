import { useContext } from "react";
import contextApi from "../ContextProvider";
import "./AddTodo.module.css";

function AddTodo() {
  const ctx = useContext(contextApi);

  const additemsHandler = (e) => {
    e.preventDefault();
    const todo = e.target.todoname.value;
    const date = new Date();
    const day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const id = Math.random();
    const newTodo = { id, todo, day };
    ctx.addItemsFunction(newTodo);
    e.target.todoname.value = "";
  };
  return (
    <form onSubmit={additemsHandler}>
      <input type="text" placeholder="Enter Todo" name="todoname" />
      <input type="submit" value="Add Todo" />
    </form>
  );
}

export default AddTodo;
