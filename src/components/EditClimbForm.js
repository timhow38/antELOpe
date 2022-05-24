import AppContext from './AppContext';
import { useState, useContext } from 'react';
import Button from './Button';

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
            <input value={grade} onChange={(e) => {
                climb.grade = e.target.value;
                climb.baseRating = e.target.value * 100;
                setGrade(e.target.value);
            }} />
        </div>
        <Button text='Save' onClick={() => save()} />
        <Button text='Cancel' onClick={() => cancel()} />
    </div>
}

export default EditClimbForm;