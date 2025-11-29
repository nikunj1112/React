// src/slices/recipeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/recipes"; 

// --------------------- FETCH ALL RECIPES ---------------------
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

// --------------------- ADD RECIPE ---------------------
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (newRecipe) => {
    const res = await axios.post(API_URL, newRecipe);
    return res.data;
  }
);

// --------------------- UPDATE RECIPE ---------------------
export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe) => {
    const res = await axios.put(`${API_URL}/${recipe.id}`, recipe);
    return res.data;
  }
);

// --------------------- DELETE RECIPE ---------------------
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// ================= SLICE =================
const recipeSlice = createSlice({
  name: "recipe",

  initialState: {
    recipes: [],
    filteredRecipes: [],
    status: "idle",
    error: null,
  },

  reducers: {
    filterByCategory(state, action) {
      state.filteredRecipes = action.payload === "all"
        ? state.recipes
        : state.recipes.filter((r) => r.category === action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------- Fetch ----------
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
        state.filteredRecipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch recipes from server";
      })

      // ---------- Add ----------
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
        state.filteredRecipes.push(action.payload);
      })

      // ---------- Update ----------
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const updated = action.payload;
        state.recipes = state.recipes.map((r) =>
          r.id === updated.id ? updated : r
        );
        state.filteredRecipes = state.filteredRecipes.map((r) =>
          r.id === updated.id ? updated : r
        );
      })

      // ---------- Delete ----------
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
        state.filteredRecipes = state.filteredRecipes.filter(
          (r) => r.id !== action.payload
        );
      });
  },
});

export const { filterByCategory } = recipeSlice.actions;
export default recipeSlice.reducer;
