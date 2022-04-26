import React, { PropsWithChildren } from "react";
import styles from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import PortfoliosList from "../../components/PortfoliosList/PortfoliosList";

const Home: React.FC<PropsWithChildren<unknown>> = () => {
  return (
    <div className={styles.home}>
      <PortfoliosList />

      <Outlet />
    </div>
  );
};

export default Home;
