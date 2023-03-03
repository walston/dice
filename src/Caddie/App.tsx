import React from "react";
import { useCharacter } from "../services/characterService";
import { roll } from "../services/rollService";
import { Roll } from "./Roll";
import "./caddie.css";

export function App() {
  const [{ name, rolls }, dispatchers] = useCharacter();

  return (
    <aside>
      <h1>
        {" "}
        <input
          className="inheritor"
          value={name}
          onChange={(event) => dispatchers.renameCharacter(event.target.value)}
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
  );
}
