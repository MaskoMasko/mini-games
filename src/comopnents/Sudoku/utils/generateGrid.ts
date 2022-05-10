import { maxCols, maxRows } from "../constants";

export interface GridInterface {
  value: number | undefined;
}

//9 polja, nap cu ovako ni dobro ali za ovo ce bit ok
const fields = [
  {
    minR: 0,
    maxR: 2,
    minC: 0,
    maxC: 2,
  },
  {
    minR: 0,
    maxR: 2,
    minC: 3,
    maxC: 5,
  },
  {
    minR: 0,
    maxR: 2,
    minC: 6,
    maxC: 8,
  },
  {
    minR: 3,
    maxR: 5,
    minC: 0,
    maxC: 2,
  },
  { minR: 3, maxR: 5, minC: 3, maxC: 5 },
  { minR: 3, maxR: 5, minC: 6, maxC: 8 },
  { minR: 6, maxR: 8, minC: 0, maxC: 2 },
  { minR: 6, maxR: 8, minC: 3, maxC: 5 },
  { minR: 6, maxR: 8, minC: 6, maxC: 8 },
];

export function generateGrid() {
  let grid: GridInterface[][] = [];
  // let fields = [
  //   [
  //     { minRow: 0, minCol: 0 },
  //     { maxRow: 2, maxCol: 2 },
  //   ],
  // ];
  for (let i = 0; i < maxRows; i++) {
    grid.push([]);
    for (let j = 0; j < maxCols; j++) {
      grid[i].push({
        value: undefined,
      });
    }
  }
  let fieldCount = 0;

  //daje sve coords of svakeg fielda
  let fieldsPos = [] as any[];
  for (let field of fields) {
    fieldsPos.push([]);
    for (let i = field.minR; i <= field.maxR; i++) {
      for (let j = field.minC; j <= field.maxC; j++) {
        fieldsPos[fieldCount].push(JSON.stringify([i, j]));
      }
    }
    fieldCount++;
  }

  //testing pos = 3 je na [3,3]
  // let newPosArr:string[] = [];
  // let newRCFreeArr = [] as any[];
  // for (let field of fieldsPos) {
  //   if (field.includes(JSON.stringify([3, 3]))) {
  //     newPosArr = fieldsPos.filter(
  //       (_, fieldId) => fieldsPos.indexOf(field) !== fieldId
  //     );
  //   }
  //zasto torniva fieldsPos :///
  // newRCFreeArr = fieldsPos.filter((field) =>
  //   field.filter((pos: string) => (pos.startsWith("[3") ? null : pos))
  // );
  // }
  // newRCFreeArr = fieldsPos.map((field) =>
  //   field.map((pos: string) => (pos.startsWith("[3") ? null : pos))
  // );
  // fieldsPos.filter((field) =>
  //   field.filter((pos: string) => {
  //     if (pos.startsWith("[3") || pos.endsWith("3]")) return null;
  //     newRCFreeArr.push(pos);
  //     return pos;
  //   })
  // );
  //   } else console.log("no");
  // console.log(newRCFreeArr);

  let numsArr = Array.from(Array(9)).map((_, i) => i + 1);

  let res: GridInterface[][];
  for (let num of numsArr) {
    res = insertNumbers(fieldsPos, grid, fieldsPos, num);
    //res === no bueno grid
    // console.log(res);
  }

  return grid;
}

//freeRCpos je arr koji daje dostupne [row, col] za broj -> promjeni se kad se doda broj
//grid je gird
//fields je arr koji ima info dali je broj u svaken od 9 polja (3x3)
//num je broj
//kadi je ovo ne dela: grid[randomRow][randomCol].value === undefined -> ako je grid[cell].value = undefined -> stavi broj else skip daj drugi broj
//recursion zavrsava kad je num postavljen u svih 9 (3x3) polja
function insertNumbers(
  freeRCPos: (null | string)[][],
  grid: GridInterface[][],
  fields: string[],
  num: number
): GridInterface[][] {
  let randomRow = Math.floor(Math.random() * maxRows);
  let randomCol = Math.floor(Math.random() * maxRows);
  //ca returnat ako ne recursvie ????
  // if(grid[randomRow][randomCol].value !== undefined) return grid
  if (fields.length === 0) return grid;

  //triba biti niki base case? :///////////
  // if (grid[randomRow][randomCol].value !== undefined)
  //   return insertNumbers(freeRCPos, grid, fields, num);

  let newPosArr: string[] = [];
  for (let field of fields) {
    if (
      field.includes(JSON.stringify([randomRow, randomCol]))
      //  &&
      // grid[randomRow][randomCol].value === undefined
    ) {
      let res = freeRCPos.map((element: any) =>
        element.map((pos: any) =>
          pos === JSON.stringify([randomRow, randomCol]) ? true : false
        )
      );
      if (
        res.filter((el: any) => (el.includes(true) ? true : false)).length > 0
      ) {
        grid[randomRow][randomCol].value = num;
        newPosArr = fields.filter(
          (_: any, fieldId: number) => fields.indexOf(field) !== fieldId
        );
        return insertNumbers(
          freeRCPos.map((field: any) =>
            field.map((pos: string) =>
              pos?.startsWith("[" + randomRow) || pos?.endsWith(randomCol + "]")
                ? null
                : pos
            )
          ),
          grid,
          newPosArr,
          num
        );
      } else {
        return insertNumbers(freeRCPos, grid, fields, num);
      }
    } else {
      return insertNumbers(freeRCPos, grid, fields, num);
    }
  }
  return grid;
}
