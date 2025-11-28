// src/components/recipeForm/RecipeForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../slices/recipeSlice";
import { useNavigate } from "react-router-dom";

export default function RecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions) {
      alert("Please fill all required fields!");
      return;
    }

    const newRecipe = {
      title,
      category,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      image,
    };

    try {
      await dispatch(addRecipe(newRecipe)).unwrap();
      alert("Recipe added successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to add recipe: " + error);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 style={{ color: "#CF4B00" }}>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title*</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />
        </div>

        <div className="mb-3">
          <label>Category*</label>
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
          <label>Ingredients* (comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Flour, Eggs, Milk"
          />
        </div>

        <div className="mb-3">
          <label>Instructions*</label>
          <textarea
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn-custom btn-primary-color">
          ➕ Add Recipe
        </button>
      </form>
    </div>
  );
}
