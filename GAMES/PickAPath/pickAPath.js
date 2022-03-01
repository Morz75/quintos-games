// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here! below this line

	let choice = 0; // initialize choice to 0, user has not made any choice yet

	while (choice != null) {
		// while choice is not null (nothing)
		// null in this case indicates the player cancelled out of the prompt

		let msg = ''; // initialize message to empty String
		let opt = [];

		if (choice == 0) {
			/* PART A0: Start your story! */
			msg =
				"It's a sunny December day, in the Lapland . You are an elf and you need to wake up Santa Claus, but you know, that he is gonna be very angry. But, he needs to start packing the toys. \n\n\t" +
				'1: Scream very loudly.\n\t' +
				'2: Pull on his beard.\n\t' +
				'3: Throw the glass of milk at him.';
			opt = [1, 2, 3];
		} else if (choice == 1) {
			/* PART A1: continue the story */
			msg =
				'He wakes up immediately. He says "STOP WITH THE YELLING!". He says, "What\'s going on?"\n\n\t' +
				'4: Say, "You FORGOT?"\n\t' +
				'5: Say, "You have to pack the toys into your bag!"';
			opt = [4, 5];
		} else if (choice == 2) {
			/* PART A1: continue the story */
			msg =
				'His eyes open wide. "YOUUCCCHHHHHH!" he yells. He pulls his head back and his beard hair comes out. He no longer looks like Santa Claus, later on he gets arrested by police after being mistaken for a theif. GAME OVER! Press cancel to exit game.\n\n\t' +
				'0: Try Again';
			opt = [0];
		} else if (choice == 3) {
			msg =
				'He wakes up and his eyes start blinking and he doesn\'t understand why he is awake. He starts shaking because the milk was so cold! He gets super angry, "mitä helvettiä?! What\'d you do that for?" \n\n\t' +
				'4: Say, "Sorry but did you really forget what day it is?"\n\t' +
				'5: Say, "I am really sorry. We have to pack the bag though!" ';
			opt = [4, 5];
		} else if (choice == 4) {
			msg =
				'Santa Claus says "Oh yes! It\'s the 31st of December! I have to pack the bag so I can deliver all those toys." \n\n\t' +
				'6: Say, "Yeah, c\'mon, let\'s go!" \n\t' +
				'7: Say, "You are right! Let\'s deliver children happiness." ';
			opt = [6, 7];
		} else if (choice == 5) {
			msg =
				'Santa Claus saying "Why? today is only 31st of December...(Santa Claus analyzing)...Oh, yeah...Ok let\'s go." \n\n\t' +
				"6: Yeah, you sleepy creaker, let's go! \n\t" +
				"7: You look weird, but we'll take care about it later, now let's do our business first. ";
			opt = [6, 7];
		} else if (choice == 6) {
			msg =
				"Santa Claus goes very reluctantly. You are entering a big room with conveyors, machines, e.t.c. And you see a big bag in the corner. Santa goes takes the bag and sits in his armchair. Elfs giving him the toys and he just putting them into the bag. You want to give him a package of toys, but you see that 1 toy is not looking good. You can't understand what's wrong, but it's your turn to give the package. What are you going to do? \n\n\t" +
				'8: step aside and fix it.\n\t ' +
				'9: Do nothing and give the package to Santa. ';
			opt = [8, 9];
		} else if (choice == 7) {
			msg =
				'Santa goes very happy. You are entering a big room with conveyors, machines, e.t.c. And you see a big bag in the corner. Santa goes takes the bag and sits in his armchair. Elfs giving him the toys and he putting them into the bag with pleasure and interest. And because of his happiness, everything and everyone in the room feel happy. And when this happeness, Christmas often goes well, so you litteraly make the Christmas happy again. Well done. Wanna see another ending? Press 0. \n\n\t' +
				'0: Try again';
			opt = [0];
		} else if (choice == 9) {
			msg =
				'You are putting the package with broken toy and ,becasue of the magic of this bag, it satrts to feel bad. Santa wondering what\'s wrong, but he literally doesn\t pay attention. Finally the bag just blows up and all the toys just dissapeard. When Santa realized it, he understood that it\'s you, putted a broken toy into the bag. He just shouted at you on Finnish and fired you. Now you don\t have job. Bad. Type in google "Find a job" and go get a job. \n\n\t' +
				'0: Try again';
			opt = [0];
		} else if (choice == 8) {
			msg =
				'You stepped aside, and Santa asked angrily "What are you doing?" There is no way to lie, so you just told him the truth and lucky you, he understood everything. So, you started to inspect the toy and again lucky you, there is only just 1 screw nut missing. You just took a screw-nut and twirled it. Now you gave the package with normal toys to Santa and he putted it into the bag. So you saved the Christmas. Because of you this Christmas will be normal as it was all the last times. You finished a neutral ending. Wanna see another ending? Prees 0. \n\n\t' +
				'0: Try again';
			opt = [0];
		}

		// prompt the player to make choices

		let inp = await prompt(msg);

		if (opt.includes(inp)) {
			choice = inp;
		} else {
			await alert('Invaild choice. Try again.');
		}

		/* PART B0: end the game if there are no more choices to make */

		/* PART B1: check if the player made a valid choice, reject invalid choices */
	}

	exit(); // exits the game
})(); // end wrapper
