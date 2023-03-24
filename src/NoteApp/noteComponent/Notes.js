import SingleNote from "./SingleNote";
import classes from "./Notes.module.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const Notes = () => {
  const searchRef = useRef();
  const notesArray = useSelector((state) => state.notes.notes);
  const [showArray,setShowArray] = useState([])
  useEffect(()=>{
    setShowArray([...notesArray])
  },[notesArray])
  function searchHandler() {
    const search = searchRef.current.value;
     setShowArray(notesArray.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    ))
  }
  function sortHandler(){
    const sortInto = document.getElementById("sorter").value;
    if(sortInto === "alphabetic" || sortInto === "alphabeticReverse"){
      const newArray = [...showArray].sort((a,b)=>{
        if(sortInto==="alphabetic"){
          if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }else{
          if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          return 0;        }
      })
      setShowArray(newArray)
    }else{
      if(sortInto === "ResentAdded"){
        const newArray = [...notesArray].reverse()
        setShowArray(newArray)
      }else{
        setShowArray(notesArray)
      } 
    }
  }
  const notes = showArray.map((note) => {
    return (
      <SingleNote
        key={note.id}
        title={note.title}
        body={note.body}
        id={note.id}
        date={note.date}
      />
    );
  });
  return (
    <div className={classes.center}>
      <div className={classes.note_header}>Notes</div>
      <input
        type="text"
        onChange={searchHandler}
        ref={searchRef}
        placeholder="Search"
        className={classes.note_search}
      />
      <select id="sorter" className={classes.sorter} onChange={sortHandler}>
        <option value="PastAdded">Past Added</option>
        <option value="ResentAdded">Resent Added</option>
        <option value="alphabetic">Alplabetical Order</option>
        <option value="alphabeticReverse">Alplabetical Reverse order</option>
      </select>
      <div className={classes.note_list}>{notes}</div>;
    </div>
  );
};
export default Notes;
