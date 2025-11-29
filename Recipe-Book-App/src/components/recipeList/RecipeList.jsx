// src/components/recipeList/RecipeList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../../slices/recipeSlice";
import "./recipeList.css";
import { useNavigate } from "react-router-dom";

/**
 * Single Card component — handles hover preload + crossfade
 */
function RecipeCardSimple({ r, onView }) {
  const [hover, setHover] = useState(false);
  const [hoverLoaded, setHoverLoaded] = useState(false);

  const mainSrc = r.image || r.imageUrl || "https://dummyimage.com/350x200/cccccc/000000&text=No+Image";
  const hoverSrc = r.hoverImage || r.imageHoverUrl || r.hover || "";

  // preload hover image when card mounts or when hoverSrc changes
  useEffect(() => {
    setHoverLoaded(false);
    if (!hoverSrc) return;
    const img = new Image();
    img.src = hoverSrc;
    img.onload = () => setHoverLoaded(true);
    img.onerror = () => setHoverLoaded(false);
    // no cleanup needed for preloaded Image
  }, [hoverSrc]);

  // decide whether to show hover image: only when hovered AND hover image loaded
  const showHover = !!(hover && hoverSrc && hoverLoaded);

  return (
    <div
      className="recipe-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="img-wrap" onClick={() => onView(r.id)} style={{ cursor: "pointer" }}>
        <img src={mainSrc} alt={r.title} className="recipe-img img-main" draggable="false" />
        {hoverSrc ? (
          <img
            src={hoverSrc}
            alt={`${r.title} preview`}
            className={`recipe-img img-hover ${showHover ? "visible" : ""}`}
            draggable="false"
            aria-hidden={!showHover}
          />
        ) : null}
      </div>

      <div className="card-body">
        <h3>{r.title}</h3>
        <p className="muted">{r.category}</p>
        <p className="ing-preview">{(r.ingredients || []).slice(0, 3).join(", ")}</p>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={() => onView(r.id)} className="btn-small">View</button>
        </div>
      </div>
    </div>
  );
}

export default function RecipeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, filteredRecipes, status } = useSelector((state) => state.recipe || {});

  // fetch recipes once
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const list = filteredRecipes && filteredRecipes.length > 0 ? filteredRecipes : recipes || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await dispatch(deleteRecipe(id)).unwrap();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  return (
    <div className="recipes-page container">
  <button
  onClick={() => navigate("/")}
  className="back-button"
>
  ← Back
</button>


      {status === "loading" && <p className="center">Loading...</p>}

      <div className="cards-grid">
        {list.length === 0 ? (
          <p className="center">No Recipes Found</p>
        ) : (
          list.map((r) => (
            <RecipeCardSimple
              key={r.id}
              r={r}
              onView={(id) => navigate(`/recipes/${id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
