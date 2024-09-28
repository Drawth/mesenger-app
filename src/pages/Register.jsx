import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; // Firebase yapılandırması
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/authSlice"; // Kullanıcıyı redux'a kaydetmek için

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Firebase ile yeni kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Kullanıcıyı Redux store'a kaydet
      const user = userCredential.user;
      dispatch(setUser({ email: user.email, uid: user.uid }));

      // Başarılı olursa ChatPage sayfasına yönlendir
      navigate("/chatpage");
    } catch (error) {
      console.error("Kayıt hatası:", error.message);
    }
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
      <Typography variant="h5" align="center">
        Kayıt Ol
      </Typography>
      <TextField
        label="İsim"
        {...register("name", { required: "İsim zorunludur" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        {...register("email", { required: "Email zorunludur" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Şifre"
        type="password"
        {...register("password", { required: "Şifre zorunludur" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button variant="contained" type="submit">
        Kayıt Ol
      </Button>
    </Box>
  );
};

export default Register;
