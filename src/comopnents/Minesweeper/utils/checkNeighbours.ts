import { maxCol, maxRow } from "./../constants";
import { Coordinates } from "../components/Field";
import { FieldInfo } from "./../types";
import { noBombsAt } from "./noBombsAt";

export function checkNeighbours(
  currentField: Coordinates,
  grid: FieldInfo[][],
  firstTouch: boolean
) {
  const { rowId, colId } = currentField;
  let clearCells = noBombsAt(currentField);
  if (colId >= 0 && colId < maxCol && rowId >= 0 && rowId < maxRow) {
    if (grid[rowId][colId].type === "unknown") {
      grid[rowId][colId].type = "clear";
      grid[rowId][colId].opened = true;
      //show svih osan kraji
      if (firstTouch) {
        let cell: string;
        for (cell of clearCells) {
          if (cell !== null) {
            let [first, second] = cell
              .slice(1, cell.length - 1)
              .split(",")
              .map((el) => parseInt(el));
            if (
              first >= 0 &&
              first < maxRow &&
              second >= 0 &&
              second < maxCol
            ) {
              grid[first][second].opened = true;
            }
          }
        }
      }
      let top = rowId - 1;
      let right = colId + 1;
      let bottom = rowId + 1;
      let left = colId - 1;
      //tu nisto krivo setta
      if (right < maxCol) grid[rowId][right].opened = true;
      if (top >= 0) grid[top][colId].opened = true;
      if (bottom < maxRow) grid[bottom][colId].opened = true;
      if (bottom < maxRow && right < maxCol) grid[bottom][right].opened = true;
      if (top >= 0 && right < maxCol) grid[top][right].opened = true;
      if (top >= 0 && left >= 0) grid[top][left].opened = true;
      if (bottom < maxRow && left >= 0) grid[bottom][left].opened = true;
      if (left >= 0) grid[rowId][left].opened = true;
      checkNeighbours({ rowId: top, colId }, grid, firstTouch);
      checkNeighbours({ rowId, colId: left }, grid, firstTouch);
      checkNeighbours({ rowId, colId: right }, grid, firstTouch);
      checkNeighbours({ rowId: bottom, colId }, grid, firstTouch);
      checkNeighbours({ rowId: top, colId: left }, grid, firstTouch);
      checkNeighbours({ rowId: top, colId: right }, grid, firstTouch);
      checkNeighbours({ rowId: bottom, colId: right }, grid, firstTouch);
      checkNeighbours({ rowId: bottom, colId: left }, grid, firstTouch);
      return grid;
    }
  }
  return grid;
}
