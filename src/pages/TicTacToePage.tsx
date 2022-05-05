import React from "react";
import { TicTacToe } from "../comopnents/TicTacToe/TicTacToe";
import { RecoilRoot } from "recoil";

export const TicTacToePage = () => {
  return (
    <RecoilRoot>
      <TicTacToe />
    </RecoilRoot>
  );
};
