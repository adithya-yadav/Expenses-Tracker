import Notes from "./noteComponent/Notes";
import OpenNote from "./Compose/OpenNote";
import classes from "./NoteApp.module.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const NoteApp = () => {
  const noteDetails = useSelector(state=>state.notes.noteDetails)
  return (
    <Fragment>
      <div className={classes.header}>Keep Notes</div>
      <div className={classes.center}>
        <Notes />
        {noteDetails === "" ? <OpenNote title='' body=''/> :<OpenNote title={noteDetails.title} body={noteDetails.body} id={noteDetails.id} /> }
      </div>
    </Fragment>
  );
};

export default NoteApp;
