import { Fragment, useRef } from "react";
import classes from "./SignUpLogin.module.css";

const SignUpLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const onSubmitDetailsHandler = async(e)=>{
      e.preventDefault()
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfXxSu_jIqAKl4YlxyKA_9RABh0ofO_OA";
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  const confirmPassword = confirmPasswordRef.current.value;
  if (password.length > 0 && password !== confirmPassword) {
      alert("password did not match");
      return
  }
    try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          }
        });
        const data =await response.json()
        if(response.ok){
            alert(`successfully signedup ${data.email}`)
            console.log("successfully signedup")
        }else{
            throw new Error(data.error.message)
        }
      } catch (error) {
        console.log(error.message)
        alert(error.message);
      }
  }
  
  return (
    <Fragment>
      <div className={classes.center}>
        <h1>SignUp</h1>
        <form onSubmit={onSubmitDetailsHandler}>
          <div className={classes.text_field}>
            <input type="text" ref={emailRef} required />
            <span></span>
            <label>Email</label>
          </div>
          <div className={classes.text_field}>
            <input type="password" ref={passwordRef} required />
            <span></span>
            <label>Password</label>
          </div>
          <div className={classes.text_field}>
            <input type="password" ref={confirmPasswordRef} required />
            <span></span>
            <label>Confirm Password</label>
          </div>
          <input type="submit" value="SignUp" />
        </form>
        <div className={classes.displayNone}></div>
        <div className={classes.change_field}>
          Have an account? <span>Login</span>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUpLogin;
