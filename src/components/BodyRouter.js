import RoutingButton from './RoutingButton';
import HangboardTimer from './HangboardTimer';
import ClimbAttemptForm from './ClimbAttemptForm';
import AppContext from './AppContext';
import History from './History';
import LeaderBoards from './LeaderBoards';
import { useContext } from 'react';

function BodyRouter(props) {
    let [context, setContext] = useContext(AppContext);
    return <>
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
                    case 'leaderBoards':
                        return <LeaderBoards />
                    default:
                        return context.user && <>
                            <div>
                                <RoutingButton text="Start a ranked climb" routeTarget={'rankedClimb'} />
                                <RoutingButton text="Start a casual climb" routeTarget={'casualClimb'} />
                                <RoutingButton text="Time a hangboard hang" routeTarget={'hangboardTimer'} />
                            </div>
                            <div>
                                <RoutingButton text="My History" routeTarget={'history'} />
                                <RoutingButton text="Leaderboards" routeTarget={'leaderBoards'} />
                            </div>
                        </>
                }
            })()}
        </div>
    </>
}

export default BodyRouter;