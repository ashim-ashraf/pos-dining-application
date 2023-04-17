import { createSlice } from "@reduxjs/toolkit";

const initialState = {vendor: null, isLoggedIn  : false}

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        vendorLogin: (state, action) => {
            state.vendor = action.payload
            state.isLoggedIn = true;
          },
          vendorLogout: (state) => {
            state.vendor = null;
            state.isLoggedIn = false;
          },
    }
})

export const {vendorLogin, vendorLogout} = vendorSlice.actions;

export default vendorSlice.reducer;


