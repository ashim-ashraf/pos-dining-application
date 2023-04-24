import { createSlice } from "@reduxjs/toolkit";

const initialState = { table:null, isbooked: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    bookedTable: (state, action) => {
      console.log(action.payload,"hiii")
      state.table = action.payload
      state.isbooked = true;
      console.log(state.table)
    },

    releiveTable: (state) => {
      state.table = null;
      state.isbooked = false;
    },

  },
});

export const { bookedTable, releiveTable } = userSlice.actions;

export default userSlice.reducer;
