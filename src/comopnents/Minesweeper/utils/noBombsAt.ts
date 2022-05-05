import { maxCol, maxRow } from "../constants";
import { Coordinates } from "./../components/Field";
export function noBombsAt(currentField: Coordinates) {
  let noBombsAt: any[] = [];
  const { rowId, colId } = currentField;
  //za doli ne valja nisto
  /*
  let bottomLeft =
    i < maxRow - 1 && j < maxCol ? field[i + 1][j - 1] : null;
    */
  let current = JSON.stringify([rowId, colId]);
  let left = colId > 0 ? JSON.stringify([rowId, colId - 1]) : null;
  let topLeft =
    colId > 0 && rowId > 0 ? JSON.stringify([rowId - 1, colId - 1]) : null;
  let top = rowId > 0 ? JSON.stringify([rowId - 1, colId]) : null;
  let topRight =
    rowId > 0 && colId < maxCol ? JSON.stringify([rowId - 1, colId + 1]) : null;
  let right = colId < maxCol ? JSON.stringify([rowId, colId + 1]) : null;
  //myb dojde maxRow-1, maxCol-1
  let bottomRight =
    rowId < maxRow && colId < maxCol
      ? JSON.stringify([rowId + 1, colId + 1])
      : null;
  let bottom = rowId < maxRow ? JSON.stringify([rowId + 1, colId]) : null;
  let bottomLeft =
    rowId < maxRow && colId < maxCol
      ? JSON.stringify([rowId + 1, colId - 1])
      : null;
  noBombsAt.push(
    current,
    left,
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft
  );
  return noBombsAt;
}
