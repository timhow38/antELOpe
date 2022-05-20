import Button from './Button';
import RoutingButton from './RoutingButton';
import HangboardTime from './../data/HangboardTime';
import ClimbAttempt from './ClimbAttempt';
import AppContext from './AppContext';
import { useContext } from 'react';

function BodyRouter(props) {
    let context = useContext(AppContext);
    console.log('Router has context');
    console.log(context);
    return <>
        <div id='pageBody'>
            {(() => {
                switch (context.route) {
                    case 'rankedClimb':
                        return <ClimbAttempt ranked={true} />
                    case 'casualClimb':
                        return <ClimbAttempt ranked={false} />
                    default:
                        return context.user && <>
                            <RoutingButton text="Start a ranked climb" routeTarget={'rankedClimb'} />
                            <RoutingButton text="Start a casual climb" routeTarget={'casualClimb'} />
                            <Button text="Record a hangboard time" onClick={() => { props.user.events.push(new HangboardTime(60)); props.user.persist(); }} />
                        </>
                }
            })()}
        </div>
    </>
}

function RenderSwitch(route, user) {
    

}

export default BodyRouter;