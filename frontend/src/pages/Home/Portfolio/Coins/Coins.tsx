import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { transactionsAPI } from "../../../../services/transactionsService";

const Coins: React.FC = () => {
  const { portfolioId } = useParams();

  const { data: tokens } = transactionsAPI.useFetchPortfolioCoinsQuery(portfolioId!);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "white" }}>Монета</TableCell>
          <TableCell sx={{ color: "white" }} align="right">
            Количество
          </TableCell>
          <TableCell sx={{ color: "white" }} align="right">
            Цена, $
          </TableCell>
          <TableCell sx={{ color: "white" }} align="right">
            Сумма, $
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tokens?.map((token) => (
          <TableRow key={token.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell sx={{ color: "white" }} component="th" scope="row">
              <img src={token.logo} alt="" />
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              {token.count}
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              {token.price.toFixed(2)}
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              {(token.count * token.price).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Coins;
