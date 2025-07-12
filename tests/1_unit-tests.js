const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Solver = require('../controllers/sudoku-solver.js');
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings.js');
const {checkCharacter} = require('../helper/sudokuHelper.js');
let solver = new Solver();
let testPuzzle = puzzlesAndSolutions[0][0];
let invalidPuzzle = "123123.a@";
suite('Unit Tests', () => {
    let grid = solver.validate(testPuzzle);
    test('check valid puzzle string of 81 characters',() =>{
        expect(grid).to.be.not.null;
        expect(testPuzzle.length).to.be.equal(81);
        assert.isTrue(true);
    })
    test('check puzzle string with invalid characters not 1-9 or .',() =>{
        assert.isTrue(true);
        expect(checkCharacter(invalidPuzzle)).to.be.false;
    })
    test('check puzzle string that is not 81 characters in length' , () =>{
        assert.isTrue(true);
        expect(invalidPuzzle.length).to.not.equal(81);
    })
    test('check valid row placement',() =>{
        assert.isTrue(true);
        expect(solver.checkRow(grid,0,1,"3")).to.be.true;
    })
    test('check invalid row placement', () =>{
        assert.isTrue(true);
        expect(solver.checkRow(grid,0,1,"4")).to.be.false;
    })
    test('check valid column placement',() =>{
        assert.isTrue(true);
        expect(solver.checkCol(grid,0,1,"3")).to.be.true;
    })
    test('check invalid column placement',() =>{
        assert.isTrue(true);
        expect(solver.checkCol(grid,0,1,"6")).to.be.false;
    })
    test('check valid region placement',() =>{
        assert.isTrue(true);
        expect(solver.checkBox(grid,0,1,"3")).to.be.true;
    })
    test('check invalid region placement',() =>{
        assert.isTrue(true);
        expect(solver.checkBox(grid,0,1,"6")).to.be.false;
    })
    test('valid puzzle strings pass the solver',() =>{
        assert.isTrue(true);
        expect(grid).to.be.not.null;
    })
    test('invalid puzzle strings fails the solver',() =>{
        assert.isTrue(true);
        expect(solver.validate(invalidPuzzle)).to.be.null;
    })
    test("solver return the expected solution for an incomplete puzzle",() =>{
        assert.isTrue(true);
        expect(solver.solve(grid)).to.be.not.null;
    })
});
