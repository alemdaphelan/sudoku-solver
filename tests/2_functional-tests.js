const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
const {checkResponseForSolve,checkResponseForCheck} = require('../helper/testHelper.js');
const assert = chai.assert;
chai.use(chaiHttp);
const expect = chai.expect;
suite('Functional Tests', () => {
  const [puzzle, solution] = puzzlesAndSolutions[0];
  suite('POST /api/solve',()=>{
    test('with valid puzzle',(done) =>{
      const filter = {puzzle: puzzle};
      chai.request(server)
          .post('/api/solve')
          .send(filter)
          .end((err,res)=>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForSolve(res,filter);
            done();
          });
    });
    test('with missing puzzle',(done) =>{
      const filter = {};
      chai.request(server)
          .post('/api/solve')
          .send(filter)
          .end((err,res) => {
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForSolve(res,filter);
            done();
          });
    });
    test('with invalid puzzle',(done) =>{
      const filter = {puzzle: "1234.@$"};
      chai.request(server)
          .post('/api/solve')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForSolve(res,filter);
            done();
          });
    });
    test('with incorrect length of puzzle',(done) =>{
      const filter = {puzzle: "123"};
      chai.request(server)
          .post('/api/solve')
          .send(filter)
          .end((err,res)=>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForSolve(res,filter);
            done();
          });
    });
    test('with puzzle that cannot be solve',(done) =>{
      let newFilter = puzzle.slice(0,1) + '1' + puzzle.slice(2);
      const filter = {puzzle:newFilter};
      chai.request(server)
          .post('/api/solve')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForSolve(res,filter);
            done();
          });
    });
  });
  suite('POST /api/check',()=>{
    test('with all field fill',(done) =>{
      const filter = {puzzle,coordinate:"A2",value:"3"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with a single conflict',(done) =>{
      const filter = {puzzle,coordinate:"A2",value:"4"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) => {
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with multiple conflict',(done) =>{
      const filter = {puzzle,coordinate:"A2",value:"6"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with all conflict',(done) =>{
      const filter = {puzzle,coordinate:"A2",value:"2"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) => {
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with missing required field',(done) =>{
      const filter = {};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with invalid character',(done) =>{
      const newPuzzle = puzzle.slice(0,1) + '1' + puzzle.slice(2);
      const filter = {puzzle:newPuzzle,coordinate:"A2",value:"3"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with incorrect length',(done) =>{
      const filter = {puzzle:"1.345689",coordinate:"A2",value:"3"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with invalid coordinate',(done) =>{
      const filter = {puzzle,coordinate:"Z1",value:"3"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
    test('with invalid value',(done) =>{
      const filter = {puzzle,coordinate:"A2",value:"haha"};
      chai.request(server)
          .post('/api/check')
          .send(filter)
          .end((err,res) =>{
            if(err) done(err);
            assert.isTrue(true);
            checkResponseForCheck(res,filter);
            done();
          });
    });
  });
});


