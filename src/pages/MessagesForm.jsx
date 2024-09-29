import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToFirestore } from "../store/messageSlice"; // Mesajı göndermek için slice
import { db } from "../Firebase"; // Firestore bağlantısı
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore işlevleri
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const MessagesForm = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [messageSent, setMessageSent] = useState(false); // Mesaj gönderimi başarılı olduğunda gösterilecek
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user); // Kullanıcı bilgisi

  // Firestore'daki users koleksiyonunu çekmek için useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userDocs = await getDocs(usersCollection);
      const usersList = userDocs.docs.map((doc) => doc.data());
      setUsers(usersList);
      console.log("Sistemde kayıtlı kullanıcılar:", usersList); // Tüm kullanıcıları log'a yazdır
    };

    fetchUsers();
  }, []);

  // Mesaj gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sistemde kayıtlı olup olmadığını kontrol et
    const isUserRegistered = users.some(
      (user) => user.email === recipientEmail
    );

    if (!isUserRegistered) {
      alert("Bu e-posta adresi sistemde kayıtlı değil!");
      return;
    }

    if (recipientEmail && message) {
      // Mesaj gönderimi
      dispatch(sendMessageToFirestore({
        recipientEmail,
        message,
        senderEmail: currentUser.email, // Gönderenin e-posta adresini ekle
      }));

      setRecipientEmail("");
      setMessage("");
      setShowForm(false); // Formu kapat
      setMessageSent(true); // Mesajın gönderildiğini belirtmek için durumu güncelle
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginBottom: 2 }}
      >
        Yeni Mesaj
      </Button>

      {showForm && (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Yeni Mesaj Gönder
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Alıcı Email"
              variant="outlined"
              fullWidth
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Mesaj"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained">
              Gönder
            </Button>
          </form>
        </Paper>
      )}

      {/* Mesaj gönderildiyse Alert mesajı */}
      {messageSent && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          Mesaj gönderildi!
        </Alert>
      )}
    </Box>
  );
};

export default MessagesForm;