import RoutingButton from './RoutingButton';
import Login from './Login';
import CurrentElo from './CurrentElo';
import './../styles/Header.css'

function Header(props) {
    return <>
        <div id='nav-header'>
            <RoutingButton text='Back home' routeTarget='' />
            <Login />
            <CurrentElo />
        </div>
    </>
}



export default Header;