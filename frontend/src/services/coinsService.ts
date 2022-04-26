import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQueries";
import { CoinOutDto } from "../models/dto";

export const coinsAPI = createApi({
  reducerPath: "coinsAPI",
  baseQuery: baseQuery,
  tagTypes: ["Coins"],
  endpoints: (build) => ({
    fetchCoins: build.query<CoinOutDto[], { name: string; size?: number }>({
      query: (params) => ({
        url: "/coins/search",
        params,
      }),
      providesTags: ["Coins"],
    }),
  }),
});
