import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [
      { email: "example1@mail.com", message: "Merhaba, nasılsınız?" },
      { email: "example2@mail.com", message: "Bugün hava çok güzel!" },
    ],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.items.push(action.payload); // Yeni mesajı ekle
    },
  },
});

export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
