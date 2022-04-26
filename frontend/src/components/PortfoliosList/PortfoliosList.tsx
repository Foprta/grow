import React, { useState } from "react";
import styles from "./PortfoliosList.module.scss";
import { NavLink } from "react-router-dom";
import { portfoliosAPI } from "../../services/portfoliosService";
import { ButtonBase } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import classNames from "classnames";
import AddPortfolioModal from "../AddPortfolioModal/AddPortfolioModal";

const PortfoliosList: React.FC = () => {
  const [isNewPortfolioOpened, setIsNewPortfolioOpened] = useState(false);

  const { data: portfolios } = portfoliosAPI.useFetchPortfoliosQuery();

  return (
    <>
      <ul className={styles.portfoliosList}>
        {portfolios?.map((portfolio) => (
          <NavLink
            key={portfolio.id}
            className={({ isActive }) => classNames(styles.portfolio, { [styles.active]: isActive })}
            to={`portfolio/${portfolio.id}`}
          >
            <div className={styles.portfolioNameOuter}>
              <div className={styles.portfolioNameInner}>{portfolio.name}</div>
            </div>

            <ArrowRightAltIcon className={styles.icon} />
          </NavLink>
        ))}

        <ButtonBase className={styles.portfolio} onClick={() => setIsNewPortfolioOpened(true)}>
          Добавить портфолио
        </ButtonBase>
      </ul>

      <AddPortfolioModal open={isNewPortfolioOpened} onClose={() => setIsNewPortfolioOpened(false)} />
    </>
  );
};

export default PortfoliosList;
