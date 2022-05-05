import React from "react";
import { Food } from "./components/Food";
import { SnekBody } from "./components/SnekBody";
import { useStore } from "./store/store";

export const Snek = () => {
  const score = useStore((state) => state.score);
  return (
    <div
      style={{
        width: 800,
        height: 600,
        backgroundColor: "lightgray",
        border: "20px solid black",
        display: "grid",
        placeItems: "center",
        padding: 30,
      }}
    >
      <h3 style={{ position: "absolute", top: "2%", left: "4%" }}>
        Score: {score}
      </h3>
      <SnekBody />
      <Food />
    </div>
  );
};
