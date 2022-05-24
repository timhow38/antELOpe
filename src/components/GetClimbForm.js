import { useState, useContext } from 'react';
import BasicButtons from './Button';
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
            props.callback(c);
        }
    }

    function addNewClimb() {
        let c = new Climb(rope + '-' + colour, rope, colour, 15, []);
        setClimb(c);
    }

    function reset() {
        setRope('');
        setColour('');
        setGrade('');
        setClimb(null);
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
                <BasicButtons text='Climb not found. Add it?' onClick={() => addNewClimb()}/>
            </div>
        }
        {
            newClimb && climb && <EditClimbForm climb={climb} failCallback={reset} successCallback={gotClimb}/>
        }
    </>;

}

export default GetClimbForm;