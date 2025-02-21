import { useState } from 'react';
import { generateSudoku, solveSudoku } from './sudoku';
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState(0); //0, 1, 2, 3 represets easty, medium, hard, expert
  const [table, setTable] = useState(generateSudoku().map(row => row.map(num => {return {number: num, fixed: num !== 0 ? true : false, isValid: true}})));
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const isValidMove = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && table[row][i].number === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && table[i][col].number === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i !== row && j !== col && table[i][j].number === num) return false;
      }
    }
    
    return true;
  };

  const checkBoardCompletion = (newTable: typeof table): boolean => {
    // Check if all cells are filled and valid
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newTable[i][j].number === 0 || !newTable[i][j].isValid) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (selectedNumber !== null && !table[row][col].fixed) {
      const newTable = table.map((tRow, iRow) => tRow.map((cell, iCol) => {
        if (iRow === row && iCol === col) {
          const isValid = selectedNumber === 0 ? true : isValidMove(row, col, selectedNumber);
          return {
            number: selectedNumber,
            fixed: false,
            isValid
          };
        }
        return cell;
      }));
      
      const completed = checkBoardCompletion(newTable);
      setIsCompleted(completed);
      setTable(newTable);
    }
  };

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
  };

  const handleErase = () => {
    setSelectedNumber(0);
  };

  const handleGenerate = () => {
    setTable(generateSudoku(difficulty).map(row => 
      row.map(num => ({
        number: num,
        fixed: num !== 0 ? true : false,
        isValid: true
      }))
    ));
    setSelectedNumber(null);
    setIsCompleted(false);
  };

  const handleSolve = () => {
    const solvedNumbers = solveSudoku(table.map(row => row.map(cell => cell.number)));
    const newTable = table.map((row, i) => 
      row.map((cell, j) => ({
        number: solvedNumbers[i][j],
        fixed: cell.fixed,
        isValid: true
      }))
    );
    setTable(newTable);
    setSelectedNumber(null);
    setIsCompleted(true);
  };

  const renderCell = (row: number, col: number) => {
    const cell = table[row][col];
    const cellClassName = `sudoku-number ${cell.fixed ? 'fixed' : 'playable'} ${
      !cell.isValid ? 'invalid' : ''
    } ${isCompleted ? 'completed' : ''}`;

    return (
      <div 
        className={cellClassName}
        onClick={() => handleCellClick(row, col)}
      >
        {cell.number || ''}
      </div>
    );
  };

  return (
    <>
      <div className={`main-card ${isCompleted ? 'completed' : ''}`}>
        <div className="sudoku-table">
          <div className='column'>
            <div className="sudoku-box">
              {renderCell(0, 0)}
              {renderCell(0, 1)}
              {renderCell(0, 2)}
              {renderCell(1, 0)}
              {renderCell(1, 1)}
              {renderCell(1, 2)}
              {renderCell(2, 0)}
              {renderCell(2, 1)}
              {renderCell(2, 2)}
            </div>
            <div className="sudoku-box">
              {renderCell(3, 0)}
              {renderCell(3, 1)}
              {renderCell(3, 2)}
              {renderCell(4, 0)}
              {renderCell(4, 1)}
              {renderCell(4, 2)}
              {renderCell(5, 0)}
              {renderCell(5, 1)}
              {renderCell(5, 2)}
            </div>
            <div className="sudoku-box">
              {renderCell(6, 0)}
              {renderCell(6, 1)}
              {renderCell(6, 2)}
              {renderCell(7, 0)}
              {renderCell(7, 1)}
              {renderCell(7, 2)}
              {renderCell(8, 0)}
              {renderCell(8, 1)}
              {renderCell(8, 2)}
            </div>
          </div>
          <div className='column'>
            <div className="sudoku-box">
              {renderCell(0, 3)}
              {renderCell(0, 4)}
              {renderCell(0, 5)}
              {renderCell(1, 3)}
              {renderCell(1, 4)}
              {renderCell(1, 5)}
              {renderCell(2, 3)}
              {renderCell(2, 4)}
              {renderCell(2, 5)}
            </div>
            <div className="sudoku-box">
              {renderCell(3, 3)}
              {renderCell(3, 4)}
              {renderCell(3, 5)}
              {renderCell(4, 3)}
              {renderCell(4, 4)}
              {renderCell(4, 5)}
              {renderCell(5, 3)}
              {renderCell(5, 4)}
              {renderCell(5, 5)}
            </div>
            <div className="sudoku-box">
              {renderCell(6, 3)}
              {renderCell(6, 4)}
              {renderCell(6, 5)}
              {renderCell(7, 3)}
              {renderCell(7, 4)}
              {renderCell(7, 5)}
              {renderCell(8, 3)}
              {renderCell(8, 4)}
              {renderCell(8, 5)}
            </div>
          </div>
          <div className='column'>
            <div className="sudoku-box">
              {renderCell(0, 6)}
              {renderCell(0, 7)}
              {renderCell(0, 8)}
              {renderCell(1, 6)}
              {renderCell(1, 7)}
              {renderCell(1, 8)}
              {renderCell(2, 6)}
              {renderCell(2, 7)}
              {renderCell(2, 8)}
            </div>
            <div className="sudoku-box">
              {renderCell(3, 6)}
              {renderCell(3, 7)}
              {renderCell(3, 8)}
              {renderCell(4, 6)}
              {renderCell(4, 7)}
              {renderCell(4, 8)}
              {renderCell(5, 6)}
              {renderCell(5, 7)}
              {renderCell(5, 8)}
            </div>
            <div className="sudoku-box">
              {renderCell(6, 6)}
              {renderCell(6, 7)}
              {renderCell(6, 8)}
              {renderCell(7, 6)}
              {renderCell(7, 7)}
              {renderCell(7, 8)}
              {renderCell(8, 6)}
              {renderCell(8, 7)}
              {renderCell(8, 8)}
            </div>
          </div>
        </div>
        <div className='user-interface'>
          <div className='number-select'>
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                className={selectedNumber === num ? 'selected' : ''} 
                key={num} 
                onClick={() => handleNumberSelect(num)}
              >
                {num}
              </button>
            ))}
            <button className='icon-button' onClick={handleGenerate}>
              <i className="fas fa-file-alt"></i>
            </button>
            {[6, 7, 8, 9].map(num => (
              <button 
                className={selectedNumber === num ? 'selected' : ''} 
                key={num} 
                onClick={() => handleNumberSelect(num)}
              >
                {num}
              </button>
            ))}
            <button 
              className={'icon-button' + (selectedNumber === 0 ? ' selected' : '')} 
              onClick={handleErase}
            >
              <i className="fas fa-eraser"></i>
            </button>
            <button className='icon-button' onClick={handleSolve}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;