import { NumberInput } from "../FormHelpers";

export interface PortfolioTransactionInDto {
  coin_id: NumberInput;
  count: NumberInput;
  price: NumberInput;
  buy_date: string;
}
