# 🍳 Cookify — Your Digital Recipe Book

Cookify is a full-featured, responsive web application that serves as a personalized digital recipe manager. This project showcases modern frontend development practices using **React**, **Redux Toolkit**, and comprehensive routing. Users can authenticate, browse a dynamic list of recipes, filter them by category, and perform complete **CRUD** (Create, Read, Update, Delete) operations on their culinary collection.

This application is built with a focus on a smooth user experience, featuring interactive elements like **image preloading** and **seamless hover effects** on recipe cards. 🖼️✨


---

## 🚀 Features

- 🔐 **Login / Register (localStorage auth)**
- 🍽 **Add / Edit / Delete Recipes**
- 🖼 **Hover Image Preview** (recipe card + details)
- 🔍 **Search Recipes**
- 🏷 **Filter by Category & Dietary**
- ↕ **Sort Recipes (Name / Date)**
- 💾 **Redux Toolkit + Async Thunks**
- 📱 **Responsive UI (Mobile + Desktop)**
- 🔙 Protected routes with **PrivateRoute**

---


## 🛠️ Technology Stack 🚀

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | **React** | Component-based UI architecture. ⚛️ |
| **State Management** | **Redux Toolkit (RTK)** | Predictable, centralized state management with `createSlice` and `createAsyncThunk`. |
| **Routing** | **React Router DOM v6** | Declarative navigation and robust route protection. |
| **API Interaction** | **Axios** | Promise-based HTTP client for data fetching and manipulation. 🌐 |
| **Backend Simulation**| **JSON Server (External)** | Used to simulate a REST API endpoint (`http://localhost:3000/recipes`) for persistence. 🧱 |
| **UI/Styling** | **Standard CSS Modules** ,  **Bbootstrap 5**  |  Component-specific styling and responsiveness. 🎨 |



---

## 🔗 Live Application / Demo

**View the Live Application Here:**

---

## 📽️ Demo & Screenshots

https://github.com/user-attachments/assets/65f3e15d-2ab3-4620-a302-840f782d6a7b

,


<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 12 15 AM" src="https://github.com/user-attachments/assets/0782432f-e38e-407d-aeef-e998dfe1c359" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 12 25 AM" src="https://github.com/user-attachments/assets/9c14f3cd-c51f-4222-b1e1-4d0cc3980cb1" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 12 41 AM" src="https://github.com/user-attachments/assets/be127dc4-e4d6-49f4-b120-f4237a662827" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 13 15 AM" src="https://github.com/user-attachments/assets/293e36c6-79e7-4f2e-a1a9-1d0c7f7210de" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 13 56 AM" src="https://github.com/user-attachments/assets/33376c7c-54b7-4344-be82-a98c38fbdc09" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 14 27 AM" src="https://github.com/user-attachments/assets/c02c9185-5564-429a-b55f-3efb371f8ef7" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 14 08 AM" src="https://github.com/user-attachments/assets/cd25986b-b535-44f8-b126-8c4e885a9dee" />
<img width="500" height="400" alt="Screenshot 2025-12-01 at 11 15 10 AM" src="https://github.com/user-attachments/assets/467e61b5-a4f4-47a8-bead-516664650558" />


---

## 📁 Project Structure

```
src/
├─ components/
│  ├─ navbar/
│  ├─ recipeList/
│  ├─ recipeDetails/
│  ├─ recipeForm/
│  └─ privateRoute/
├─ pages/
│  ├─ Signin/
│  ├─ Register/
│  └─ FirstPage/
├─ slices/
│  ├─ authSlice.js
│  └─ recipeSlice.js
├─ store/
│  └─ store.js
├─ App.jsx
└─ main.jsx / index.jsx
```

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
`

---

## 🔐 Authentication

- Registration data → `localStorage (cookify_registered_v1)`
- Login (fake auth) → Stores token + user into `cookify_auth_v1`
- Automatic login restore → `loadFromStorage()`
- Private Route → `/add`, `/recipes`, `/recipes/:id`

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /recipes | Get all recipes |
| POST | /recipes | Add recipe |
| PUT | /recipes/:id | Update recipe |
| DELETE | /recipes/:id | Delete recipe |

---

## 🎨 UI Highlights

- Clean color palette  
- Hover image preview  
- Card grid layout  
- Editable form with live values  
- “Copy Button”, “Back Button”, responsive navbar  

---



## 🌐 Deployment (Vercel / Netlify)

1. Set **build command:**  
   ```
   npm run build
   ```
2. Set **publish directory:**  
   ```
   dist/
   ```
3. Update API URL if backend hosted online.

---

## 📌 Future Enhancements

- ⭐ JWT Authentication  
- ⭐ Recipe Image Upload (Cloudinary/S3)  
- ⭐ Pagination / Infinite Scroll  
- ⭐ Dark Mode  
- ⭐ User Profile  

---

## 📜 License  
NDR License © 2025

---

### ❤️ Support  
If you liked the README and the project setup, don't forget to ⭐ star the repository!

---



