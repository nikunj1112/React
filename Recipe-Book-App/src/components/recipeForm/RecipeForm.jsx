import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import "./RecipeForm.css";

export default function RecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    const newRecipe = {
      title: title.trim(),
      category,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions: instructions.trim(),
      imageUrl: imageUrl.trim() || "https://via.placeholder.com/400x250",
      time: "30 min",
      rating: 5,
    };

    try {
      await dispatch(addRecipe(newRecipe)).unwrap();
      alert("Recipe added successfully!");
      navigate("/recipes");
    } catch (err) {
      alert("Failed to add recipe: " + err);
    }
  };

  return (
    <div className="recipe-form-container">
      
      {/* ⭐ BACK ARROW BUTTON */}
      <button className="back-arrow" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="recipe-form-title">➕ Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title*</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category*</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
            <option>Dessert</option>
            <option>Drinks</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients* (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Flour, Eggs, Milk"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions*</label>
          <textarea
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="recipe-btn">➕ Add Recipe</button>
      </form>
    </div>
  );
}
