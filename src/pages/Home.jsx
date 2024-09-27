import React, { useState } from "react";
import { TextField, Button, Box, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/messageSlice";

export const Home = () => {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const handleSend = () => {
    if (message.trim() && receiver.trim()) {
      dispatch(sendMessage(message, receiver, user.uid));
      setMessage("");
      setReceiver("");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <h2>Messenger App'e hoşgeldiniz!</h2>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <TextField
          label="Alıcı"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <TextField
          label="Mesaj"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleSend}>
          Gönder
        </Button>
      </Box>
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id}>
            {msg.text} - Gönderen: {msg.senderId}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
