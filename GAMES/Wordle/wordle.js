let dictionary = [];
let words = [];
let board = [];

async function loadGame() {
	let filePath = QuintOS.dir + '/words5.txt';
	let data = await fetch(filePath);
	let wordsList = await data.text();
	words = wordsList.split('\n');

	let filePath2 = QuintOS.dir + '/dictionary5.txt';
	let data2 = await fetch(filePath2);
	let wordsList2 = await data2.text();
	let lines = wordsList2.split('\n');

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		line = line.split(' ');
		for (let j = 0; j < line.length; j++) {
			dictionary.push(line[j]);
		}
	}

	startGame();
}

loadGame();

/* Display all the boxes for the letters */
function displayBoxes() {
	let boxes = '';
	for (let i = 0; i < 6; i++) {
		boxes += '┌─┐'.repeat(5) + '\n';
		boxes += '│ │'.repeat(5) + '\n';
		boxes += '└─┘'.repeat(5) + '\n';
	}

	text(boxes, 2, 2);
}

function displayInfo() {
	let row = 10;
	textRect(row, 20, 3, 3, 'solid');
	text('letter is not found in word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'outline');
	text('letter is in the word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'dashed');
	text('letter is in the correct position', row, 24, 14);
}

async function startGame() {
	/* pick new word */
	let wordIndex = random(0, words.length);
	wordIndex = Math.round(wordIndex);
	log(wordIndex);

	let word = words[wordIndex];
	log(word);

	displayBoxes();
	displayInfo();

	let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let validGuesses = 0;
	while (validGuesses < 6) {
		text(alpha, 21, 2);
		let guess = await prompt('Guess the word!', 2, 18, 20);
		// convert to all uppercase
		guess = guess.toUpperCase();

		if (guess.length > 5) {
			await alert('The word is too big!', 2, 18, 20);
		} else if (guess.length < 5) {
			await alert('The word is too small!', 2, 18, 20);
		} else if (dictionary.includes(guess) == false) {
			await alert('The word is not in the dictionary.', 2, 18, 20);
		} else {
			let row = 2 + validGuesses * 3;
			await eraseRect(row, 2, 15, 3);

			for (let i = 0; i < 5; i++) {
				let letter = guess[i];
				if (letter == word[i]) {
					textRect(row, 2 + i * 3, 3, 3, 'dashed');
				} else if (word.includes(letter) == true) {
					textRect(row, 2 + i * 3, 3, 3, 'outline');
				} else {
					textRect(row, 2 + i * 3, 3, 3, 'solid');
					alpha = alpha.replace(letter, ' ');
				}

				text(letter, row + 1, 3 + i * 3);
			}
			validGuesses++;
			if (guess == word) {
				await alert('You won!', 2, 18, 20);
				break;
			} else if (validGuesses >= 6) {
				await alert('You lost(', 2, 18, 20);
			}
		}
	}

	startGame();
}
