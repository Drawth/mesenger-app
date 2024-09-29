import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGVFhChDeGwVeluoDNCZmEPtztR_qFHZs",
  authDomain: "messenger-app-a7047.firebaseapp.com",
  projectId: "messenger-app-a7047",
  storageBucket: "messenger-app-a7047.appspot.com",
  messagingSenderId: "585100516093",
  appId: "1:585100516093:web:5db963462bcff1848afc94",
  measurementId: "G-VHFMDM2TJ3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getUsersFromFirestore = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  return userSnapshot.docs.map((doc) => doc.data().email);
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAGVFhChDeGwVeluoDNCZmEPtztR_qFHZs",
//   authDomain: "messenger-app-a7047.firebaseapp.com",
//   projectId: "messenger-app-a7047",
//   storageBucket: "messenger-app-a7047.appspot.com",
//   messagingSenderId: "585100516093",
//   appId: "1:585100516093:web:5db963462bcff1848afc94",
//   measurementId: "G-VHFMDM2TJ3",
// };
