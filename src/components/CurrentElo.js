import AppContext from './AppContext';
import { useContext, useState } from 'react';
import { reduceElo } from './../data/EloTools';

function CurrentElo(props) {
	let [context, setContext] = useContext(AppContext);
	let elo;

	if (context.user) {
		elo = reduceElo(context.user.events.filter(i => i.type === 'ClimbAttempt' && i.ranked), context.user.baseRating);
	}
	return <span className='str-score'>{context.user && (props.text || 'Current Ranking: ') + (elo / 100).toFixed(2)}</span>;
}

export default CurrentElo;