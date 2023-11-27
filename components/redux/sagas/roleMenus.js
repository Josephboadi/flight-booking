import { call, put, takeEvery, throttle } from "redux-saga/effects";
import {
  activateRoleMenuApi,
  createRoleMenuApi,
  deactivateRoleMenuApi,
  getMenusApi,
  getRoleMenusApi,
} from "../../api/calls";
import {
  getMenusSuccess,
  getMenusFailure,
  getRoleMenusSuccess,
  getRoleMenusFailure,
  createRoleMenuSuccess,
  createRoleMenuFailure,
  activateRoleMenuSuccess,
  activateRoleMenuFailure,
  deactivateRoleMenuSuccess,
  deactivateRoleMenuFailure,
} from "../slice/rolemenus";

export function* getAllMenusRequest(action) {
  try {
    const menus = yield call(() => getMenusApi(action.payload));

    if (menus.data.Status === 1) {
      yield put(getMenusSuccess({ data: menus.data.Data, Status: 200 }));
    } else {
      yield put(getMenusFailure({ data: menus.data.Message, Status: 404 }));
    }
  } catch (error) {

    if (!error?.response) {
      yield put(
        getMenusFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getMenusFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getMenusFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getMenusFailure({
          Message: "Failed to get Banches Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* getAllRoleMenusRequest(action) {
  try {
    const roleMenus = yield call(() => getRoleMenusApi(action.payload));

    if (roleMenus.data.Status === 1) {
      yield put(
        getRoleMenusSuccess({ data: roleMenus.data.Data, Status: 200 })
      );
    } else {
      yield put(
        getRoleMenusFailure({ data: roleMenus.data.Message, Status: 404 })
      );
    }
  } catch (error) {
    
    if (!error?.response) {
      yield put(
        getRoleMenusFailure({ Message: "No Server Response", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        getRoleMenusFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        getRoleMenusFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        getRoleMenusFailure({
          Message: "Failed to get Banches Data",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* createRoleMenuRequest(action) {
  try {
    const roleMenu = yield call(() => createRoleMenuApi(action.payload));

    if (roleMenu.data.Status === 1) {
      yield put(
        createRoleMenuSuccess({ Message: roleMenu.data.Message, Status: 200 })
      );
    } else {
      yield put(
        createRoleMenuFailure({ Message: roleMenu.data.Message, Status: 404 })
      );
    }

    const roleMenus = yield call(() => getRoleMenusApi(action.payload));

    if (roleMenus.data.Status === 1) {
      yield put(
        getRoleMenusSuccess({ data: roleMenus.data.Data, Status: 200 })
      );
    } else {
      yield put(
        getRoleMenusFailure({ data: roleMenus.data.Message, Status: 404 })
      );
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        createRoleMenuFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        createRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        createRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        createRoleMenuFailure({
          Message: "Failed to create roleMenu.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* activateRoleMenuRequest(action) {
  try {
    const roleMenu = yield call(() => activateRoleMenuApi(action.payload));

    if (roleMenu.data.Status === 1) {
      yield put(
        activateRoleMenuSuccess({ Message: roleMenu.data.Message, Status: 200 })
      );
    } else {
      yield put(
        activateRoleMenuFailure({ Message: roleMenu.data.Message, Status: 404 })
      );
    }

    const roleMenus = yield call(() => getRoleMenusApi(action.payload));

    if (roleMenus.data.Status === 1) {
      yield put(
        getRoleMenusSuccess({ data: roleMenus.data.Data, Status: 200 })
      );
    } else {
      yield put(
        getRoleMenusFailure({ data: roleMenus.data.Message, Status: 404 })
      );
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        activateRoleMenuFailure({ Message: "No Server Response.", Status: 500 })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        activateRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        activateRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        activateRoleMenuFailure({
          Message: "Failed to activate roleMenu.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* deactivateRoleMenuRequest(action) {
  try {
    const roleMenu = yield call(() => deactivateRoleMenuApi(action.payload));

    if (roleMenu.data.Status === 1) {
      yield put(
        deactivateRoleMenuSuccess({
          Message: roleMenu.data.Message,
          Status: 200,
        })
      );
    } else {
      yield put(
        deactivateRoleMenuFailure({
          Message: roleMenu.data.Message,
          Status: 404,
        })
      );
    }

    const roleMenus = yield call(() => getRoleMenusApi(action.payload));

    if (roleMenus.data.Status === 1) {
      yield put(
        getRoleMenusSuccess({ data: roleMenus.data.Data, Status: 200 })
      );
    } else {
      yield put(
        getRoleMenusFailure({ data: roleMenus.data.Message, Status: 404 })
      );
    }
  } catch (error) {
    if (!error?.response) {
      yield put(
        deactivateRoleMenuFailure({
          Message: "No Server Response.",
          Status: 500,
        })
      );
    } else if (error?.response?.status === 400) {
      yield put(
        deactivateRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else if (error?.response?.status === 401) {
      yield put(
        deactivateRoleMenuFailure({
          Message: error?.response?.data?.Message,
          Status: error?.response?.status,
        })
      );
    } else {
      yield put(
        deactivateRoleMenuFailure({
          Message: "Failed to deactivate roleMenu.",
          Status: error?.response?.status,
        })
      );
    }
  }
}

export function* rolemenusSaga() {
  yield takeEvery("roleMenuData/getMenusRequest", getAllMenusRequest);
  yield takeEvery("roleMenuData/getRoleMenusRequest", getAllRoleMenusRequest);
  yield takeEvery("roleMenuData/createRoleMenuRequest", createRoleMenuRequest);
  yield takeEvery(
    "roleMenuData/activateRoleMenuRequest",
    activateRoleMenuRequest
  );
  yield takeEvery(
    "roleMenuData/deactivateRoleMenuRequest",
    deactivateRoleMenuRequest
  );
}
