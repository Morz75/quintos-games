let watch = document.getElementById('watch');
let laps = document.getElementById('laps');

let start;
let stop;
let lapNum = 1;
let stopped = 0;
let shouldUpdate = true;
let didPressStart = false;
let totalTime = 0;

function startTime() {
	if (shouldUpdate && !didPressStart) {
		// start
		console.log('starting timer...');
		didPressStart = true;
		start = Date.now();
		updateTime();
	} else if (!shouldUpdate) {
		// restart

		// find the amount of time the timer was stopped
		stopped += Date.now() - stop;
		shouldUpdate = true;
		updateTime();
	}
}

function displayTime(time) {
	let t = time.getMinutes().toString().padStart(2, '0');
	t += ':';
	t += time.getSeconds().toString().padStart(2, '0');
	t += ':';
	t += time.getMilliseconds().toString().padStart(3, '0');
	return t;
}

function updateTime() {
	totalTime = Date.now() - stopped - start;
	const time = new Date(totalTime);

	watch.innerHTML = displayTime(time);

	// waits for the next chance to make a frame
	// then calls updateTime again recursion
	if (shouldUpdate) {
		requestAnimationFrame(updateTime);
	}
}

function stopTime() {
	if (shouldUpdate) {
		shouldUpdate = false;
		stop = Date.now();
	}
}

function lapTime() {
	if (shouldUpdate) {
		totalTime = Date.now() - stopped - start;
		const time = new Date(totalTime);
		laps.innerHTML += '<div>Lap ' + lapNum + ' ' + displayTime(time) + '</div>';
		lapNum++;
	}
}
