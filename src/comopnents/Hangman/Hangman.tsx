import React, { useRef, useState } from "react";
import { Letter } from "./components/Letter";

export const Hangman = () => {
  const [gameSetup, setGameSetup] = useState(true);
  const [word, setWord] = useState("");
  const [wantedLetters, setWantedLetters] = useState<any[]>([]);
  const [theLetter, setTheLetter] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [endGame, setEndGame] = useState({ end: false, res: "" });
  let lives = useRef(6);

  const isSubset = (guessedArr: any, watnedArr: any) =>
    watnedArr.every((letter: string) => guessedArr.includes(letter));

  const onLetterSumbit = () => {
    if (theLetter.length === 0) return;
    if (!word.includes(theLetter) || guessedLetters.includes(theLetter))
      lives.current -= 1;
    if (lives.current === 0) return setEndGame({ end: true, res: "lost" });
    setGuessedLetters((prevGuessedLetters) => [
      ...prevGuessedLetters,
      theLetter,
    ]);
    setTheLetter("");
    if (isSubset([...guessedLetters, theLetter], wantedLetters))
      return setEndGame({ end: true, res: "won" });
  };

  if (gameSetup) {
    return (
      <div>
        <h3>Enter word u want ot guess </h3>{" "}
        <input
          type="text"
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              setGameSetup(false);
              setWantedLetters(Array.from(new Set(word.split(""))));
            }
          }}
        />
        <button
          onClick={() => {
            setGameSetup(false);
            setWantedLetters(Array.from(new Set(word.split(""))));
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  if (endGame.end) {
    return (
      <div>
        <h1>Gg u {endGame.res === "lost" ? "lost" : "won"}</h1>
        <button onClick={() => window.location.reload()}>play again?</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Hangman</h3>
      <div style={{ display: "flex" }}>
        {word.split("").map((letter, letterId) => (
          <Letter
            guessedLetters={guessedLetters}
            letter={letter}
            key={letterId}
          />
        ))}
      </div>
      <h3>Lives left: {lives.current}</h3>
      <div style={{ marginBlock: 10 }}>
        Used Letters: {JSON.stringify(guessedLetters)}
      </div>
      <input
        type="text"
        value={theLetter ?? ""}
        onChange={(e) => {
          if (theLetter.length === 1) return;
          setTheLetter(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            onLetterSumbit();
          }
        }}
      />
      <button onClick={onLetterSumbit}>Submit</button>
    </div>
  );
};
