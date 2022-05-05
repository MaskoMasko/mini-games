import { maxRow, maxCol } from "./../../Minesweeper/constants";
export function generatePlayground(currentHead: any) {
  //-1 je samo da lipse izgleda i tjt
  let { headRow, headCol } = currentHead;
  let playground: any[][] = [];
  for (let row = 0; row < maxRow; row++) {
    playground.push([]);
    for (let col = 0; col < maxCol; col++) {
      //type => cell | food | snake
      if (headRow === row && headCol === col) {
        playground[row].push({ type: "snake" });
      } else {
        playground[row].push({
          type: "cell",
        });
      }
    }
  }
  return playground;
}
