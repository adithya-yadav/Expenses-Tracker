import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/Auth";
import { getExpensesFromFirebase, loginorSigninToFirebase, sendLinkToMailFromFirebase } from "../api/api";
import classes from "./SignUpLogin.module.css";

const SignUpLogin = () => {
  const authCurrentToken = useSelector(state=>state.auth.token)

  const dispatch = useDispatch()

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [verify, setVerify] = useState(false);
  const [forgotPass,setForgotPass] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const changePageHandler = () => {
    if(forgotPass){
        setForgotPass(false)
        setIsLoginPage(true)
    }
    if(isLoginPage){
      setForgotPass(false)
      setVerify(false)
    }
    if(verify){
      setForgotPass(false)
      setIsLoginPage(false)
    }
    setIsLoginPage(!isLoginPage)
  };
  const onSubmitDetailsHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(!isLoginPage){
      const confirmPassword = confirmPasswordRef.current.value;
    if (password.length > 0 && password !== confirmPassword) {
      alert("password did not match");
      return;
    }else{
      loginorSigninToFirebase(email,password,isLoginPage,dispatch)
      if(!isLoginPage){
        setVerify(true);
      }
    }
  }else{
    loginorSigninToFirebase(email,password,isLoginPage,dispatch)
  }
  };
  const sendLinkToMailHandler = () => {
    const email = emailRef.current.value;
    sendLinkToMailFromFirebase(email,forgotPass,verify,authCurrentToken)
    setIsLoginPage(true)
    setVerify(false)
    setForgotPass(false)
  };
  const forgotPasswordHandler = () => {
    setForgotPass(true)
    setIsLoginPage(false)
  };  

  return (
    <Fragment>
      <div className={classes.center}>
        <h1>{forgotPass ? "Password Reset" : verify ? "Verify Email" : isLoginPage ? "Login" : "Signup"}</h1>
        <form onSubmit={onSubmitDetailsHandler}>
          <div className={classes.text_field}>
            <input type="text" ref={emailRef} required />
            <span></span>
            <label>Email</label>
          </div>
          {!verify && !forgotPass && (
            <div className={classes.text_field}>
              <input type="password" ref={passwordRef} required />
              <span></span>
              <label>Password</label>
            </div>
          )}
          {!verify && !isLoginPage && !forgotPass && (
            <div className={classes.text_field}>
              <input type="password" ref={confirmPasswordRef} required />
              <span></span>
              <label>Confirm Password</label>
            </div>
          )}
          
          {!verify && !forgotPass && (
            <input
              type="submit"
              className={classes.submit}
              value={isLoginPage ? "Login" : "Signup"}
            />
          )}
          {forgotPass && <p className="text-secondary">If you've lost your password or wish to reset it, enter your email and click on send link, you will get password reset link to your mail</p>}
          {verify && (
            <input
              type="button"
              className={classes.submit}
              onClick={sendLinkToMailHandler}
              value="Send Link"
            />
          )}
          {forgotPass && (
            <input
              type="button"
              className={classes.submit}
              onClick={sendLinkToMailHandler}
              value="Send Link"
            />
          )}
          {isLoginPage && !forgotPass && (
            <div
              className={classes.forgot_pass}
              onClick={forgotPasswordHandler}
            >
              Forgot Password?
            </div>
          )}
        </form>
        <div className={classes.displayNone}></div>
        {!verify && (
          <button className={classes.change_field} onClick={changePageHandler}>
            {forgotPass ? "Remember Password? " : isLoginPage ? "Not a member ? " : "Have an account? "}
            <span>{isLoginPage ? "signup" : "Login"}</span>
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default SignUpLogin;
