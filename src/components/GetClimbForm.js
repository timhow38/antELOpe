import { useState, useContext } from 'react';
import Button from './Button';
import Climb from './../data/Climb';
import AppContext from './AppContext';
import EditClimbForm from './EditClimbForm';

function GetClimbForm(props) {
    let [context, setContext] = useContext(AppContext);

    let [rope, setRope] = useState('');
    let [colour, setColour] = useState('');
    let [grade, setGrade] = useState('');

    let [newClimb, setNewClimb] = useState(false);
    let [climb, setClimb] = useState(null);


    async function handleClimbChanged() {
        let c = await Climb.fromFirestore(context.db, rope + '-' + colour);
        if (!c)
            setNewClimb(true);
        else {
            setClimb(c);
            if (props.callback)
                props.callback(c);
        }
    }

    function addNewClimb() {
        let c = new Climb(rope + '-' + colour, rope, colour, 15, []);
        setClimb(c);
    }

    function gotClimb(climb) {
        setClimb(climb);
        if (props.callback)
            props.callback(climb);
    }

    return <>
        {props.title && <div>Edit a Climb</div>}
        {!climb && <>
            <input placeholder='Rope' value={rope} onChange={(e) => setRope(e.target.value)} />
            <input placeholder='Colour' value={colour} onChange={(e) => setColour(e.target.value)} onBlur={() => handleClimbChanged()} />
        </>
        }
        {
            newClimb && !climb && <div>
                <Button text='Climb not found. Add it?' onClick={() => addNewClimb()}/>
            </div>
        }
        {
            climb && <EditClimbForm climb={climb} successCallback={gotClimb} failCallback={() => setClimb(null)}/>
        }
    </>;

}

export default GetClimbForm;