type GameScreen = "intro" | "game" | "result" | "challenge";

type BallPosition = {
	x: number;
	y: number;
};

type GameResult = {
	title: string;
	rating: number;
};

const totalHits = 5;

const minimumPosition = 10;
const maximumPosition = 90;
const minimumDistance = 25;

const minimumDelay = 350;
const maximumDelay = 900;

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const getDistance = (
	firstPosition: BallPosition,
	secondPosition: BallPosition,
) => {
	const xDistance = secondPosition.x - firstPosition.x;
	const yDistance = secondPosition.y - firstPosition.y;

	return Math.sqrt(xDistance ** 2 + yDistance ** 2);
};

const getRandomPosition = (
	previousPosition: BallPosition | null,
): BallPosition => {
	let newPosition: BallPosition;

	do {
		newPosition = {
			x: getRandomNumber(minimumPosition, maximumPosition),
			y: getRandomNumber(minimumPosition, maximumPosition),
		};
	} while (
		previousPosition &&
		getDistance(previousPosition, newPosition) < minimumDistance
	);

	return newPosition;
};

const getRandomDelay = () => {
	return getRandomNumber(minimumDelay, maximumDelay);
};

const getGameResult = (reactionTime: number): GameResult => {
	if (reactionTime < 600) {
		return {
			title: "Okej… har du tränat på det här?",
			rating: 10,
		};
	}

	if (reactionTime < 900) {
		return {
			title: "Det där var faktiskt riktigt snabbt.",
			rating: 8,
		};
	}

	if (reactionTime < 1200) {
		return {
			title: "Inte illa. Du får vara med och spela.",
			rating: 6,
		};
	}

	if (reactionTime < 2000) {
		return {
			title: "Hmm… average. Men det finns potential.",
			rating: 4,
		};
	}

	return {
		title: "Reaktionen tog semester en stund där.",
		rating: 2,
	};
};

export const initPadelGame = () => {
	const dialog = document.querySelector<HTMLDialogElement>("#padel-game");

	const openButton = document.querySelector<HTMLButtonElement>(
		"[data-padel-game-open]",
	);

	if (!dialog || !openButton) return;

	const screens = dialog.querySelectorAll<HTMLElement>("[data-padel-screen]");

	const startButton =
		dialog.querySelector<HTMLButtonElement>("[data-padel-start]");

	const restartButton = dialog.querySelector<HTMLButtonElement>(
		"[data-padel-restart]",
	);

	const challengeButton = dialog.querySelector<HTMLButtonElement>(
		"[data-padel-challenge-open]",
	);

	const ball = dialog.querySelector<HTMLButtonElement>("[data-padel-ball]");

	const currentHit = dialog.querySelector<HTMLElement>("[data-padel-current]");

	const result = dialog.querySelector<HTMLElement>("[data-padel-result]");

	const resultTitle = dialog.querySelector<HTMLElement>(
		"[data-padel-result-title]",
	);

	const resultText = dialog.querySelector<HTMLElement>(
		"[data-padel-result-text]",
	);

	const status = dialog.querySelector<HTMLElement>("[data-padel-status]");

	const challengeName = dialog.querySelector<HTMLInputElement>("#padel-name");

	const formReactionTime = dialog.querySelector<HTMLInputElement>(
		"[data-padel-form-time]",
	);

	const formRating = dialog.querySelector<HTMLInputElement>(
		"[data-padel-form-rating]",
	);

	if (
		!startButton ||
		!restartButton ||
		!challengeButton ||
		!ball ||
		!currentHit ||
		!result ||
		!resultTitle ||
		!resultText ||
		!status ||
		!challengeName ||
		!formReactionTime ||
		!formRating
	) {
		return;
	}

	let hits = 0;
	let reactionStart = 0;
	let reactionTimes: number[] = [];
	let previousPosition: BallPosition | null = null;
	let ballTimer: number | undefined;

	let lastReactionTime = "";
	let lastRating = 0;

	const showScreen = (screen: GameScreen) => {
		for (const gameScreen of screens) {
			gameScreen.hidden = gameScreen.dataset.padelScreen !== screen;
		}
	};

	const clearBallTimer = () => {
		if (ballTimer === undefined) return;

		window.clearTimeout(ballTimer);
		ballTimer = undefined;
	};

	const hideBall = () => {
		ball.hidden = true;
	};

	const positionBall = () => {
		const position = getRandomPosition(previousPosition);

		ball.style.setProperty("--ball-x", `${position.x}%`);
		ball.style.setProperty("--ball-y", `${position.y}%`);

		previousPosition = position;
	};

	const showNextBall = () => {
		hideBall();

		const delay = getRandomDelay();

		ballTimer = window.setTimeout(() => {
			positionBall();

			ball.hidden = false;
			reactionStart = performance.now();

			status.textContent = `Boll ${hits + 1} av ${totalHits}`;
		}, delay);
	};

	const showResult = () => {
		clearBallTimer();
		hideBall();

		const totalReactionTime = reactionTimes.reduce(
			(sum, reactionTime) => sum + reactionTime,
			0,
		);

		const averageReactionTime = totalReactionTime / reactionTimes.length;

		const gameResult = getGameResult(averageReactionTime);

		const reactionTimeInSeconds = averageReactionTime / 1000;

		lastReactionTime = reactionTimeInSeconds.toFixed(2).replace(".", ",");

		lastRating = gameResult.rating;

		result.textContent = lastReactionTime;

		resultTitle.textContent = gameResult.title;

		resultText.textContent = `Min högst ovetenskapliga bedömning: MATCHi ${lastRating}/10.`;

		showScreen("result");
	};

	const startGame = () => {
		clearBallTimer();

		hits = 0;
		reactionTimes = [];
		previousPosition = null;

		currentHit.textContent = "1";
		status.textContent = "Gör dig redo";

		showScreen("game");
		showNextBall();
	};

	const hitBall = () => {
		if (ball.hidden) return;

		const reactionTime = performance.now() - reactionStart;

		reactionTimes.push(reactionTime);

		hits += 1;

		hideBall();

		if (hits >= totalHits) {
			showResult();
			return;
		}

		currentHit.textContent = (hits + 1).toString();

		showNextBall();
	};

	const showChallenge = () => {
		formReactionTime.value = `${lastReactionTime} s`;
		formRating.value = `${lastRating}/10`;

		showScreen("challenge");

		challengeName.focus();
	};

	const resetGame = () => {
		clearBallTimer();
		hideBall();

		hits = 0;
		reactionTimes = [];
		previousPosition = null;

		lastReactionTime = "";
		lastRating = 0;

		formReactionTime.value = "";
		formRating.value = "";

		currentHit.textContent = "1";
		status.textContent = "";

		showScreen("intro");
	};

	openButton.addEventListener("click", () => {
		dialog.showModal();
	});

	startButton.addEventListener("click", startGame);
	restartButton.addEventListener("click", startGame);
	ball.addEventListener("click", hitBall);
	challengeButton.addEventListener("click", showChallenge);

	dialog.addEventListener("close", resetGame);
};
