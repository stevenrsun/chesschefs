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

    let i;
    var squares = []; // track legal squares here
    // check legality and update legal squares 
    for (i = 0; i < movePool.length; i++){
      if((movePool[i][0] >= 0 && movePool[i][0] <= 7 && movePool[i][1] >= 0 && movePool[i][1] <= 7)){ // check within bounds
        var r = movePool[i][0];
        var c = movePool[i][1]; 
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

    // lower left diagonal (with 0,0 top left reference)
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

    // lower right diagonal (with 0,0 top left reference)
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

    // upper left diagonal (with 0,0 top left reference)
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

    // upper right diagonal (with 0,0 top left reference)
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

    while(c <= 7 && !obstructed) {
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

export function calculateQueenMoves(coords, color, board){
    var squares = calculateBishopMoves(coords, color, board);
    var extraSquares = calculateRookMoves(coords, color, board);
    let i;
    for(i = 0; i < extraSquares.length; i++){
        squares.push(extraSquares[i]);
    }

    return squares;
}

export function isUnderCheck(coords, color, board){
    // check possible knight moves
    var movePool = [[coords[0] - 2, coords[1] + 1], 
    [coords[0] - 2, coords[1] - 1], 
    [coords[0] + 2, coords[1] + 1], 
    [coords[0] + 2, coords[1] - 1], 
    [coords[0] + 1, coords[1] + 2], 
    [coords[0] - 1, coords[1] + 2], 
    [coords[0] + 1, coords[1] - 2], 
    [coords[0] - 1, coords[1] - 2]];

    // search for any knights attacking the king
    let i;
    for (i = 0; i < movePool.length; i++){
      if((movePool[i][0] >= 0 && movePool[i][0] <= 7 && movePool[i][1] >= 0 && movePool[i][1] <= 7)){ // check within bounds
        var r = movePool[i][0];
        var c = movePool[i][1]; 
        // opposite color knight is attacking king
        if((color === "white" && board[r][c] === 8) || 
            (color === "black" && board[r][c] === 2)) { 
            return true;
        }
      }
          
    }

    console.log("not under attack by knight")

    // check diagonals for king moves, then continue down diagonal searching for attacking bishop OR queen

    // lower left diagonal (with 0,0 top left reference)
    var r = coords[0] + 1;
    var c = coords[1] - 1;
    var obstructed = false;
    // if one spot up diagonal is in bounds and contains enemy king, square is under check
    if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && 
    ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] === 6))
    ){
        return true;
    }
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        // found attacking bishop or queen
        if((color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 3 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move up the diagonal
        ++r;
        --c;
    }

    console.log("not under attack by lower left diagonal")

    // lower right diagonal (with 0,0 top left reference)
    r = coords[0] + 1;
    c = coords[1] + 1;
    obstructed = false;
    // if one spot up diagonal is in bounds and contains enemy king, square is under check
    if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && 
    ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] === 6))
    ){
        return true;
    }
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        // found attacking bishop or queen
        if((color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 3 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move up the diagonal
        ++r;
        ++c;
    }

    console.log("not lower right")

    // upper left diagonal (with 0,0 top left reference)
    r = coords[0] - 1;
    c = coords[1] - 1;
    obstructed = false;
    // if one spot up diagonal is in bounds and contains enemy king, square is under check
    if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && 
    ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] === 6))
    ){
        return true;
    }
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        // found attacking bishop or queen
        if((color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 3 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move up the diagonal
        --r;
        --c;
    }

    console.log("not upper left")

    // upper right diagonal (with 0,0 top left reference)
    r = coords[0] - 1;
    c = coords[1] + 1;
    obstructed = false;
    // if one spot up diagonal is in bounds and contains enemy king, square is under check
    if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && 
    ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] === 6))
    ){
        return true;
    }
    while(!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7){
        // found attacking bishop or queen
        if((color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 3 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move up the diagonal
        --r;
        ++c;
    }
    
    console.log("not upper right")

    // check rows and cols for enemy king, then rooks and queens
    
    // left row
    r = coords[0];
    c = coords[1] - 1;
    obstructed = false;
    // check one square away for enemy king
    if(c >= 0 &&
        ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] == 6))
        ){
        return true;
    }
    while(!obstructed && c >= 0){
        // found attacking rook or queen
        if((color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 4 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move left
        --c;
    }

    console.log("not left row")

    // right row
    r = coords[0];
    c = coords[1] + 1;
    obstructed = false;
    // check one square away for enemy king
    if(c <= 7 &&
        ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] == 6))
        ){
        return true;
    }
    while(!obstructed && c <= 7){
        // found attacking rook or queen
        if((color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 4 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move left
        ++c;
    }

    console.log("not right row")

    // top col
    r = coords[0] - 1;
    c = coords[1];
    obstructed = false;
    // check one square away for enemy king
    if(r >= 0 &&
        ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] == 6))
        ){
        return true;
    }
    while(!obstructed && r >= 0){
        // found attacking rook or queen
        if((color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 4 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move left
        --r;
    }

    console.log("not top col")

    // bottom col
    r = coords[0] + 1;
    c = coords[1];
    obstructed = false;
    // check one square away for enemy king
    if(r <= 7 &&
        ((color === "white" && board[r][c] === 12) || (color === "black" && board[r][c] == 6))
        ){
        return true;
    }
    while(!obstructed && r <= 7){
        // found attacking rook or queen
        if((color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
        (color === "black" && (board[r][c] === 4 || board[r][c] === 5)) 
        ){
            return true;
        }
        // found friendly piece
        if(board[r][c] !== 0){
            if((color === "white" && board[r][c] <= 6) ||
            (color === "black" && board[r][c] >= 7) 
            ){
                obstructed = true;
            }
        }
        // move left
        ++r;
    }

    console.log("not bottom col")

    // check for pawn attack NOTE: white and black have different criteria for being under attack by pawn
    // ROW 0 IS BLACK'S STARTING SIDE
    if(color === "white"){
        // check upper left/right squares on diagonal (row 0 = top)

        // upper left
        r = coords[0] - 1;
        c = coords[1] - 1;
        if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && board[r][c] === 7){ // in bounds and pawn is attacking king
            return true;
        }

        // upper right
        r = coords[0] - 1;
        c = coords[1] + 1;
        if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && board[r][c] === 7){ // in bounds and pawn is attacking king
            return true;
        }
    }
    else if(color === "black"){
        // check upper left/right squares on diagonal (row 7 = top)

        // upper left
        r = coords[0] + 1;
        c = coords[1] + 1;
        if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && board[r][c] === 1){ // in bounds and pawn is attacking king
            return true;
        }

        // upper right
        r = coords[0] + 1;
        c = coords[1] - 1;
        if((r >= 0 && r <= 7 && c >= 0 && c <= 7) && board[r][c] === 1){ // in bounds and pawn is attacking king
            return true;
        }
    }

    console.log("not pawn, the next line is return false")

    return false; // square is not under check
}

