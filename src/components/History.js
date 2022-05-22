import AppContext from './AppContext';
import { useContext } from 'react';

function History(props) {
    function transformTime(timeStr) {
        return new Date(timeStr).toISOString().substring(0, 19);
    }
    let [context, setContext] = useContext(AppContext);
    return <>
        <h2>Ranked Climbs</h2>
        {context.user.events
            .filter(event => event.type === 'ClimbAttempt' && event.ranked)
            .map(event => <div>{event.rope}-{event.colour} at {transformTime(event.startTime)}: {event.outcome}</div>)
        }
        <h2>Casual Climbs</h2>
        {context.user.events
            .filter(event => event.type === 'ClimbAttempt' && !event.ranked)
            .map(event => <div>{event.rope}-{event.colour} at {transformTime(event.startTime)}: {event.outcome}</div>)
        }
        <h2>Hangboard Times</h2>
        {context.user.events
            .filter(event => event.type === 'HangboardTime')
            .map(event => <div>{transformTime(event.startTime)}: {event.durationSeconds}s</div>)
        }
    </>

}

export default History;