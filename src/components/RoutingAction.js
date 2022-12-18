import { BottomNavigationAction } from '@mui/material';
import AppContext from './AppContext';
import { useContext } from 'react';

function RoutingAction(props) {
    let [context, setContext] = useContext(AppContext);
    return (
        <BottomNavigationAction className='routing-button' icon={props.icon} label={props.label} onClick={() => setContext({ ...context, route: props.routeTarget })}>
          <div>{props.label}</div>
        </BottomNavigationAction>
      );
}

export default RoutingAction;
