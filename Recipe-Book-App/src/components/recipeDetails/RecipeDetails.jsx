// src/components/recipeDetails/RecipeDetails.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe, updateRecipe } from "../../slices/recipeSlice";

export default function RecipeDetails({ recipe, previewMode }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [editedCategory, setEditedCategory] = useState(recipe.category);
  const [editedIngredients, setEditedIngredients] = useState(
    recipe.ingredients.join(", ")
  );
  const [editedInstructions, setEditedInstructions] = useState(recipe.instructions);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  const handleUpdate = () => {
    const updatedRecipe = {
      ...recipe,
      title: editedTitle,
      category: editedCategory,
      ingredients: editedIngredients.split(",").map((i) => i.trim()),
      instructions: editedInstructions,
    };
    dispatch(updateRecipe(updatedRecipe));
    setIsEditing(false);
  };

  if (previewMode) {
    return (
      <div className="card p-2 mb-2">
        <h5>{recipe.title}</h5>
        <p>Category: {recipe.category}</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {isEditing ? (
        <div>
          <input
            className="form-control mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <select
            className="form-select mb-2"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
            <option>Dessert</option>
            <option>Drinks</option>
          </select>
          <textarea
            className="form-control mb-2"
            rows={3}
            value={editedIngredients}
            onChange={(e) => setEditedIngredients(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            rows={4}
            value={editedInstructions}
            onChange={(e) => setEditedInstructions(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <p>Category: {recipe.category}</p>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <p>Instructions: {recipe.instructions}</p>
        </div>
      )}

      <button className="btn btn-danger me-2" onClick={handleDelete}>
        Delete
      </button>
      <button
        className="btn btn-primary"
        onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}
