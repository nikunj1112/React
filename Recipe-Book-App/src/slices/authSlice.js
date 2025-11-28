// src/slices/authSlice.js
const LOGIN = 'auth/login';
const LOGOUT = 'auth/logout';

const initialAuthState = {
    isAuthenticated: false,
    user: null,
};

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

// Simplified Thunk for Login
export const login = (username, password) => async (dispatch) => {
    // Check against db.json/users
    if (username === 'testuser' && password === 'password') {
        dispatch({ type: LOGIN, payload: { name: username } });
        return true;
    }
    return false;
};

export const logout = () => ({ type: LOGOUT });