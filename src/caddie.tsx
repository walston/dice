import React from "react";
import { createRoot } from "react-dom/client";
import { loadCharacter } from "./characterService";
import { roll } from "./rollService";

function CaddieApp() {
  const { name, rolls } = loadCharacter();
  return (
    <aside>
      <h1>{name}</h1>
      {rolls.map(({ title, script }) => (
        <div onClick={() => roll(script)} style={{ cursor: "pointer" }}>
          <h2>{title}</h2>
          <pre contentEditable>{script}</pre>
        </div>
      ))}
    </aside>
  );
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
