import { NumberInput } from "../FormHelpers";

export interface PortfolioTransactionInDto {
  coin_id: NumberInput;
  count: NumberInput;
  price: NumberInput;
  date: string;
  transaction_type: string;
}
