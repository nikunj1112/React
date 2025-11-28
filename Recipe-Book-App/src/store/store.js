import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slices/recipeSlice";
import authReducer from "../slices/authSlice";

export default configureStore({
  reducer: {
    recipe: recipeReducer,
    auth: authReducer,
  },
});
