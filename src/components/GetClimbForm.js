import { useState, useContext } from 'react';
import { Button, TextField, Grid } from '@mui/material';
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
        {!climb && <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField sx={{ width: '100%' }} label="Rope" variant="outlined" placeholder='Rope' value={rope} onChange={(e) => setRope(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField sx={{ width: '100%' }} label="Colour" variant="outlined" placeholder='Colour' value={colour} onChange={(e) => setColour(e.target.value)} onBlur={() => handleClimbChanged()} />
            </Grid>
        </Grid>
        }
        {
            newClimb && !climb && <div>
                <Button onClick={() => addNewClimb()}>Climb not found. Add it?</Button>
            </div>
        }
        {
            climb && <EditClimbForm climb={climb} successCallback={gotClimb} failCallback={() => setClimb(null)} />
        }
    </>;

}

export default GetClimbForm;