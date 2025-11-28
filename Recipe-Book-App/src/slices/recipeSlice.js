// src/slices/recipeSlice.js

import axios from 'axios';

// Actions
const FETCH_RECIPES = 'recipes/fetch';
const ADD_RECIPE = 'recipes/add';
const UPDATE_RECIPE = 'recipes/update';
const DELETE_RECIPE = 'recipes/delete';

const initialState = {
    recipes: [],
    filteredRecipes: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: 'All'
};

// Reducer
export const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES:
            // Assuming payload has status and data
            return {
                ...state,
                recipes: action.payload.data,
                filteredRecipes: action.payload.data, // initially set to all
                status: action.payload.status,
                error: null,
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                filteredRecipes: [...state.recipes, action.payload],
            };
        case UPDATE_RECIPE:
            const updatedRecipes = state.recipes.map(recipe =>
                recipe.id === action.payload.id ? action.payload : recipe
            );
            return {
                ...state,
                recipes: updatedRecipes,
                filteredRecipes: updatedRecipes,
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload),
                filteredRecipes: state.recipes.filter(recipe => recipe.id !== action.payload),
            };
        // 9. Sorting and Filtering (will be implemented in component later)
        case 'recipes/filterByCategory':
            const category = action.payload;
            const newFiltered = category === 'All' 
                ? state.recipes
                : state.recipes.filter(recipe => recipe.category === category);
            return {
                ...state,
                filteredRecipes: newFiltered,
                filter: category,
            };
        default:
            return state;
    }
};

// Thunks (Asynchronous Operations)
const API_URL = 'http://localhost:3004/recipes'; 

export const fetchRecipes = () => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES, payload: { status: 'loading' } });
    try {
        const response = await axios.get(API_URL);
        dispatch({ type: FETCH_RECIPES, payload: { data: response.data, status: 'succeeded' } });
    } catch (error) {
        dispatch({ type: FETCH_RECIPES, payload: { status: 'failed', error: error.message } });
    }
};

export const addRecipe = (recipeData) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, recipeData);
        dispatch({ type: ADD_RECIPE, payload: response.data });
        return true;
    } catch (error) {
        console.error("Error adding recipe:", error);
        return false;
    }
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/${recipeId}`);
        dispatch({ type: DELETE_RECIPE, payload: recipeId });
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
};

export const updateRecipe = (recipe) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/${recipe.id}`, recipe);
        dispatch({ type: UPDATE_RECIPE, payload: response.data });
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
};





// Export filter action for Navbar use
export const filterByCategory = (category) => ({
    type: 'recipes/filterByCategory',
    payload: category,
});