import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "../components/Header/Header";
import { metamask } from "../connectors/metamask";

function App() {
  useEffect(() => {
    void metamask.connectEagerly();
  }, []);

  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
