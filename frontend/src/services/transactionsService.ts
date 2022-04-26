import { createApi } from "@reduxjs/toolkit/query/react";
import { securedBaseQuery } from "./baseQueries";
import { PortfolioTransactionInDto, PortfolioTransactionOutDto } from "../models/dto";

export const transactionsAPI = createApi({
  reducerPath: "transactionsAPI",
  baseQuery: securedBaseQuery,
  tagTypes: ["Transactions"],
  endpoints: (build) => ({
    fetchPortfolioTransactions: build.query<PortfolioTransactionOutDto[], number | string>({
      query: (portfolioId) => ({
        url: `/user/portfolio/${portfolioId}`,
      }),
      providesTags: ["Transactions"],
    }),
    addPortfolioTransaction: build.mutation<void, PortfolioTransactionInDto & { portfolioId: number | string }>({
      query: ({ portfolioId, ...body }) => ({
        url: `/user/portfolio/${portfolioId}/transaction`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});
