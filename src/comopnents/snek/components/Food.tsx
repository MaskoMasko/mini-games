import React, { useEffect, useRef } from "react";
import { useStore } from "../store/store";

export const Food = () => {
  const foodRef = useRef<null | HTMLDivElement>(null);
  const score = useStore((state) => state.score);
  const increaseScore = useStore((state) => state.increaseScore);
  const changeFoodPos = useStore((state) => state.changeFoodPos);
  const addPos = useStore((state) => state.addPos);
  const borders = { x: [400, -400], y: [300, -300] };
  const getRandomFoodPos = (x: number[], y: number[]) => {
    const [maxX, minX] = x;
    const [maxY, minY] = y;
    //jer more pojti u negativno pa zato
    let trueMaxX = maxX + Math.abs(minX);
    let trueMaxY = maxY + Math.abs(minY);

    return [
      minX + Math.floor((Math.random() * trueMaxX) / 50) * 50,
      minY + Math.floor((Math.random() * trueMaxY) / 50) * 50,
    ];
  };
  const setCollision = useStore((state) => state.changeFoodPosition);
  let [x, y] = getRandomFoodPos(borders.x, borders.y);

  useEffect(() => {
    //ovo kadi je 100, 100 rabi nastimati
    //LETS GOGGGOGOOGOGOG --> rendera se 2 puta kad...
    //je pojde changePos u 1, ali kako u useEffectu changePos pojde u 0 opet se executa useEffect
    // (changeFoodPos || score == 0) -> score je samo da se useEffect executa zajno na pocetku
    if (score === 0) {
      foodRef.current!.style.transform = `translate(${
        Math.abs(x) < 100 ? 100 : x
      }px,${Math.abs(x) < 100 ? 100 : y}px)`;
      addPos(
        { x: Math.abs(x) < 100 ? 100 : x, y: Math.abs(x) < 100 ? 100 : y },
        "food"
      );
      // console.log("remders");
    }
    if (changeFoodPos) {
      foodRef.current!.style.transform = `translate(${x}px,${y}px)`;
      addPos({ x, y }, "food");
      // console.log("remders");
      increaseScore();
    }
    setCollision(false);
  }, [changeFoodPos]);

  return (
    <div
      style={{
        width: 50,
        height: 50,
        backgroundColor: "brown",
        position: "absolute",
      }}
      ref={foodRef}
    ></div>
  );
};
