import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice"; // Logout işlemi için slice'dan action çağırıyoruz

const Header = () => {
  const user = useSelector((state) => state.auth.user); // Kullanıcı durumu
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Messenger App başlığı, tıklanabilir hale getirildi */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Messenger App
        </Typography>

        {/* Kullanıcı oturum açtıysa Çıkış Yap butonu gösteriliyor */}
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
