const sudokuTable: number[][] = [
  [0, 5, 0, 0, 0, 0, 0, 9, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 9, 3, 0, 7],
  [0, 3, 0, 0, 2, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 8, 1, 0, 0],
  [0, 0, 5, 0, 0, 1, 0, 0, 8],
  [8, 2, 0, 0, 5, 0, 0, 7, 0],
  [0, 0, 0, 0, 4, 0, 5, 0, 0],
  [0, 1, 0, 0, 3, 0, 0, 0, 9],
];

function solve(table: number[][]): boolean {
  const emptySpot = findEmpty(table);
  if (!emptySpot) {
    return true;
  }
  const [row, col] = emptySpot;

  for (let num = 1; num <= 9; num++) {
    if (isValid(table, row, col, num)) {
        table[row][col] = num;
      if (solve(table)) {
        return true;
      }
      table[row][col] = 0;
    }
  }
  return false;
}

function findEmpty(table: number[][]) {
  for (let row: number = 0; row < 9; row++) {
    for (let col: number = 0; col < 9; col++) {
      if (table[row][col] === 0) return [row, col];
    }
  }
  return null;
}

function isValid(table: number[][], row: number, col: number, num: number) {
  return (
    !isInRow(table, row, num) &&
    !isInCol(table, col, num) &&
    !isInBox(table, row, col, num)
  );
}

function isInRow(table: number[][], row: number, num: number) {
  for (let col = 0; col < 9; col++) {
    if (table[row][col] === num) {
      return true;
    }
  }
  return false;
}

function isInCol(table: number[][], col: number, num: number) {
  for (let row = 0; row < 9; row++) {
    if (table[row][col] === num) {
      return true;
    }
  }
  return false;
}

function isInBox(table: number[][], row: number, col: number, num: number) {
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (table[r][c] === num) {
        return true;
      }
    }
  }
  return false;
}

if (solve(sudokuTable)) {
  console.log("Sudoku resuelto!");
  console.table(sudokuTable);
} else {
  console.log("No existe solución para el sudoku dado.");
}
