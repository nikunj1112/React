// src/components/recipeList/RecipeList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  deleteRecipe,
  setSearch,
  setSortBy,
} from "../../slices/recipeSlice";
import "./recipeList.css";
import { useNavigate } from "react-router-dom";

/**
 * Single Card component — handles hover preload
 */
function RecipeCardSimple({ r, onView }) {
  const mainSrc =
    r.image || r.imageUrl || "https://dummyimage.com/350x200/cccccc/000000&text=No+Image";
  const hoverSrc = r.hoverImage || r.imageHoverUrl || r.hover || "";

  React.useEffect(() => {
    if (!hoverSrc) return;
    const img = new Image();
    img.src = hoverSrc;
  }, [hoverSrc]);

  return (
    <div className="recipe-card">
      <div
        className="img-wrap"
        onClick={() => onView(r.id)}
        style={{ cursor: "pointer" }}
      >
        <img src={mainSrc} alt={r.title} className="recipe-img img-main" draggable="false" />
        {hoverSrc && (
          <img
            src={hoverSrc}
            alt={`${r.title} preview`}
            className="recipe-img img-hover"
            draggable="false"
          />
        )}
      </div>

      <div className="card-body">
        <h3>{r.title}</h3>
        <p className="muted">{r.category}</p>
        <p className="ing-preview">
          {(r.ingredients || []).slice(0, 3).join(", ")}
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={() => onView(r.id)} className="btn-small">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecipeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, filteredRecipes, status, filters } =
    useSelector((state) => state.recipe || {});

  const [localQuery, setLocalQuery] = useState(filters?.search || "");

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSearch(localQuery));
    }, 220);
    return () => clearTimeout(id);
  }, [localQuery, dispatch]);

  // Always use filteredRecipes (even empty)
  const list = Array.isArray(filteredRecipes)
    ? filteredRecipes
    : recipes || [];

  const sortOptions = [
    { value: "date_desc", label: "Date (new → old)" },
    { value: "date_asc", label: "Date (old → new)" },
    { value: "name_asc", label: "Name (A → Z)" },
    { value: "name_desc", label: "Name (Z → A)" },
  ];

  const clearAllFilters = () => {
    dispatch(setSearch(""));
    dispatch(setSortBy("date_desc"));
    setLocalQuery("");
  };

  return (
    <div className="recipes-page container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back
      </button>

      {/* SEARCH + SORT (category removed) */}
      <div
        className="compact-filter-bar"
        style={{
          display: "flex",
          gap: 12,
          margin: "18px 0",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="search recipe.."
          aria-label="Search recipes"
          className="compact-search-input"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          style={{ padding: "10px 14px", minWidth: 220 }}
        />

        {/* Improved Sort Select (Tailwind-style classes) */}
        <select
          className="
            px-4 py-2 
            rounded-xl
            bg-white
            border border-gray-300 
            text-gray-700
            shadow-sm
            hover:shadow 
            transition-all
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
            compact-select
          "
          value={filters?.sortBy || "date_desc"}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          aria-label="Sort recipes"
        >
          <option value="date_desc" disabled={false}>
            Sort By
          </option>
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          onClick={clearAllFilters}
          className="compact-clear-btn"
          style={{ padding: "8px 12px" }}
        >
          Clear
        </button>
      </div>

      {status === "loading" && <p className="center">Loading...</p>}

      {/* GRID */}
      <div className="cards-grid">
        {list.length === 0 ? (
          <p className="center">No Recipes Found</p>
        ) : (
          list.map((r) => (
            <div key={r.id} style={{ position: "relative" }}>
              <RecipeCardSimple
                r={r}
                onView={(id) => navigate(`/recipes/${id}`)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
