import React from "react";
import styles from "./Header.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import authService from "../../services/authService";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    authService.clearJWT();
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div>
        <NavLink className={styles.logoLink} to="/">
          <h3>Gro</h3>
          <img src="/logo192.png" height="40" width="50" alt="logo" />
        </NavLink>

        {location.pathname !== "/login" && (
          <Button color="error" variant="contained" onClick={logout}>
            Выйти
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
