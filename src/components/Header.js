import RoutingButton from './RoutingButton';
import Login from './Login';
import CurrentElo from './CurrentElo';
import DoubleSpinner from './DoubleSpinner';

function Header(props) {
    return <>
        <div id='header'>
            <RoutingButton text='Back home' routeTarget='' />
            <Login />
            <CurrentElo />
            <DoubleSpinner />
        </div>
    </>
}



export default Header;