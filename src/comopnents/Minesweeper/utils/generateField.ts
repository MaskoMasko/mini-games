import { Coordinates } from "./../components/Field";
import { FieldInfo } from "../types";
import { maxRow, maxCol, bombs } from "../constants";
import { noBombsAt } from "./noBombsAt";

export function generateField(currentField: Coordinates) {
  let field: FieldInfo[][] = [];
  for (let i = 0; i < maxRow; i++) {
    field.push([]);
    for (let j = 0; j < maxCol; j++) {
      field[i].push({
        value: 0,
        type: "unknown",
        opened: false,
      });
    }
  }

  //generate first touch
  //get field koji pretisne -> + jedan u svaken kraju ne smi biti bomba
  let clearCells = noBombsAt(currentField);

  //generate Bombs
  let bombsCount = 0;
  while (bombsCount < bombs) {
    const randomRow = Math.floor(Math.random() * maxRow);
    const randomCol = Math.floor(Math.random() * maxCol);
    let currentField = field[randomRow][randomCol];
    if (
      clearCells.includes(JSON.stringify([randomRow, randomCol])) ||
      currentField.type === "bomb"
    )
      continue;
    else {
      field = field.map((row, rowId) =>
        row.map((col, colId) => {
          if (randomCol === colId && randomRow === rowId) {
            return {
              ...col,
              value: -1,
              type: "bomb",
            };
          }
          return col;
        })
      );
      bombsCount++;
    }
  }

  let cell: string;
  for (cell of clearCells) {
    if (cell !== null) {
      let [first, second] = cell
        .slice(1, cell.length - 1)
        .split(",")
        .map((el) => parseInt(el));
      if (first >= 0 && first < maxRow && second >= 0 && second < maxCol) {
        field[first][second].opened = true;
      }
    }
  }

  //fields aorund mines
  for (let i = 0; i < maxRow; i++) {
    for (let j = 0; j < maxCol; j++) {
      if (field[i][j].type === "bomb") continue;
      let left = 0 < j ? field[i][j - 1] : null;
      let topLeft = 0 < i && 0 < j ? field[i - 1][j - 1] : null;
      let top = 0 < i ? field[i - 1][j] : null;
      let topRight = 0 < i && j < maxCol ? field[i - 1][j + 1] : null;
      let right = j < maxCol ? field[i][j + 1] : null;
      let bottomRight =
        i < maxRow - 1 && j < maxCol ? field[i + 1][j + 1] : null;
      let bottom = i < maxRow - 1 ? field[i + 1][j] : null;
      //row je max-1, col je maxCol-1
      let bottomLeft = i < maxRow - 1 && j > 0 ? field[i + 1][j - 1] : null;
      if (top?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (left?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (topLeft?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (topRight?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (right?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (bottomRight?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (bottomLeft?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
      if (bottom?.type === "bomb") {
        field[i][j].value += 1;
        if (field[i][j].type !== "bombAround") field[i][j].type = "bombAround";
      }
    }
  }
  return field;
}
