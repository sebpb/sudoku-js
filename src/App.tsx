import { useState } from 'react'
import { solveSudoku, generateSudoku } from './sudoku';
import './App.css'

function App() {
  const [table, setTable] = useState(generateSudoku());
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (selectedNumber !== null) {
      const newTable = [...table];
      newTable[row][col] = selectedNumber;
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
    setTable(generateSudoku());
  };

  const handleSolve = () => {
    setTable(solveSudoku(table));
  };

  const renderCell = (row: number, col: number) => (
    <div 
      className={`sudoku-number ${table[row][col] !== 0 ? 'filled' : ''}`}
      onClick={() => handleCellClick(row, col)}
    >
      {table[row][col] || ''}
    </div>
  );

  return (
    <>
      <div className="main-card">
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
      <button key={num} onClick={() => handleNumberSelect(num)}>{num}</button>
    ))}
    <button className='icon-button' onClick={handleGenerate}>
      <i className="fas fa-file-alt"></i>
    </button>
  </div>
  <div className='number-select'>
    {[6, 7, 8, 9].map(num => (
      <button key={num} onClick={() => handleNumberSelect(num)}>{num}</button>
    ))}
    <button className='icon-button' onClick={handleErase}>
      <i className="fas fa-eraser"></i>
    </button>
    <button className='icon-button' onClick={handleSolve}>
      <i className="fas fa-pencil-alt"></i>
    </button>
  </div>
</div>
      </div>
    </>
  )
}

export default App