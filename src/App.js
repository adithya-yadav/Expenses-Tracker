import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpensesFromFirebase } from "./components/api/api";
import Nav from "./components/Nav";



function App() {
  const dispatch = useDispatch()
  const isLogin = useSelector(state=>state.auth.isAuthentication)
  const localemail= localStorage.getItem("email")
  useEffect(()=>{
    if(isLogin && localemail){
      getExpensesFromFirebase(dispatch)
    }
  },[getExpensesFromFirebase,localemail])
  return (
    <>
          <Nav/>  
    </>
  );
}

export default App;
