import BasicButtons from './Button';
import AppContext from './AppContext';
import { useContext } from 'react';

function RoutingButton(props) {
    let [context, setContext] = useContext(AppContext);
    return <BasicButtons className='module__item btn-nav' text={props.text} onClick={() => setContext({...context, route: props.routeTarget })} />
}

export default RoutingButton;