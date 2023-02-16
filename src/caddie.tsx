import React from "react";
import { createRoot } from "react-dom/client";

type RollString = string;
type Roll = { name: string; roll: RollString };

const ROLLS: Roll[] = [
  {
    name: "Longsword (one-handed)",
    roll: "(1d20;n=20:CRIT,n=1:FAIL)|(slashing,1d10)(CRIT?slashing,1d10)",
  },
  {
    name: "Longsword (two-handed)",
    roll: "(1d20;n=20:CRIT,n=1:FAIL)|(slashing,1d8)(CRIT?slashing,1d8)",
  },
];

function CaddieApp() {
  return (
    <aside>
      <h1>Onthrop</h1>
      {ROLLS.map(({ name, roll }) => (
        <div
          onClick={() => console.log("rolling", name)}
          style={{ cursor: "pointer" }}
        >
          <h2>{name}</h2>
          <pre contentEditable>{roll}</pre>
        </div>
      ))}
    </aside>
  );
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
