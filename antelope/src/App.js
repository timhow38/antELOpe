import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import config from './config';
import React, { useState } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);


function App() {
    const count = useState(0);
    let userName = useState('');
    let userData = useState(null);

    function handleUserNameChange(event) {
        userName = event.target.value;
        retrieveUserData(userName);
    }

    async function retrieveUserData(user) {
        let docRef = doc(db, 'users', user);
        let userSnap = await getDoc(docRef);
        if (userSnap.exists()) {
            userData = userSnap.data();
            alert("Holy shit it worked");
        }
    }

    return (
        <div className="App">
            <form className='frmClimbAction'>
                <input type='text' placeholder='Enter your name' onChange={handleUserNameChange} />
                <Button text="Start a ranked climb" />
                <Button text="Start a casual climb" />
                <Button text="Record a hangboard time"/>
            </form>
        </div>
    );
}

export default App;
