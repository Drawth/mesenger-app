import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { login } from "../Firebase"; // Firebase login fonksiyonunu import edin
import { useNavigate, Link } from "react-router-dom";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const errorMessages = {
    "auth/user-not-found": "Bu email ile kayıtlı bir kullanıcı bulunamadı.",
    "auth/wrong-password": "Yanlış şifre girdiniz.",
  };

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      // Eğer email veya şifre boşsa, hata mesajı göster
      setError("email", { type: "manual", message: "Email alanı boş olamaz" });
      setError("password", {
        type: "manual",
        message: "Şifre alanı boş olamaz",
      });
      return;
    }

    try {
      const user = await login(data.email, data.password);
      dispatch(setUser(user.email)); // Kullanıcı bilgilerini Redux'a kaydet
      navigate("/home"); // Başarılı giriş sonrası yönlendirme
    } catch (error) {
      const errorMessage = errorMessages[error.code] || error.message;
      setErrorMessage(errorMessage);
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
        width: 300,
        margin: "auto",
        padding: "20px",
        mt: 5,
      }}
    >
      {/* Messenger App başlığı */}
      <Typography variant="h4" align="center" gutterBottom>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Messenger App
        </Link>
      </Typography>

      {errorMessage && (
        <Alert severity="error">{errorMessage}</Alert> // Hata varsa ekranda göster
      )}
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
        Giriş Yap
      </Button>
      <Button variant="outlined" href="/register">
        Kayıt Ol
      </Button>
    </Box>
  );
};

export default Auth;
