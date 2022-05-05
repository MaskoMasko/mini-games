import React, { useState } from "react";
import { Minesweeper } from "../comopnents/Minesweeper/Minesweeper";
import { UserContext } from "../comopnents/Minesweeper/context/context";

export const MinesweeperPage = () => {
  const [grid, setGrid] = useState<any>(
    Array(10)
      .fill("")
      .map((_) =>
        Array(10)
          .fill("")
          .map((e) => e)
      )
  );
  const [firstTouch, setFirstTouch] = useState(true);
  return (
    <div>
      <UserContext.Provider
        value={{ grid, setGrid, firstTouch, setFirstTouch }}
      >
        <Minesweeper />
      </UserContext.Provider>
    </div>
  );
};
