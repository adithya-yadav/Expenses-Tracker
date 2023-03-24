import classes from "./TodoApp.module.css";
import AddTodo from "./todoComponent/AddTodo";
import TodoList from "./todoComponent/TodosList";



function TodoApp (){
    return <div className={classes.center}>
        <h2>Add Todos</h2>
        <AddTodo/>
        <TodoList/>
    </div>
}

export default TodoApp;