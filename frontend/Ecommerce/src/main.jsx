import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "./Users/providers/UserProvider";
import SnackbarProvider from "./Users/providers/SnackbarProvider";
import App from "./App";


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
