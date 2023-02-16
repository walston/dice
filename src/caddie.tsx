import React from "react";
import { createRoot } from "react-dom/client";

function CaddieApp() {
  return (
    <aside>
      <h1>Onthrop</h1>
      <div onClick={() => console.log("rolling")} style={{ cursor: "pointer" }}>
        <h2>Longsword (one-handed)</h2>
        <pre contentEditable>
          (1d20;n=20:CRIT,n=1:FAIL)|(slashing,1d8)(CRIT?slashing,1d8)
        </pre>
      </div>
      <div onClick={() => console.log("rolling")} style={{ cursor: "pointer" }}>
        <h2>Longsword (two-handed)</h2>
        <pre contentEditable>
          (1d20;n=20:CRIT,n=1:FAIL)|(slashing,1d10)(CRIT?slashing,1d10)
        </pre>
      </div>
    </aside>
  );
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
