import { useState } from 'react';

function DoubleSpinner(props) {
    let [value, setValue] = useState(0);


    function handleSpinUp() {
        setValue(value + 1);
    }

    return <div class='double-spinner-wrapper'>
        <div>{value}</div>
        <button onClick={handleSpinUp}>^</button>
    </div>
}

export default DoubleSpinner;