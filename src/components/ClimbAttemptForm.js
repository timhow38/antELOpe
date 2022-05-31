import BasicButton from './BasicButton';
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
        <div>Climbing {props.ranked ? 'Ranked' : 'Casual'}</div>
        {!climb && <GetClimbForm callback={setClimb} /> }
        {climb && <>
            <div>{climb.id}</div>
            {!started && <>
                <BasicButton text='Get Started!' onClick={() => setStarted(true)} />
                <BasicButton text='Cancel' onClick={() => setClimb(null)} />
            </> || <div>
                {
                    tentativeElos
                        .sort((eA, eB) => eA.elo < eB.elo ? 1 : -1)
                        .map(e => { return { ...e, elo: (e.elo / 100).toFixed(2), delta: (e.delta / 100).toFixed(2) } })
                        .map(e => <div key={e.elo}>{e.outcome} -> {e.elo} ({e.delta > 0 ? '+' + e.delta : e.delta})</div>)
                }
                <BasicButton text='Finished Cleanly' onClick={() => handleOutcomeChange(1)}/>
                <BasicButton text='Finished Dirty' onClick={() => handleOutcomeChange(0.5)}/>
                <BasicButton text="Didn't Finish" onClick={() => handleOutcomeChange(0)}/>
            </div>
            }
        </>
        }
        
    </>

}

export default ClimbAttemptForm;