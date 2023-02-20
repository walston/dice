import React from "react";
import { createRoot } from "react-dom/client";
import { loadCharacter } from "./characterService";

function CaddieApp() {
  const { name, rolls } = loadCharacter();
  return (
    <aside>
      <h1>{name}</h1>
      {rolls.map(({ title, script }) => (
        <div
          onClick={() => console.log("rolling", title)}
          style={{ cursor: "pointer" }}
        >
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
