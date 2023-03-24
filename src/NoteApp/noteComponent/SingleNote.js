import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../notestores/NoteSlice";
import classes from "./SingleNote.module.css";

function SingleNote(props) {
  const dispatch = useDispatch()
  function noteInDetailHandler(){
    dispatch(noteActions.showNoteInDetail(props))
  }
  return (
    <Fragment>
      <div className={classes.note_center} onClick={noteInDetailHandler}>
        <div className={classes.note_headers}>
          <h5>{props.title}</h5>
          <small>{props.date}</small>
        </div>
        <p>{props.body}</p>
      </div>
    </Fragment>
  );
}

export default SingleNote;
