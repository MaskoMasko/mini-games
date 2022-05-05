import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { Field } from "./components/Field";
import { fieldsValues } from "./recoil/atoms/fieldsValues";
import { winnerCombinations } from "./winningCombinations";

export const TicTacToe = () => {
  //plain fields
  const numOfFields = Array(9).fill("");
  const navigate = useNavigate();

  //game stats
  // 1 == x 2 == o
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOn, setGameOn] = useState(true);
  const [clearFields, setClearFields] = useState(false);
  const [winner, setWinner] = useState("");

  const fieldValues = useRecoilValue(fieldsValues);

  function checkForWinner() {
    let filledFieldsWithX: number[] = [];
    let filledFieldsWithO: number[] = [];
    fieldValues.map(({ content, id }) =>
      content === "X"
        ? filledFieldsWithX.push(id)
        : content === "O"
        ? filledFieldsWithO.push(id)
        : false
    );
    //moren samo provjeriti ako je X arr.length = 5 jer samo prvi ce imati 5 length ali ok...
    if (filledFieldsWithO.length === 5 || filledFieldsWithX.length === 5) {
      setGameOn(false);
      setWinner("It's a TIE!");
    }
    for (let i = 0; i < winnerCombinations.length; i++) {
      if (
        winnerCombinations[i].every((combination) =>
          filledFieldsWithX.includes(combination)
        )
      ) {
        setGameOn(false);
        setWinner("Player 1 (X) won!");
      }
      if (
        winnerCombinations[i].every((combination) =>
          filledFieldsWithO.includes(combination)
        )
      ) {
        setGameOn(false);
        setWinner("Player 2 (O) won!");
      }
    }
  }

  useEffect(() => {
    if (gameOn) {
      checkForWinner();
      setClearFields(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues]);

  if (!gameOn) {
    return (
      <>
        <h1>{winner}</h1>
        <div>
          <button
            onClick={() => {
              setClearFields(true);
              setGameOn(true);
              setCurrentPlayer(1);
            }}
          >
            Play Again?
          </button>
          <button onClick={() => navigate("/")}>Main Menu</button>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        width: 700,
        height: 700,
        backgroundColor: "lightgray",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {numOfFields.map((_, id) => {
        return (
          <Field
            clearFields={clearFields}
            key={id}
            id={id}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        );
      })}
    </div>
  );
};
