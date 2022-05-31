import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2277d9',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#282c34',
            paper: 'rgba(88,88,88,0.63)',
        },
    },
});

export default muiTheme;