import { createSlice } from "@reduxjs/toolkit";

const initialState = {admin: {}, adminLoggedIn : false}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.admin = action.payload
            state.isLoggedIn = true;
            console.log(state.admin)
          },
          adminLogout: (state) => {
            state.admin = null;
            state.isLoggedIn = false;
          },
    }
})

export const {adminLogin, adminLogout} = adminSlice.actions;

export default adminSlice.reducer;


