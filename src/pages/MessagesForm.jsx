import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/messageSlice";
import { fetchUsers, selectUsers } from "../store/authSlice"; // Memoize edilmiş kullanıcı seçicisi

const MessagesForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const userList = useSelector(selectUsers); // Kullanıcı listesini alın

  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onSubmit = (data) => {
    // E-posta kontrolü
    if (!userList.includes(recipientEmail)) {
      setError("recipientEmail", {
        type: "manual",
        message: "Bu e-posta sisteme kayıtlı değil.",
      });
      return;
    }

    dispatch(sendMessage(data));
    setRecipientEmail(""); // Formu sıfırla
  };

  console.log("Kullanıcı Listesi:", userList); // Kullanıcı listesini kontrol edin

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        margin: "auto",
        padding: "20px",
      }}
    >
      <TextField
        label="Alıcı E-posta"
        {...register("recipientEmail", {
          required: "Alıcı e-posta zorunludur.",
        })}
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        error={!!errors.recipientEmail}
        helperText={errors.recipientEmail?.message}
      />
      <TextField
        label="Mesaj"
        multiline
        rows={4}
        {...register("message", { required: "Mesaj içeriği zorunludur." })}
        error={!!errors.message}
        helperText={errors.message?.message}
      />
      <Button variant="contained" type="submit">
        Mesaj Gönder
      </Button>
    </Box>
  );
};

export default MessagesForm;
