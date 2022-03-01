// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here! below this line

	const hangman = [
		`

    
      
      
      
      
=========`,
		`
      +
      |
      |
      |
      |
      |
=========`,
		`
  +---+
      |
      |
      |
      |
      |
=========`,
		`
  +---+
  |   |
      |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
	];

	let wordsList = `abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie`;

	/* PART A0: split the words String into an array, choose a random word */
	// get array from wordsList string
	let words = wordsList.split(' ');
	log(words);

	// get random index of a word in the words array
	let wordIndex = Math.random() * words.length;
	wordIndex = Math.floor(wordIndex);
	log(wordIndex);

	// get the word itself using the random wordIndex
	let word = words[wordIndex];
	log(word);

	/* PART A1: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']
	let lines = '_'.repeat(word.length).split('');
	log(lines);

	let wrongGuesses = 0;

	/* PART A3: make the game loop */
	while (lines.includes('_')) {
		/* PART A2: show the lines for the word below the hangman String */
		let guess = await prompt(hangman[wrongGuesses] + '\n\n' + lines.join(' '));
		log(guess);

		/* PART D: check if guess is the word */
		if (guess == word) {
			break;
		}

		/* PART A4: implement guessing letters */
		let isWrong = true;
		for (let i = 0; i < word.length; i++) {
			if (guess == word[i]) {
				lines[i] = guess;
				isWrong = false;
			}
		}

		if (isWrong == true) {
			wrongGuesses++;
		}
		log(wrongGuesses);

		if (wrongGuesses > 6) {
			await alert('The person...died. The word was ' + word);
			break;
		}
	}

	if (wrongGuesses <= 6) {
		await alert('You won! The word was ' + word);
	}

	/* PART B1: implement guessing the whole word */

	exit(); // exits the game
})(); // end
