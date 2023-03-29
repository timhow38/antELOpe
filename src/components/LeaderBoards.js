import AppContext from './AppContext';
import { useContext, useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import * as Rc from './../data/ReducerComposer';
import HeightClimbedTracker from './HeightClimbedTracker';


function LongestHang(props) {
    let results = Rc.compose([
        Rc.scoreMaps.hangboardTimes,
        Rc.aggregators.max,
        Rc.orders.highToLow
    ])(props.users);
    return <>
        <h2>Longest Hangs</h2>
        {results.map(score => <div key={'lh' + score.id}>{score.id}: {score.finalScore}</div>)}
    </>
}

function CurrentGrade(props) {
    let results = Rc.compose([
        Rc.scoreMaps.eloHistory,
        Rc.aggregators.last,
        Rc.orders.highToLow
    ])(props.users);
    return <>
        <h2>Current Grade</h2>
        {results.map(score => <div key={'lh' + score.id}>{score.id}: {score.finalScore}</div>)}
    </>
}

function LeaderBoards(props) {
    let [context, setContext] = useContext(AppContext);
    let [users, setUsers] = useState();
    
    async function getUsers() {
        let snapshot = await getDocs(query(collection(context.db, 'users')));
        setUsers(snapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } }));
    }

    useEffect(() => {
        if (!users)
            getUsers();
    }, [users]);

    return <>
        {users && <>
            <LongestHang users={users} />
            <CurrentGrade users={users} />
            <HeightClimbedTracker height={100}/>
        </>}
    </>
}

export default LeaderBoards;