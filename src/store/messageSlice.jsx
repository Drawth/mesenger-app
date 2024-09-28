// messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.items.push({
        email: action.payload.recipientEmail, // Alıcı e-posta adresi
        message: action.payload.message,
        timestamp: Date.now(),
      });
    },
  },
});

export const { sendMessage } = messageSlice.actions;
export default messageSlice.reducer;
