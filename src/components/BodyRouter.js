import Button from './Button';
import RoutingButton from './RoutingButton';
import HangboardTime from './../data/HangboardTime';
import ClimbAttemptForm from './ClimbAttemptForm';
import AppContext from './AppContext';
import History from './History';
import GetClimbForm from './EditClimbForm';
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
                    case 'history':
                        return <History />
                    default:
                        return context.user && <>
                            <div>
                                <RoutingButton text="Start a ranked climb" routeTarget={'rankedClimb'} />
                                <RoutingButton text="Start a casual climb" routeTarget={'casualClimb'} />
                                <Button text="Record a hangboard time" onClick={() => { context.user.events.push(new HangboardTime(60)); context.user.persist(context.db); }} />
                            </div>
                            <div>
                                <RoutingButton text="My History" routeTarget={'history'} />
                            </div>
                        </>
                }
            })()}
        </div>
    </>
}

export default BodyRouter;