import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  isloggedIn: false,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isloggedIn = true;
      state.error = "";
      state.status = "Login Successfull";
    },
    logout(state) {
      console.log("yeah it works");
      state.isloggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
