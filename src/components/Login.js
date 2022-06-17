import AppContext from './AppContext';
import { useContext } from 'react';
import User from './../data/User';
import TextField from '@mui/material/TextField'; 

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

    let textLabel = context.user ? "Logged in as" : "Enter Your Name";

    return <TextField fullWidth={false} sx={props.sx} label={textLabel} variant="outlined" onBlur={handleUserNameChange} value={userName || context.user?.id} disabled={!!context.user}/>
}
export default Login;