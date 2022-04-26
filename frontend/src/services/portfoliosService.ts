import { PortfolioInDto, PortfolioOutDto } from "../models/dto";
import { createApi } from "@reduxjs/toolkit/query/react";
import { securedBaseQuery } from "./baseQueries";

export const portfoliosAPI = createApi({
  reducerPath: "portfoliosAPI",
  baseQuery: securedBaseQuery,
  tagTypes: ["Portfolios"],
  endpoints: (build) => ({
    fetchPortfolios: build.query<PortfolioOutDto[], void>({
      query: () => ({
        url: "/user/portfolios",
      }),
      providesTags: ["Portfolios"],
    }),
    addPortfolio: build.mutation<PortfolioOutDto, PortfolioInDto>({
      query: (portfolio) => ({
        url: "/user/portfolio",
        method: "POST",
        body: portfolio,
      }),
      invalidatesTags: ["Portfolios"],
    }),
  }),
});
