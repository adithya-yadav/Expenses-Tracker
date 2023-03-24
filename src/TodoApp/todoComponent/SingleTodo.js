import { useContext, useState } from "react";
import contextApi from "../ContextProvider";
import classes from "./SingleTodo.module.css";

function SingleTodo(props) {
  const { todo, day,id } = props.todo;
  const [showEdit ,setShowEdit] = useState(false)
  const ctx = useContext(contextApi)
  function deleteItemHandler(){
    ctx.deleteItemsFunction(id)
  }
  function editItemHandler(){
    if(showEdit){
        const newTodo = document.getElementById("edit_todo").value;
        if(newTodo.length <= 0)return alert("Invalid Input")
        ctx.addItemsFunction({id,todo:newTodo,day})
        setShowEdit(false)
        return
    }
    setShowEdit(true)
  }
  return (
    <div className={classes.todo_center}>
      {!showEdit && <div className={classes.todo}>{todo}</div>}
      {showEdit && <input type="text" defaultValue={todo} id="edit_todo" placeholder="Edit todo" required/>}
      <div className={classes.end}>
        <small>{day}</small>
        <button onClick={editItemHandler}>Edit</button>
        <button onClick={deleteItemHandler}>X</button>
      </div>
    </div>
  );
}

export default SingleTodo;
