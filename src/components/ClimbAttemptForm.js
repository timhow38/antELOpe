import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ClimbAttempt from './../data/ClimbAttempt';
import AppContext from './AppContext';
import { useContext } from 'react';
import GetClimbForm from './GetClimbForm';
import { getNextElo, reduceElo } from './../data/EloTools';

function ClimbAttemptForm(props) {
    let [context, setContext] = useContext(AppContext);

    let [climb, setClimb] = useState(null);
    let [started, setStarted] = useState(false);

    function handleOutcomeChange(outcome) {
        let climbAttempt = new ClimbAttempt(props.ranked, climb.rope, climb.colour, climb.baseRating, outcome);
        context.user.events.push(climbAttempt);
        context.user.persist(context.db);
        setContext({ ...context, route: '' });
    }

    let currentElo = reduceElo(context.user.events.filter(i => i?.ranked), context.user.baseRating);

    let tentativeElos = [];
    if (climb) {
        tentativeElos = [1, 0.5, 0].map(outcome => {
            let tentativeElo = getNextElo(currentElo, climb.baseRating, outcome);
            return {
                outcome: outcome === 1 ? 'Clean' : outcome === 0 ? 'DNF' : 'Dirty',
                rawElo: tentativeElo,
                elo: tentativeElo,
                delta: tentativeElo - currentElo
            }
        });

        tentativeElos.push({
            outcome: 'Current',
            elo: currentElo,
            rawElo: currentElo,
            delta: 0
        })
    }

    return <>
        <Typography variant='h4'>Climbing {props.ranked ? 'Ranked' : 'Casual'}</Typography>
        {!climb && <GetClimbForm callback={setClimb} />}
        {climb && <>
            <Typography variant='h6'>{climb.id}</Typography>
            {(!started && <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button onClick={() => setStarted(true)}>Get Started!</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => setClimb(null)}>Cancel</Button>
                </Grid>
            </Grid>) || <div>
                    {
                        tentativeElos
                            .sort((eA, eB) => eA.elo < eB.elo ? 1 : -1)
                            .map(e => { return { ...e, elo: (e.elo / 100).toFixed(2), delta: (e.delta / 100).toFixed(2) } })
                            .map(e => <div key={e.elo}>{e.outcome} -> {e.elo} ({e.delta > 0 ? '+' + e.delta : e.delta})</div>)
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Button text='Finished Cleanly' onClick={() => handleOutcomeChange(1)} />
                        </Grid>
                        <Grid item xs={4}>
                            <Button text='Finished Dirty' onClick={() => handleOutcomeChange(0.5)} />
                        </Grid>
                        <Grid item xs={4}>
                            <Button text="Didn't Finish" onClick={() => handleOutcomeChange(0)} />
                        </Grid>
                    </Grid>
                </div>
            }
        </>
        }

    </>

}

export default ClimbAttemptForm;