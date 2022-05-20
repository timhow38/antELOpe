import Button from './Button';
import HangboardTime from './../data/HangboardTime';

function BodyRouter(props) {
    return <>
        <div id='pageBody'>
            {RenderSwitch(props.route, props.user)}
        </div>
    </>
}

function RenderSwitch(route, user) {
    let disabled = !user;
    switch (route) {
        default:
            return <>
                <Button text="Start a ranked climb" disabled={disabled}/>
                <Button text="Start a casual climb" disabled={disabled}/>
                <Button text="Record a hangboard time" disabled={disabled} onClick={() => { user.events.push({ type: 'HangboardTime', startTime: Date(), durationSeconds: 60 }); user.persist(); }}/>
            </>
    }
}

export default BodyRouter;