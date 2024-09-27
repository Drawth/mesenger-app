import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth"; // Giriş sayfası
import ChatPage from "../pages/ChatPage"; // Mesajlaşma sayfası
import Register from "../pages/Register"; // Kayıt sayfası
import { useSelector } from "react-redux";

function RouterConfig() {
  const user = useSelector((state) => state.auth.user); // Kullanıcı bilgisi

  return (
    <Routes>
      {user ? (
        <Route path="/chatpage" element={<ChatPage />} /> // Mesajlaşma sayfası
      ) : (
        <>
          <Route path="/" element={<Auth />} /> // Giriş sayfası
          <Route path="/register" element={<Register />} /> // Kayıt sayfası
        </>
      )}
      <Route path="*" element={<Auth />} />{" "}
      {/* Tanımlanmamış yolları giriş sayfasına yönlendirme */}
    </Routes>
  );
}

export default RouterConfig;
