import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "../features/user/userSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

const reducer = combineReducers({
  user: userSlice,
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