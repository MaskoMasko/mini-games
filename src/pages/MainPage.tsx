import React from "react";
import { useNavigate } from "react-router";

export const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Select Mini-Game</h1>
      <button onClick={() => navigate("tic-tac-toe")}>Tic tac toe</button>
      <button onClick={() => navigate("snek")}>Snek</button>
      <button onClick={() => navigate("minesweeper")}>Minesweeper</button>
      <button onClick={() => navigate("reel-snake")}>Reel Snake</button>
      <button onClick={() => navigate("sudoku")}>Sudoku</button>
      <button onClick={() => navigate("hangman")}>Hangman</button>
      <button onClick={() => navigate("turtle-race")}>Turtle Race</button>
    </div>
  );
};
