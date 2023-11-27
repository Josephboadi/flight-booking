import { createSlice } from "@reduxjs/toolkit";

export const flightsSlice = createSlice({
  name: "flightData",
  initialState: {
    flights: [],
    isFetchingFlights: false,
    fetchFlightsError: null,

  },
  reducers: {
    getflightsRequest: (state, action) => {
      state.isFetchingFlights = true;
      state = action.payload;
    },
    getflightsSuccess: (state, action) => {
      state.flights = action.payload;
      state.isFetchingFlights = false;
    },
    getflightsFailure: (state, action) => {
      state.flights = [];

      state.fetchFlightsError = action.payload;
      state.isFetchingFlights = false;
    },

    resetflights: (state, action) => {
      state.isFetchingFlights = false;

      state.fetchFlightsError = null;

    },
  },
});

export const {
  getflightsRequest,
  getflightsSuccess,
  getflightsFailure,
  resetflights,
} = flightsSlice.actions;

export default flightsSlice.reducer;
