import Button from './Button';
import AppContext from './AppContext';
import { useContext } from 'react';

function RoutingButton(props) {
    let context = useContext(AppContext);
    return <Button text={props.text} onClick={() => context.route == props.routeTarget} />
}

export default RoutingButton;