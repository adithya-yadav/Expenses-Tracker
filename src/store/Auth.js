import { createSlice } from "@reduxjs/toolkit";

const localToken = localStorage.getItem("token")
const localEmail = localStorage.getItem("email")
const isAuthIntialState = !! localEmail
// console.log(localEmail,localToken)
const initialAuthState = { isAuthentication: isAuthIntialState,token:localToken,email:localEmail};
// console.log(initialAuthState)
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      
        // console.log(action.payload.token)
        // console.log(action.payload.email)
      state.isAuthentication = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
  
      // console.log("down         ''''''@@@")
    },
    logout(state) {
      state.isAuthentication = false;
    },
  },
});

// console.log(authSlice)


export const authActions = authSlice.actions;

export default authSlice.reducer;
