const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `.slice(1);
// slice removes the first character from the String
// in this case I remove the new line at the beginning
// so the first line of the button will be at the proper
// row value

/* PART A0: change the values of row and col to be random */
// screen size is 80 cols x 30 rows
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 30 rows - 6 target height - 1 frame line = 23
// 80 columns - 8 target width - 1 frame line = 71

let btn;
let times = [];

async function calculateStats() {
	log(times);

	let speeds = [];

	for (let i = 0; i < 9; i++) {
		speeds[i] = times[i + 1] - times[i];
	}
	log(speeds);

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum = sum + speeds[i];
	}
	let avg = Math.round(sum / 9);

	let fastest = speeds[0];
	let slowest = speeds[0];
	for (let i = 1; i < 9; i++) {
		if (fastest > speeds[i]) {
			fastest = speeds[i];
		} else if (slowest < speeds[i]) {
			slowest = speeds[i];
		}
	}

	await alert(
		'Your average speed was ' +
			avg +
			'ms\n' +
			'Your fastest speed was ' +
			fastest +
			'ms\n' +
			'Your slowest speed was ' +
			slowest +
			'ms'
	);
}

function makeTarget() {
	times.push(Date.now());
	log(times);
	// if btn exists, erase it
	if (btn) {
		btn.erase();
	}
	makeBackground();

	if (times.length == 10) {
		calculateStats();
	} else {
		let row = Math.floor(Math.random() * 23 + 1);
		let col = Math.floor(Math.random() * 71 + 1);
		log(row, col);
		btn = button(target, row, col, makeTarget);
	}
}

function makeBackground() {
	let patternA = '(=*+*=)'.repeat(11);
	let patternB = ')9=w=6('.repeat(11);
	for (let row = 1; row < 29; row++) {
		if (row % 2 == 0) {
			text(patternA, row, 1);
		} else {
			text(patternB, row, 1);
		}
	}
}

async function startGame() {
	makeBackground();
	await alert('Click the targets as fast as you can. Click OK to start.', 10, 26, 25);
	makeTarget();
}

startGame();

/* PART B: Use recursion to make a new button after clicking a button */

/* PART C: Limit clicks to 20, calculate stats */

/* PART D: Make a background pattern */
