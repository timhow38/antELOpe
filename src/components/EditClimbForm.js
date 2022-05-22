import AppContext from './AppContext';
import { useState, useContext } from 'react';
import Button from './Button';

function EditClimbForm(props) {
    let [context, setContext] = useContext(AppContext);
    let climb = props.climb;

    let [grade, setGrade] = useState('');

    function validate() {
        return climb.rope && climb.colour && climb.grade;
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
        <Button text='Save' onClick={() => {
            if (validate()) {
                climb.persist(context.db);
                props.successCallback(climb);
            } else {
                alert("Please fill all inputs");
            }
        }} />
        <Button text='Cancel' onClick={() => props.failCallback()} />
    </div>
}

export default EditClimbForm;