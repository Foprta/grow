import { createApi } from "@reduxjs/toolkit/query/react";
import { securedBaseQuery } from "./baseQueries";
import { PortfolioTransactionInDto, PortfolioTransactionOutDto } from "../models/dto";
import { PortfolioTokenOutDto } from "../models/dto/PortfolioTokenOutDto";

export const transactionsAPI = createApi({
  reducerPath: "transactionsAPI",
  baseQuery: securedBaseQuery,
  tagTypes: ["Transactions", "Coins"],
  endpoints: (build) => ({
    fetchPortfolioTransactions: build.query<PortfolioTransactionOutDto[], number | string>({
      query: (portfolioId) => ({
        url: `/user/portfolio/${portfolioId}`,
      }),
      providesTags: ["Transactions"],
    }),
    fetchPortfolioCoins: build.query<PortfolioTokenOutDto[], number | string>({
      query: (portfolioId) => ({
        url: `/user/portfolio/${portfolioId}/tokens`,
      }),
      providesTags: ["Coins"],
    }),
    addPortfolioTransaction: build.mutation<void, PortfolioTransactionInDto & { portfolioId: number | string }>({
      query: ({ portfolioId, ...body }) => ({
        url: `/user/portfolio/${portfolioId}/transaction`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions", "Coins"],
    }),
  }),
});
