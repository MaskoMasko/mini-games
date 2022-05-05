import React from "react";
import { store } from "../store/store";

export const Cell = ({ colId, rowId }: { colId: number; rowId: number }) => {
  // const { headRow, headCol } = store.state.currentHead;
  const { foodRow, foodCol } = store.state.food;
  const snake = store.state.snake;
  return (
    <div
      style={{
        width: 50,
        height: 50,
        margin: 2,
        backgroundColor: snake.includes(JSON.stringify([rowId, colId]))
          ? // headCol === colId && headRow === rowId
            "crimson"
          : colId === foodCol && rowId === foodRow
          ? "chocolate"
          : "lightgreen",
      }}
    ></div>
  );
};
