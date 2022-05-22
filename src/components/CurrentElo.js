import AppContext from './AppContext';
import { useContext, useState } from 'react';

function CurrentElo(props) {
	let [context, setContext] = useContext(AppContext);
	let elo

	function winProbability(thisElo, otherElo) {
		return 1.0 / (1 + Math.pow(10, (otherElo - thisElo) / 400));
	}

	function getNextElo(thisElo, otherElo, outcome, developmentCoefficient) {
		console.log(thisElo, otherElo, outcome, developmentCoefficient);
		return thisElo + (developmentCoefficient * (outcome - winProbability(thisElo, otherElo)));
	}

	if (context.user) {
		elo = context.user.events
			.filter(i => i.type === 'ClimbAttempt' && i.ranked && i.climbRating)
			.reduce(
				(prevElo, nextEvent) => getNextElo(prevElo, nextEvent.climbRating, nextEvent.outcome, 30),
				context.user.baseRating
			);
	}
	return <span>{elo && Math.round(elo)}</span>;
}

export default CurrentElo;