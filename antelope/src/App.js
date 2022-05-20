import './App.css';
import Header from './components/Header';
import BodyRouter from './components/BodyRouter';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import config from './config';
import React, { useState, useContext } from 'react'
import User from './data/User';
import AppContext from './components/AppContext';

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);


function App() {
    let userName = useState('');
    let context = useContext(AppContext);
    function handleUserNameChange(event) {
        userName = event.target.value;
        if (userName)
            retrieveUserData(userName);
    }

    async function retrieveUserData(userName) {
        let u = await User.fromFirestore(db, userName);
        context.user = u;
        if (!u)
            alert("Couldn't find that user");
    }

    return (
        <div className="App">
            <Header onNameEntered={handleUserNameChange} />
            <BodyRouter/>
        </div>
    );
}

export default App;
