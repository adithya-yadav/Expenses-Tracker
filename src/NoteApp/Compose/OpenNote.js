import classes from "./OpenNote.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../notestores/NoteSlice";

const OpenNote = (props) => {
  if (props.title !== "") {
    document.getElementById("titleid").value = props.title;
    document.getElementById("bodyid").value = props.body;
  }
  const titleRef = useRef();
  const bodyRef = useRef();
  const dispatch = useDispatch();
  function onSubmitHandler(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
      if(props.id!==undefined){
        const id=props.id
        dispatch(noteActions.updateNote({title,body,id,date}))
        dispatch(noteActions.showNoteInDetail(""));
        titleRef.current.value = "";
        bodyRef.current.value = "";
        return
      }
      const id = Math.random();
    const newNote = { id, title, body, date };
    dispatch(noteActions.createNote(newNote));
    titleRef.current.value = "";
    bodyRef.current.value = "";
    dispatch(noteActions.showNoteInDetail(""));
  }
  function deleteNoteHandler() {
    if(props.id){
      dispatch(noteActions.deleteNote(props.id))
    }
    titleRef.current.value = "";
    bodyRef.current.value = "";
    dispatch(noteActions.showNoteInDetail(""));
  }
  return (
    <div className={classes.center}>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          ref={titleRef}
          placeholder="Title"
          id="titleid"
          required
        />
        <textarea ref={bodyRef} id="bodyid" placeholder="Body"></textarea>
        <div className={classes.buttons}>
          <input type="submit" value="Save" />
          <div onClick={deleteNoteHandler}>Delete</div>
        </div>
      </form>
    </div>
  );
};

export default OpenNote;
