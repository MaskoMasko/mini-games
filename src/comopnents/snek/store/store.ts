import { CurrentPositonInterface } from "./../components/SnekBody";
import create from "zustand";

export const useStore = create((set: any) => ({
  collisionCheck: [],
  changeFoodPos: false,
  score: 0,
  addPos: (pos: CurrentPositonInterface, from: string) =>
    set((state: any) => {
      if (from === "food") {
        //pos daje 2 puta --> prvi zapise a drugi je stvarno -- nez zasto salje 2 :///
        if (state.collisionCheck.length >= 2) {
          return {
            collisionCheck: [
              (state.collisionCheck[0] = pos),
              state.collisionCheck[1],
            ],
          };
        } else return { collisionCheck: [...state.collisionCheck, pos] };
        // return { collisionCheck: [...state.collisionCheck, pos] };
      }
      if (from === "snek") {
        if (state.collisionCheck.length >= 2) {
          return { collisionCheck: [...state.collisionCheck.slice(0, 1), pos] };
        } else return { collisionCheck: [...state.collisionCheck, pos] };
      }
    }),
  changeFoodPosition: (bool: boolean) =>
    set((state: any) => ({ changeFoodPos: (state.changeFoodPos = bool) })),
  increaseScore: () => set((state: any) => ({ score: (state.score += 1) })),
}));
