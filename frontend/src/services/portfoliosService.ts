import {PortfolioInDto} from "../models/dto";
import {PortfolioOutDto} from "../models/dto/PortfolioOutDto";
import {createApi} from "@reduxjs/toolkit/query/react";
import {securedBaseQuery} from "./baseQueries";

export const portfoliosAPI = createApi({
  reducerPath: 'portfoliosApi',
  baseQuery: securedBaseQuery,
  tagTypes: ['Portfolios'],
  endpoints: (build) => ({
    fetchUserPortfolios: build.query<{ portfolios: PortfolioOutDto[] }, void>({
      query: () => ({
        url: '/user/portfolios'
      }),
      providesTags: ['Portfolios']
    }),
    addUserPortfolio: build.mutation<PortfolioOutDto, PortfolioInDto>({
      query: (portfolio) => ({
        url: '/user/portfolio',
        method: 'POST',
        body: portfolio
      }),
      invalidatesTags: ['Portfolios']
    })
  })
})

