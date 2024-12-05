const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const toggleModeButton = document.getElementById("toggle-mode");

let currentPlayer = "X";
let gameActive = true;
let gameMode = "twoPlayer";
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell.id));
});

resetButton.addEventListener("click", resetGame);

toggleModeButton.addEventListener("click", () => {
  gameMode = gameMode === "twoPlayer" ? "computer" : "twoPlayer";
  toggleModeButton.textContent =
    gameMode === "twoPlayer" ? "Switch to Computer" : "Switch to Two Player";
  resetGame();
});

function handleCellClick(index) {

  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  const clickedCell = document.getElementById(index);
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add("taken");

  clickedCell.style.backgroundColor =
    currentPlayer === "X" ? "lightblue" : "lightcoral";


  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every((cell) => cell !== null)) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent =
    gameMode === "computer" && currentPlayer === "O"
      ? "Computer's turn"
      : `Player ${currentPlayer}'s turn`;

  if (gameMode === "computer" && currentPlayer === "O") {
    setTimeout(makeComputerMove, 500);
  }
}

function makeComputerMove() {

  const emptyCells = boardState
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);


  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleCellClick(randomIndex);
}

function checkWin() {
  return winningCombinations.some((combo) =>
    combo.every((index) => boardState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = Array(9).fill(null);

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
    cell.classList.remove("taken");
  });


  message.textContent = "Player X's turn";
}
