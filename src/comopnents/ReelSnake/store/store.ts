import { maxCol, maxRow } from "./../../Minesweeper/constants";
import { observable, action } from "mobx";

const state = observable({
  snake: [
    JSON.stringify([Math.floor(maxRow / 2) - 1, Math.floor(maxRow / 2) - 1]),
  ] as string[],
  currentHead: {
    headRow: Math.floor(maxRow / 2) - 1,
    headCol: Math.floor(maxCol / 2) - 1,
  },
  food: {
    foodRow: null,
    foodCol: null,
  } as { foodRow: null | number; foodCol: null | number },
  prevDirection: "left",
});

const moveHead = action((direction: string) => {
  if (direction === "left") {
    state.currentHead.headCol = state.currentHead.headCol - 1;
    state.snake.shift();
    state.snake.push(
      JSON.stringify([state.currentHead.headRow, state.currentHead.headCol])
    );
  }
  if (direction === "up") {
    state.currentHead.headRow = state.currentHead.headRow - 1;
    state.snake.shift();
    state.snake.push(
      JSON.stringify([state.currentHead.headRow, state.currentHead.headCol])
    );
  }
  if (direction === "down") {
    state.currentHead.headRow = state.currentHead.headRow + 1;
    state.snake.shift();
    state.snake.push(
      JSON.stringify([state.currentHead.headRow, state.currentHead.headCol])
    );
  }
  if (direction === "right") {
    state.currentHead.headCol = state.currentHead.headCol + 1;
    state.snake.shift();
    state.snake.push(
      JSON.stringify([state.currentHead.headRow, state.currentHead.headCol])
    );
  }
  return state.currentHead;
});

//projevri da snake ne more ujti samo u sebe unazad
const setPrevDirection = action(({ key }: any) => {
  if (key === "ArrowUp") {
    if (state.prevDirection !== "down") {
      state.prevDirection = "up";
    }
  }
  if (key === "ArrowDown") {
    if (state.prevDirection !== "up") {
      state.prevDirection = "down";
    }
  }
  if (key === "ArrowRight") {
    if (state.prevDirection !== "left") {
      state.prevDirection = "right";
    }
  }
  if (key === "ArrowLeft") {
    if (state.prevDirection !== "right") {
      state.prevDirection = "left";
    }
  }
  return state.prevDirection;
});

const respawnFood = action(() => {
  state.food.foodRow = Math.floor(Math.random() * maxRow);
  state.food.foodCol = Math.floor(Math.random() * maxRow);
  if (
    state.snake.includes(
      JSON.stringify([state.food.foodRow, state.food.foodCol])
    )
  ) {
    respawnFood();
  } else {
    return state.food;
  }
  return state.food;
});

const addSnake = action((pos: any) => {
  state.snake.push(pos);
  return state.snake;
});

const checkIfYes = action(() => {
  const { headRow, headCol } = state.currentHead;
  let count = 0;
  let end = state.snake.map((e) => {
    if (e === JSON.stringify([headRow, headCol])) {
      count++;
      if (count > 1) {
        return true;
      }
    }
    return e;
  });
  return end;
});

export const store = {
  state,
  moveHead,
  checkIfYes,
  setPrevDirection,
  respawnFood,
  addSnake,
};
