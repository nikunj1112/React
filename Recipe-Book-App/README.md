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

<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 15 10 AM" src="https://github.com/user-attachments/assets/467e61b5-a4f4-47a8-bead-516664650558" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 14 08 AM" src="https://github.com/user-attachments/assets/cd25986b-b535-44f8-b126-8c4e885a9dee" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 14 27 AM" src="https://github.com/user-attachments/assets/c02c9185-5564-429a-b55f-3efb371f8ef7" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 13 56 AM" src="https://github.com/user-attachments/assets/33376c7c-54b7-4344-be82-a98c38fbdc09" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 13 15 AM" src="https://github.com/user-attachments/assets/293e36c6-79e7-4f2e-a1a9-1d0c7f7210de" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 12 41 AM" src="https://github.com/user-attachments/assets/be127dc4-e4d6-49f4-b120-f4237a662827" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 12 25 AM" src="https://github.com/user-attachments/assets/9c14f3cd-c51f-4222-b1e1-4d0cc3980cb1" />
<img width="600" height="400" alt="Screenshot 2025-12-01 at 11 12 15 AM" src="https://github.com/user-attachments/assets/0782432f-e38e-407d-aeef-e998dfe1c359" />



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
