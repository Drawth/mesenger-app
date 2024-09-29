import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/messageSlice"; // Mesajları çekmek için slice
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const MessagesList = ({ userEmail }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.items); // Mesajları Redux store'dan al

  useEffect(() => {
    const getMessages = async () => {
      await dispatch(fetchMessages());
    };

    getMessages();

    // Mesajların güncellenmesi için interval ayarlama
    const interval = setInterval(() => {
      getMessages();
    }, 5000); // 5 saniyede bir mesajları güncelle

    return () => clearInterval(interval); // Component unmount edildiğinde interval'i temizle
  }, [dispatch]);

  // Kullanıcının mesajlarını filtrele
  const userMessages = messages.filter(
    (message) => message.email === userEmail
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Gelen Mesajlar
      </Typography>
      <List>
        {userMessages.length > 0 ? (
          userMessages.map((message) => (
            <div key={message.id}>
              <ListItem>
                <ListItemText
                  primary={`${message.email}: ${message.message}`}
                  secondary={new Date(message.timestamp).toLocaleString()} // Timestamp'i okunabilir formata çevir
                />
              </ListItem>
              <Divider />
            </div>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Hiç mesaj yok.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default MessagesList;
