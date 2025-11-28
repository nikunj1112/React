// src/components/RecipeForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../slices/recipeSlice';
import { useNavigate } from 'react-router-dom';

export default function RecipeForm() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 6. Validation
        if (!title.trim() || !ingredients.trim()) {
            alert("Title and Ingredients are required!");
            return;
        }

        const newRecipe = {
            title,
            ingredients: ingredients.split(',').map(item => item.trim()),
            category: "General", // Add other fields like category
        };

        const success = await dispatch(addRecipe(newRecipe));
        if (success) {
            navigate('/'); // Navigate back to the list
        }
    };
    
    // ... JSX Form implementation ...
    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
        </form>
    );
}