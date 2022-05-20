import RoutingButton from './RoutingButton';

function Header(props) {
    return <>
        <div id='header'>
            <RoutingButton text='Back home' routeTarget='menu' {...props} />
            <input type='text' placeholder='Enter your name' onBlur={props.onNameEntered} />
        </div>
    </>
}

export default Header;