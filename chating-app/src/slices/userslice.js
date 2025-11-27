import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// 🔹 Sign In (email/password)
export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        name: userCredential.user.displayName || "",
        email: userCredential.user.email,
      };
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Sign Up (email/password)
export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name: userCredential.user.displayName || "",
        email: userCredential.user.email,
      };
      // Add user to Firestore 'users' collection
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: user.email,
        name: user.name,
        createdAt: Date.now(),
      });
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Fetch all users from Firestore
export const fetchusers = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🔹 Sign In with Google
export const signinwithgoogles = createAsyncThunk(
  "user/google",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL || "",
      };
      await setDoc(doc(db, "users", result.user.uid), user, { merge: true });
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Initial State
const initialState = {
  users: [],
  currentuser: {},
  isLoading: false,
  error: null,
};

// 🔹 Slice
const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.currentuser = JSON.parse(localStorage.getItem("user") || "{}");
    },
    setCurrentUser: (state, action) => {
      state.currentuser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload;
        const exists = state.users.some((u) => u.email === user.email);
        if (!exists) state.users.push(user);
        state.currentuser = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Sign in failed!";
      })

      // Sign Up
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload;
        const exists = state.users.some((u) => u.email === user.email);
        if (!exists) state.users.push(user);
        state.currentuser = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signup failed!";
      })

      // Fetch Users
      .addCase(fetchusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Google Sign In
      .addCase(signinwithgoogles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinwithgoogles.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload;
        const exists = state.users.some((u) => u.email === user.email);
        if (!exists) state.users.push(user);
        state.currentuser = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(signinwithgoogles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getUser, setCurrentUser } = userslice.actions;
export default userslice.reducer;
