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

const Portfolio: React.FC = () => {
  const [coinSearch, setCoinSearch] = useState("");
  const { portfolioId } = useParams();

  const { data: transactions } = transactionsAPI.useFetchPortfolioTransactionsQuery(portfolioId!);
  const [addTransaction] = transactionsAPI.useAddPortfolioTransactionMutation();

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik<PortfolioTransactionInDto>({
    initialValues: { price: "", buy_date: "", coin_id: "", count: "" },
    onSubmit: (dto) => addTransaction({ ...dto, portfolioId: portfolioId! }),
  });

  const { data: coins } = coinsAPI.useFetchCoinsQuery({ name: coinSearch });

  return (
    <div>
      <Typography variant="h4">ID: {portfolioId}</Typography>

      {transactions && transactions.length > 0 && <Typography variant="h4">Transactions:</Typography>}

      {transactions?.map((transaction) => (
        <div key={transaction.id} className={styles.transaction}>
          <span>Coin ID: {transaction.coin_id}</span>
          <span>Date Buy: {new Date(transaction.buy_date).toLocaleString()}</span>
          <span>Count: {transaction.count}</span>
          <span>Price: {transaction.price}</span>
          <span>Transaction ID: {transaction.id}</span>
        </div>
      ))}

      <Card>
        <CardHeader title="Добавить транзакцию" />

        <form onSubmit={handleSubmit}>
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
                value={values.buy_date}
                onChange={(value: Date | null) => setFieldValue("buy_date", value?.toISOString())}
                label="Время покупки"
              />
            </LocalizationProvider>
          </CardContent>

          <CardActions>
            <Button variant="outlined" type="submit">
              Добавить транзакцию
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default Portfolio;
