import React, { useContext, useEffect, useState } from "react";
import { Field } from "./components/Field";
import { UserContext } from "./context/context";
// import { generateBombs } from "./utils/generateBombs";

/*
TO DO:
-field DONE
-first touch bez min, random polja se dopru
-random mine
-dodati borjeve poli polja kadi su mine
 */

const submitHandler = (grid: any) => {
  let win = false;
  for (let row of grid) {
    for (let col of row) {
      if (col.type === "bomb") {
        win = true;
      }
    }
  }
  return win;
};

export const Minesweeper = () => {
  const [win, setWin] = useState<null | boolean>(null);

  const { grid } = useContext(UserContext);
  const DisplayField = () => {
    //rerendera se svaki put kad se promjeni grid
    //nez zasto ne dela kada stavin grid u useEffect ali ok :/
    const [flags, setFlags] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {}, [count, setCount, flags, setFlags]);

    return (
      <div
        style={{ display: "flex", width: 600, flexWrap: "wrap", height: 600 }}
      >
        {grid.map((row: any, rowId: any) =>
          row.map((_: any, colId: any) => (
            <Field
              key={[rowId, colId].toString()}
              fieldInfo={grid[rowId][colId]}
              setWin={setWin}
              currentField={{ rowId, colId }}
              count={count}
              setCount={setCount}
              flags={flags}
              setFlags={setFlags}
            />
          ))
        )}
      </div>
    );
  };

  if (win) {
    return <h1>You Win!</h1>;
  } else if (win === false) {
    return <h1>GG</h1>;
  }

  return (
    <div>
      <DisplayField />
      <button
        onClick={() => {
          //check if win/lose
          let res = submitHandler(grid);
          if (!res) setWin(true);
          else setWin(false);
        }}
      >
        Submit
      </button>
    </div>
  );
};
