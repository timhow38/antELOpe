import RoutingButton from './RoutingButton';
import HangboardTimer from './HangboardTimer';
import ClimbAttemptForm from './ClimbAttemptForm';
import AppContext from './AppContext';
import History from './History';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';

function BodyRouter(props) {
    let [context, setContext] = useContext(AppContext);
    return <>
        <Paper elevation={3}>
        <div id='pageBody'>
            {(() => {
                switch (context.route) {
                    case 'rankedClimb':
                        return <ClimbAttemptForm ranked={true} />
                    case 'casualClimb':
                        return <ClimbAttemptForm ranked={false} />
                    case 'hangboardTimer':
                        return <HangboardTimer />
                    case 'history':
                        return <History />
                    default:
                        return context.user && <>
                            <div>
                                <RoutingButton text="Start a ranked climb" routeTarget={'rankedClimb'} />
                                <RoutingButton text="Start a casual climb" routeTarget={'casualClimb'} />
                                <RoutingButton text="Time a hangboard hang" routeTarget={'hangboardTimer'} />
                            </div>
                            <div>
                                <RoutingButton text="My History" routeTarget={'history'} />
                            </div>
                        </>
                }
            })()}
        </div>
        </Paper>
    </>
}

export default BodyRouter;