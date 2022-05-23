import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "easy-peasy";
import { LazyMotion } from "framer-motion";
import App from "./App";
import { store } from "$lib/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // @ts-ignore
  <StoreProvider store={store}>
    <LazyMotion
      strict
      features={() => import("framer-motion").then((m) => m.domAnimation)}
    >
      <App />
    </LazyMotion>
  </StoreProvider>
  // </StrictMode>
);
