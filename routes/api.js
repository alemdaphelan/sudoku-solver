'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const {checkCoordinate, checkValue,checkCharacter, generateString} = require('../helper/sudokuHelper.js');
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;

      if(!coordinate || !value || !puzzle) return res.json({error:"Required field(s) missing"});
      
      if(puzzle.length !== 81) return res.json({error: "Expected puzzle to be 81 characters long" });
      if(!checkCharacter(puzzle)) return res.json({error:"Invalid characters in puzzle"});
      
      const grid = solver.validate(puzzle);
      if(!grid) return res.json({error: "Puzzle cannot be solved" });
      
      if(!checkCoordinate(coordinate)) return res.json({error:"Invalid coordinate"});
      if(!checkValue(value)) return res.json({error:"Invalid value"});
      
      const [row,col] = checkCoordinate(coordinate);
      const val = checkValue(value);
      
      let conflict = [];
      if(!solver.checkRow(grid,row,col,val)){
        conflict.push("row");
      }
      if(!solver.checkCol(grid,row,col,val)){
        conflict.push("column");
      }
      if(!solver.checkBox(grid,row,col,val)){
        conflict.push("region");
      }
      return conflict.length === 0 ? res.json({valid:true}) : res.json({valid:false,conflict:conflict});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if(!puzzle) return res.json({error:"Required field missing"});
      if(puzzle.length !== 81) return res.json({error: "Expected puzzle to be 81 characters long" });
      
      if(!checkCharacter(puzzle)) return res.json({error:"Invalid characters in puzzle"});
      
      const grid = solver.validate(puzzle);
      if(!grid) return res.json({error: "Puzzle cannot be solved" });
      let s = generateString(solver.solve(grid));
      console.log(s);
      return res.json({solution:s});
    });
};
