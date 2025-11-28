// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../slices/recipeSlice';

export default function RecipeList() {
    const dispatch = useDispatch();
    const { filteredRecipes, status, error } = useSelector(state => state.recipes);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [status, dispatch]);

    // ... Loading, Error, No results handling ... 
    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Recipe List</h1>
            <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    // 7 & 8. Update and Delete will happen inside RecipeDetails
                    <RecipeDetails key={recipe.id} recipe={recipe} previewMode={true} />
                ))}
            </div>
        </div>
    );
}