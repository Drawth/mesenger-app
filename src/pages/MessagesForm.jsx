import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/messageSlice"; // Mesaj gönderme işlemi için aksiyon

const MessagesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(sendMessage(data)); // Mesaj gönderme işlemi
  };

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
        label="Email"
        {...register("email", { required: "Email zorunludur" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Mesaj"
        multiline
        rows={4}
        {...register("message", { required: "Mesaj içeriği zorunludur" })}
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
