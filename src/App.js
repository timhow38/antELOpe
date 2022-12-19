import './App.css';
import NavMenu from './components/NavMenu';
import BodyRouter from './components/BodyRouter';
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import CssBaseline from "@mui/material/CssBaseline";
import AppContext from './components/AppContext';
import config from './config';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
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
        },
    },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: '#282c34bf',
            },
        },
    },
    MuiBottomNavigation: {
        styleOverrides: {
            root: {
                backgroundColor: '#2277d9',
            },
        },
    },

  },
});


function App() {
    let firebaseApp = initializeApp(config);
    let [context, setContext] = useState({
        user: null,
        route: null,
        db: getFirestore(firebaseApp)
    });

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={[context, setContext]}>
            <CssBaseline />
            <NavMenu />
            <BodyRouter />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;