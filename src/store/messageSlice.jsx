import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase"; // Firebase yapılandırmanızın bulunduğu dosyadan db'yi içe aktarın
import { collection, addDoc, getDocs } from "firebase/firestore";

// Mesajları Firestore'dan çekme işlemi
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const messagesCollection = collection(db, "messages");
    const snapshot = await getDocs(messagesCollection);
    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();

      // timestamp'i Date formatına çeviriyoruz
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp ? data.timestamp.toDate() : null, // Firebase Timestamp'ini JS Date'e dönüştürüyoruz
      };
    });
    return messages;
  }
);

// Mesaj gönderme işlemi
export const sendMessageToFirestore = createAsyncThunk(
  "messages/sendMessageToFirestore",
  async ({ recipientEmail, message }) => {
    const messagesCollection = collection(db, "messages");
    const docRef = await addDoc(messagesCollection, {
      recipientEmail,
      message,
      timestamp: new Date(), // Mesajın gönderim zamanı
    });

    return { id: docRef.id, recipientEmail, message, timestamp: new Date() }; // Gönderilen mesajı döndür
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.items = action.payload; // Mesajları state'e ekliyoruz
      })
      .addCase(sendMessageToFirestore.fulfilled, (state, action) => {
        state.items.push(action.payload); // Yeni mesajı ekle
      });
  },
});

// SendMessage reducer'ı dışa aktarılmadı çünkü artık kullanmıyoruz
export default messageSlice.reducer;
