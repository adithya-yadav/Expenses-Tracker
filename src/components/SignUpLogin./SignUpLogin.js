import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/Auth";
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
  const webApiKey = "AIzaSyCfXxSu_jIqAKl4YlxyKA_9RABh0ofO_OA";

  const changePageHandler = () => {
    if(forgotPass){
        setForgotPass(false)
        setIsLoginPage(true)
    }
    setIsLoginPage(!isLoginPage)
  };
  const onSubmitDetailsHandler = async (e) => {
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
        if (isLoginPage) {
          localStorage.setItem("token",data.idToken)
          localStorage.setItem("email",data.email.replace("@", "").replace(".", "").replace(".", ""))
          dispatch(authActions.login({token:data.idToken,email:data.email}))
        } else {
          setVerify(true);
          alert(`successfully signedup ${data.email}`);
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const verifyHandler = async () => {
    const email = emailRef.current.value;
    let body;
    if(forgotPass){
        body=JSON.stringify({
            email:email,
            requestType:"PASSWORD_RESET",
          })
    }else{
        body=JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCurrentToken,
          })
    }
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${webApiKey}`,
        {
          method: "POST",
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("successfully sended link to your email")
        setIsLoginPage(true)
        if(forgotPass){
            setForgotPass(false)
        }else setVerify(false)
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
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
              onClick={verifyHandler}
              value="Send Link"
            />
          )}
          {forgotPass && (
            <input
              type="button"
              className={classes.submit}
              onClick={verifyHandler}
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
