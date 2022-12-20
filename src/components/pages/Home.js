import { Fragment, useContext, useRef, useState } from "react";
import contextApi from "../../store/ContextApi";
import classes from "./Home.module.css";
const Home = () => {
  const ctx = useContext(contextApi);
  const nameRef = useRef();
  const photoRef = useRef();
  const [showDetails, setShowDetails] = useState(false);
  const key = "AIzaSyCfXxSu_jIqAKl4YlxyKA_9RABh0ofO_OA"
  const showDetailsHandler = async() => {
    try{
        const response =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,{
            method:"POST",
            body:JSON.stringify({
                idToken:ctx.token
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        if(response.ok){
            console.log(data.users)
            nameRef.current.value = data.users[0].displayName
            photoRef.current.value = data.users[0].photoUrl
        }else{
            throw new Error(data.error.message)
        }
    }catch(err){
        alert(err.message)
    }
    setShowDetails(true);
  };
  const closeDetailsHandler = ()=>{
    setShowDetails(false)
  }
  const updateDetailsHandler = async () => {
    const name = nameRef.current.value;
    const photo = photoRef.current.value;
    
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
            displayName: name,
            photoUrl: photo,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("successfully updated your profile");
      } else {
        console.log(data)
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Fragment>
      <div className={`${classes.center} d-flex justify-content-between`}>
        <h5>Welcome to Expense Tracker!!!</h5>
        <button onClick={showDetailsHandler} className={classes.complete}>
          your profile is incomplete.{" "}
          <span className="text-primary"> conplete now</span>
        </button>
      </div>
      {showDetails && (
        <div className={classes.details_center}>
          <div className="d-flex justify-content-between">
            <h3>Contact Details</h3>
            <button className="btn btn-outline-danger" onClick={closeDetailsHandler}>Cancel</button>
          </div>
          <div className="d-flex justify-content-around  mt-5 w-100">
            <div>
              <label>Full Name :</label>
              <input ref={nameRef} type="text" />
            </div>
            <div>
              <label>Profile photo URL :</label>
              <input ref={photoRef} type="text" />
            </div>
          </div>
          <button className={classes.update} onClick={updateDetailsHandler}>
            Update
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
