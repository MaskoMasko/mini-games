import React, { useEffect, useState } from "react";
import { Cell } from "./components/Cell";
import { store } from "./store/store";
import { generatePlayground } from "./utils/generatePlayground";
import { observer } from "mobx-react-lite";
import { maxCol, maxRow } from "./constants";

//playground -> done
//border rules -> done
//snake movements -> done
//food -> done
//food rules -> done
//more snake -> done
//more rules -> done

//ni flexible css ://
//sadge

export const ReelSnake = observer(() => {
  const currentHead = store.state.currentHead;
  const playground = useState(generatePlayground(currentHead));
  const [gameOver, setGameOver] = useState(false);
  const food = store.state.food;
  // const snake = store.state.snake;
  const [score, setScore] = useState(0);

  //provati da se ne rabi generate field kada se pomakne snakehead
  //

  //po def da gre u livo
  // useEffect(() => {
  //   // if (currentHead.headCol < 0 || currentHead.headCol >= maxCol) alert("gg");
  //   // if (currentHead.headRow < 0 || currentHead.headRow >= maxRow) alert("gg");
  //   const testInterval = setInterval(() => {
  //     window.addEventListener("keydown", store.setPrevDirection);
  //     //nap da grte u last direction
  //     store.moveHead(store.state.prevDirection);
  //     setPlaygorund(generatePlayground(currentHead));
  //   }, 1000);
  //   return () => {
  //     clearInterval(testInterval);
  //     window.removeEventListener("keydown", store.setPrevDirection);
  //   };
  // }, [store.state.currentHead]);
  useEffect(() => {
    if (score === 0) store.respawnFood();
    window.addEventListener("keydown", store.setPrevDirection);
    const snakeMoveSpeed = setInterval(() => {
      let endArr = store.checkIfYes();
      if (endArr.includes(true)) {
        clearInterval(snakeMoveSpeed);
        setGameOver(true);
      }

      // let strHead = JSON.stringify(currentHead);
      // let strFood = JSON.stringify(food);

      //tf ovo doli dela ovo gori ne
      let strHead = JSON.stringify([currentHead.headRow, currentHead.headCol]);
      let strFood = JSON.stringify([food.foodRow, food.foodCol]);

      // console.log(snake.map((e) => e));

      if (strHead === strFood) {
        //if yes change food pos
        store.respawnFood();

        //if yes dodaj jos snake
        //i guess da se promjeni prevDirection brzo pa izgleda kao bug :/
        //ili zapamti stari snake head pa izgleda tako????
        //a bo
        if (store.state.prevDirection === "up") {
          store.addSnake(
            JSON.stringify([currentHead.headRow + 1, currentHead.headCol])
          );
        }
        if (store.state.prevDirection === "down") {
          store.addSnake(
            JSON.stringify([currentHead.headRow - 1, currentHead.headCol])
          );
        }
        if (store.state.prevDirection === "left") {
          store.addSnake(
            JSON.stringify([currentHead.headRow, currentHead.headCol + 1])
          );
        }
        if (store.state.prevDirection === "right") {
          store.addSnake(
            JSON.stringify([currentHead.headRow, currentHead.headCol - 1])
          );
        }
        //setScore(score+1) nece nezz zasto
        setScore((score) => (score += 1));
      }
      store.moveHead(store.state.prevDirection);
      if (
        currentHead.headCol > maxCol ||
        currentHead.headCol < 0 ||
        currentHead.headRow > maxRow ||
        currentHead.headRow < 0
      ) {
        clearInterval(snakeMoveSpeed);
        setGameOver(true);
      }
    }, 500);
    return () => {
      clearInterval(snakeMoveSpeed);
      window.removeEventListener("keydown", store.setPrevDirection);
    };
    // }, [store.state.prevDirection]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", width: 550, flexWrap: "wrap" }}>
        {playground[0].map((row, rowId) =>
          row.map((_, colId) => (
            <Cell colId={colId} rowId={rowId} key={colId} />
          ))
        )}
        <h1 style={{ width: "100%", margin: 5 }}>Score: {score}</h1>
      </div>
      <div>
        {gameOver ? (
          <h1 style={{ margin: 5 }}>gameOver</h1>
        ) : (
          <>
            <h1>Rules:</h1>
            <h2>Strelice move yes</h2>
            <h2>Pazi granice</h2>
            <h2>Mores se poisti ako prebrzo stisces strelice... Pazi se!</h2>
          </>
        )}
      </div>
    </div>
  );
});
