import AppContext from './AppContext';
import { useContext } from 'react';
import User from './../data/User';

function Login(props) {
    let [context, setContext] = useContext(AppContext);
    let userName;

    function handleUserNameChange(event) {
        userName = event.target.value;
        if (userName)
            retrieveUserData(userName);
    }

    async function retrieveUserData(userName) {
        let u = await User.fromFirestore(context.db, userName);
        setContext({ ...context, user: u });
        if (!u)
            alert("Couldn't find that user");
    }

    return <input type='text' placeholder='Enter your name' onBlur={handleUserNameChange} value={userName} />
}

export default Login;