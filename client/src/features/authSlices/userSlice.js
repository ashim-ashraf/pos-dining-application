import { createSlice } from "@reduxjs/toolkit";

const initialState = { table:null, isbooked: false, order: {} , dataForRating: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    bookedTable: (state, action) => {
      state.table = action.payload
      state.isbooked = true;
      console.log(state.table)
    },

    userOrder: (state, action) => {
      state.order = action.payload
    },

    clearOrder: (state) => {
      state.order = {}
    },

    ratingData: (state, action) => {
      state.dataForRating = action.payload
    },

    clearRatingData: (state) => {
      state.dataForRating = null
    },

    releiveTable: (state) => {
      state.table = null;
      state.isbooked = false;
    },

  },
});

export const { bookedTable, releiveTable, userOrder, clearOrder, ratingData, clearRatingData } = userSlice.actions;

export default userSlice.reducer;
