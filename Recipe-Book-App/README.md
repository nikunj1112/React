# 🍽 Cookify - Your Digital Recipe Book and Culinary Companion 👩‍🍳

Cookify is a full-featured, responsive web application that serves as a personalized digital recipe manager. This project showcases modern frontend development practices using **React**, **Redux Toolkit**, and comprehensive routing. Users can authenticate, browse a dynamic list of recipes, filter them by category, and perform complete **CRUD** (Create, Read, Update, Delete) operations on their culinary collection.

This application is built with a focus on a smooth user experience, featuring interactive elements like **image preloading** and **seamless hover effects** on recipe cards. 🖼️✨



---

## 💡 Core Features & Functionality

### 1. Robust User Authentication & Authorization 🔒

Cookify implements a comprehensive authorization system using **Redux** for state management and **React Router** for protection.

* **Simulated Authentication:** Login (`fakeLogin`) and registration (`fakeRegister`) are handled by Redux thunks that persist user data and session tokens in `localStorage`. 💾
* **Persistent Session:** The application checks `localStorage` upon initialization to automatically **restore the user's session**.
* **Protected Routes (`<PrivateRoute>`):** Routes like `/recipes`, `/add`, and `/recipes/:id` ensure **only logged-in users** can access them. Unauthorized users are redirected to `/login`. 🚫
* **Restricted Routes (`<RestrictedRoute>`):** Logged-in users cannot access the `/login` or `/register` pages and are redirected to `/recipes`.
* **Secure Logout:** The `logout` action clears the Redux store state and removes the session token from `localStorage`, ensuring a clean exit. 🚪

### 2. Dynamic Recipe Management (CRUD) 📝

All recipe operations are managed via asynchronous **Redux Thunks**, interacting with a simulated backend API.

* **Recipe List (`/recipes`):** 📋
    * **Data Fetching:** Recipes are fetched from the API and stored in the **Redux state**.
    * **Filtering:** A dropdown in the navigation bar allows users to instantly **filter** the displayed recipes by categories (e.g., 'Breakfast', 'Dinner'). 🍜
    * **Interactive Cards:** Each `RecipeCardSimple` features advanced image loading:
        * It **preloads** the `imageHoverUrl` in the background using `new Image()`. 🚀
        * When hovered, a smooth **CSS crossfade transition** occurs, enhancing perceived performance.
* **Add New Recipe (`/add`):** A dedicated form allows users to create and dispatch the `addRecipe` thunk to persist a new entry. ➕
* **View & Edit Details (`/recipes/:id`):** ⚙️
    * Displays all metadata (Title, Ingredients, Instructions, Rating, Difficulty).
    * Allows toggling into an **Edit Mode** to update recipe data via the `updateRecipe` thunk.
    * Includes a **Delete** button using the `deleteRecipe` thunk. 🗑️

---

## 🔗 Live Application / Demo

**View the Live Application Here:**

---

## 📽️ Demo & Screenshots

https://github.com/user-attachments/assets/65f3e15d-2ab3-4620-a302-840f782d6a7b

,

<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 39 37 AM" src="https://github.com/user-attachments/assets/0cf9cb41-28bd-4eac-9ec9-4459ba5d156c" />
<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 39 24 AM" src="https://github.com/user-attachments/assets/330bc51b-85c7-4960-a435-58d4f74f3855" />
<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 39 09 AM" src="https://github.com/user-attachments/assets/ef6f1e0a-e287-410b-a532-f05b3227c7b9" />
<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 38 50 AM" src="https://github.com/user-attachments/assets/686d0384-fda5-44d6-a7f5-a0fa1f824e79" />
<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 38 35 AM" src="https://github.com/user-attachments/assets/234b9480-c93a-49a7-999b-e5127a635109" />
<img width="500" height="400" alt="Screenshot 2025-11-30 at 1 37 39 AM" src="https://github.com/user-attachments/assets/5f9a6001-b532-497f-a905-5a86f92d2d94" />




---

## 🛠️ Technology Stack 🚀

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | **React** | Component-based UI architecture. ⚛️ |
| **State Management** | **Redux Toolkit (RTK)** | Predictable, centralized state management with `createSlice` and `createAsyncThunk`. |
| **Routing** | **React Router DOM v6** | Declarative navigation and robust route protection. |
| **API Interaction** | **Axios** | Promise-based HTTP client for data fetching and manipulation. 🌐 |
| **Backend Simulation**| **JSON Server (External)** | Used to simulate a REST API endpoint (`http://localhost:3000/recipes`) for persistence. 🧱 |
| **UI/Styling** | **Standard CSS Modules** | Component-specific styling and responsiveness. 🎨 |

---

## 💻 Setup and Run Locally 🛠️

### Prerequisites

* Node.js (LTS version)
* `json-server` (recommended for local API simulation)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd cookify-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the API Server (if using json-server):**
    The app is configured to fetch from `http://localhost:3000/recipes`. You'll need to run a JSON server with a `db.json` file containing sample recipe data.

    Assuming you have `json-server` installed globally:
    ```bash
    json-server --watch db.json --port 3000
    ```

4.  **Start the React Application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will typically open in your browser at `http://localhost:5173` (or similar).

---

## 📦 Project Structure Overview

### State Management (`src/slices`)

| File | Description |
| :--- | :--- |
| `authSlice.js` | Manages user authentication state (`isAuthenticated`, `user`, `token`). Includes `fakeRegister` and `fakeLogin` thunks that use `localStorage` for simulation. |
| `recipeSlice.js` | Manages the application's recipe data (`recipes`, `filteredRecipes`). Includes async thunks (`fetchRecipes`, `addRecipe`, `updateRecipe`, `deleteRecipe`) for API interaction. |
| `store/store.js` | Configures the Redux store with the `auth` and `recipe` reducers. |

### Components and Pages

| File | Type | Description |
| :--- | :--- | :--- |
| `App.jsx` | Main | Sets up the main routing structure using `Routes`. |
| `navbar/Navbar.jsx` | Component | The main navigation bar, handling links, logout, and the dynamic **Categories** and **Add Recipe** buttons. Also renders the main **Home Page** content. |
| `privateRoute/PrivateRoute.jsx` | Component | HOC (Higher-Order Component) that redirects unauthenticated users to `/login`. |
| `RestrictedRoute.jsx` | Component | HOC that redirects authenticated users from `/login` or `/register` to `/recipes`. |
| `Signin/Signin.jsx` | Page | Login form component. |
| `Register/Register.jsx` | Page | User registration form component. |
| `recipeList/RecipeList.jsx` | Component | Displays the grid of recipes, fetches data, and contains the `RecipeCardSimple` for individual recipe presentation (including the hover preload logic). |
| `recipeForm/RecipeForm.jsx` | Component | Form used for creating a new recipe. |
| `recipeDetails/RecipeDetails.jsx` | Component | Displays a single recipe's full details and includes the **Edit** and **Delete** functionality. |

---
