const rows = 6;
const cols = 7;
let currentPlayer = 'red';
const board = [];

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

// Initialize board
function createBoard() {
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
}

function handleClick(e) {
  const col = parseInt(e.target.dataset.col);

  // Find the lowest empty row
  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
      cell.classList.remove('empty');
      cell.classList.add(currentPlayer);

      if (checkWin(r, col)) {
        message.textContent = `Player ${currentPlayer === 'red' ? 1 : 2} Wins!`;
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
        return;
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      message.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn (${currentPlayer})`;
      return;
    }
  }
}

// Check win logic
function checkWin(row, col) {
  const directions = [
    [[0, 1], [0, -1]],   // Horizontal
    [[1, 0], [-1, 0]],   // Vertical
    [[1, 1], [-1, -1]],  // Diagonal \
    [[1, -1], [-1, 1]]   // Diagonal /
  ];

  return directions.some(dir => {
    let count = 1;

    dir.forEach(([dr, dc]) => {
      let r = row + dr;
      let c = col + dc;
      while (
        r >= 0 && r < rows &&
        c >= 0 && c < cols &&
        board[r][c] === currentPlayer
      ) {
        count++;
        r += dr;
        c += dc;
      }
    });

    return count >= 4;
  });
}

createBoard();
