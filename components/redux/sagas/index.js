'use client'
import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth";
import { airlinesSaga } from "./airlines";
import { flightsSaga } from "./flights";

export function* rootSaga() {
  
    yield all([
      fork(authSaga),
      fork(airlinesSaga),
      fork(flightsSaga),
    ]);
  }