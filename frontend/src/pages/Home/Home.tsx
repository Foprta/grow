import React, {PropsWithChildren} from "react";
import  {portfoliosAPI} from "../../services/portfoliosService";
import {useFormik} from "formik";
import {PortfolioInDto} from "../../models/dto";
import {Button, Card, CardActions, CardContent, CardHeader, TextField,} from "@mui/material";
import styles from "./Home.module.scss";

import {NavLink, Outlet} from "react-router-dom";

const Home: React.FC<PropsWithChildren<unknown>> = () => {
  const { data: portfolios } = portfoliosAPI.useFetchUserPortfoliosQuery()
  const [addPortfolio] = portfoliosAPI.useAddUserPortfolioMutation();

  const { handleChange, values, handleSubmit, resetForm } =
    useFormik<PortfolioInDto>({
      initialValues: { name: "" },
      onSubmit: (dto) => addPortfolio(dto).then(() => resetForm())
    });


  return (
    <div className={styles.home}>
      <div className={styles.portfoliosList}>
        {portfolios?.portfolios.map((portfolio) => (
          <NavLink key={portfolio.id} to={`portfolio/${portfolio.id}`}>
            <Button variant="contained">{portfolio.name}</Button>
          </NavLink>
        ))}
      </div>

      <Card className={styles.formCard}>
        <CardHeader title="Добавить новое портфолио" />

        <form className={styles.portfolioForm} onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              fullWidth
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Имя нового портфолио"
            />
          </CardContent>

          <CardActions>
            <Button variant="outlined" type="submit">
              Создать портфолио
            </Button>
          </CardActions>
        </form>
      </Card>

      <Outlet />
    </div>
  );
};

export default Home;
