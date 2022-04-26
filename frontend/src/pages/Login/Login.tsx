import React, { useCallback } from "react";
import styles from "./Login.module.scss";
import { metamaskHooks, metamask } from "../../connectors/metamask";
import { Button, Typography } from "@mui/material";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const { useAccount, useProvider } = metamaskHooks;

const Login: React.FC = () => {
  const account = useAccount();
  const provider = useProvider();
  const navigate = useNavigate();

  const login = useCallback(() => {
    authService
      .getMessageForSign(account!)
      .then((messageToSign) => provider?.getSigner().signMessage(messageToSign.toString()))
      .then((signedMessage) => authService.getAuthToken(account!, signedMessage!))
      .then((token) => {
        authService.setJWT(token);
        navigate("/");
      });
  }, [account, provider, navigate]);

  return (
    <div className={styles.loginPage}>
      {account ? (
        <>
          <Typography variant="h4">Войдите в систему</Typography>
          <Button variant="contained" color="primary" size="large" onClick={login}>
            Войти
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4">Подключите MetaMask</Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => void metamask.activate()}>
            Подключить
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
