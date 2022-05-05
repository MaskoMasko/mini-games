import React from "react";

export const Letter = ({ guessedLetters, letter }: any) => {
  return (
    <div style={{ margin: 5 }}>
      {guessedLetters.includes(letter) ? letter : "_"}
    </div>
  );
};
