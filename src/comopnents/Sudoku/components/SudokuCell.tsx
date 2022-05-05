import React from "react";
//prop types react vs ts types??

type SudokuCellProps = {
  rowId: number;
  colId: number;
  col: { value: number | undefined };
};

export const SudokuCell = ({
  rowId,
  colId,
  col: { value },
}: SudokuCellProps) => {
  return (
    <div
      style={
        colId === 2 && rowId === 2
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderRight: "3px solid black",
              borderBottom: "3px solid black",
            }
          : colId === 5 && rowId === 5
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderRight: "3px solid black",
              borderBottom: "3px solid black",
            }
          : colId === 2 && rowId === 5
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderRight: "3px solid black",
              borderBottom: "3px solid black",
            }
          : colId === 5 && rowId === 2
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderRight: "3px solid black",
              borderBottom: "3px solid black",
            }
          : colId === 2 || colId === 5
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderRight: "3px solid black",
            }
          : rowId === 2 || rowId === 5
          ? {
              width: 50,
              height: 54,
              border: "1px solid black",
              borderBottom: "3px solid black",
            }
          : { width: 50, height: 54, border: "1px solid black" }
      }
    >
      {value}
    </div>
  );
};
