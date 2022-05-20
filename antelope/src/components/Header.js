import RoutingButton from './RoutingButton';
import Login from './Login';

function Header(props) {
    return <>
        <div id='header'>
            <RoutingButton text='Back home' routeTarget='' />
            <Login />
        </div>
    </>
}



export default Header;