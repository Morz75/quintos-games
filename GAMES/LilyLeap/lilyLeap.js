let frog, lilypads;

let time = 10;
let gameOver = false;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
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

	countdown();
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	for (let i = 0; i < 50; i++) {
		if (i != 1 && random() < 0.4) {
			i++;
		}
		let lily = new lilypads.Sprite();
		lily.x = i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(100, 200));
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
}

async function restartGame() {
	gameOver = true;

	// reset frog position
	frog.x = 16;
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
