import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HangmanPage } from "../pages/HangmanPage";
import { MainPage } from "../pages/MainPage";
import { MinesweeperPage } from "../pages/MinesweeperPage";
import { ReelSnakePage } from "../pages/ReelSnakePage";
import { SnekPage } from "../pages/SnekPage";
import { SudokuPage } from "../pages/SudokuPage";
import { TicTacToePage } from "../pages/TicTacToePage";
import { TurtleRacePage } from "../pages/TurtleRacePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="tic-tac-toe" element={<TicTacToePage />} />
        <Route path="snek" element={<SnekPage />} />
        <Route path="minesweeper" element={<MinesweeperPage />} />
        <Route path="reel-snake" element={<ReelSnakePage />} />
        <Route path="sudoku" element={<SudokuPage />} />
        <Route path="hangman" element={<HangmanPage />} />
        <Route path="turtle-race" element={<TurtleRacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
