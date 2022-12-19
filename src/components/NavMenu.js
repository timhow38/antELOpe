import RoutingButton from './RoutingButton';
import Login from './Login';
//import CurrentElo from './CurrentElo';
import { useContext } from 'react';
import AppContext from './AppContext';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RoutingAction from './RoutingAction';


function NavMenu(props) {
    let [context, setContext] = useContext(AppContext);

    return <div id='nav-menu'>
        {(
        context.user &&
        <BottomNavigation showLabels>
            <RoutingAction label="Home" routeTarget='' icon={<HomeIcon />} />
            <RoutingAction label="History" routeTarget='history' icon={<TimelineIcon />} />
            <RoutingAction label="LeaderBoard" routeTarget='leaderBoards' icon={<EmojiEventsIcon />} />
        </BottomNavigation>
        ) || <Login sx={{ width: '100%' }}/>}
    </div>
}

export default NavMenu;