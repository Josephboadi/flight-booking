// import { createSlice } from "@reduxjs/toolkit";

// export const uploadSlice = createSlice({
//   name: "uploadData",
//   initialState: {
//     isUploading: false,
//     uploadSuccessMessage: null,
//     uploadError: null,
//   },
//   reducers: {

//     uploadRequest: (state, action) => {
//         // console.log(action.payload, "upload Payload===========");
//       state.isUploading = true;
//       state = action.payload;
//     },
//     uploadSuccess: (state, action) => {
//       state.uploadSuccessMessage = action.payload;
//       state.isUploading = false;
//     },
//     uploadFailure: (state, action) => {
//       // console.log("Upload Failed Payload=====================", action.payload);
//       state.uploadError = action.payload;
//       state.isUploading = false;
//     },

    

//     resetUpload: (state) => {
//       state.isUploading = false;
//       state.uploadSuccessMessage = null;
//       state.uploadError = null;
//     },
//   },
// });

// export const {
//     uploadRequest,
//     uploadSuccess,
//     uploadFailure,
//     resetUpload,
// } = uploadSlice.actions;

// export default uploadSlice.reducer;
