import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as CaddieApp } from "./App";

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(
  <StrictMode>
    <CaddieApp />
  </StrictMode>
);
