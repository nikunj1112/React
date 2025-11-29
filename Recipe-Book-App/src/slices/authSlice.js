// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const STORAGE_KEY = "cookify_auth_v1";
const REGISTER_KEY = "cookify_registered_v1";

/**
 * fakeRegister
 * - Simulates user registration
 * - Persists registered user info to localStorage (REGISTER_KEY)
 * - DOES NOT log the user in
 */
export const fakeRegister = createAsyncThunk(
  "auth/fakeRegister",
  async ({ name, email, password }, thunkAPI) => {
    if (!name || !email || !password) {
      return thunkAPI.rejectWithValue("Please provide name, email and password");
    }

    if (!email.includes("@")) {
      return thunkAPI.rejectWithValue("Invalid email address");
    }

    const registered = {
      id: Date.now(),
      name,
      email,
      password, // NOTE: plain text for dev only
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(REGISTER_KEY, JSON.stringify(registered));
      await new Promise((res) => setTimeout(res, 250)); // simulate delay
      return registered;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to persist registration");
    }
  }
);

/**
 * fakeLogin
 * - Validates credentials against REGISTER_KEY entry
 * - On success persists auth payload into STORAGE_KEY and returns payload
 */
export const fakeLogin = createAsyncThunk(
  "auth/fakeLogin",
  async ({ email, password }, thunkAPI) => {
    if (!email || !password) {
      return thunkAPI.rejectWithValue("Missing credentials");
    }

    try {
      const raw = localStorage.getItem(REGISTER_KEY);
      if (!raw) {
        return thunkAPI.rejectWithValue("No account found. Please register first.");
      }

      const registered = JSON.parse(raw);

      if (registered.email !== email || registered.password !== password) {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      const user = { id: registered.id, name: registered.name, email: registered.email };
      const token = `fake-token-${Date.now()}`;
      const payload = { user, token };

      // persist auth
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      await new Promise((res) => setTimeout(res, 250)); // simulate delay

      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
    },
    clearRegistered() {
      try {
        localStorage.removeItem(REGISTER_KEY);
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(fakeRegister.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fakeRegister.fulfilled, (s) => {
        s.status = "succeeded";
        s.error = null;
        // note: registration DOES NOT log the user in
      })
      .addCase(fakeRegister.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error?.message;
      });

    // login
    builder
      .addCase(fakeLogin.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fakeLogin.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.isAuthenticated = true;
        s.user = a.payload.user;
        s.token = a.payload.token;
        s.error = null;
      })
      .addCase(fakeLogin.rejected, (s, a) => {
        s.status = "failed";
        s.isAuthenticated = false;
        s.user = null;
        s.token = null;
        s.error = a.payload || a.error?.message;
      });
  },
});

export const { logout, clearRegistered } = authSlice.actions;

/**
 * loadFromStorage: restore auth state from localStorage on app start
 */
export const loadFromStorage = () => (dispatch) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.token) {
      // dispatch fulfilled action to populate store
      dispatch({ type: fakeLogin.fulfilled.type, payload: parsed });
    }
  } catch (e) {
    console.error("loadFromStorage failed", e);
  }
};

export default authSlice.reducer;
