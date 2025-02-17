const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentPlayer = "X";
let gameOver = false;

// Initialize the board
function createBoard() {
  boardDiv.innerHTML = "";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      boardDiv.appendChild(cell);
    }
  }
}

// Handle cell click
function handleCellClick(e) {
  if (gameOver) return;

  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  if (board[row][col] !== "") return; // Ignore if the cell is already filled

  board[row][col] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} is the winner!`;
    gameOver = true;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

// Check if there is a winner
function checkWinner() {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === currentPlayer &&
      board[row][1] === currentPlayer &&
      board[row][2] === currentPlayer
    ) {
      highlightWinningCells([[row, 0], [row, 1], [row, 2]]);
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === currentPlayer &&
      board[1][col] === currentPlayer &&
      board[2][col] === currentPlayer
    ) {
      highlightWinningCells([[0, col], [1, col], [2, col]]);
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    highlightWinningCells([[0, 0], [1, 1], [2, 2]]);
    return true;
  }

  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    highlightWinningCells([[0, 2], [1, 1], [2, 0]]);
    return true;
  }

  return false;
}

// Highlight the winning cells
function highlightWinningCells(cells) {
  cells.forEach(([row, col]) => {
    const cell = boardDiv.children[row * 3 + col];
    cell.classList.add("winner");
  });
}

// Restart the game
function restartGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "X's turn";
  createBoard();
}

// Initialize the game
createBoard();
restartButton.addEventListener("click", restartGame);
