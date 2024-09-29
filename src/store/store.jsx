import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Auth slice'ınızı buraya ekleyin
import messagesReducer from "./messageSlice"; // Mesajlar slice'ınızı buraya ekleyin

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer, // Mesajlar slice'ını buraya ekleyin
  },
});

export default store;
