// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slices/recipeSlice";
import authReducer from "../slices/authSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    auth: authReducer,
  },
});

export default store;
