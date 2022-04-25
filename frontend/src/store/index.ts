import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { portfoliosAPI } from "../services/portfoliosService";

const rootReducer = combineReducers({
  [portfoliosAPI.reducerPath]: portfoliosAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(portfoliosAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
