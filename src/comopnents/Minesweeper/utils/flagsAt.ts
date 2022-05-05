export function flagsAt(grid: any, currentField: any) {
  const { rowId, colId } = currentField;
  grid[rowId][colId].type = "flag";
  return grid;
}
