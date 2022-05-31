import AppContext from './AppContext';
import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

function EditClimbForm(props) {
    let [context, setContext] = useContext(AppContext);
    let climb = props.climb;

    let [grade, setGrade] = useState(climb.grade ?? '');


    function validate() {
        return climb.rope && climb.colour && climb.grade;
    }

    function save() {
        if (validate()) {
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
        <div >Rope: {climb.rope}</div>
        <div >Colour: {climb.colour}</div>
        <div >Grade:
            <TextField variant="outlined" value={grade} onChange={(e) => {
                climb.grade = e.target.value;
                climb.baseRating = e.target.value * 100;
                setGrade(e.target.value);
            }} />
        </div>

        <Button onClick={() => save()} >Save</Button>
        <Button onClick={() => cancel()} >Cancel</Button>
    </div>
}

export default EditClimbForm;