export function calculateKingMoves(coords, color, board) {
    // all moves starting from straight left and going clockwise until bottom left (ref 0,0 as top left corner)
    var movePool = [
        [coords[0], coords[1] - 1],
        [coords[0] - 1, coords[1] - 1],
        [coords[0] - 1, coords[1]],
        [coords[0] - 1, coords[1] + 1],
        [coords[0], coords[1] + 1],
        [coords[0] + 1, coords[1] + 1],
        [coords[0] + 1, coords[1]],
        [coords[0] + 1, coords[1] - 1]
    ];

    // find legal moves in movePool
    var squares = [];
    let i;
    for(i = 0; i < movePool.length; i++){
        if((movePool[i][0] >= 0 && movePool[i][0] <= 7 && movePool[i][1] >= 0 && movePool[i][1] <= 7)){ // bounds check
            var r = movePool[i][0];
            var c = movePool[i][1]; 
            // if white move, check landing spot is not white piece or under check
            if(color === "white" && (board[r][c] === 0 || board[r][c] >= 7)){
                // simulate move on board then see if king is under check
                board[coords[0]][coords[1]] = 0;
                var temp = board[r][c]; // save the piece that the king is about to take  (0 if no piece there)
                board[r][c] = 6;
                if(!isUnderCheck([r,c], "white", board))
                    squares.push([r,c]);
                // reset the board back to before the move
                board[coords[0]][coords[1]] = 6;
                board[r][c] = temp;
            }
            // if black move, check landing spot is not black piece or white king
            else if(color === "black" && (board[r][c] <= 6)){
                // simulate move on board then see if king is under check
                board[coords[0]][coords[1]] = 0;
                var temp = board[r][c]; // save the piece that the king is about to take  (0 if no piece there)
                board[r][c] = 6;
                if(!isUnderCheck([r,c], "black", board))
                    squares.push([r,c]);
                // reset the board back to before the move
                board[coords[0]][coords[1]] = 6;
                board[r][c] = temp;
            }
        }
    }

    return squares;
}