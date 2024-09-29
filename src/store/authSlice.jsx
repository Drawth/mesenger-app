import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../Firebase"; // Firebase yapılandırmanızı import edin
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

// Kullanıcıyı hem Auth'a hem Firestore'a ekleme işlemi
export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Kullanıcıyı Firestore'daki "users" koleksiyonuna kaydet
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    dispatch(setUser(user)); // Redux state'e kullanıcıyı ekle
  } catch (error) {
    dispatch(
      setError("Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.")
    );
  }
};

// Giriş işlemi
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Firestore'dan kullanıcı bilgilerini çek
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      dispatch(setUser(userData)); // Redux state'e Firestore'dan gelen kullanıcı bilgilerini ekle
    } else {
      dispatch(setUser(user)); // Firestore'da yoksa sadece Auth'tan gelen bilgiyi ekle
    }
  } catch (error) {
    dispatch(setError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin."));
  }
};

// Kullanıcıyı Firestore'dan çekme
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  const users = snapshot.docs.map((doc) => doc.data());
  return users;
});

// Çıkış işlemi (Logout)
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth); // Firebase'den çıkış işlemi
    dispatch(clearUser()); // Redux state'deki kullanıcıyı temizle
  } catch (error) {
    dispatch(setError("Çıkış yapılamadı. Lütfen tekrar deneyin."));
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    users: [], // Kullanıcı listesini saklamak için
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
// Selectors (eklenen kısım)
export const selectUser = (state) => state.auth.user; // Mevcut oturum açmış kullanıcıyı seçer
export const selectUsers = (state) => state.auth.users; // Tüm kullanıcıları seçer
export const selectAuthError = (state) => state.auth.error; // Hata mesajlarını seçer

// Actions ve reducer dışa aktarımı
export const { setUser, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;
