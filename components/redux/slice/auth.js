import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authData",
  initialState: {
    isLogingIn: false,
    loginSuccessMessage: null,
    loginError: null,
    isAuthenticated: false,
    isRefreshAuthenticated: true,
    isGettingMyInfo: false,
    myInfo: null,
    gettingMyInfoError: null,
  
  },
  reducers: {

    loginRequest: (state, action) => {
      state.isLogingIn = true;
      state = action.payload;
    },
    loginSuccess: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated
        
      state.loginSuccessMessage = action.payload;
    // state.myInfo = action.payload.myInfo;
      state.isLogingIn = false;
    },
    loginFailure: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated
        // console.log("Login Failed Payload=====================", action.payload);
      state.loginError = action.payload;
      state.isLogingIn = false;
    },

    refreshRequest: (state, action) => {
      state.isLogingIn = true;
      
      state = action.payload;
    },
    refreshSuccess: (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated
      state.loginSuccessMessage = action.payload;
    // state.myInfo = action.payload.myInfo;
      state.isLogingIn = false;
    },
    refreshFailure: (state, action) => {

      console.log(state.isRefreshAuthenticated, "refresh Failure=====================")

      state.isAuthenticated = action.payload.isAuthenticated
      state.loginError = action.payload;
      state.isLogingIn = false;
      state.isRefreshAuthenticated = false
    },


    getMyInfoRequest: (state, action) => {
    state.isGettingMyInfo = true;
    state = action.payload;
  },
  getMyInfoSuccess: (state, action) => {
    state.myInfo = action.payload;
    state.isGettingMyInfo = false;
    // state.isLogingIn = false;
  },
  getMyInfoFailure: (state, action) => {
    state.gettingMyInfoError = action.payload;
    state.isGettingMyInfo = false;
    // state.isLogingIn = false;
  },

    

    resetAuth: (state) => {


      state.isLogingIn = false;

      state.loginSuccessMessage = null;

      state.loginError = null;

      state.isAuthenticated = false;

      state.isGettingMyInfo = false;
    state.myInfo = null;
    state.gettingMyInfoError = null;
    },
  },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    refreshRequest,
    refreshSuccess,
    refreshFailure,
    getMyInfoRequest,
    getMyInfoSuccess,
    getMyInfoFailure,
    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
