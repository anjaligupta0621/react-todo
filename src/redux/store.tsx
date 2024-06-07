import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slice/TodoSlice";
import authReducer from "./Slice/AuthSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
