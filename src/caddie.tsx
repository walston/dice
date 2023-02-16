import React from "react";
import { createRoot } from "react-dom/client";

import "./style.css";

function CaddieApp() {
  return <div>Hello</div>;
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
