// src/components/recipeList/RecipeList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes, filterByCategory } from '../../slices/recipeSlice';

// Color Palette
const COLORS = {
    PrimaryOrange: "#CF4B00",
    SoftBlue: "#9CC6DB",
    MutedGold: "#DDBA7D",
    Cream: "#FCF6D9",
};

// Mock Recipes (Fallback)
const mockRecipe = {
    id: 1,
    title: "Spicy Paneer Tikka",
    category: "Dinner",
    time: "45 min",
    imageUrl: "https://via.placeholder.com/300x200/CF4B00/FCF6D9?text=Paneer+Tikka",
    rating: 4.5,
};
const mockRecipes = Array(6).fill(mockRecipe).map((r, i) => ({ ...r, id: i + 1, title: `Recipe Title ${i + 1}` }));

export default function RecipeList() {
    const dispatch = useDispatch();

    // ✅ FIX: Correct slice name
    const recipeState = useSelector(state => state.recipe || {});
    const filteredRecipes = recipeState.filteredRecipes || [];
    const status = recipeState.status || 'idle';
    const error = recipeState.error;

    // Fallback to mock data if filteredRecipes empty
    const recipesToDisplay = filteredRecipes.length > 0 ? filteredRecipes : mockRecipes;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [dispatch, status]);

    // --- Loading & Error States ---
    if (status === 'loading') {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: COLORS.SoftBlue }}>
                <p>Loading recipes... ⏳</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: COLORS.PrimaryOrange }}>
                <p>Error loading recipes: {error} ❌</p>
            </div>
        );
    }

    if (recipesToDisplay.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: COLORS.MutedGold }}>
                <p>No recipes found for this filter. Try a different category! 🤔</p>
            </div>
        );
    }

    // --- Recipe Grid ---
    return (
        <div style={{ backgroundColor: COLORS.Cream, padding: '50px 20px' }}>
            <div className="container">
                <h2 style={{ color: COLORS.PrimaryOrange, marginBottom: '30px' }}>
                    Explore Delicious Recipes
                </h2>

                <div className="recipe-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {recipesToDisplay.map((recipe) => (
                        <Link key={recipe.id} to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
                            <div style={{ border: `1px solid ${COLORS.SoftBlue}`, borderRadius: '8px', overflow: 'hidden', background: '#fff', transition: 'transform 0.2s' }}
                                 className="recipe-card"
                            >
                                <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                <div style={{ padding: '15px' }}>
                                    <h3 style={{ color: COLORS.PrimaryOrange, marginBottom: '10px' }}>{recipe.title}</h3>
                                    <p style={{ color: COLORS.MutedGold, marginBottom: '10px' }}>Category: {recipe.category}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span>🕒 {recipe.time}</span>
                                        <span style={{ color: COLORS.PrimaryOrange }}>⭐ {recipe.rating}</span>
                                    </div>
                                    <button style={{ width: '100%', padding: '8px', backgroundColor: COLORS.SoftBlue, color: COLORS.Cream, border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
