import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { register as firebaseRegister } from '../Firebase'; // Firebase register fonksiyonunu import edin
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const errorMessages = {
    'auth/email-already-in-use': 'Bu email adresi zaten kullanılıyor.',
    'auth/invalid-email': 'Geçersiz bir email adresi girdiniz.',
    'auth/weak-password': 'Şifreniz en az 6 karakter olmalıdır.',
  };

  const onSubmit = async (data) => {
    if (!data.email || !data.password || !data.name) {
      // Eğer isim, email veya şifre boşsa, hata mesajı göster
      setError('name', { type: 'manual', message: 'İsim alanı boş olamaz' });
      setError('email', { type: 'manual', message: 'Email alanı boş olamaz' });
      setError('password', { type: 'manual', message: 'Şifre alanı boş olamaz' });
      return;
    }

    try {
      await firebaseRegister(data.email, data.password);
      navigate('/'); // Başarılı kayıt sonrası giriş sayfasına yönlendirme
    } catch (error) {
      const errorMessage = errorMessages[error.code] || error.message;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: 'auto', padding: '20px', mt: 5 }}
    >
      {/* Messenger App başlığı */}
      <Typography variant="h4" align="center" gutterBottom>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Messenger App</Link>
      </Typography>

      {errorMessage && (
        <Alert severity="error">{errorMessage}</Alert> // Hata varsa ekranda göster
      )}
      <TextField 
        label="İsim" 
        {...register('name', { required: 'İsim zorunludur' })} 
        error={!!errors.name} 
        helperText={errors.name?.message}
      />
      <TextField 
        label="Email" 
        {...register('email', { required: 'Email zorunludur' })} 
        error={!!errors.email} 
        helperText={errors.email?.message}
      />
      <TextField 
        label="Şifre" 
        type="password" 
        {...register('password', { required: 'Şifre zorunludur' })} 
        error={!!errors.password} 
        helperText={errors.password?.message}
      />
      <Button variant="contained" type="submit">Kayıt Ol</Button>
    </Box>
  );
};

export default Register;