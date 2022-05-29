import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import styles from "./Portfolio.module.scss";
import { useFormik } from "formik";
import { coinsAPI } from "../../../services/coinsService";
import { CoinOutDto, PortfolioTransactionInDto } from "../../../models/dto";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { transactionsAPI } from "../../../services/transactionsService";
import Coins from "./Coins/Coins";

const Portfolio: React.FC = () => {
  const [coinSearch, setCoinSearch] = useState("");
  const { portfolioId } = useParams();

  const [addTransaction] = transactionsAPI.useAddPortfolioTransactionMutation();

  const { values, handleChange, setFieldValue, submitForm } = useFormik<PortfolioTransactionInDto>({
    initialValues: { price: "", date: "", coin_id: "", count: "", transaction_type: "buy" },
    onSubmit: (dto) => addTransaction({ ...dto, portfolioId: portfolioId! }),
  });

  const buy = () => {
    setFieldValue("transaction_type", "buy").then(() => submitForm());
  };

  const sell = () => {
    setFieldValue("transaction_type", "sale").then(() => submitForm());
  };

  const { data: coins } = coinsAPI.useFetchCoinsQuery({ name: coinSearch });

  return (
    <div>
      <Coins />

      <Card>
        <CardHeader title="Добавить транзакцию" />

        <form>
          <CardContent className={styles.portfolioForm}>
            <Autocomplete
              fullWidth
              onChange={(event, value) => setFieldValue("coin_id", value?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="coinSearch"
                  value={coinSearch}
                  onChange={({ target }) => setCoinSearch(target.value)}
                  label="Введите имя монеты"
                />
              )}
              getOptionLabel={(opt) => opt.name}
              renderOption={(props, { logo, name, symbol, slug }: CoinOutDto) => (
                <li {...props}>
                  <div className={styles.coinInSearch}>
                    <img src={logo} height="20" width="20" alt={symbol} />
                    {name} <Typography variant="subtitle1">{slug}</Typography>
                  </div>
                </li>
              )}
              options={coins ?? []}
            />

            <TextField
              fullWidth
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              label="Цена покупки"
            />

            <TextField
              fullWidth
              name="count"
              type="number"
              value={values.count}
              onChange={handleChange}
              label="Кол-во монет"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={values.date}
                onChange={(value: Date | null) => setFieldValue("date", value?.toISOString())}
                label="Время покупки"
              />
            </LocalizationProvider>
          </CardContent>

          <CardActions>
            <Button variant="outlined" onClick={buy}>
              Купить
            </Button>
            <Button variant="outlined" onClick={sell}>
              Продать
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default Portfolio;
