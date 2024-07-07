function solveSudoku(table: number[][]) {
  let tableTemp = JSON.parse(JSON.stringify(table));;
  solve(tableTemp);
  return tableTemp;
}

function generateSudoku(): number[][] {
  const baseSudoku = Array(9).fill(null).map(() => Array(9).fill(0));

  for(let b = 0; b < 3; b++) {
    let randArray: number[] = [1,2,3,4,5,6,7,8,9];
    for(let i = 0; i < 9; i++){
      const random = Math.floor(Math.random() * 9);
      const [temp] = randArray.splice(i, 1);
      randArray = [
        ...randArray.slice(0, random),
        temp,
        ...randArray.slice(random)
      ];
    }

    for(let i = 0 + 3*b; i < 3 + 3*b; i++) {
      for(let j = 0 + 3*b; j < 3 + 3*b; j++) {
        baseSudoku[i][j] = randArray.pop();
      }
    }
  }


  const filledSudoku = solveSudoku(baseSudoku);
  
  // Eliminar algunos números para crear el puzzle
  for (let i = 0; i < 40; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    filledSudoku[row][col] = 0;
  }
  
  return filledSudoku;
}

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

export { generateSudoku, solveSudoku };