import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MessageList = () => {
  const messages = useSelector((state) => state.messages.items); // Mesajları Redux'tan al

  return (
    <List sx={{ maxWidth: 400, margin: "auto", marginTop: 3 }}>
      {messages.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Henüz mesaj yok.
        </Typography>
      ) : (
        messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={msg.email}
              secondary={msg.message}
              sx={{ wordBreak: "break-word" }}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default MessageList;
