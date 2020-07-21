import * as checkHelper from "./underCheckHelpers.js";

export function calculatePawnMoves(coords, color, board) {
  var squares = [];
  var r = coords[0];
  var c = coords[1];
  if (color === "black") {
    // move forward one square
    if (board[r + 1][c] === 0) squares.push([r + 1, c]);
    // move forward two squares
    if (r === 1 && board[r + 2][c] === 0) squares.push([r + 2, c]);
    // diagonal capture right
    if (board[r + 1][c - 1] !== 0 && board[r + 1][c - 1] <= 6)
      squares.push([r + 1, c - 1]);
    // diagonal capture left
    if (board[r + 1][c + 1] !== 0 && board[r + 1][c + 1] <= 6)
      squares.push([r + 1, c + 1]);
  }

  if (color === "white") {
    // move forward one square
    if (board[r - 1][c] === 0) squares.push([r - 1, c]);
    // move forward two squares
    if (r === 6 && board[r - 2][c] === 0) squares.push([r - 2, c]);
    // diagonal capture left
    if (board[r - 1][c - 1] >= 7) squares.push([r - 1, c - 1]);
    // diagonal capture right
    if (board[r - 1][c + 1] >= 7) squares.push([r - 1, c + 1]);
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
  var attackingSquares = [];

  var attackingKnights = checkHelper.findAttackingKnights(coords, color, board);
  var attackingDiagonals = checkHelper.findAttackingDiagonals(
    coords,
    color,
    board
  );
  var attackingCrosses = checkHelper.findAttackingCrosses(coords, color, board);
  var attackingPawns = checkHelper.findAttackingPawns(coords, color, board);

  if (attackingKnights != null) {
    attackingSquares.push(attackingKnights);
  }
  if (attackingDiagonals != null) {
    attackingSquares.push(attackingDiagonals);
  }
  if (attackingCrosses != null) {
    attackingSquares.push(attackingCrosses);
  }
  if (attackingPawns != null) {
    attackingSquares.push(attackingPawns);
  }
  console.log(attackingSquares + "ARRAY");
  return attackingSquares;
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
        if (isUnderCheck([r, c], "white", board).length === 0)
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
        board[r][c] = 6;
        if (isUnderCheck([r, c], "black", board).length === 0)
          squares.push([r, c]);
        // reset the board back to before the move
        board[coords[0]][coords[1]] = 6;
        board[r][c] = temp;
      }
    }
  }

  return squares;
}

export function isCheckmated(kingCoords, color, board) {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  var kingCantMove = calculateKingMoves(kingCoords, color, board).length === 0;
  console.log("king cant move: " + kingCantMove)
  console.log(color)
  var attackingPieces = isUnderCheck(kingCoords, color, board);
  console.log("attacking pieces length: " + attackingPieces.length)
  console.log(attackingPieces[0])
  //double check
  if (attackingPieces.length === 2 && kingCantMove) {
    return true;
  }
  //single check
  if (attackingPieces.length !== 0) {
    console.log("single check")
    if (kingCantMove) {
      var i;
      for (i = 0; i < attackingPieces.length; i++) {
        var r = attackingPieces[i][0];
        var c = attackingPieces[i][1];
        var piece = board[r][c];
        var atkPieceCoords = { r, c };
        if (piece % 6 === 2) { //if knight
          return !canTakeKnight(color, board, atkPieceCoords, kingCoords);
        } else if (piece % 6 === 4 || piece % 6 === 3 || piece % 6 === 5 || piece % 6 === 1) {
          console.log(canBlockLineChecks(color, board, atkPieceCoords, kingCoords))
          return !canBlockLineChecks(color, board, atkPieceCoords, kingCoords);
        }
      }
    }
  }
  return false;
}

