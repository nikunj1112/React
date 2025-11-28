// src/slices/recipeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3004/recipes";

// --- Async Thunks ---
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe) => {
    const res = await axios.post(API_URL, recipe);
    return res.data;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe) => {
    const res = await axios.put(`${API_URL}/${recipe.id}`, recipe);
    return res.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// --- Slice ---
const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    filteredRecipes: [],
    status: "idle",
    error: null,
    filter: "All",
  },
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.filteredRecipes =
        category === "All"
          ? state.recipes
          : state.recipes.filter((r) => r.category === category);
      state.filter = category;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.filteredRecipes = action.payload;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
        state.filteredRecipes.push(action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
          state.filteredRecipes[index] = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
        state.filteredRecipes = state.filteredRecipes.filter((r) => r.id !== action.payload);
      });
  },
});

export const { filterByCategory } = recipeSlice.actions;
export default recipeSlice.reducer;
