import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Navigation from "./Navigation";
import { Provider } from "./Context";
import { BrowserRouter } from "react-router-dom";
import i18next from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Navigation />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
