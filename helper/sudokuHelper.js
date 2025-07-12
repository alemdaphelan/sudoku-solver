const checkCoordinate = (coordinate) =>{
    if(coordinate.length !== 2) return null;
    const rowChar = coordinate[0].toUpperCase();
    const colChar = coordinate[1];
    if(!/^[A-I]$/.test(rowChar) || !/^[1-9]$/.test(colChar)) return null;
    const row = rowChar.charCodeAt(0) - 'A'.charCodeAt(0);
    const col = parseInt(colChar,10) - 1;
    return [row,col];
}

const checkValue = (value) =>{
    if(value.length !== 1 || !/^[1-9]$/.test(value)) return null;
    return value;
}
const checkCharacter = (input) =>{
    for(let i = 0 ; i < input.length ; i++){
        if(input[i] !== '.' && !/^[1-9]$/.test(input[i])) return false;
    }
    return true;
}

const generateString = (grid) =>{
    let res = "";
    for(let i = 0 ; i < 9 ; i ++){
        for(let j = 0 ; j < 9 ; j++){
            res+= grid[i][j];
        }
    }
    return res;
}
module.exports = {checkCoordinate, checkValue,checkCharacter,generateString}