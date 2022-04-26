import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RouteGuard from "./components/RouteGuard";
import Portfolio from "./pages/Home/Portfolio/Portfolio";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <RouteGuard>
                  <Home />
                </RouteGuard>
              }
            >
              <Route path="/portfolio/:portfolioId" element={<Portfolio />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