export function canTakeKnight(color, board, knightCoords, kingCoords) {
  var r, c;
  for (r = 0; r < board.length; r++) { //loop through the whole board to find if knight can be taken
    for (c = 0; c < board.length; c++) { //still uses board.length cus its just 8x8
      var currentCoords = { r, c };
      var currentPiece = board[currentCoords[0]][currentCoords[1]];
      if (currentPiece != 0) {
        var canTake =false;
        if (color == "white" && currentPiece >= 1 && currentPiece <= 6) {
          switch (currentPiece) {
            case 1: {
              if(calculatePawnMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 1;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 1;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 2: {
              if(calculateKnightMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 2;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 2;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 3: {
              if(calculateBishopMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 3;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 3;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 4: {
              if(calculateRookMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 4;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 4;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 5: {
              if(calculateQueenMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 5;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 5;
                board[r_dest][c_dest] = dest_piece;
              }
            }
          }
        } else if (color == "black" && currentPiece >= 7 && currentPiece <= 12) {
          switch (currentPiece) {
            case 7: {
              if(calculatePawnMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 7;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 7;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 8: {
              if(calculateKnightMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 8;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 8;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 9: {
              if(calculateBishopMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 9;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 9;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 10: {
              if(calculateRookMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 10;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 10;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 11: {
              if(calculateQueenMoves(currentCoords, color, board).includes(knightCoords)) {
                // make move and see if king under check (moved piece was pinned)
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = knightCoords[0];
                var c_dest = knightCoords[1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 11;
                canTake = isUnderCheck(kingCoords, color, board).length === 0;
                board[r_source][c_source] = 11;
                board[r_dest][c_dest] = dest_piece;
              }
            }
          }
        }
        if (canTake) {
          return canTake;
        }
      }
    }
  }
  return false; //you cant take the knight
}

export function canBlockLineChecks(color, board, atkPieceCoords, kingCoords) {
  var r, c;
  var takeableSquares = findMateBlocks(kingCoords, atkPieceCoords)

  for (r = 0; r < board.length; r++) {
    for (c = 0; c < board.length; c++) {
      var currentCoords = { r, c }
      var currentPiece = board[currentCoords[0], currentCoords[1]];
      if (currentPiece != 0) {
        var canBlock = false;
        var blockSquare;
        if (color == "white" && currentPiece >= 1 && currentPiece <= 5) {
          switch (currentPiece) {
            case 1: {
              blockSquare = canBlockHelper(calculatePawnMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 1;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 1;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 2: {
              blockSquare = canBlockHelper(calculateKnightMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 2;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 2;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 3: {
              blockSquare = canBlockHelper(calculateBishopMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 3;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 3;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 4: {
              blockSquare = canBlockHelper(calculateRookMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 4;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 4;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 5: {
              blockSquare = canBlockHelper(calculateQueenMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 5;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 5;
                board[r_dest][c_dest] = dest_piece;
              }
            }
          }
        } else if (color == "black" && currentPiece >= 7 && currentPiece <= 11) {
          switch (currentPiece) {
            case 7:{
              blockSquare = canBlockHelper(calculatePawnMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 7;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 7;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 8: {
              blockSquare = canBlockHelper(calculateKnightMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 8;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 8;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 9: {
              blockSquare = canBlockHelper(calculateBishopMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 9;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 9;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 10: {
              blockSquare = canBlockHelper(calculateRookMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 10;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 10;
                board[r_dest][c_dest] = dest_piece;
              }
            }
            case 11: {
              blockSquare = canBlockHelper(calculateQueenMoves(currentCoords, color, board), takeableSquares);
              // possible move to block check exists, make the move and see if it leads to king under check
              if(blockSquare != -1){
                var r_source = currentCoords[0];
                var c_source = currentCoords[1];
                var r_dest = takeableSquares[blockSquare][0];
                var c_dest = takeableSquares[blockSquare][1];
                var dest_piece = board[r_dest][c_dest];
                board[r_source][c_source] = 0;
                board[r_dest][c_dest] = 11;
                canBlock = isUnderCheck(kingCoords, color, board).length === 0;
                // revert the move
                board[r_source][c_source] = 11;
                board[r_dest][c_dest] = dest_piece;
              }
            }
          }
        }
        if (canBlock) {
          return canBlock;
        }
      }
    }
  }
  return false; //cant block the attacking piece
}

export function canBlockHelper(possibleMoves, takeableSquares) {
  var i;
  for (i = 0; i < possibleMoves.length; i++) {
    if(takeableSquares.includes(possibleMoves[i]))
      return i;
  }
  return -1;
}

export function findMateBlocks(kingCoords, atkPieceCoords) { //returns all the squares you can access to block check, except if the attacker is knight.
  var columnDifference = atkPieceCoords[1] - kingCoords[1];
  var rowDifference = atkPieceCoords[0] - kingCoords[0];

  var takeableSquares = {};
  var r = atkPieceCoords[0];
  var c = atkPieceCoords[1];
  var takeableSquare;

  if (columnDifference === 0) {
    if (rowDifference < 0) {
      while (r > kingCoords[0]) {
        takeableSquare = { r, c };
        takeableSquares.push(takeableSquare);
        r--;
      }
    } else if (rowDifference > 0) {
      while (r < kingCoords[0]) {
        takeableSquare = { r, c };
        takeableSquares.push(takeableSquare);
        r++;
      }
    }
  } else if (rowDifference === 0) {
    if (columnDifference < 0) {
      while (c > kingCoords[1]) {
        takeableSquare = { r, c };
        takeableSquares.push(takeableSquare);
        c--;
      }
    } else if (columnDifference > 0) {
      while (c < kingCoords[1]) {
        takeableSquare = { r, c };
        takeableSquares.push(takeableSquare);
        c++;
      }
    } else if (Math.abs(rowDifference / columnDifference === 1)) { // on a diagonal
      if (rowDifference / columnDifference < 0) { // there are two possibilities: rowDiff is + columnDiff is - or vise versa
        if (rowDifference > 0) {
          while (r > kingCoords[0]) { //conditional here can be either r or c but ill just use r.
            takeableSquare = { r, c };
            takeableSquares.push(takeableSquare);
            r--;
            c++;
          }
        } else {
          while (r < kingCoords[0]) {
            takeableSquare = { r, c };
            takeableSquares.push(takeableSquare);
            r++;
            c--;
          }
        }
      } else if (rowDifference / columnDifference > 0) { //two more possibilities: both negative or both positive
        if (rowDifference > 0) {
          while (r > kingCoords[0]) { //conditional here can be either r or c but ill just use r.
            takeableSquare = { r, c };
            takeableSquares.push(takeableSquare);
            r--;
            c--;
          }
        } else {
          while (r < kingCoords[0]) { //conditional here can be either r or c but ill just use r.
            takeableSquare = { r, c };
            takeableSquares.push(takeableSquare);
            r++;
            c++;
          }
        }
      }
    }
  }

  return takeableSquares
}