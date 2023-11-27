import { call, put, takeEvery, throttle } from "redux-saga/effects";
import {
  getFlightsApi,
} from "../../api/calls";
import {
  getflightsSuccess,
  getflightsFailure,
} from "../slice/flights";


export function* getSearchedFlightsRequest(action) {
  try {
    const flights = yield call(() => getFlightsApi(action.payload));

    console.log("flights response from saga=============================, ", flights)

    if (flights.data.Status === 1) {
      yield put(
        getflightsSuccess({ data: flights.data.Data, Status: 200 })
      );
    } else {
      yield put(
        getflightsFailure({ data: flights.data.Message, Status: 404 })
      );
    }
  } catch (error) {
    
    if (!error?.response) {
      yield put(
        getflightsFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getflightsFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getflightsFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getflightsFailure({
          Message: "Failed to get Banches Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}


export function* flightsSaga() {
  yield takeEvery("flightData/getflightsRequest", getSearchedFlightsRequest);
}
