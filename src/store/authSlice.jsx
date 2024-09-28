import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, getUsersFromFirestore } from "../Firebase";
import { createSelector } from "reselect"; // reselect'i ekleyin

// Kullanıcıları Firestore'dan alma thunk'ı
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const users = await getUsersFromFirestore();
  return users;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = "Kullanıcılar alınamadı.";
      });
  },
});

// Seçici fonksiyonu
export const selectUsers = (state) => state.auth.users;
console.log(selectUsers);

// Memoize edilmiş kullanıcı seçici
export const makeSelectUsers = () =>
  createSelector(selectUsers, (users) => users);

export const { setUser, setError, clearUser } = authSlice.actions;

// Kullanıcı girişi
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(fetchUsers());
  } catch (error) {
    dispatch(setError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin."));
  }
};

// Kullanıcı kaydı
export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    dispatch(fetchUsers());
  } catch (error) {
    dispatch(
      setError("Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.")
    );
  }
};

// Kullanıcı çıkışı
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError("Çıkış işlemi başarısız."));
  }
};

export default authSlice.reducer;
