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

/**
 * applyFilters(recipes, filters)
 * - search: matches title or ingredients (case-insensitive)
 * - category: exact match (or "All")
 * - dietary: exact match (or "All"), treat missing dietary as "None"
 * - sortBy: 'date_desc' | 'date_asc' | 'name_asc' | 'name_desc'
 */
function applyFilters(recipes = [], filters = {}) {
  const {
    search = "",
    category = "All",
    dietary = "All",
    sortBy = "date_desc",
  } = filters;

  let out = Array.isArray(recipes) ? [...recipes] : [];

  // SEARCH (title or ingredients)
  const q = (search || "").trim().toLowerCase();
  if (q) {
    out = out.filter((r) => {
      const title = (r.title || "").toString().toLowerCase();
      const ingredients = Array.isArray(r.ingredients)
        ? r.ingredients.join(" ").toLowerCase()
        : (r.ingredients || "").toString().toLowerCase();
      return title.includes(q) || ingredients.includes(q);
    });
  }

  // CATEGORY filter
  if (category && category !== "All" && category !== "all") {
    out = out.filter((r) => (r.category || "") === category);
  }

  // DIETARY filter
  if (dietary && dietary !== "All" && dietary !== "all") {
    out = out.filter((r) => {
      const d = (r.dietary || "None").toString();
      return d === dietary;
    });
  }

  // SORTING
  const compareName = (a, b) => {
    const A = (a.title || "").toString();
    const B = (b.title || "").toString();
    return A.localeCompare(B);
  };
  const compareDate = (a, b) => {
    const da = new Date(a.dateAdded || a.createdAt || 0).getTime();
    const db = new Date(b.dateAdded || b.createdAt || 0).getTime();
    return da - db;
  };

  switch (sortBy) {
    case "name_asc":
      out.sort(compareName);
      break;
    case "name_desc":
      out.sort((a, b) => -compareName(a, b));
      break;
    case "date_asc":
      out.sort(compareDate);
      break;
    case "date_desc":
    default:
      out.sort((a, b) => -compareDate(a, b));
      break;
  }

  return out;
}

// ================= SLICE =================
const recipeSlice = createSlice({
  name: "recipe",

  initialState: {
    recipes: [],
    filteredRecipes: [],
    status: "idle",
    error: null,
    filters: {
      search: "",
      category: "All",
      dietary: "All",
      sortBy: "date_desc",
    },
  },

  reducers: {
    // set search string and recompute filteredRecipes
    setSearch(state, action) {
      state.filters.search = action.payload;
      state.filteredRecipes = applyFilters(state.recipes, state.filters);
    },

    // set category and recompute filteredRecipes
    setCategoryFilter(state, action) {
      state.filters.category = action.payload;
      state.filteredRecipes = applyFilters(state.recipes, state.filters);
    },

    // set dietary filter
    setDietaryFilter(state, action) {
      state.filters.dietary = action.payload;
      state.filteredRecipes = applyFilters(state.recipes, state.filters);
    },

    // set sorting
    setSortBy(state, action) {
      state.filters.sortBy = action.payload;
      state.filteredRecipes = applyFilters(state.recipes, state.filters);
    },

    // optional: clear filters
    clearFilters(state) {
      state.filters = { search: "", category: "All", dietary: "All", sortBy: "date_desc" };
      state.filteredRecipes = applyFilters(state.recipes, state.filters);
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
        state.recipes = action.payload || [];
        // compute filtered list using current filters
        state.filteredRecipes = applyFilters(state.recipes, state.filters);
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch recipes from server";
      })

      // ---------- Add ----------
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
        state.filteredRecipes = applyFilters(state.recipes, state.filters);
      })

      // ---------- Update ----------
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const updated = action.payload;
        state.recipes = state.recipes.map((r) =>
          r.id === updated.id ? updated : r
        );
        state.filteredRecipes = applyFilters(state.recipes, state.filters);
      })

      // ---------- Delete ----------
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
        state.filteredRecipes = applyFilters(state.recipes, state.filters);
      });
  },
});

export const {
  setSearch,
  setCategoryFilter,
  setDietaryFilter,
  setSortBy,
  clearFilters,
} = recipeSlice.actions;
export default recipeSlice.reducer;
