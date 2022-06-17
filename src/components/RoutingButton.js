import { Button } from '@mui/material';
import AppContext from './AppContext';
import { useContext } from 'react';
import './../styles/RoutingButton.css';

function RoutingButton(props) {
    let [context, setContext] = useContext(AppContext);
    return <Button variant='contained' sx={{fullWidth: true}} className='routing-button' onClick={() => setContext({ ...context, route: props.routeTarget })}>{props.text}</Button>
}

export default RoutingButton;