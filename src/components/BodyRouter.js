import RoutingButton from './RoutingButton';
import HangboardTimer from './HangboardTimer';
import ClimbAttemptForm from './ClimbAttemptForm';
import AppContext from './AppContext';
import History from './History';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function BodyRouter(props) {
    let [context, setContext] = useContext(AppContext);
    return <>
        <Paper id='pageBody' elevation={3}>
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
                            <Stack direction="row" spacing={2}>
                                <RoutingButton text="Ranked Climb" routeTarget={'rankedClimb'} />
                                <RoutingButton text="Casual Climb" routeTarget={'casualClimb'} />
                                <RoutingButton text="Hangboard Timer" routeTarget={'hangboardTimer'} />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <RoutingButton text="My History" routeTarget={'history'} />
                            </Stack>
                        </>
                }
            })()}
        </Paper>
    </>
}

export default BodyRouter;