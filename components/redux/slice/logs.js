import { createSlice } from "@reduxjs/toolkit";

export const logsSlice = createSlice({
  name: "logData",
  initialState: {
    log: null,
    logs: [],
    isFetchingLogs: false,
    isFetchingLog: false,

    fetchLogsError: null,
    fetchLogError: null,
  },
  reducers: {
    getLogsRequest: (state, action) => {
      state.isFetchingLogs = true;
      state = action.payload;
    },
    getLogsSuccess: (state, action) => {
      state.logs = action.payload;
      state.isFetchingLogs = false;
    },
    getLogsFailure: (state, action) => {
      state.logs = [];

      state.fetchLogsError = action.payload;
      state.isFetchingLogs = false;
    },

    getLogRequest: (state, action) => {
      state.isFetchingLog = true;
      state = action.payload;
    },
    getLogSuccess: (state, action) => {
      state.log = action.payload;
      state.isFetchingLog = false;
    },
    getLogFailure: (state, action) => {
      state.log = null;

      state.fetchLogError = action.payload;
      state.isFetchingLog = false;
    },

    resetLogs: (state, action) => {
      state.isFetchingLogs = false;
      state.isFetchingLog = false;

      state.fetchLogsError = null;
      state.fetchLogrror = null;
    },
  },
});

export const {
  getLogsRequest,
  getLogsSuccess,
  getLogsFailure,
  getLogRequest,
  getLogSuccess,
  getLogFailure,
  resetLogs,
} = logsSlice.actions;

export default logsSlice.reducer;
