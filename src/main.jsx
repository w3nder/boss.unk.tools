import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
