import RoutingButton from './RoutingButton';
import AppContext from './AppContext';
import User from './../data/User';
import { useContext } from 'react';
let userName;

function Header(props) {

    let [context, setContext] = useContext(AppContext);

    function handleUserNameChange(event) {
        userName = event.target.value;
        if (userName)
            retrieveUserData(userName);
    }

    async function retrieveUserData(userName) {
        let u = await User.fromFirestore(context.db, userName);
        setContext({...context, user: u });
        if (!u)
            alert("Couldn't find that user");
    }

    return <>
        <div id='header'>
            <RoutingButton text='Back home' routeTarget='' />
            <input type='text' placeholder='Enter your name' onBlur={handleUserNameChange} value={userName}/>
        </div>
    </>


}



export default Header;