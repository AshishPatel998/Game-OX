let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let vsComputer = false;
let gameOver = false;

function startGame(mode) {
  vsComputer = mode === 'computer';
  document.getElementById('mode-buttons').style.display = 'none';
  document.getElementById('grid').style.display = 'grid';
  resetBoard();
}

function handleClick(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].innerText = currentPlayer;
  checkWin();

  if (!gameOver && vsComputer && currentPlayer === 'X') {
    setTimeout(computerMove, 500);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function computerMove() {
  function minimax(newBoard, depth, isMaximizing) {
  const winner = evaluateBoard(newBoard);
  if (winner !== null) return winner;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = 'O';
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = 'X';
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function evaluateBoard(b) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of winCombos) {
    const [a, b1, c] = combo;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a] === 'O' ? 10 : -10;
    }
  }

  if (!b.includes("")) return 0;
  return null;
    }
  }

function showPopup(message) {
  document.getElementById('popup-message').innerText = message;
  document.getElementById('popup').style.display = 'flex';
}

function resetGame() {
  resetBoard();
  document.getElementById('popup').style.display = 'none';
  document.getElementById('mode-buttons').style.display = 'flex';
  document.getElementById('grid').style.display = 'none';
}

function resetBoard() {
  currentPlayer = 'X';
  gameOver = false;
  board = ["", "", "", "", "", "", "", "", ""];
  Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.innerText = "");
}

// Loading animation
window.onload = () => {
  let progress = 0;
  const fill = document.getElementById('progress-bar-fill');
  const loadingScreen = document.getElementById('loading-screen');
  const gameContainer = document.getElementById('game-container');

  const interval = setInterval(() => {
    progress += 2;
    fill.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      loadingScreen.style.display = 'none';
      gameContainer.style.display = 'block';
    }
  }, 50);
};
