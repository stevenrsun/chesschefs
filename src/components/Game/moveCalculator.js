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