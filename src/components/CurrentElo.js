import AppContext from './AppContext';
import { useContext, useState } from 'react';
import { reduceElo } from './../data/EloTools';
import { Typography } from '@mui/material';
import './../styles/CurrentElo.css';

function CurrentElo(props) {
	let [context, setContext] = useContext(AppContext);
	let elo;

	if (context.user) {
		elo = reduceElo(context.user.events.filter(i => i.type === 'ClimbAttempt' && i.ranked), context.user.baseRating);
	}
	return <Typography variant='h6' className='current-elo'>{context.user && (props.text || 'Current Ranking: ') + (elo / 100).toFixed(2)}</Typography>;
}

export default CurrentElo;