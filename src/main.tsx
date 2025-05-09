/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-04-24 11:03:44
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";

import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/interestingWeb">
      <App />
    </Router>
  </StrictMode>
);
