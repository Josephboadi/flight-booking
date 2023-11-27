import { createSlice } from "@reduxjs/toolkit";

export const airlinesSlice = createSlice({
  name: "airlineData",
  initialState: {
    airlines: [],
    isFetchingAirlines: false,
    fetchAirlinesError: null,

  },
  reducers: {
    getAirlinesRequest: (state, action) => {
      state.isFetchingAirlines = true;
      state = action.payload;
    },
    getAirlinesSuccess: (state, action) => {
      console.log("slice airline data========================, ", action.payload)
      state.airlines = action.payload;
      state.isFetchingAirlines = false;
    },
    getAirlinesFailure: (state, action) => {
      state.airlines = [];

      state.fetchAirlinesError = action.payload;
      state.isFetchingAirlines = false;
    },

    resetAirlines: (state, action) => {
      state.isFetchingAirlines = false;

      state.fetchAirlinesError = null;

    },
  },
});

export const {
  getAirlinesRequest,
  getAirlinesSuccess,
  getAirlinesFailure,
  resetAirlines,
} = airlinesSlice.actions;

export default airlinesSlice.reducer;
