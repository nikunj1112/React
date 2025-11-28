// src/slices/authSlice.js

const LOGIN = 'auth/login';
const LOGOUT = 'auth/logout';

const initialAuthState = {
    isAuthenticated: false,
    user: null,
};

// Reducer Logic
export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN:
            return { isAuthenticated: true, user: action.payload };
        case LOGOUT:
            return { isAuthenticated: false, user: null };
        default:
            return state;
    }
};

// Thunks (Mock Login)
export const login = (username, password) => async (dispatch) => {
    // 🛑 Mock Auth: Real app would call backend/JSON Server
    if (username === 'testuser' && password === 'password') {
        dispatch({ type: LOGIN, payload: { name: username } });
        return true;
    }
    return false;
};

export const logout = () => ({ type: LOGOUT });

// FIX: Default Export जोड़ा गया
export default authReducer;