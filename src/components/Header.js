import RoutingButton from './RoutingButton';
import Login from './Login';
import CurrentElo from './CurrentElo';
import { useContext } from 'react';
import AppContext from './AppContext';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


function Header(props) {
    let [context, setContext] = useContext(AppContext);

    return <div id='nav-header'>
        {(
             context.user && <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
             <Toolbar>
             <Login />
               <CurrentElo />
               <RoutingButton text='Home' routeTarget='' />
             </Toolbar>
           </AppBar>
        ) || <Login sx={{ width: '100%' }}/>}
    </div>
}

export default Header;