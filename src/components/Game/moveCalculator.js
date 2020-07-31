import * as checkHelper from "./underCheckHelpers.js";

export function calculatePawnMoves(coords, color, board, pawnTwoForward) {
  var squares = [];
  var r = coords[0];
  var c = coords[1];
  if (color === "black") {
    // move forward one square
    if (board[r + 1][c] === 0) squares.push([r + 1, c]);
    // move forward two squares
    if (r === 1 && board[r + 2][c] === 0 && board[r + 1][c] === 0) squares.push([r + 2, c]);
    // diagonal capture right
    if (board[r + 1][c - 1] !== 0 && board[r + 1][c - 1] <= 6)
      squares.push([r + 1, c - 1]);
    // diagonal capture left
    if (board[r + 1][c + 1] !== 0 && board[r + 1][c + 1] <= 6)
      squares.push([r + 1, c + 1]);
    // en passant right
    if (r === 4 && pawnTwoForward === (c - 1))
      squares.push([r + 1, c - 1]);
    // en passant left
    if (r === 4 && pawnTwoForward === (c + 1))
      squares.push([r + 1, c + 1]);
  }

  if (color === "white") {
    // move forward one square
    if (board[r - 1][c] === 0) squares.push([r - 1, c]);
    // move forward two squares
    if (r === 6 && board[r - 2][c] === 0 && board[r - 1][c] === 0) squares.push([r - 2, c]);
    // diagonal capture left
    if (board[r - 1][c - 1] >= 7) squares.push([r - 1, c - 1]);
    // diagonal capture right
    if (board[r - 1][c + 1] >= 7) squares.push([r - 1, c + 1]);
    // en passant left
    if (r === 3 && pawnTwoForward === (c - 1))
      squares.push([r - 1, c - 1]);
    // en passant right
    if (r === 3 && pawnTwoForward === (c + 1))
      squares.push([r - 1, c + 1]);
  }

  return squares;
}

export function calculateKnightMoves(coords, color, board) {
  // calculate all eight possible knight destinations, not checking for move legality
  var movePool = [
    [coords[0] - 2, coords[1] + 1],
    [coords[0] - 2, coords[1] - 1],
    [coords[0] + 2, coords[1] + 1],
    [coords[0] + 2, coords[1] - 1],
    [coords[0] + 1, coords[1] + 2],
    [coords[0] - 1, coords[1] + 2],
    [coords[0] + 1, coords[1] - 2],
    [coords[0] - 1, coords[1] - 2],
  ];

  let i;
  var squares = []; // track legal squares here
  // check legality and update legal squares
  for (i = 0; i < movePool.length; i++) {
    if (
      movePool[i][0] >= 0 &&
      movePool[i][0] <= 7 &&
      movePool[i][1] >= 0 &&
      movePool[i][1] <= 7
    ) {
      // check within bounds
      var r = movePool[i][0];
      var c = movePool[i][1];
      // if white move, check landing spot is not white piece or black king
      if (
        color === "white" &&
        (board[r][c] === 0 || board[r][c] >= 7) &&
        board[r][c] !== 12
      ) {
        squares.push([r, c]);
      }
      // if black move, check landing spot is not black piece or white king
      else if (color === "black" && board[r][c] <= 6 && board[r][c] !== 12) {
        squares.push([r, c]);
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
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    if (board[r][c] === 0) {
      // all empty spaces are added
      squares.push([r, c]);
    }
    // OBSTRUCTION FOUND:
    // if white, stop at first black piece or square before first white piece
    else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    // if black, stop at first white piece or square before first black piece
    else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
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
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    if (board[r][c] === 0) {
      // all empty spaces are added
      squares.push([r, c]);
    }
    // OBSTRUCTION FOUND:
    // if white, stop at first black piece or square before first white piece
    else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    // if black, stop at first white piece or square before first black piece
    else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
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
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    if (board[r][c] === 0) {
      // all empty spaces are added
      squares.push([r, c]);
    }
    // OBSTRUCTION FOUND:
    // if white, stop at first black piece or square before first white piece
    else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    // if black, stop at first white piece or square before first black piece
    else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
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
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    if (board[r][c] === 0) {
      // all empty spaces are added
      squares.push([r, c]);
    }
    // OBSTRUCTION FOUND:
    // if white, stop at first black piece or square before first white piece
    else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    // if black, stop at first white piece or square before first black piece
    else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
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
  while (r >= 0 && !obstructed) {
    // add empty squares to legal moveset
    if (board[r][c] === 0) {
      squares.push([r, c]);
    } else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    } else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    --r;
  }

  // going down (towards row 7)
  r = coords[0] + 1;
  c = coords[1];
  obstructed = false;

  while (r <= 7 && !obstructed) {
    // add empty squares to legal moveset
    if (board[r][c] === 0) {
      squares.push([r, c]);
    } else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    } else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    ++r;
  }

  // going left (towards col 0)
  r = coords[0];
  c = coords[1] - 1;
  obstructed = false;

  while (c >= 0 && !obstructed) {
    // add empty squares to legal moveset
    if (board[r][c] === 0) {
      squares.push([r, c]);
    } else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    } else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    --c;
  }

  // going right (towards col 7)
  r = coords[0];
  c = coords[1] + 1;
  obstructed = false;

  while (c <= 7 && !obstructed) {
    // add empty squares to legal moveset
    if (board[r][c] === 0) {
      squares.push([r, c]);
    } else if (color === "white") {
      if (board[r][c] <= 6) {
        // white piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or white, must be black piece
        obstructed = true;
        squares.push([r, c]);
      }
    } else if (color === "black") {
      if (board[r][c] >= 7) {
        // black piece, do not add to legal squares
        obstructed = true;
      } else {
        // not blank or black, must be white piece
        obstructed = true;
        squares.push([r, c]);
      }
    }
    ++c;
  }

  return squares;
}

