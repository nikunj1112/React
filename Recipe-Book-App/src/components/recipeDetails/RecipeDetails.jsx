// src/components/recipeDetails/RecipeDetails.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, updateRecipe, deleteRecipe } from "../../slices/recipeSlice";
import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes = [], status } = useSelector((s) => s.recipe || {});

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHover, setIsHover] = useState(false);

  // preload state to know when hover image is loaded
  const [hoverLoaded, setHoverLoaded] = useState(false);

  const hoverImgRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "Breakfast",
    ingredients: "",
    instructions: "",
    imageUrl: "",
    imageHoverUrl: "",
    time: "30 min",
    rating: 5,
    servings: 2,
    difficulty: "Easy",
  });

  useEffect(() => {
    if (status === "idle") dispatch(fetchRecipes());
  }, [status, dispatch]);

  const recipe = recipes.find((r) => String(r.id) === String(id) || String(r._id) === String(id));

  useEffect(() => {
    if (recipe) {
      setForm({
        title: recipe.title || "",
        category: recipe.category || "Breakfast",
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients || "",
        instructions: recipe.instructions || "",
        imageUrl: recipe.imageUrl || recipe.image || "https://dummyimage.com/800x450/cccccc/000000&text=No+Image",
        imageHoverUrl: recipe.imageHoverUrl || recipe.hoverImage || "",
        time: recipe.time || "30 min",
        rating: recipe.rating ?? 5,
        servings: recipe.servings ?? 2,
        difficulty: recipe.difficulty || "Easy",
      });
    }
  }, [recipe]);

  // preload hover image whenever url changes
  useEffect(() => {
    setHoverLoaded(false);
    const url = form.imageHoverUrl;
    if (!url) return;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setHoverLoaded(true);
      hoverImgRef.current = img;
    };
    img.onerror = () => {
      setHoverLoaded(false);
      hoverImgRef.current = null;
    };

    // cleanup not really needed for Image but keep reference null
    return () => {
      // no-op
    };
  }, [form.imageHoverUrl]);

  if (status === "loading") {
    return <div className="loading-state">Loading Recipe... 🔄</div>;
  }
  if (!recipe) {
    return <div className="not-found-state">Recipe Not Found 😥</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.ingredients.trim() || !form.instructions.trim()) {
      alert("Please fill Title, Ingredients, and Instructions.");
      return;
    }

    const payload = {
      ...recipe,
      id: recipe.id ?? recipeId,
      title: form.title.trim(),
      category: form.category,
      ingredients: form.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
      instructions: form.instructions.trim(),
      imageUrl: form.imageUrl.trim(),
      imageHoverUrl: form.imageHoverUrl.trim(),
      time: form.time,
      rating: Number(form.rating),
      servings: Number(form.servings),
      difficulty: form.difficulty,
    };

    try {
      setIsSaving(true);
      await dispatch(updateRecipe(payload)).unwrap();
      alert("Recipe updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Update failed! Check console.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    const idToDelete = recipe.id ?? recipe._id;

    try {
      setIsDeleting(true);
      await dispatch(deleteRecipe(idToDelete)).unwrap();
      navigate("/recipes");
    } catch (err) {
      alert("Delete failed! Check console.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // When hovering, if hover image exists and loaded => show hover layer (crossfade)
  const showHoverLayer = Boolean(form.imageHoverUrl && hoverLoaded && isHover);

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div
        className={`image-wrapper ${showHoverLayer ? "has-hover" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-hidden="false"
      >
        {/* main image (base) */}
        <img
          className="recipe-image img-main"
          src={form.imageUrl}
          alt={form.title || "Recipe image"}
          draggable="false"
        />

        {/* hover image (crossfade) - only render when hoverUrl present */}
        {form.imageHoverUrl ? (
          <img
            className={`recipe-image img-hover ${showHoverLayer ? "visible" : ""}`}
            src={form.imageHoverUrl}
            alt={form.title ? `${form.title} (preview)` : "Hover image"}
            draggable="false"
          />
        ) : null}
      </div>

      {!isEditing ? (
        <>
          <h2 className="recipe-title">{form.title}</h2>

          <div className="recipe-info-box">
            <div className="info-chip"><strong>Category:</strong> {form.category}</div>
            <div className="info-chip"><strong>Time:</strong> {form.time}</div>
            <div className="info-chip rating-stars"><strong>Rating:</strong> <span>{("⭐").repeat(form.rating)}</span></div>
            <div className="info-chip"><strong>Difficulty:</strong> {form.difficulty}</div>
          </div>

          <h4 className="recipe-section-title">Ingredients</h4>
          <p className="recipe-text">{form.ingredients}</p>

          <h4 className="recipe-section-title">Instructions</h4>
          <p className="recipe-text">{form.instructions}</p>

          <div className="btn-group">
            <button className="btn btn-edit" onClick={() => setIsEditing(true)}>✏ Edit</button>
            <button className="btn btn-delete" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "🗑 Delete"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="edit-form">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />

            <select name="category" value={form.category} onChange={handleChange}>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
              <option>Dessert</option>
              <option>Drinks</option>
            </select>

      

            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐⭐</option>
              <option value="3">3 ⭐⭐⭐</option>
              <option value="4">4 ⭐⭐⭐⭐</option>
              <option value="5">5 ⭐⭐⭐⭐⭐</option>
            </select>

            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input name="servings" type="number" min="1" value={form.servings} onChange={handleChange} placeholder="Servings" />

            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="Ingredients (comma separated)"
              rows={3}
            />

            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Instructions"
              rows={6}
            />

            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Main Image URL" />

            <input name="imageHoverUrl" value={form.imageHoverUrl} onChange={handleChange} placeholder="Hover Image URL (optional)" />

            <div className="btn-group">
              <button className="btn btn-save" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "💾 Save"}
              </button>
              <button className="btn btn-cancel" onClick={() => { setIsEditing(false); setIsHover(false); }}>❌ Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
