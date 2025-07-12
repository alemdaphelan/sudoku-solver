class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length != 81) return null;
    let grid = Array.from({length: 9},()=>Array(9));
    for(let i = 0 ; i < 81 ; i++){
      grid[Math.floor(i/9)][i%9] = puzzleString[i];
    }
    return this.check(grid) ? grid : null;
  }
  check(grid) {
    const findBoxCell = (boxIdx,cellIdx) =>{
      let row = Math.floor(boxIdx / 3) * 3 + Math.floor(cellIdx / 3);
      let col = boxIdx % 3 * 3 + cellIdx % 3;
      return [row,col];
    }
    for(let i = 0 ; i < 9 ; i ++){
      let colSet = new Set();
      let rowSet = new Set();
      let boxSet = new Set();
      for(let j = 0 ; j < 9 ; j++){
        if(grid[i][j] !== '.' && rowSet.has(grid[i][j])) return false;
        rowSet.add(grid[i][j]);
        if(grid[j][i] !== '.' && colSet.has(grid[j][i])) return false;
        colSet.add(grid[j][i]);
        const [row,col] = findBoxCell(i,j);
        if(grid[row][col] !== '.' && boxSet.has(grid[row][col])) return false;
        boxSet.add(grid[row][col]);
      }
    }
    return true;
  }
  checkRow(grid,row,col,val){
    for(let i = 0 ; i < 9 ; i ++){
      if(grid[row][i] === val && i !== col) return false;
    }
    return true;
  }
  checkCol(grid,row,col,val){
    for(let i = 0 ; i < 9 ; i++){
      if(grid[i][col] === val && i !== row) return false;
    }
    return true;
  }
  checkBox(grid,row,col,val){
    for(let i = 0 ; i < 9 ; i ++){
      let newRow = Math.floor(row / 3) * 3 + Math.floor(i/3);
      let newCol = Math.floor(col / 3) * 3 + i % 3;
      if(grid[newRow][newCol] === val && !(newRow === row && newCol === col)) return false;
    }
    return true;
  }
  isValid(grid,row,col,val){
    for(let i = 0 ; i < 9 ; i++){
        if(grid[row][i] === val) return false;
        if(grid[i][col] === val) return false;
        const boxRow = Math.floor(row/3) * 3 + Math.floor(i/3);
        const boxCol = Math.floor(col /3) * 3 + i % 3;
        if(grid[boxRow][boxCol] === val) return false;
      }
    return true;
  }
  solve(grid) {
    const backtrack = () =>{
      for(let i = 0 ; i < 9 ; i++){
        for(let j = 0 ; j < 9 ; j++){
          if(grid[i][j] === '.'){
            for(let k = 1 ; k <= 9 ; k++){
              const val = k.toString();
              if(this.isValid(grid,i,j,val)){
                grid[i][j] = val;
                if(backtrack()) return true;
                grid[i][j] = '.';
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    return backtrack() ? grid : null;
  }
}

module.exports = SudokuSolver;

