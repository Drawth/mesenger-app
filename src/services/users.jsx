import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; // Firestore bağlantısı

// Kullanıcı var mı kontrol etme fonksiyonu
export const checkIfUserExists = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return false; // Kullanıcı yoksa
  } else {
    return querySnapshot.docs[0].data(); // Kullanıcı varsa bilgileri döndür
  }
};
