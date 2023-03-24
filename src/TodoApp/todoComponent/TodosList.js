import { Fragment, useContext, useEffect, useState } from "react";
import contextApi from "../ContextProvider";
import SingleTodo from "./SingleTodo";
import classes from "./TodoList.module.css";

function TodoList() {
  const ctx = useContext(contextApi);
  const [showItems, setShowItems] = useState([...ctx.items]);
  useEffect(() => {
    setShowItems([...ctx.items]);
  }, [ctx.items]);
  const searchHandler = () => {
    const search = document.getElementById("search_id").value;
    setShowItems(
      ctx.items.filter((item) =>
        item.todo.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  const selectorHandler = () => {
    const sorterValue = document.getElementById("selector").value;
    let newItems;
    if (sorterValue === "alphabetic" || sorterValue === "alphabeticReverse") {
        newItems = [...showItems].sort((a, b) => {
            if (sorterValue === "alphabetic") {
          if (a.todo.toLowerCase() < b.todo.toLowerCase()) return -1;
          else if (a.todo.toLowerCase() > b.todo.toLowerCase()) return 1;
          else return 0;
        } else {
            if(a.todo.toLowerCase() < b.todo.toLowerCase())return 1;
            else if(a.todo.toLowerCase()>b.todo.toLowerCase())return -1;
            else return 0;
        }
      });
    }else{
        if(sorterValue === "ResentAdded"){
            newItems = [...ctx.items].reverse()
        }else{
            newItems = [...ctx.items]
        }
    }
    setShowItems(newItems)
  };

  const newList = showItems.map((todo) => {
    return <SingleTodo key={todo.id} todo={todo} />;
  });
  return (
    <Fragment>
      <input
        type="search"
        placeholder="Search"
        id="search_id"
        onChange={searchHandler}
      />
      <select
        id="selector"
        onChange={selectorHandler}
        className={classes.selector}
      >
        <option value="PastAdded">Past Added</option>
        <option value="ResentAdded">Resent Added</option>
        <option value="alphabetic">Alphabetical order</option>
        <option value="alphabeticReverse">Alphabetical Reverse order</option>
      </select>
      <div className={classes.todo_list}>{newList}</div>
    </Fragment>
  );
}

export default TodoList;
