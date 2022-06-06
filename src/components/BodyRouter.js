import RoutingButton from './RoutingButton';
import HangboardTimer from './HangboardTimer';
import ClimbAttemptForm from './ClimbAttemptForm';
import AppContext from './AppContext';
import History from './History';
import LeaderBoards from './LeaderBoards';
import EditClimbForm from './EditClimbForm';
import { useContext } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import './../styles/BodyRouter.css';

function BodyRouter(props) {
    let [context, setContext] = useContext(AppContext);
    return context.user && <Paper id='page-body' elevation={3}>
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
                case 'leaderBoards':
                    return <LeaderBoards />
                case 'editClimbs':
                    return <div>
                        <Typography variant='h4'>Edit or add a climb</Typography>
                        <EditClimbForm />
                    </div>
                default:
                    return <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RoutingButton text="Ranked Climb" routeTarget={'rankedClimb'} />
                        </Grid>
                        <Grid item xs={6}>
                            <RoutingButton text="Casual Climb" routeTarget={'casualClimb'} />
                        </Grid>
                        <Grid item xs={4}>
                            <RoutingButton text="Hangboard Timer" routeTarget={'hangboardTimer'} />
                        </Grid>
                        <Grid item xs={4}>
                            <RoutingButton text="My History" routeTarget={'history'} />
                        </Grid>
                        <Grid item xs={4}>
                            <RoutingButton text="Leaderboards" routeTarget={'leaderBoards'} />
                        </Grid>
                        <Grid item xs={4}>
                            <RoutingButton text="Edit Climbs" routeTarget={'editClimbs'} />
                        </Grid>
                    </Grid>
            }
        })()
        }
    </Paper >
}

export default BodyRouter;