import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "../features/authSlices/userSlice";
import vendorSlice from "../features/authSlices/vendorSlice";
import adminSlice from "../features/authSlices/adminSlice";

const reducer = combineReducers({
  user: userSlice,
  vendor: vendorSlice,
  admin: adminSlice
});

const presistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(presistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});