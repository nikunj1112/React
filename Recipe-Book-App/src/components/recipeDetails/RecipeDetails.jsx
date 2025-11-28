// src/components/RecipeDetails.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRecipe, updateRecipe } from '../slices/recipeSlice';

export default function RecipeDetails({ recipe, previewMode }) {
    const dispatch = useDispatch();
    // 7. Update State/Logic
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(recipe.title);
    
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
            // 8. Deleting Recipes
            dispatch(deleteRecipe(recipe.id));
        }
    };

    const handleUpdate = () => {
        const updatedRecipe = {
            ...recipe,
            title: editedTitle,
            // ... other edited fields
        };
        // 7. Updating Recipes
        dispatch(updateRecipe(updatedRecipe));
        setIsEditing(false);
    };

    if (previewMode) {
        // Displaying a simple card in RecipeList
        return (
            <div className="card">
                <h3>{recipe.title}</h3>
                {/* ... simple preview content ... */}
            </div>
        );
    }

    // Full Details View
    return (
        <div>
            {isEditing ? (
                // Edit Form
                <input value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
            ) : (
                // Display View
                <h2>{recipe.title}</h2>
            )}
            
            <button onClick={handleDelete}>Delete</button>
            <button onClick={isEditing ? handleUpdate : () => setIsEditing(true)}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
    );
}