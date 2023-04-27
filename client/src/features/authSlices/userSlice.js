import { createSlice } from "@reduxjs/toolkit";

const initialState = { table:null, isbooked: false, orderId: null };

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
      state.orderId = action.payload
    },

    clearOrder: (state) => {
      state.orderId = null
    },

    releiveTable: (state) => {
      state.table = null;
      state.isbooked = false;
    },

  },
});

export const { bookedTable, releiveTable, userOrder, clearOrder } = userSlice.actions;

export default userSlice.reducer;
