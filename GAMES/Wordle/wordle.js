let dictionary = [];
let words = [];
let board;

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
	log(dictionary);

	startGame();
}

loadGame();

/* Display all the boxes for the letters */
function displayBoxes() {}

async function startGame() {
	/* pick new word */

	displayBoxes();
	await prompt('Guess the word!', 3, 18, 20);
}
