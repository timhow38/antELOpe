import './App.css';
import Header from './components/Header';
import BodyRouter from './components/BodyRouter';
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import AppContext from './components/AppContext';
import config from './config';

function App() {
    let firebaseApp = initializeApp(config);
    let [context, setContext] = useState({
        user: null,
        route: null,
        db: getFirestore(firebaseApp)
    });

    const theme = createTheme({
        palette: {
            text: {
                primary: '#fff',
                secondary: '#fff',
            },
            primary: {
                main: blue[800],
            },
            secondary: {
                main: blue[500],
            },
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider className="page-wrap" value={[context, setContext]}>
                <Header />
                <BodyRouter />
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;