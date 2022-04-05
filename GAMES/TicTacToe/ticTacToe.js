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

text(title, 5, 6);

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

let turnX = true;

/* PART A: finish the grid of 9x8 spaces */
text('─'.repeat(26), gridRow + 7, gridCol);
text('─'.repeat(26), gridRow + 15, gridCol); // draw another horizontal line

text('│\n'.repeat(23), gridRow, gridCol + 8);
text('│\n'.repeat(23), gridRow, gridCol + 17); // draw another vertical line

let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

function checkForWinner(mark) {
	if (board[0][0] == mark && board[0][1] == mark && board[0][2] == mark) {
		return true;
	}
	return false;
}

function takeTurn(row, col) {
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
		alert('Player ' + mark + ' won!', 20, 60, 16);
	}

	turnX = !turnX;
}

/* PART A: Make the buttons in the grid */
// note the intervals! row += 8 and col += 9

for (let row = 0; row < 3; row++) {
	for (let col = 0; col < 3; col++) {
		button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
			takeTurn(row, col);
		});
	}
}
