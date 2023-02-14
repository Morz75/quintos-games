let frog, lilypads, bugs;

let time = 10;
let gameOver = false;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });

	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });

	bugs = new Group();
	bugs.addImg(
		spriteArt(`
..0.
.000..0
.00000
.0000.0
..0 ..
	 	`)
	);
	bugs.width = 2;
	bugs.height = 7;
	bugs.y = 80;
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 0;
	frog.y = 80;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.ani.stop();

	lilypads.layer = 0;
	lilypads.x = 16;
	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';

	makeLilyPads();
	makeBugs();

	countdown();

	frog.overlaps(bugs, eat);
}
function eat(frog, bug) {
	bug.remove();
	time = time + 4;
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	for (let i = 0; i < 200; i++) {
		if (i != 0 && random() < 0.4) {
			i++;
		}
		let lily = new lilypads.Sprite();
		lily.x = i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(100, 200));
	}
}

function makeBugs() {
	let i = 4;
	while (i < lilypads.length) {
		let bug = new bugs.Sprite();
		bug.x = lilypads[i].x;
		if (i < 30) {
			i += 8;
		} else if (i < 50) {
			i += 10;
		} else if (i < 70) {
			i += 12;
		} else if (i < 90) {
			i += 14;
		} else if (i < 110) {
			i += 16;
		} else {
			i += 18;
		}
	}
}

async function countdown() {
	while (time >= 0) {
		text(time + ' ', 1, 18);
		await delay(1000);
		time--;
		if (gameOver) return;
	}
	restartGame();
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	if (gameOver) return;

	// if frog is not in the air or falling down
	if (frog.y > 83 && frog.vel.y < 1) {
		// snap frog position to the middle of the nearest lilypad
		frog.x = round(frog.x / 16) * 16;
		frog.ani.stop();
		frog.ani.frame = 0;

		if (kb.presses('ArrowUp')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 1;
			frog.ani.play();
		} else if (kb.presses('ArrowRight')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.4;
			frog.ani.play();
		}
	}

	camera.x = frog.x + 64;

	// restart the game
	if (frog.y > 400) {
		restartGame();
	}
	if (frog.x == lilypads[lilypads.length - 1].x) {
		text('You win! Refresh page for a new level.', 3, 1);
	}
}

async function restartGame() {
	gameOver = true;
	bugs.removeAll();
	makeBugs();

	// reset frog position
	frog.x = 0;
	frog.y = 84;
	frog.vel.x = 0;
	frog.vel.y = 0;
	frog.visible = false;

	text('Game Over!', 7, 10);
	await delay(2000);
	text('          ', 7, 10);
	gameOver = false;
	frog.visible = true;
	// restart timer
	time = 10;
	countdown();
}
