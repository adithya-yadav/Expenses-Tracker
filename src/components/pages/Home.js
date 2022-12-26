import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { showDetailsFromFirebase, updateDetailsInFirebase } from "../api/api";
import classes from "./Home.module.css";

let inputValue;
const Home = () => {
  const nameRef = useRef();
  const photoRef = useRef();
  const [showDetails, setShowDetails] = useState(false);

  const selectToken = useSelector((state) => state.auth.token);

  const showDetailsHandler = async () => {
    const showDetails =await showDetailsFromFirebase(selectToken);
    if (showDetails) {
      inputValue = {name:showDetails.displayName,photo:showDetails.photoUrl}
    }
    setShowDetails(true);
  };
  const closeDetailsHandler = () => {
    setShowDetails(false);
  };
  const updateDetailsHandler = async () => {
    const name = nameRef.current.value;
    const photo = photoRef.current.value;
    updateDetailsInFirebase(name, photo, selectToken);
  };
  return (
    <Fragment>
      <div className={`${classes.center} d-flex justify-content-between`}>
        <h5>Welcome to Expense Tracker!!!</h5>
        <button onClick={showDetailsHandler} className={classes.complete}>
          your profile is incomplete.{" "}
          <span className="text-primary"> complete now</span>
        </button>
      </div>
      {showDetails && (
        <div className={classes.details_center}>
          <div className="d-flex justify-content-between">
            <h3>Contact Details</h3>
            <button
              className="btn btn-outline-danger"
              onClick={closeDetailsHandler}
            >
              Cancel
            </button>
          </div>
          <div className="d-flex justify-content-around  mt-5 w-100">
            <div>
              <label>Full Name </label>
              <input ref={nameRef} type="text"  defaultValue={inputValue ? `${inputValue.name}` : 'notDefined'} />
            </div>
            <div>
              <label>Profile photo URL </label>
              <input ref={photoRef} type="text" defaultValue={inputValue ? `${inputValue.photo}` : 'notDefined'} />
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-success mt-4"
              onClick={updateDetailsHandler}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
