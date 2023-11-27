// import { call, put, takeEvery } from "redux-saga/effects";
// import {
//     uploadApi,
// } from "../../api/calls";
// import {
//     uploadSuccess,
//     uploadFailure,
// } from "../slice/upload";



// export function* uploadFooterRequest(action) {
//   try {
//     const upload = yield call(() => uploadApi(action.payload));

//     // console.log("upload response============", upload);
//     // console.log("upload response============", upload.data);

//     if (upload.data.Status == 1) {
//       yield put(
//         uploadSuccess({ Message: upload.data.Message, Status: 200 }),
      
//       );
//     } else {
//       yield put(
//         uploadFailure({ Message: upload.data.Message, Status: 404 }),
       
//       );
//     }

//   } catch (error) {
//     // console.log("Api Error:============== " + error);
//     // console.log("Api Error Response:============== " + error?.response?.Message);
//     if (!error?.response) {
//         // console.log("Not error response ================", error)
//       yield put(
//         uploadFailure({ Message: "No Server Response.", Status: 500 }),
//       );
//     } else if (error?.response?.status === 400) {
//       yield put(
//         uploadFailure({
//           Message: error?.response?.data?.Message,
//           Status: error?.response?.status,
//         }),
//       );
//     } else if (error?.response?.status === 401) {
//       yield put(
//         uploadFailure({
//           Message: error?.response?.data?.Message,
//           Status: error?.response?.status,
//         }),
//       );
//     } else {
//       // console.log("Error response last ================", error?.response?.status)
//       yield put(
//         uploadFailure({
//           Message: "Failed to upload image.",
//           Status: error?.response?.status,
//         }),
//       );
//     }
//   }
// }



// export function* uploadSaga() {
//   yield takeEvery("uploadData/uploadRequest", uploadFooterRequest);
// }