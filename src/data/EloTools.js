function winProbability(thisElo, otherElo) {
	return 1.0 / (1 + Math.pow(10, (otherElo - thisElo) / 400));
}

function getNextElo(thisElo, otherElo, outcome, developmentCoefficient=30) {
	return thisElo + (developmentCoefficient * (outcome - winProbability(thisElo, otherElo)));
}

function reduceEloHistory(events, baseRating) {
	let history = [];
	events.filter(i => i.climbRating)
		.reduce((prevElo, nextEvent) => {
			let elo = getNextElo(prevElo, nextEvent.climbRating, nextEvent.outcome);
			history.push({
				startTime: nextEvent.startTime,
				climbRating: nextEvent.climbRating,
				outcome: nextEvent.outcome,
				currentElo: elo,
				eloDelta: elo - prevElo
				});
			return elo;
		}, baseRating);
	return history;
};

function reduceElo(events, baseRating) {
	let history = reduceEloHistory(events, baseRating);
	return history[history.length - 1].currentElo;
}

export { getNextElo, reduceEloHistory, reduceElo };