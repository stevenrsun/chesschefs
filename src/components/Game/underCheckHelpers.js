export function findAttackingKnights(coords, color, board) {
  // check possible knight moves
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

  // search for any knights attacking the king
  let i;
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
      // opposite color knight is attacking king
      if (
        (color === "white" && board[r][c] === 8) ||
        (color === "black" && board[r][c] === 2)
      ) {
        return [r, c];
      }
    }
  }
  return null;
}

export function findAttackingDiagonals(coords, color, board) {
  // check diagonals for king moves, then continue down diagonal searching for attacking bishop OR queen

  // lower left diagonal (with 0,0 top left reference)
  var r = coords[0] + 1;
  var c = coords[1] - 1;
  var obstructed = false;
  // if one spot up diagonal is in bounds and contains enemy king, square is under check
  if (
    r >= 0 &&
    r <= 7 &&
    c >= 0 &&
    c <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    // found attacking bishop or queen
    if (
      (color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 3 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 9 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 3 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move up the diagonal
    ++r;
    --c;
  }

  console.log("not under attack by lower left diagonal");

  // lower right diagonal (with 0,0 top left reference)
  r = coords[0] + 1;
  c = coords[1] + 1;
  obstructed = false;
  // if one spot up diagonal is in bounds and contains enemy king, square is under check
  if (
    r >= 0 &&
    r <= 7 &&
    c >= 0 &&
    c <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    // found attacking bishop or queen
    if (
      (color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 3 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 9 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 3 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move up the diagonal
    ++r;
    ++c;
  }

  console.log("not lower right");

  // upper left diagonal (with 0,0 top left reference)
  r = coords[0] - 1;
  c = coords[1] - 1;
  obstructed = false;
  // if one spot up diagonal is in bounds and contains enemy king, square is under check
  if (
    r >= 0 &&
    r <= 7 &&
    c >= 0 &&
    c <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    // found attacking bishop or queen
    if (
      (color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 3 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 9 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 3 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move up the diagonal
    --r;
    --c;
  }

  console.log("not upper left");

  // upper right diagonal (with 0,0 top left reference)
  r = coords[0] - 1;
  c = coords[1] + 1;
  obstructed = false;
  // if one spot up diagonal is in bounds and contains enemy king, square is under check
  if (
    r >= 0 &&
    r <= 7 &&
    c >= 0 &&
    c <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r >= 0 && r <= 7 && c >= 0 && c <= 7) {
    // found attacking bishop or queen
    if (
      (color === "white" && (board[r][c] === 9 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 3 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 9 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 3 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move up the diagonal
    --r;
    ++c;
  }

  console.log("not upper right");
  return null;
}

export function findAttackingCrosses(coords, color, board) {
  // check rows and cols for enemy king, then rooks and queens

  // left row
  var r = coords[0];
  var c = coords[1] - 1;
  var obstructed = false;
  // check one square away for enemy king
  if (
    c >= 0 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE " + color + " " + board[0][4] + " " + coords[0] + "," + coords[1] + " r,c is " + r + "," + c)
    return [r, c];
  }
  while (!obstructed && c >= 0) {
    // found attacking rook or queen
    if (
      (color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 4 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 10 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 4 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move left
    --c;
  }

  console.log("not left row");

  // right row
  r = coords[0];
  c = coords[1] + 1;
  obstructed = false;
  // check one square away for enemy king
  if (
    c <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && c <= 7) {
    // found attacking rook or queen
    if (
      (color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 4 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 10 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 4 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move left
    ++c;
  }

  console.log("not right row");

  // top col
  r = coords[0] - 1;
  c = coords[1];
  obstructed = false;
  // check one square away for enemy king
  if (
    r >= 0 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r >= 0) {
    // found attacking rook or queen
    if (
      (color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 4 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 10 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 4 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move left
    --r;
  }

  console.log("not top col");

  // bottom col
  r = coords[0] + 1;
  c = coords[1];
  obstructed = false;
  // check one square away for enemy king
  if (
    r <= 7 &&
    ((color === "white" && board[r][c] === 12) ||
      (color === "black" && board[r][c] === 6))
  ) {
    return [r, c];
  }
  while (!obstructed && r <= 7) {
    // found attacking rook or queen
    if (
      (color === "white" && (board[r][c] === 10 || board[r][c] === 11)) ||
      (color === "black" && (board[r][c] === 4 || board[r][c] === 5))
    ) {
      return [r, c];
    }
    // found friendly piece or non threatening enemy piece
    if (board[r][c] !== 0) {
      if (
        (color === "white" && board[r][c] !== 10 && board[r][c] !== 11) ||
        (color === "black" && board[r][c] !== 4 && board[r][c] !== 5)
      ) {
        obstructed = true;
      }
    }
    // move left
    ++r;
  }

  console.log("not bottom col");
  return null;
}

export function findAttackingPawns(coords, color, board) {
  var r;
  var c;
  // check for pawn attack NOTE: white and black have different criteria for being under attack by pawn
  // ROW 0 IS BLACK'S STARTING SIDE
  if (color === "white") {
    // check upper left/right squares on diagonal (row 0 = top)

    // upper left
    r = coords[0] - 1;
    c = coords[1] - 1;
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7 && board[r][c] === 7) {
      // in bounds and pawn is attacking king
      return [r, c];
    }

    // upper right
    r = coords[0] - 1;
    c = coords[1] + 1;
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7 && board[r][c] === 7) {
      // in bounds and pawn is attacking king
      return [r, c];
    }
  } else if (color === "black") {
    // check upper left/right squares on diagonal (row 7 = top)

    // upper left
    r = coords[0] + 1;
    c = coords[1] + 1;
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7 && board[r][c] === 1) {
      // in bounds and pawn is attacking king
      return [r, c];
    }

    // upper right
    r = coords[0] + 1;
    c = coords[1] - 1;
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7 && board[r][c] === 1) {
      // in bounds and pawn is attacking king
      return [r, c];
    }
  }
  return null;
}
