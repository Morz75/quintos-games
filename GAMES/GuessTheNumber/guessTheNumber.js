// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here!
	let keepPlaying = 'yes';
	while (keepPlaying == 'yes') {
		let num = Math.random() * 100;
		num = Math.ceil(num);

		let guess;
		while (guess != num) {
			guess = await prompt('Guess the number 1-100');

			if (guess == num) {
				await alert('Correct!');
			} else if (guess < num) {
				await alert('Too low.');
			} else if (guess > num) {
				await alert('Too high');
			}
		}

		keepPlaying = await prompt('Want to play more?');
	}

	await alert('Thanks for playing!');

	exit(); // exits the game
})(); // end
