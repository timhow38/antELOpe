import RoutingButton from './RoutingButton';
import Login from './Login';
import CurrentElo from './CurrentElo';
import { useContext } from 'react';
import AppContext from './AppContext';
import { Grid } from '@mui/material';


function Header(props) {
    let [context, setContext] = useContext(AppContext);

    return <div id='nav-header'>
        {(
             context.user && <Grid container spacing={2}>
             <Grid item xs={4}>
                 <Login />
             </Grid>
             <Grid item xs={4}>
                 <CurrentElo />
             </Grid>
             <Grid item xs={4}>
                 <RoutingButton text='Home' routeTarget='' />
             </Grid>
         </Grid>
        ) || <Login sx={{ width: '100%' }}/>}
    </div>
}

export default Header;