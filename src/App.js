import './App.css';
import Header from './components/Header';
import BodyRouter from './components/BodyRouter';
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import muiTheme from './styles/MuiTheme';
import AppContext from './components/AppContext';
import config from './config';

function App() {
    let firebaseApp = initializeApp(config);
    let [context, setContext] = useState({
        user: null,
        route: null,
        db: getFirestore(firebaseApp)
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <AppContext.Provider value={[context, setContext]}>
                <CssBaseline />
                <Header />
                <BodyRouter />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;