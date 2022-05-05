import { observable, action } from "mobx";

type StateTypes = {
  showWinner: boolean;
  winnerTurtle: undefined | number;
};

const state: StateTypes = observable({
  showWinner: false,
  winnerTurtle: undefined,
});

const setShowWinner = action(() => {
  state.showWinner = true;
  return state.showWinner;
});

const setWinnerTurtle = action((id: any) => {
  state.winnerTurtle = id;
  return state.winnerTurtle;
});

export const store = { state, setShowWinner, setWinnerTurtle };
