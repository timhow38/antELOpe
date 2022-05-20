import './App.css';
import Header from './components/Header';
import BodyRouter from './components/BodyRouter';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import config from './config';
import React, { useState } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import User from './data/User';

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);

function App() {
    let userName = useState('');
    let [user, setUser] = useState(null);
    const route = useState(null);

    function handleUserNameChange(event) {
        userName = event.target.value;
        if (userName)
            retrieveUserData(userName);
    }

    async function retrieveUserData(userName) {
        let u = await User.fromFireStore(db, userName)
        setUser(u);
        if (!u)
            alert("Couldn't find that user");
    }

    return (
        <div className="App">
            <Header onNameEntered={handleUserNameChange} />
            <BodyRouter currentRoute={route} user={user} />
        </div>
    );
}

export default App;
