import React from "react";
import { createRoot } from "react-dom/client";
import { useCharacter } from "./characterService";
import { roll } from "./rollService";
import "./caddie.css";

function CaddieApp() {
  const [{ name, rolls }, dispatchers] = useCharacter();

  return (
    <aside>
      <h1>
        {" "}
        <input
          className="inherit"
          value={name}
          onChange={(event) => dispatchers.renameCharacter(event.target.value)}
        />
      </h1>
      {rolls.map(({ guid, title, script }) => (
        <div
          key={guid}
          onClick={() => roll(script)}
          style={{ cursor: "pointer" }}
        >
          <h2>
            <input
              className="inherit"
              value={title}
              onChange={(event) =>
                dispatchers.renameRoll(guid, event.target.value)
              }
            />
          </h2>
          <pre>
            <textarea
              className="inherit"
              rows={1}
              value={script}
              onChange={(event) =>
                dispatchers.changeRoll(guid, event.target.value)
              }
            />
          </pre>
        </div>
      ))}
      <button onClick={() => dispatchers.newRoll("", "")}>+</button>
    </aside>
  );
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
