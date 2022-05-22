import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "easy-peasy";

import App from "./App";
import { store } from "$lib/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* @ts-ignore */}
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>
);
