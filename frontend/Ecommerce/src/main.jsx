import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
// import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "./Users/providers/UserProvider";
import SnackbarProvider from "./Users/providers/SnackbarProvider";
 import Layout from "./Layout";
import ROUTES from "./routes/routesModel";
import Main from "./components/main/Main";
import SignnUp from "./Users/pages/SignUp";
import ProductDetails from "./components/main/ProductDetails";
import CartPage from "./components/main/CartPage";
import Router from "./routes/Router";
import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import Footer from "./components/footer/footer";
import App from "./App";
import { Box, ThemeProvider } from "@mui/material";
import Hero from "./components/hero/Hero";
import { useMode } from "./theme";


ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <BrowserRouter>
    <SnackbarProvider>
    <UserProvider>
    <Provider store={store}>     
    <App/>
     </Provider>
    </UserProvider>
    </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
