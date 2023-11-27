import { call, put, takeEvery } from "redux-saga/effects";
import {
    loginApi,
    refreshApi,
    getMyInfoApi,
} from "../../api/calls";
import {
    loginSuccess,
    loginFailure,
    refreshSuccess,
    refreshFailure,
    getMyInfoSuccess,
    getMyInfoFailure,
    getMyInfoRequest,
} from "../slice/auth";



export function* loginUserRequest(action) {
  try {
    const login = yield call(() => loginApi(action.payload));
    // console.log("Api login==============================================, ", login)

    // yield put(
    //   loginSuccess({ Message: login.data.Message, accessToken: login.data.Data, isAuthenticated: login.data.isAuthenticated, user: login.data.User, myInfo: login.data.UserInfo, myMenus: login.data.Menu, Status: 200 }),
      
    // );

    if (login.data.Status === 1) {
      yield put(
        loginSuccess({ Message: login.data.Message, accessToken: login.data.Data, isAuthenticated: login.data.isAuthenticated, Status: 200 }),
        
      );
      // yield put(
        // getMyInfoRequest({
        //   auth: login.data.Data,
        //   data: { dateStarted: new Date().toLocaleString() },
        // })
      // )
    } else {
      yield put(
        loginFailure({isAuthenticated: false, Message: login.data.Message, myInfo: null, myMenus:[], Status: 404 }),
        
      );
    }

  } catch (error) {
    
    if (!error?.response) {
      yield put(
        
        loginFailure({isAuthenticated: false, Message: "No Server Response.", myInfo: null, myMenus:[], Status: 500 }),
        
      );
    } else if (error?.response?.status === 400) {
      yield put(
        loginFailure({
            isAuthenticated: false,
          Message: error?.response?.data?.Message,
          myInfo: null, myMenus:[],
          Status: error?.response?.status,
        }),
       
      );
    } else if (error?.response?.status === 401) {
      yield put(
        loginFailure({
            isAuthenticated: false,
          Message: error?.response?.data?.Message,
          myInfo: null, myMenus:[],
          Status: error?.response?.status,
        }),
        
      );
    } else {
      yield put(
        loginFailure({
            isAuthenticated: false,
          Message: "Failed to create login.",
          myInfo: null, myMenus:[],
          Status: error?.response?.status,
        }),
       
      );
    }
  }
}

export function* refreshUserRequest(action) {
    try {
      const refresh = yield call(() => refreshApi(action.payload));
  

    //   yield put(
    //     refreshSuccess({ Message: refresh.data.Message, accessToken: refresh.data.Data, isAuthenticated: refresh.data.isAuthenticated, myInfo: refresh.data.UserInfo, myMenus: refresh.data.Menu, Status: 200 }),
      
    // );
  
      if (refresh.data.Status === 1) {
        yield put(
            refreshSuccess({ Message: refresh.data.Message, accessToken: refresh.data.Data, isAuthenticated: refresh.data.isAuthenticated,  Status: 200 }),
          
        );
        
      } else {
        yield put(
          refreshFailure({isAuthenticated: false, Message: refresh.data.Message, myInfo: null, myMenus:[], Status: 404 }),
          
        );
      }
  
    } catch (error) {

      if (!error?.response) {
        yield put(
          
          refreshFailure({isAuthenticated: false, Message: "No Server Response.", myInfo: null, myMenus:[], Status: 500 }),
         
        );
      } else if (error?.response?.status === 400) {
        yield put(
          refreshFailure({
              isAuthenticated: false,
            Message: error?.response?.data?.Message,
            // myInfo: null, myMenus:[],
            Status: error?.response?.status,
          }),
         
        );
      } else if (error?.response?.status === 401) {
        yield put(
          refreshFailure({
              isAuthenticated: false,
            Message: error?.response?.data?.Message,
            // myInfo: null, myMenus:[],
            Status: error?.response?.status,
          }),
         
        );
      } else {
        yield put(
          refreshFailure({
              isAuthenticated: false,
            Message: "Unathorised. Login to have access.",
            // myInfo: null, myMenus:[],
            Status: error?.response?.status,
          }),
        );
      }
    }
  }

  export function* getMyInfoUserRequest(action) {
    try {
      const myinfo = yield call(() => getMyInfoApi(action.payload));
  
      if (myinfo.data.Status === 1) {
        yield put(
          getMyInfoSuccess({ Message: myinfo.data.Message, myInfo: myinfo.data.Data, myMenus: myinfo.data.Menu, Status: 200 }),
          
        );
      } else {
        yield put(
          getMyInfoFailure({Message: myinfo.data.Message, myInfo: null, myMenus:[], Status: 404 }),
          
        );
      }
  
    } catch (error) {
      // yield put(
      //   getMyInfoFailure({
      //       myMenus:[],
      //       myInfo: null,
      //     Message: error?.response?.data?.Message,
      //     Status: error?.response?.status,
      //   }),
        
      // );

      if (!error?.response) {
        yield put(
          
          getMyInfoFailure({Message: "No Server Response.", myInfo: null, myMenus:[], Status: 500 }),
          
        );
      } else if (error?.response?.status === 400) {
        yield put(
          getMyInfoFailure({
              myMenus:[],
              myInfo: null,
            Message: error?.response?.data?.Message,
            Status: error?.response?.status,
          }),
          
        );
      } else if (error?.response?.status === 401) {
        yield put(
          getMyInfoFailure({
              myMenus:[],
              myInfo: null,
            Message: error?.response?.data?.Message,
            Status: error?.response?.status,
          }),
          
        );
      } else {
        yield put(
          getMyInfoFailure({
              myMenus:[],
              myInfo: null,
            Message: "Failed to get my info.",
            Status: error?.response?.status,
          }),
          
        );
      }
    }
  }




export function* authSaga() {
  yield takeEvery("authData/loginRequest", loginUserRequest);
  yield takeEvery("authData/refreshRequest", refreshUserRequest);
  yield takeEvery("authData/getMyInfoRequest", getMyInfoUserRequest);
}