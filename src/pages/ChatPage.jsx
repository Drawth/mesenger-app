import React from "react";
import { Box, Typography } from "@mui/material";
import MessageForm from "../pages/MessagesForm";
import MessageList from "../pages/MessagesList";

const ChatPage = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center">
        Mesajlar
      </Typography>
      <MessageList />
      <MessageForm />
    </Box>
  );
};

export default ChatPage;
