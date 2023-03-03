import React from "react";

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
  return (
    <div onClick={() => roll()} style={{ cursor: "pointer" }}>
      <h2>
        <input
          type="text"
          className="inheritor active"
          placeholder="Ball of Fire"
          value={title}
          onChange={(event) => renameRoll(event.target.value)}
        />
      </h2>
      <pre>
        <input
          type="text"
          className="inheritor active"
          placeholder="8d6"
          value={script}
          onChange={(event) => changeRoll(event.target.value)}
        />
      </pre>
    </div>
  );
}
