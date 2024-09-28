// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Gerekli fonksiyonları import edin
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGVFhChDeGwVeluoDNCZmEPtztR_qFHZs",
  authDomain: "messenger-app-a7047.firebaseapp.com",
  projectId: "messenger-app-a7047",
  storageBucket: "messenger-app-a7047.appspot.com",
  messagingSenderId: "585100516093",
  appId: "1:585100516093:web:5db963462bcff1848afc94",
  measurementId: "G-VHFMDM2TJ3",
};

// Initialize Firebase

// Firebase uygulamasını başlat
export const app = initializeApp(firebaseConfig);

// Firebase Auth nesnesini al
export const auth = getAuth(app);

// Giriş fonksiyonu
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Kullanıcı bilgilerini döndür
  } catch (error) {
    throw new Error(error.message); // Hata fırlat
  }
};

// Kayıt fonksiyonu
const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Kullanıcı bilgilerini döndür
  } catch (error) {
    throw new Error(error.message); // Hata fırlat
  }
};

// Çıkış fonksiyonu
const logout = async () => {
  try {
    await signOut(auth); // Firebase'den çıkış yap
  } catch (error) {
    throw new Error(error.message); // Hata fırlat
  }
};

export const db = getFirestore(app);
// Kullanıcıları Firestore'dan alma fonksiyonu
export const getUsersFromFirestore = async () => {
  const usersCollection = collection(db, "users"); // "users" koleksiyonunu hedefleme
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map((doc) => doc.data().email); // Kullanıcıların e-posta adreslerini alma
  return userList;
};

export { login, register, logout }; // Fonksiyonları dışa aktar
