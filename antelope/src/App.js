import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import config from './config';
import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const someDocRef = doc(db, 'PooCollection', 'PeeDoc');

function App() {
    const count = useState(0);
    
    return (
        <div className="App">
            <form className='frmClimbAction'>
            <Button text="Start a ranked climb" />
            <Button text="Start a casual climb" />
            <Button text="Record a hangboard time" onClick={() => setDoc(someDocRef, { jorts: 'Bad' })}/>
            </form>
        </div>
    );
}

export default App;
