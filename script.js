const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let board = [];
let scores = { red: 0, yellow: 0 };
const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

function createBoard() {
  board = [];
  gameBoard.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = null;
      const cell = document.createElement('div');
      cell.classList.add('cell', 'empty');
      cell.dataset.row = r;
      cell.dataset.col = c;
      gameBoard.appendChild(cell);
    }
  }
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
  message.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn (${currentPlayer})`;
}

function handleClick(e) {
  const col = parseInt(e.target.dataset.col);

  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
      cell.classList.remove('empty');
      cell.classList.add(currentPlayer);

      if (checkWin(r, col)) {
        message.textContent = `Player ${currentPlayer === 'red' ? 1 : 2} Wins!`;
        updateScore(currentPlayer);
        highlightWin(r, col);
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
        return;
      }

      if (board.flat().every(cell => cell !== null)) {
        message.textContent = "It's a draw!";
        return;
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      message.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn (${currentPlayer})`;
      return;
    }
  }
}

function checkWin(row, col) {
  const directions = [
    [[0, 1], [0, -1]],
    [[1, 0], [-1, 0]],
    [[1, 1], [-1, -1]],
    [[1, -1], [-1, 1]]
  ];

  for (let dir of directions) {
    let count = 1;
    let winCells = [[row, col]];

    for (let [dr, dc] of dir) {
      let r = row + dr, c = col + dc;
      while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        winCells.push([r, c]);
        r += dr;
        c += dc;
      }
    }

    if (count >= 4) {
      winCells.forEach(([r, c]) => {
        const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
        cell.classList.add('win');
      });
      return true;
    }
  }

  return false;
}

function updateScore(player) {
  scores[player]++;
  document.querySelector(`#player1 span`).textContent = scores.red;
  document.querySelector(`#player2 span`).textContent = scores.yellow;
}

resetBtn.addEventListener('click', () => {
  createBoard();
});

createBoard();
