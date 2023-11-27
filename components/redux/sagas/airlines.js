import { call, put, takeEvery, throttle } from "redux-saga/effects";
import {
  getAirlinesApi,
} from "../../api/calls";
import {
  getAirlinesSuccess,
  getAirlinesFailure,
} from "../slice/airlines";

export function* getAllAirlinesRequest(action) {
  try {
    const airlines = yield call(() => getAirlinesApi(action.payload));

    // console.log("airline data saga========================, ", airlines)

    if (airlines.data.Status === 1) {
      yield put(getAirlinesSuccess({ data: airlines?.data?.Data, Status: 200 }));
    } else {
      yield put(getAirlinesFailure({ data: airlines.data.Message, Status: 404 }));
    }
  } catch (error) {
  
    if (!error?.response) {
      yield put(
        getAirlinesFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getAirlinesFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getAirlinesFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getAirlinesFailure({
          Message: "Failed to get Banches Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}


export function* airlinesSaga() {
  yield takeEvery("airlineData/getAirlinesRequest", getAllAirlinesRequest);
}
