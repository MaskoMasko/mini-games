import React, { useEffect, useState } from "react";
import { Turtle } from "./components/Turtle";
import { colors } from "./contstants";
import { generateTurtles } from "./generateTurtles";
import { store } from "./store";
import { observer } from "mobx-react-lite";

export const TurtleRace = observer(() => {
  const [currentBalance, setCurrentBalance] = useState(100);
  const [bet, setBet] = useState({ money: 0, turtle: 0 });
  const [beforeRace, setBeforeRace] = useState(true);

  const turtles = generateTurtles();
  const winnerPos = Math.max(
    ...turtles.map(({ startingPos }: any) => startingPos)
  );
  const winnerTurtle = turtles.find(({ startingPos }, id) =>
    startingPos === winnerPos ? id : null
  );
  useEffect(() => {
    store.setWinnerTurtle(winnerTurtle?.turltePos);
  }, []);

  if (beforeRace) {
    return (
      <div>
        <h1>Current Balance: {currentBalance}Kn</h1>
        <h1>Place Bets</h1>
        <input
          type="text"
          placeholder="Enter money"
          value={bet.money.toString()}
          onChange={(e) => {
            if (parseInt(e.target.value) > currentBalance) {
              alert("too large");
              e.target.value = "0";
            }
            setBet({
              ...bet,
              money: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            });
          }}
        />
        <select
          id="turtles"
          value={bet.turtle}
          onChange={(e) => setBet({ ...bet, turtle: parseInt(e.target.value) })}
        >
          <option value="0">{colors[0]} (0)</option>
          <option value="1">{colors[1]} (1)</option>
          <option value="2">{colors[2]} (2)</option>
          <option value="3">{colors[3]} (3)</option>
          <option value="4">{colors[4]} (4)</option>
          <option value="5">{colors[5]} (5)</option>
          <option value="6">{colors[6]} (6)</option>
        </select>
        <button
          onClick={() => {
            setBeforeRace(false);
            setCurrentBalance(currentBalance - bet.money);
            if (store.state.winnerTurtle === bet.turtle) {
              setCurrentBalance(currentBalance + bet.money * 2);
            }
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>Current balance: {currentBalance}Kn</h1>
      <h1>
        Bet: {bet.money}Kn on {colors[bet.turtle]} ({bet.turtle})
      </h1>
      <div
        style={{
          display: "flex",
          height: 600,
          alignItems: "flex-end",
          borderTop: "15px solid black",
          overflow: "hidden",
        }}
      >
        {turtles.map(({ startingPos }, turtleId) => {
          return (
            <Turtle
              key={turtleId}
              turtleId={turtleId}
              startingSpeed={startingPos}
            />
          );
        })}
      </div>
      <h1>
        Winner:{" "}
        {store.state.showWinner
          ? colors[store.state.winnerTurtle ?? 0] +
            ` ${store.state.winnerTurtle ?? 0}`
          : "..."}
      </h1>
      {store.state.showWinner && (
        <>
          <h1>
            {store.state.winnerTurtle !== bet.turtle
              ? "Win! Current Balanace: " +
                (currentBalance + bet.money * 2) +
                "Kn"
              : "Lose! Current Balanace: " +
                (currentBalance - bet.money) +
                "Kn"}
          </h1>
          <button
            onClick={() => {
              setBeforeRace(true);
              setBet({ money: 0, turtle: 0 });
              if (store.state.winnerTurtle !== bet.turtle) {
                setCurrentBalance(currentBalance + bet.money * 2);
              }
            }}
          >
            play again
          </button>
        </>
      )}
    </>
  );
});
