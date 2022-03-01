// screen width is 256, height is 192

let imgBall = spriteArt(
	`
...ww..
..wwww.
.wwwwww
.wwwwww
wwwwwwww
wwwwwwww
.wwwwww.
..wwww..`
);

// the \n means new line
let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(42) + 'wwwwwwww\n.wwwwww.');

/* PART A1: Make image for the wall */
let imgWall = spriteArt('u'.repeat(256) + '\n' + 'u'.repeat(256), 4);

let wall = createSprite(imgWall);

let imgWall2 = spriteArt('u'.repeat(256) + '\n' + 'u'.repeat(256), 4);
let wall2 = createSprite(imgWall2);
wall2.x = 0;
wall2.y = height - wall2.h;

// places a ball in center of the screen
let ball = createSprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;

/* PART A0: create two paddles, place on each end of the screen */
let paddleL = createSprite(imgPaddle);
paddleL.x = 5;
paddleL.y = height / 2;

let paddleS = createSprite(imgPaddle);
paddleS.x = 244;
paddleS.y = height / 2;

ball.velocity.x = 1;
ball.velocity.y = -1;

let scoreL = 0;
let scoreS = 0;

text(scoreS, 4, 24);
text(scoreL, 4, 8);

function draw() {
	background(0);
	/* PART A1: draw the ball and paddles inside the p5 main draw function */

	if (ball.x + ball.w < -50) {
		// ball went off the left side
		ball.velocity.x = 1;
		scoreS++;
		text(scoreS, 4, 24);
	} else if (ball.x > width + 50) {
		// ball went off the right side
		ball.velocity.x = -1;
		scoreL++;
		text(scoreL, 4, 8);
	}
	if (ball.x + ball.w < -50 || ball.x > width + 50) {
		ball.x = width / 2;
		ball.y = height / 2;
		if (Math.random() < 0.5) {
			ball.velocity.y = 1;
		} else {
			ball.velocity.y = -1;
		}
	}

	if (ball.y + ball.h >= wall2.y) {
		// ball hits bottom wall
		ball.velocity.y = -ball.velocity.y - 0.1;
		if (ball.velocity.x > 0) {
			ball.velocity.x += 0.1;
		} else {
			ball.velocity.x -= 0.1;
		}
	} else if (ball.y <= wall.y + wall.h) {
		// ball hits top wall
		ball.velocity.y = -ball.velocity.y + 0.1;
		if (ball.velocity.x > 0) {
			ball.velocity.x += 0.1;
		} else {
			ball.velocity.x -= 0.1;
		}
	}

	if (
		ball.x + ball.w >= paddleS.x &&
		ball.x <= paddleS.x + paddleS.w &&
		ball.y >= paddleS.y &&
		ball.y <= paddleS.y + paddleS.h
	) {
		ball.velocity.x = -1;
	} else if (
		ball.x <= paddleL.x + paddleL.w &&
		ball.x >= paddleL.x &&
		ball.y >= paddleL.y &&
		ball.y <= paddleL.y + paddleL.h
	) {
		ball.velocity.x = 1;
	}

	if (keyIsDown(87) && paddleL.y > 0) {
		paddleL.y -= 2;
	} else if (keyIsDown(83) && paddleL.y < height - paddleL.h) {
		paddleL.y += 2;
	}

	if (keyIsDown(UP_ARROW) && paddleS.y > 0) {
		paddleS.y -= 2;
	} else if (keyIsDown(DOWN_ARROW) && paddleS.y < height - paddleS.h) {
		paddleS.y += 2;
	}

	drawSprites();
}
