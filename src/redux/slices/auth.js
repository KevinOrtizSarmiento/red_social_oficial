import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    isCheckingUserFetching: false,
    closing: false,
    errors:null,
    error: null,
    isFetchingRegister:false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetchingRegister = true;
      state.errors = null;
    },
    registerSuccess: (state) => {
      state.isFetchingRegister = false;
      state.errors = null;
    },
    registerFailure: (state) => {
      state.currentUser = null;
      state.isFetchingRegister = false;
      state.errors = true;
    },
    logoutStart: (state) => {
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
    },
    logoutFailure: (state) => {
      state.error = true;
    },
    checkUserStart: (state) => {
      state.isCheckingUserFetching = true;
    },
    checkUserSuccess: (state, action) => {
      state.isCheckingUserFetching = false;
      state.currentUser = action.payload;
    },
    checkUserFailure: (state) => {
      state.isCheckingUserFetching = false;
      state.currentUser = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  checkUserStart,
  checkUserSuccess,
  checkUserFailure

} = authSlice.actions;
export default authSlice.reducer;