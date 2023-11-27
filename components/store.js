'use client'
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/slice/auth";
import airlinesSlice from "./redux/slice/airlines";
import flightsSlice from "./redux/slice/flights";
import { rootSaga } from "./redux/sagas";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    authData: authSlice,
    airlineData: airlinesSlice,
    flightData: flightsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
        thunk: false,
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['your/action/type'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.data'],
          },
     }).concat(saga),
});
saga.run(rootSaga);

export default store;