import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, getUsersFromFirestore, addUserToFirestore } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { createSelector } from "reselect"; // reselect'i ekleyin

// Kullanıcıları Firestore'dan alma thunk'ı
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const users = await getUsersFromFirestore();
    console.log("Redux state'e eklenen kullanıcılar:", users); // Konsola yazdır
    return users;
  } catch (error) {
    console.error("Kullanıcıları çekerken hata:", error); // Hata mesajı
    throw error; // Hata fırlat
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    users: [], // Kullanıcıları saklamak için
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
        state.users = action.payload; // Kullanıcı listesini güncelle
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = "Kullanıcılar alınamadı.";
      });
  },
});

// Seçici fonksiyonu
export const selectUsers = (state) => state.auth.users;

// Memoize edilmiş kullanıcı seçici
export const makeSelectUsers = () =>
  createSelector(selectUsers, (users) => users);

// Aksiyonları dışa aktar
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
    dispatch(fetchUsers()); // Giriş yapıldığında kullanıcıları çek
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

    // Kullanıcıyı Firestore'a ekle
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      // Buraya başka kullanıcı bilgileri ekleyebilirsin (örneğin ad, soyad vs.)
    });

    dispatch(fetchUsers()); // Kullanıcıları al
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
