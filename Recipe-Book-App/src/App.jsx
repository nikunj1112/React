
import Navbar from "./components/navbar/Navbar";

import { Routes, Route ,Router } from "react-router-dom";
import RecipeList from "./components/recipeList/RecipeList";
import RecipeForm from "./components/recipeForm/RecipeForm";
import RecipeDetails from "./components/recipeDetails/RecipeDetails";
import Login from "./pages/signin/Signin";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route 
          path="/add" 
          element={<PrivateRoute><RecipeForm /></PrivateRoute>} 
        />
        <Route 
          path="/recipes/:id" 
          element={<RecipeDetails />} 
        />
      </Routes>
    </Router>
  );
}
