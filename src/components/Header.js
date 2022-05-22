import RoutingButton from './RoutingButton';
import Login from './Login';
import CurrentElo from './CurrentElo';

function Header(props) {
    return <>
        <div id='header'>
            <RoutingButton text='Back home' routeTarget='' />
            <Login />
            <CurrentElo />
        </div>
    </>
}



export default Header;