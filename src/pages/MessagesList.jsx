import React, { useState } from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import MessagesForm from "./MessagesForm"; // Mesaj formu bileşeni

const MessageList = () => {
  const messages = useSelector((state) => state.messages?.items || []);
  const currentUserEmail = useSelector((state) => state.auth.user?.email);

  // Örnek mesajlar
  const exampleMessages = [
    {
      email: "ahmet@example.com",
      message: "Merhaba, nasılsın?",
      timestamp: Date.now() - 60000,
    },
    {
      email: "ayse@example.com",
      message: "Bugün hava çok güzel!",
      timestamp: Date.now() - 120000,
    },
    {
      email: "mehmet@example.com",
      message: "Bu akşam ne yapıyorsun?",
      timestamp: Date.now() - 300000,
    },
  ];

  const allMessages = messages.length > 0 ? messages : exampleMessages;

  return (
    <List
      sx={{
        maxWidth: 600,
        margin: "auto",
        marginTop: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {allMessages.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Henüz mesaj yok.
        </Typography>
      ) : (
        allMessages.map((msg, index) => {
          const isOwnMessage = msg.email === currentUserEmail;

          return (
            <ListItem
              key={index}
              sx={{
                width: "100%", // Genişliği artırdık
                justifyContent: "center", // İçeriği ortaladık
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: isOwnMessage ? "#dcf8c6" : "#f1f1f1",
                  borderRadius: "15px",
                  padding: "10px 15px",
                  maxWidth: "80%",
                  boxShadow: 1,
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: isOwnMessage ? "bold" : "normal" }}
                >
                  {isOwnMessage ? "Siz" : msg.email}
                </Typography>
                <Typography variant="body1">{msg.message}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {formatDistanceToNow(new Date(msg.timestamp), {
                    addSuffix: true,
                  })}
                </Typography>

                {/* Mesaj gönderim formu */}
                {!isOwnMessage && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <MessagesForm recipient={msg.email} />
                  </Box>
                )}
              </Box>
            </ListItem>
          );
        })
      )}
    </List>
  );
};

export default MessageList;
//display: "flex",
//flexDirection: "row",
//alignItems: "center",
//justifyContent: "center",
