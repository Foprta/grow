import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { portfoliosAPI } from "../services/portfoliosService";
import { coinsAPI } from "../services/coinsService";
import { transactionsAPI } from "../services/transactionsService";

const rootReducer = combineReducers({
  [portfoliosAPI.reducerPath]: portfoliosAPI.reducer,
  [coinsAPI.reducerPath]: coinsAPI.reducer,
  [transactionsAPI.reducerPath]: transactionsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(portfoliosAPI.middleware, coinsAPI.middleware, transactionsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
