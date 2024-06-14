run: sudoku.js
	node sudoku.js

sudoku.js: sudoku.ts
	tsc sudoku.ts

clean:
	rm sudoku.js