const chai = require('chai');
const chaiHttp = require('chai-http');
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings.js');
const Solve = require('../controllers/sudoku-solver.js');
const {checkCharacter, checkCoordinate, checkValue} = require('../helper/sudokuHelper.js');
chai.use(chaiHttp);
const expect = chai.expect;
const [puzzle,solution] = puzzlesAndSolutions[0];
let solve = new Solve();
const checkPuzzle = (res,filter) =>{
    if(!filter.puzzle){ 
        expect(res.body).to.have.property('error','Required field missing');
        return true;
    }
    if(filter.puzzle.length !== 81){ 
        expect(res.body).to.have.property('error','Expected puzzle to be 81 characters long');
        return true;
    }
    if(!checkCharacter(filter.puzzle)){ 
        expect(res.body).to.have.property('error','Invalid characters in puzzle');
        return true;
    }
    if(!solve.validate(filter.puzzle)){ 
        expect(res.body).to.have.property('error','Puzzle cannot be solved');
        return true;
    }
    return false;
}
const checkResponseForSolve = (res,filter) =>{
    expect(res).to.have.status(200);
    if(checkPuzzle(res,filter)) return;
    return expect(res.body).to.have.property('solution',solution);
}
const checkResponseForCheck = (res,filter) =>{
    expect(res).to.have.status(200);
    if(!filter.coordinate || !filter.value || !filter.puzzle) return expect(res.body).to.have.property('error','Required field(s) missing');
    if(checkPuzzle(res,filter)) return;
    if(!checkCoordinate(filter.coordinate)) return expect(res.body).to.have.property('error','Invalid coordinate');
    if(!checkValue(filter.value)) return expect(res.body).to.have.property('error','Invalid value');
    const [row,col] = checkCoordinate(filter.coordinate);
    const value = checkValue(filter.value);
    const grid = solve.validate(filter.puzzle);
    const conflict = [];
    if(!solve.checkRow(grid,row,col,value)) conflict.push("row");
    if(!solve.checkCol(grid,row,col,value)) conflict.push("column");
    if(!solve.checkBox(grid,row,col,value)) conflict.push("region");
    if(conflict.length === 0){
        return expect(res.body).to.have.property('valid',true);
    }
    expect(res.body).to.have.property('valid',false);
    expect(res.body).to.have.property('conflict');
    expect(res.body.conflict).to.be.an('array');
    expect(res.body.conflict).to.have.members(conflict);
    expect(res.body.conflict.length).to.equal(conflict.length);
}
module.exports = {checkResponseForSolve,checkResponseForCheck};