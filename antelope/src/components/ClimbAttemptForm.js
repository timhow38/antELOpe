import Button from './Button';
import { useState } from 'react';
import ClimbAttempt from './../data/ClimbAttempt';
import AppContext from './AppContext';
import { useContext } from 'react';

function ClimbAttemptForm(props) {
    let [context, setContext] = useContext(AppContext);

    let [rope, setRope] = useState('');
    let [colour, setColour] = useState('');
    let [started, setStarted] = useState(false);
    let [outcome, setOutcome] = useState(null);

    function handleStarted() {
        if (rope && colour)
            setStarted(true);
        else
            alert('Please set rope and colour first');
    }

    function handleOutcomeChange(outcome) {
        let climbAttempt = new ClimbAttempt(props.ranked, rope, colour, outcome);
        context.user.events.push(climbAttempt);
        context.user.persist(context.db);
        setContext({ ...context, route: '' });
    }

    return <>
        <div>Climbing {props.ranked ? 'Ranked' : 'Casual'}</div>
        <input placeholder={'Rope'} onChange={(e) => setRope(e.target.value)} value={rope} />
        <input placeholder={'Colour'} onChange={(e) => setColour(e.target.value)} value={colour} />
        <Button text='Get Started!' onClick={() => handleStarted()}/>
        {
            started && <div>
                <Button text='Finished Cleanly' onClick={() => handleOutcomeChange(1)}/>
                <Button text='Finished Dirty' onClick={() => handleOutcomeChange(0.5)}/>
                <Button text="Didn't Finish" onClick={() => handleOutcomeChange(0)}/>
            </div>
        }
        
    </>

}

export default ClimbAttemptForm;