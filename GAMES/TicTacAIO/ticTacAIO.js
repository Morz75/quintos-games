const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1); // slice off the first newline character

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridRow = 3;
const gridCol = 26;

let turnX = Math.random() < 0.5;
let scoreX = 0;
let scoreO = 0;

let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

function checkForWinner(mark) {
	for (let i = 0; i < 3; i++) {
		// check rows
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}
		// check cols
		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}

	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	} else if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}

	return false;
}

function checkForDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

async function takeTurn(row, col) {
	log('clicked at ', row, col);

	if (board[row][col] != ' ') {
		alert('this position is already taken', 20, 60, 16);
		return;
	}

	let mark;
	if (turnX) {
		text(bigX, gridRow + row * 8, gridCol + col * 9);
		board[row][col] = 'x';
		mark = 'x';
	} else {
		text(bigO, gridRow + row * 8, gridCol + col * 9);
		board[row][col] = 'o';
		mark = 'o';
	}

	log(board.join('\n'));

	if (checkForWinner(mark)) {
		if (turnX) {
			scoreX++;
			turnX = false;
		} else {
			scoreO++;
			turnX = true;
		}
		displayScore();

		await alert('Player ' + mark + ' won!', 20, 60, 16);
		startNewGame();
		return;
	}

	if (checkForDraw()) {
		await alert('Draw', 20, 60, 16);
		turnX = Math.random() < 0.5;
		startNewGame();
	}

	// change turns
	turnX = !turnX;
	displayTurn();
}

function startNewGame() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			text(bigSpace, gridRow + row * 8, gridCol + col * 9);
			board[row][col] = ' ';
		}
	}
	displayTurn();
}

function displayScore() {
	text('X: ' + scoreX, 7, 60);
	text('O: ' + scoreO, 8, 60);
}

function displayTurn() {
	if (turnX) {
		text("Player X it's your turn", 4, 60, 16);
	} else {
		text("Player O it's your turn", 4, 60, 16);
	}
}

function start() {
	displayTurn();
	displayScore();
	text(title, 5, 6);

	/* PART A: finish the grid of 9x8 spaces */
	text('─'.repeat(26), gridRow + 7, gridCol);
	text('─'.repeat(26), gridRow + 15, gridCol); // draw another horizontal line

	text('│\n'.repeat(23), gridRow, gridCol + 8);
	text('│\n'.repeat(23), gridRow, gridCol + 17); // draw another vertical line

	/* PART A: Make the buttons in the grid */
	// note the intervals! row += 8 and col += 9

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
				takeTurn(row, col);
			});
		}
	}
}