export function calculateQueenMoves(coords, color, board) {
  var squares = calculateBishopMoves(coords, color, board);
  var extraSquares = calculateRookMoves(coords, color, board);
  let i;
  for (i = 0; i < extraSquares.length; i++) {
    squares.push(extraSquares[i]);
  }

  return squares;
}

export function isUnderCheck(coords, color, board) {
  if(checkHelper.findAttackingKnights(coords, color, board) != null ||
    checkHelper.findAttackingDiagonals(coords, color, board) != null ||
    checkHelper.findAttackingCrosses(coords, color, board) != null ||
    checkHelper.findAttackingPawns(coords, color, board) != null) 
    return true;

  return false;
}

export function calculateKingMoves(coords, color, board, ks, qs) {
  // all moves starting from straight left and going clockwise until bottom left (ref 0,0 as top left corner)
  var movePool = [
    [coords[0], coords[1] - 1],
    [coords[0] - 1, coords[1] - 1],
    [coords[0] - 1, coords[1]],
    [coords[0] - 1, coords[1] + 1],
    [coords[0], coords[1] + 1],
    [coords[0] + 1, coords[1] + 1],
    [coords[0] + 1, coords[1]],
    [coords[0] + 1, coords[1] - 1],
  ];

  // find legal moves in movePool
  var squares = [];
  let i;
  for (i = 0; i < movePool.length; i++) {
    if (
      movePool[i][0] >= 0 &&
      movePool[i][0] <= 7 &&
      movePool[i][1] >= 0 &&
      movePool[i][1] <= 7
    ) {
      // bounds check
      var r = movePool[i][0];
      var c = movePool[i][1];
      // if white move, check landing spot is not white piece or under check
      if (color === "white" && (board[r][c] === 0 || board[r][c] >= 7)) {
        // simulate move on board then see if king is under check
        board[coords[0]][coords[1]] = 0;
        var temp = board[r][c]; // save the piece that the king is about to take  (0 if no piece there)
        board[r][c] = 6;
        if (!isUnderCheck([r, c], "white", board))
          squares.push([r, c]);
        // reset the board back to before the move
        board[coords[0]][coords[1]] = 6;
        board[r][c] = temp;
      }
      // if black move, check landing spot is not black piece or white king
      else if (color === "black" && board[r][c] <= 6) {
        // simulate move on board then see if king is under check
        board[coords[0]][coords[1]] = 0;
        var temp = board[r][c]; // save the piece that the king is about to take  (0 if no piece there)
        board[r][c] = 12;
        if (!isUnderCheck([r, c], "black", board))
          squares.push([r, c]);
        // reset the board back to before the move
        board[coords[0]][coords[1]] = 12;
        board[r][c] = temp;
      }
    }
  }
  console.log("CHECKING FOR CASTLE ---------------------------------------" + ks + " " + canCastleKingside(color, board))
  if(ks && canCastleKingside(color, board)){
    console.log("CAN CASTLE KINGSIDE")
    if(color === "white")
      squares.push([7, 6]);
    else
      squares.push([0,6]);
  }
  if(qs && canCastleQueenside(color, board)){
    if(color === "white")
      squares.push([7, 2]);
    else
      squares.push([0,2]);
  }
    

  return squares;
}

export function canCastleKingside(color, board){
  if(color === "white"){
    // (7,5) (7,6) clear and not under check
    return (board[7][5] === 0 && board[7][6] === 0) && (!isUnderCheck([7,5], "white", board)) && (!isUnderCheck([7,6], "white", board));
  }
  else {
    // (0,5) (0,6) clear and not under check
    console.log("length of attacking squares for 0,5 0,6 are " + !isUnderCheck([0,5], "black", board) + " " + !isUnderCheck([0,6], "black", board).length)
    return (board[0][5] === 0 && board[0][6] === 0) && (!isUnderCheck([0,5], "black", board)) && (!isUnderCheck([0,6], "black", board));
  }
}

export function canCastleQueenside(color, board){
  if(color === "white"){
    // (7,1) (7,2) (7,3) clear and not under check
    return (board[7][1] === 0 && board[7][2] === 0 && board[7][3] === 0) && (!isUnderCheck([7,1], "white", board)) && (!isUnderCheck([7,2], "white", board)) && (!isUnderCheck([7,3], "white", board));
  }
  else {
    // (0,1) (0,2) (0,3) clear and not under check
    return (board[0][1] === 0 && board[0][2] === 0 && board[0][3] === 0) && (!isUnderCheck([0,1], "black", board)) && (!isUnderCheck([0,2], "black", board)) && (!isUnderCheck([0,3], "black", board));
  }
}