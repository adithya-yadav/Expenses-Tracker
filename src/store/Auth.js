import { createSlice } from "@reduxjs/toolkit";

const localToken = localStorage.getItem("token");
const localEmail = localStorage.getItem("email");
const isAuthIntialState = !!localEmail;

const initialAuthState = {
  isAuthentication: isAuthIntialState,
  token: localToken,
  email: localEmail,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      if (action.payload.isLogin) {
        state.isAuthentication = true;
        state.email = action.payload.email;
      }
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthentication = false;
      state.error = null
    },
    setError(state,action){
      state.error = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
