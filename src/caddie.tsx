import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useCharacter } from "./characterService";
import { roll } from "./rollService";
import { Roll } from "./Roll";
import "./caddie.css";

function CaddieApp() {
  const [{ name, rolls }, dispatchers] = useCharacter();

  return (
    <StrictMode>
      <aside>
        <h1>
          {" "}
          <input
            className="inheritor"
            value={name}
            onChange={(event) =>
              dispatchers.renameCharacter(event.target.value)
            }
          />
        </h1>
        {rolls.map(({ guid, title, script }) => (
          <Roll
            key={guid}
            script={script}
            title={title}
            roll={() => roll(script)}
            changeRoll={(roll) => dispatchers.changeRoll(guid, roll)}
            renameRoll={(name) => dispatchers.renameRoll(guid, name)}
          />
        ))}
        <button onClick={() => dispatchers.newRoll("", "")}>+</button>
      </aside>
    </StrictMode>
  );
}

const mountpoint = document.getElementById("caddie") as HTMLDivElement;
const root = createRoot(mountpoint);
root.render(<CaddieApp />);
