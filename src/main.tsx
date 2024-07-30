import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import AppRouter from "./router/AppRouter";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
