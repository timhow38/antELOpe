import Button from './Button';
import { useState } from 'react';
import ClimbAttempt from './../data/ClimbAttempt';
import AppContext from './AppContext';
import { useContext } from 'react';
import GetClimbForm from './GetClimbForm';

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

    return <>
        <div>Climbing {props.ranked ? 'Ranked' : 'Casual'}</div>
        {!climb && <GetClimbForm callback={setClimb} /> }
        {climb && <>
            <div>{climb.id}</div>
            {!started && <>
                <Button text='Get Started!' onClick={() => setStarted(true)} />
                <Button text='Cancel' onClick={() => setClimb(null)} />
            </> ||
            <div>
                <Button text='Finished Cleanly' onClick={() => handleOutcomeChange(1)}/>
                <Button text='Finished Dirty' onClick={() => handleOutcomeChange(0.5)}/>
                <Button text="Didn't Finish" onClick={() => handleOutcomeChange(0)}/>
            </div>
            }
        </>
        }
        
    </>

}

export default ClimbAttemptForm;