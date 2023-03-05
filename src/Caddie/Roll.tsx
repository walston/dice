import React, { useMemo, useState } from "react";
import { validate } from "../services/languageService";

type RollProps = {
  script: string;
  title: string;
  roll: () => void;
  renameRoll: (name: string) => void;
  changeRoll: (roll: string) => void;
};

export function Roll({
  script,
  title,
  roll,
  changeRoll,
  renameRoll,
}: RollProps): JSX.Element {
  const editing = useState(false);
  const valid = useMemo(() => validate(script), [script]);
  return (
    <div onClick={() => roll()} style={{ cursor: "pointer" }}>
      <h2>
        {editing ? (
          <input
            type="text"
            className="inheritor active"
            placeholder="Ball of Fire"
            value={title}
            onChange={(event) => renameRoll(event.target.value)}
          />
        ) : (
          title
        )}
      </h2>
      <pre
        style={
          valid
            ? { border: "1px solid transparent" }
            : {
                backgroundColor: "lightcoral",
                border: "1px solid red",
              }
        }
      >
        {editing ? (
          <input
            type="text"
            className="inheritor active"
            placeholder="8d6"
            value={script}
            onChange={(event) => changeRoll(event.target.value)}
          />
        ) : (
          script
        )}
      </pre>
    </div>
  );
}
