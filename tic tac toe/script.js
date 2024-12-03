// Select elements
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const toggleModeButton = document.getElementById("toggle-mode");

// Game variables
let currentPlayer = "X";
let gameActive = true;
let gameMode = "twoPlayer"; // Switch between "twoPlayer" and "computer"
let boardState = Array(9).fill(null);

// Winning combinations
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

// Add event listeners to cells
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell.id));
});

// Handle reset button
resetButton.addEventListener("click", resetGame);

// Toggle between game modes
toggleModeButton.addEventListener("click", () => {
  gameMode = gameMode === "twoPlayer" ? "computer" : "twoPlayer";
  toggleModeButton.textContent =
    gameMode === "twoPlayer" ? "Switch to Computer" : "Switch to Two Player";
  resetGame();
});

// Handle cell clicks
function handleCellClick(index) {
  // Prevent interaction if the game is inactive or the cell is already taken
  if (!gameActive || boardState[index]) return;

  // Update board state and UI
  boardState[index] = currentPlayer;
  const clickedCell = document.getElementById(index);
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add("taken");

  // Change cell background color based on the player
  clickedCell.style.backgroundColor =
    currentPlayer === "X" ? "lightblue" : "lightcoral";

  // Check for a win or draw
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

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent =
    gameMode === "computer" && currentPlayer === "O"
      ? "Computer's turn"
      : `Player ${currentPlayer}'s turn`;

  // If it's the computer's turn, make a move
  if (gameMode === "computer" && currentPlayer === "O") {
    setTimeout(makeComputerMove, 500);
  }
}

// Computer's move logic
function makeComputerMove() {
  // Find empty cells
  const emptyCells = boardState
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  // Choose a random empty cell
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleCellClick(randomIndex);
}

// Check for a win
function checkWin() {
  return winningCombinations.some((combo) =>
    combo.every((index) => boardState[index] === currentPlayer)
  );
}

// Reset the game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = Array(9).fill(null);

  // Reset cells
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = ""; // Reset background color
    cell.classList.remove("taken");
  });

  // Reset message
  message.textContent = "Player X's turn";
}
