import { Fragment, useContext, useRef, useState } from "react";
import contextApi from "../../store/ContextApi";
import classes from "./SignUpLogin.module.css";

const SignUpLogin = () => {
    const ctx = useContext(contextApi)
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [verify,setVerify] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const webApiKey = "AIzaSyCfXxSu_jIqAKl4YlxyKA_9RABh0ofO_OA";
  const changePageHandler = () => {
    
    if (isLoginPage && !verify) {
        setVerify(true)
      setIsLoginPage(false);
    } else {
      setIsLoginPage(true);
    }
  };
  const onSubmitDetailsHandler = async (e) => {
    if(verify){
     setVerify(false)
    }
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let url;
    if (isLoginPage) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey}`;
    } else {
        
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey}`;
      const confirmPassword = confirmPasswordRef.current.value;
      if (password.length > 0 && password !== confirmPassword) {
        alert("password did not match");
        return;
      }
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
        },
      });
      const data = await response.json();
      if (response.ok) {
        if(isLoginPage){
            console.log(data)
            ctx.isLoginFunc(data.idToken)
        }else{
            const response =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${webApiKey}`,{
                method:"POST",
                body:JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:data.idToken
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const curData =await response.json()
            console.log(curData)
            
            alert(`successfully signedup ${data.email}`);
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const forgotPasswordHandler = ()=>{}

  return (
    <Fragment>
      <div className={classes.center}>
        <h1>{verify ? "Verify Email" : isLoginPage ? "Login" : "Signup"}</h1>
        <form onSubmit={onSubmitDetailsHandler}>
          <div className={classes.text_field}>
            <input type="text" ref={emailRef} required/>
            <span></span>
            <label>Email</label>
          </div>
          {!verify && <div className={classes.text_field}>
            <input type="password" ref={passwordRef} required/>
            <span></span>
            <label>Password</label>
          </div>}
          {!verify && !isLoginPage && (
            <div className={classes.text_field}>
              <input type="password" ref={confirmPasswordRef} required />
              <span></span>
              <label>Confirm Password</label>
            </div>
          )}
          <input type="submit" value={verify ? "Send Link" : isLoginPage ? "Login" : "Signup"} />
          {isLoginPage && <div className={classes.forgot_pass} onClick={forgotPasswordHandler}>Forgot Password?</div>}
        </form>
        <div className={classes.displayNone}></div>
        <button className={classes.change_field} onClick={changePageHandler}>
          {isLoginPage ? "Not a member ? " : "Have an account? "}
          <span>{isLoginPage ? "signup" : "Login"}</span>
        </button>
      </div>
    </Fragment>
  );
};

export default SignUpLogin;
