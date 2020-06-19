export function calculateKnightMoves(coords, color, board) {
    // calculate all eight possible knight destinations, not checking for move legality
    var movePool = [[coords[0] - 2, coords[1] + 1], 
    [coords[0] - 2, coords[1] - 1], 
    [coords[0] + 2, coords[1] + 1], 
    [coords[0] + 2, coords[1] - 1], 
    [coords[0] + 1, coords[1] + 2], 
    [coords[0] - 1, coords[1] + 2], 
    [coords[0] + 1, coords[1] - 2], 
    [coords[0] - 1, coords[1] - 2]];

    var i;
    var squares = []; // track legal squares here
    // check legality and update legal squares 
    for (i = 0; i < movePool.length; i++){
      if((movePool[i][0] >= 0 && movePool[i][0] <= 7 && movePool[i][1] >= 0 && movePool[i][1] <= 7)){ // check within bounds
        var r = movePool[i][0];
        var c = movePool[i][1]; 
        console.log(r + " " + c)
        // if white move, check landing spot is not white piece or black king
        if(color === "white" && (board[r][c] === 0 || board[r][c] >= 7) && board[r][c] !== 12 ){
          squares.push([r,c]);
        }
        // if black move, check landing spot is not black piece or white king
        else if(color === "black" && (board[r][c] <= 6) && board[r][c] !== 12 ){
          squares.push([r,c]);
        }
      }
          
    }

    return squares;
}

export function calculateBishopMoves(coords, color, board) {
    // find possible destinations (in bounds, not obstructed, not capturing own piece) 
    var squares = [];

    // upper left diagonal (with 0,0 top left reference)
    var r = coords[0] + 1;
    var c = coords[1] - 1;
    var obstructed = false;
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        if(board[r][c] === 0){ // all empty spaces are added 
            squares.push([r,c]);
        }
        // OBSTRUCTION FOUND:
        // if white, stop at first black piece or square before first white piece
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // if black, stop at first white piece or square before first black piece
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // move up the diagonal
        ++r;
        --c;
    }

    // upper right diagonal (with 0,0 top left reference)
    r = coords[0] + 1;
    c = coords[1] + 1;
    obstructed = false;
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        if(board[r][c] === 0){ // all empty spaces are added 
            squares.push([r,c]);
        }
        // OBSTRUCTION FOUND:
        // if white, stop at first black piece or square before first white piece
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // if black, stop at first white piece or square before first black piece
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // move up the diagonal
        ++r;
        ++c;
    }

    // lower left diagonal (with 0,0 top left reference)
    r = coords[0] - 1;
    c = coords[1] - 1;
    obstructed = false;
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        if(board[r][c] === 0){ // all empty spaces are added 
            squares.push([r,c]);
        }
        // OBSTRUCTION FOUND:
        // if white, stop at first black piece or square before first white piece
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // if black, stop at first white piece or square before first black piece
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // move down the diagonal
        --r;
        --c;
    }

    // lower right diagonal (with 0,0 top left reference)
    r = coords[0] - 1;
    c = coords[1] + 1;
    obstructed = false;
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        if(board[r][c] === 0){ // all empty spaces are added 
            squares.push([r,c]);
        }
        // OBSTRUCTION FOUND:
        // if white, stop at first black piece or square before first white piece
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // if black, stop at first white piece or square before first black piece
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        // move down the diagonal
        --r;
        ++c;
    }

    return squares;
}

export function calculateRookMoves(coords, color, board) {
    var squares = [];

    // going up (towards row 0)
    var r = coords[0] - 1;
    var c = coords[1];
    var obstructed = false;
    while(r >= 0 && !obstructed) {
        // add empty squares to legal moveset
        if(board[r][c] === 0){
            squares.push([r,c]);
        }
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        --r;
    }

    // going down (towards row 7)
    r = coords[0] + 1;
    c = coords[1];
    obstructed = false;

    while(r <= 7 && !obstructed) {
        // add empty squares to legal moveset
        if(board[r][c] === 0){
            squares.push([r,c]);
        }
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        ++r;
    }

    // going left (towards col 0)
    r = coords[0];
    c = coords[1] - 1;
    obstructed = false;

    while(c >=0 && !obstructed) {
        // add empty squares to legal moveset
        if(board[r][c] === 0){
            squares.push([r,c]);
        }
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        --c;
    }

    // going right (towards col 7)
    r = coords[0];
    c = coords[1] + 1;
    obstructed = false;

    while(c >=0 && !obstructed) {
        // add empty squares to legal moveset
        if(board[r][c] === 0){
            squares.push([r,c]);
        }
        else if(color === "white"){
            if(board[r][c] <= 6){ // white piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or white, must be black piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        else if(color === "black"){
            if(board[r][c] >= 7){ // black piece, do not add to legal squares
                obstructed = true;
            }
            else { // not blank or black, must be white piece
                obstructed = true;
                squares.push([r,c])
            }
        }
        ++c;
    }

    return squares;
}