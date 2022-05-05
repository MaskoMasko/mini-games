import React, { useContext, useState } from "react";
import { bombs } from "../constants";
import { UserContext } from "../context/context";
import "../style/index.css";
import { checkNeighbours } from "../utils/checkNeighbours";
import { flagsAt } from "../utils/flagsAt";
import { generateField } from "../utils/generateField";

export interface Coordinates {
  rowId: number;
  colId: number;
}

export const Field = ({
  fieldInfo,
  currentField,
  count,
  setCount,
  flags,
  setFlags,
  setWin,
}: {
  count: any;
  setCount: any;
  fieldInfo: any;
  flags: any;
  setFlags: any;
  currentField: Coordinates;
  setWin: any;
}) => {
  // const { rowId, colId } = fieldInfo;
  const [opened, setOpened] = useState(fieldInfo.opened);
  const { grid, setGrid, firstTouch, setFirstTouch } = useContext(UserContext);
  const [test, setTest] = useState(setTimeout(() => {}, 1000));
  return (
    <div
      onMouseUp={() => clearTimeout(test)}
      onMouseDown={() => {
        setTest(
          setTimeout(function () {
            if (flags <= bombs) {
              setFlags(flags + 1);
              setGrid(flagsAt(grid, currentField));
            } else alert("No more flags");
          }, 500)
        );
      }}
      onClick={() => {
        if (fieldInfo.type === "bomb") setWin(false);
        if (opened) return;
        setOpened(true);
        if (firstTouch) {
          let newGrid = generateField(currentField);
          let newnewGrid = checkNeighbours(currentField, newGrid, firstTouch);
          setCount((count += 1));
          setGrid(newnewGrid);
          setFirstTouch(false);
        }
        if (fieldInfo.type === "unknown") {
          let newGrid = checkNeighbours(currentField, grid, firstTouch);
          setCount((count += 1));
          setGrid(newGrid);
        }
        //setFlag()
      }}
      style={{
        backgroundColor: "lightgray",
        margin: 2,
        width: 50,
        height: 50,
        border: "1px solid black",
        display: "grid",
        placeItems: "center",
      }}
      className={fieldInfo.opened || opened ? "opened" : ""}
    >
      {/*open su samo nimaju text */}
      {fieldInfo.type === "clear" && <h2>{""}</h2>}
      {fieldInfo.type === "flag" && <h2 style={{ margin: 0 }}>⛳</h2>}
      {(fieldInfo.opened || opened) &&
        fieldInfo.value !== 0 &&
        fieldInfo.type !== "flag" && (
          <>
            {fieldInfo.value === -1 ? (
              <h2 style={{ margin: 0 }}>💣</h2>
            ) : (
              fieldInfo.value
            )}
          </>
        )}
      {/* {opened && (
        <>
          {fieldInfo.value === -1 ? (
            <h2 style={{ margin: 0 }}>💣</h2>
          ) : fieldInfo.value === 0 ? (
            ""
          ) : (
            fieldInfo.value
          )}
        </>
      )} */}
    </div>
  );
};
