import './App.css';
import Header from './components/Header';
import BodyRouter from './components/BodyRouter';
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import AppContext from './components/AppContext';
import config from './config';
import VisualClimbSelector from './components/VisualClimbSelector';

function App() {
    let firebaseApp = initializeApp(config);
    let [context, setContext] = useState({
        user: null,
        route: null,
        db: getFirestore(firebaseApp)
    });

    return (
        <AppContext.Provider className="App" value={[context, setContext]}>
            <VisualClimbSelector />
            <Header />
            <BodyRouter />
        </AppContext.Provider>
    );
}

export default App;
