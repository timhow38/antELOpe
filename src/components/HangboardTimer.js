import BasicButtons from './Button';
import { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import HangboardTime from '../data/HangboardTime';

function HangboardTimer(props) {
    let [time, setTime] = useState(null);
    let [running, setRunning] = useState(false);
    let [context, setContext] = useContext(AppContext);

    useEffect(() => {
        if (running)
            setTimeout(() => setTime(time + 0.1), 100);
    }, [time]);

    function start() {
        setRunning(true);
        setTime(0);
    }

    function stopAndRecord() {
        setRunning(false);
        context.user.events.push(new HangboardTime((time + .1).toFixed(1)));
        context.user.persist(context.db);
    }
    return <>
        <div>{(time ?? 0).toFixed(1)}</div>
        {!running && time > 0 && <div>Recorded a time of: {time.toFixed(1)}s</div>}
        {!running && <BasicButtons text='Start' onClick={() => start()} />
            || <BasicButtons text='Finish' onClick={() => stopAndRecord()} />}

    </>;
}

export default HangboardTimer;