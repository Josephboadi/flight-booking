import { call, put, takeEvery, throttle } from "redux-saga/effects";
import {
  getLogsApi,
  getLogApi,
} from "../../api/calls";
import {
  getLogsSuccess,
  getLogsFailure,
  getLogSuccess,
  getLogFailure,
} from "../slice/logs";

export function* getAllLogsRequest(action) {
  try {
    const logs = yield call(() => getLogsApi(action.payload));

    if (logs.data.Status === 1) {
      yield put(getLogsSuccess({ data: logs.data.Data, Status: 200 }));
    } else {
      yield put(getLogsFailure({ data: logs.data.Message, Status: 404 }));
    }
  } catch (error) {
  
    if (!error?.response) {
      yield put(
        getLogsFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getLogsFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getLogsFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getLogsFailure({
          Message: "Failed to get Banches Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* getSingleLogRequest(action) {
  try {
    const log = yield call(() => getLogApi(action));

    if (log.data.Status === 1) {
      yield put(getLogSuccess(log.data.Data));
    } else {
      yield put(getLogFailure(log.data.Message));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(getLogFailure("No Server Response"));
    } else if (error?.response?.status === 400) {
      yield put(getLogFailure(error?.response?.data?.Message));
    } else if (error?.response?.status === 401) {
      yield put(getLogFailure(error?.response?.data?.Message));
    } else {
      yield put(getLogFailure(error?.response?.data?.Message));
    }
  }
}

export function* logsSaga() {
  yield takeEvery("logData/getLogsRequest", getAllLogsRequest);
  yield takeEvery("logData/getLogRequest", getSingleLogRequest);
}
