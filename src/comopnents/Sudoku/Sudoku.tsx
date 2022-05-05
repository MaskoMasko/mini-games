import React, { useState } from "react";
import { SudokuCell } from "./components/SudokuCell";
import { generateGrid, GridInterface } from "./utils/generateGrid";

export const Sudoku = () => {
  const grid = useState<GridInterface[][]>(generateGrid);
  return (
    <div style={{ width: 470, overflow: "hidden", border: "3px solid black" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 500,
          height: 500,
        }}
      >
        {grid[0].map((row, rowId: number) =>
          row.map((col, colId: number) => {
            return (
              <SudokuCell
                key={rowId + colId}
                rowId={rowId}
                colId={colId}
                col={col}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
