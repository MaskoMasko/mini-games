import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store/store";

export interface CurrentPositonInterface {
  x?: number;
  y?: number;
}

export const SnekBody = () => {
  const moveSpeed = 50;
  const [prevMove, setPrevMove] = useState("");
  const borders = { x: [400, -400], y: [300, -300] };
  const [currentPosition, setCurrentPosition] =
    useState<CurrentPositonInterface>({});
  //kako izbjegnut ovaj any ://////
  const snekRef = useRef<null | HTMLDivElement>(null);
  const [gameOver, setGameOver] = useState(false);
  function snakeControls({ key }: { key: string }) {
    if (!gameOver) {
      if (key === "ArrowRight") {
        if (prevMove === "LEFT") return;
        snekRef.current!.style.transform = `translate(${
          currentPosition.x! + moveSpeed
        }px, ${currentPosition.y!}px)`;
        addPos(currentPosition, "snek");
        setCurrentPosition({
          ...currentPosition,
          x: moveSpeed + currentPosition.x!,
        });
        setPrevMove("RIGHT");
        if (currentPosition.x! + moveSpeed > borders.x[0]) {
          setGameOver(true);
          setPrevMove("");
        }
      }
      if (key === "ArrowLeft") {
        if (prevMove === "RIGHT") return;
        snekRef.current!.style.transform = `translate(${
          currentPosition.x! - moveSpeed
        }px, ${currentPosition.y!}px)`;
        addPos(currentPosition, "snek");

        if (currentPosition.x! - moveSpeed < borders.x[1]) {
          setGameOver(true);
          setPrevMove("");
        }
        setCurrentPosition({
          ...currentPosition,
          x: currentPosition.x! - moveSpeed,
        });
        setPrevMove("LEFT");
      }
      if (key === "ArrowDown") {
        if (prevMove === "UP") return;
        snekRef.current!.style.transform = `translate(${currentPosition.x!}px,${
          currentPosition.y! + moveSpeed
        }px)`;
        addPos(currentPosition, "snek");

        if (currentPosition.y! + moveSpeed > borders.y[0]) {
          setGameOver(true);
          setPrevMove("");
        }
        setCurrentPosition({
          ...currentPosition,
          y: moveSpeed + currentPosition.y!,
        });
        setPrevMove("DOWN");
      }
      if (key === "ArrowUp") {
        if (prevMove === "DOWN") return;
        snekRef.current!.style.transform = `translate(${currentPosition.x!}px,${
          currentPosition.y! - moveSpeed
        }px)`;
        addPos(currentPosition, "snek");

        if (currentPosition.y! - moveSpeed < borders.y[1]) {
          setGameOver(true);
          setPrevMove("");
        }
        setCurrentPosition({
          ...currentPosition,
          y: currentPosition.y! - moveSpeed,
        });
        setPrevMove("UP");
      }
    }
  }

  const addPos = useStore((state) => state.addPos);
  const checkCollision = useStore((state) => state.collisionCheck) as any;
  const setCollision = useStore((state) => state.changeFoodPosition);
  const score = useStore((state) => state.score);

  useEffect(() => {
    window.addEventListener("keydown", snakeControls);
    return () => {
      window.removeEventListener("keydown", snakeControls);
    };
  });

  //  function snakesMovements(snakeRefs:any){
  //   snakeRefs.map((snakeDiv,id)=>{
  //     snakeDiv
  //   })
  //  }

  useEffect(() => {
    setCurrentPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (checkCollision.length <= 1) return;
    if (
      checkCollision[0]?.x === checkCollision[1]?.x &&
      checkCollision[0]?.y === checkCollision[1]?.y
    ) {
      setCollision(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkCollision[1]]);

  if (gameOver)
    return (
      <>
        <h1>Game Over!!</h1>
        <h2>Score: {score}</h2>
        <button
          onClick={() => {
            setCurrentPosition({ x: 0, y: 0 });
            setGameOver(false);
            setCollision(true);
          }}
        >
          playa gagin!
        </button>
      </>
    );
  return (
    <>
      <div
        ref={snekRef}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "red",
          margin: 5,
        }}
      ></div>
      {/* <div>
        {Array(2)
          .fill("")
          .map((_, id) => {
            return (
              // <SnekBodyParts ref={snakeBodyRef}/>
              <div
                key={id}
                className={`${id}`}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "red",
                  margin: 5,
                  transform: `translate(${
                    currentPosition.x! - (id + 1) * moveSpeed
                  } px, ${currentPosition.y!}px)`,
                }}
              ></div>
            );
          })}
      </div> */}
    </>
  );
};
