import { db } from "../Firebase"; // Firestore'ı içe aktar
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// Mesaj gönderme fonksiyonu
export const sendMessage = async (senderId, recipientEmail, content) => {
  try {
    await addDoc(collection(db, "messages"), {
      from: senderId,
      to: recipientEmail,
      content: content,
      timestamp: Timestamp.now(),
    });
    console.log("Mesaj başarıyla gönderildi");
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error.message);
  }
};
// Mesaj dinleme fonksiyonu
export const listenForMessages = (userId, recipientId, setMessages) => {
  const q = query(
    collection(db, "messages"),
    where("recipientId", "==", userId),
    where("senderId", "==", recipientId)
  );

  return onSnapshot(q, (snapshot) => {
    const messagesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messagesData);
  });
};
