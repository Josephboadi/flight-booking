import { call, put, takeEvery, throttle } from "redux-saga/effects";
import {
  getUsersApi,
  getUserApi,
  enrollUserApi,
  activateUserApi,
  assignCategoryApi,
  assignBranchApi,
  sendEmailApi,
  deactivateUserApi,
  assignRoleApi,
  createUserApi,
  createBatchUserApi,
  updateUserApi,
  getMyInfoApi,
} from "../../api/calls";
import {
  getUsersSuccess,
  getUsersFailure,
  getUserSuccess,
  getUserFailure,
  enrollUserSuccess,
  enrollUserFailure,
  assignBranchSuccess,
  assignBranchFailure,
  assignCategorySuccess,
  assignCategoryFailure,
  sendEmailSuccess,
  sendEmailFailure,
  activateUserSuccess,
  activateUserFailure,
  deactivateUserSuccess,
  deactivateUserFailure,
  assignRoleSuccess,
  assignRoleFailure,
  createUserSuccess,
  createUserFailure,
  createBatchUserSuccess,
  createBatchUserFailure,
  updateUserFailure,
  updateUserSuccess,
  getMyInfoSuccess,
  getMyInfoFailure,
} from "../slice/users";

export function* getAllUsersRequest(action) {
 
  try {
    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        getUsersFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getUsersFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getUsersFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getUsersFailure({
          Message: "Failed to get Users Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* getMyInfoRequest(action) {
  try {
    const users = yield call(() => getMyInfoApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getMyInfoSuccess({ data: users.data, Status: 200 }));
    } else {
      yield put(getMyInfoFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        getMyInfoFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getMyInfoFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getMyInfoFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getMyInfoFailure({
          Message: "Failed to get Users Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* getSingleUserRequest(action) {
  try {
    const user = yield call(() => getUserApi(action));

    if (user.data.Status === 1) {
      yield put(getUserSuccess(user.data.Data));
    } else {
      yield put(getUserFailure(user.data.Message));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(getUserFailure("No Server Response"));
    } else if (error?.response?.status === 400) {
      yield put(getUserFailure(error?.response?.data?.Message));
    } else if (error?.response?.status === 401) {
      yield put(getUserFailure(error?.response?.data?.Message));
    } else {
      yield put(getUserFailure(error?.response?.data?.Message));
    }
  }
}

export function* enrollUserRequest(action) {
  try {
    const user = yield call(() => enrollUserApi(action));

    if (user.data.Status === 1) {
      yield put(enrollUserSuccess(user.data.Message));
    } else {
      yield put(enrollUserFailure(user.data.Message));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(enrollUserFailure("No Server Response"));
    } else if (error?.response?.status === 400) {
      yield put(enrollUserFailure(error?.response?.data?.Message));
    } else if (error?.response?.status === 401) {
      yield put(enrollUserFailure(error?.response?.data?.Message));
    } else {
      yield put(enrollUserFailure(error?.response?.data?.Message));
    }
  }
}

export function* assignBranchRequest(action) {
  try {
    const user = yield call(() => assignBranchApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        assignBranchSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        assignBranchFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        assignBranchFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        assignBranchFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        assignBranchFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        assignBranchFailure({
          Message: "Failed to assign branch.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* assignRoleRequest(action) {
  try {
    const user = yield call(() => assignRoleApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        assignRoleSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        assignRoleFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        assignRoleFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        assignRoleFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        assignRoleFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        assignRoleFailure({
          Message: "Failed to assign role.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* createUserRequest(action) {
  try {
    const user = yield call(() => createUserApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        createUserSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        createUserFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        createUserFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        createUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        createUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        createUserFailure({
          Message: "Failed to create user.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* createBatchUserRequest(action) {
  try {
    const user = yield call(() => createBatchUserApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        createBatchUserSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        createBatchUserFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        createUserFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        createUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        createUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        createUserFailure({
          Message: "Failed to create user.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* updateUserRequest(action) {
  try {
    const user = yield call(() => updateUserApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        updateUserSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        updateUserFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        updateUserFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        updateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        updateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        updateUserFailure({
          Message: "Failed to create user.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* assignCategoryRequest(action) {
  try {
    const user = yield call(() => assignCategoryApi(action));

    if (user.data.Status === 1) {
      yield put(assignCategorySuccess(user.data.Message));
    } else {
      yield put(assignCategoryFailure(user.data.Message));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(assignCategoryFailure("No Server Response"));
    } else if (error?.response?.status === 400) {
      yield put(assignCategoryFailure(error?.response?.data?.Message));
    } else if (error?.response?.status === 401) {
      yield put(assignCategoryFailure(error?.response?.data?.Message));
    } else {
      yield put(assignCategoryFailure(error?.response?.data?.Message));
    }
  }
}

export function* sendEmailRequest(action) {
  try {
    const user = yield call(() => sendEmailApi(action.payload));

    if (user.data.Status === 1) {
      yield put(sendEmailSuccess({ Message: user.data.Message, Status: 200 }));
    } else {
      yield put(sendEmailFailure({ Message: user.data.Message, Status: 404 }));
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        sendEmailFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        sendEmailFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        sendEmailFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        sendEmailFailure({
          Message: "Failed to send email.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* activateUserRequest(action) {
  try {
    const user = yield call(() => activateUserApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        activateUserSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        activateUserFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        activateUserFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        activateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        activateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        activateUserFailure({
          Message: "Failed to activate user.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* deactivateUserRequest(action) {
  try {
    const user = yield call(() => deactivateUserApi(action.payload));

    if (user.data.Status === 1) {
      yield put(
        deactivateUserSuccess({ Message: user.data.Message, Status: 200 })
      );
    } else {
      yield put(
        deactivateUserFailure({ Message: user.data.Message, Status: 404 })
      );
    }

    const users = yield call(() => getUsersApi(action.payload));

    if (users.data.Status === 1) {
      yield put(getUsersSuccess({ data: users.data.Data, Status: 200 }));
    } else {
      yield put(getUsersFailure({ data: users.data.Message, Status: 404 }));
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        deactivateUserFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        deactivateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        deactivateUserFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        deactivateUserFailure({
          Message: "Failed to deactivate user.",
          Status: error?.response?.status,
        })
      );
    }
  }
}


export function* usersSaga() {
  yield takeEvery("userData/getUsersRequest", getAllUsersRequest);
  yield takeEvery("userData/getMyInfoRequest", getMyInfoRequest);
  yield takeEvery("userData/getUserRequest", getSingleUserRequest);
  yield takeEvery("userData/enrollUserRequest", enrollUserRequest);
  yield takeEvery("userData/assignBranchRequest", assignBranchRequest);
  yield takeEvery("userData/assignRoleRequest", assignRoleRequest);
  yield takeEvery("userData/createUserRequest", createUserRequest);
  yield takeEvery("userData/createBatchUserRequest", createBatchUserRequest);
  yield takeEvery("userData/updateUserRequest", updateUserRequest);
  yield takeEvery("userData/assignCategoryRequest", assignCategoryRequest);
  yield takeEvery("userData/sendEmailRequest", sendEmailRequest);
  yield takeEvery("userData/activateUserRequest", activateUserRequest);
  yield takeEvery("userData/deactivateUserRequest", deactivateUserRequest);
}
