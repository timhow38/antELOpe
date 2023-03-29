import AppContext from './AppContext';
import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Climb from './../data/Climb';

function EditClimbForm(props) {
    let [context, setContext] = useContext(AppContext);

    let [rope, setRope] = useState(props.rope ?? '');
    let [colour, setColour] = useState(props.colour ?? '');
    let [grade, setGrade] = useState(props.grade ?? '');


    function validate() {
        return rope && colour && grade;
    }

    function save() {
        if (validate()) {
            let climb = new Climb(rope + '-' + colour, rope.toString(), colour, grade, [], true, grade * 100);
            climb.persist(context.db);
            if (props.successCallback)
                props.successCallback(climb);
        } else {
            alert("Please fill all inputs");
        }
    }

    function cancel() {
        if (props.failCallback)
            props.failCallback();
    }

    return <div>
        <h2>Edit or add a climb</h2>
        <TextField
            variant="outlined"
            value={rope}
            disabled={!!props.rope}
            placeholder='Rope'
            label='Rope'
            onChange={(e) => {
                setRope(e.target.value);
            }}
        />
        <TextField
            variant="outlined"
            value={colour}
            disabled={!!props.colour}
            placeholder='Colour'
            label='Colour'
            onChange={(e) => {
                setColour(e.target.value);
            }}
        />
        <TextField
            variant="outlined"
            value={grade}
            disabled={!!props.grade}
            placeholder='Grade'
            label='Grade'
            onChange={(e) => {
                setGrade(e.target.value);
            }}
        />

        <Button onClick={() => save()} >Save</Button>
        <Button onClick={() => cancel()} >Cancel</Button>
    </div>
}

export default EditClimbForm;