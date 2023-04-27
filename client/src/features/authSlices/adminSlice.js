import { createSlice } from "@reduxjs/toolkit"

const initialState = { admin: null , isLoggedIn: false  }

export const adminSlice = createSlice({ 
    name: 'admin',
    initialState,
    reducers: {
        adminLogin: (state,action) => {
            state.admin = "Admin";
            state.isLoggedIn = true;
        },
        adminLogout: (state) => {
            state.vendor = null;
            state.isLoggedIn = false;
        }

    }
})

export const {adminLogin, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;