import React, { useState, useEffect } from "react";
import { colors } from "../contstants";
import { store } from "../store";

export const Turtle = ({ turtleId, startingSpeed }: any) => {
  const defaultSpeed = 50;
  let [turtleSpeed, setTurtleSpeed] = useState(startingSpeed);
  //check koji sanke ima najveci starting speed
  useEffect(
    () => {
      // if (winnerSpeed < startingSpeed) setWinnerTurtle(turtleId);
      let speedInterval = setInterval(() => {
        if (turtleSpeed >= 650) {
          clearInterval(speedInterval);
          store.setShowWinner();
          return;
        }
        setTurtleSpeed((turtleSpeed: number) => (turtleSpeed += defaultSpeed));
        //   turtleSpeedRef.current += randomSpeed;
      }, 500);
      return () => clearInterval(speedInterval);
    },
    //   [turtleSpeedRef.current]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turtleSpeed]
  );

  return (
    <div
      style={{
        width: `${100 / 6}%`,
        height: turtleSpeed,
        display: "grid",
        placeItems: "center",
        backgroundColor: colors[turtleId],
      }}
    >
      <h1>{turtleId}</h1>
    </div>
  );
};
