import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {name:"" , id: "", email:"", phone:""}, isLoggedIn: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },

  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
