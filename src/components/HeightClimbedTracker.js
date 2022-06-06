import { useContext, useState } from 'react';
import AppContext from './AppContext';
import * as Rc from './../data/ReducerComposer';
import { collection, query, getDocs } from "firebase/firestore";
import { Typography } from '@mui/material';

const milestones = {
    'Mt. Everest': 8849,
    'Mt. Cook': 3724,
    'Eiffel Tower': 330,
    'Empire State Building': 443,
    'The Challenger Deep': 10915,
    'Hyperion (tallest tree)': 116,
    'The Great Pyramid of Giza': 139,
    'Angel Falls': 979,
    //'Big Ben': 96,
    'CN Tower (Ontario)': 553,
    //'Auckland Sky Tower': 328,
    'Statue of Liberty': 93,
    'Nelson\'s Column': 52,
    'St. Paul\'s Cathedral': 174,
    'Golden Gate Bridge': 227,
    'A microsecond of travel for a photon': 300,
    '400m running track': 400,
}

function HeightClimbedTracker(props) {
    let [context, setContext] = useContext(AppContext);
    let [totalHeight, setTotalHeight] = useState();

    async function retrieveHeight() {
        let ropes = {};
        let areasRef = collection(context.db, 'areas');
        let q = query(areasRef);
        let snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
            let areaRopes = doc.data().ropes;
            areaRopes.forEach(rope => {
                ropes[rope.number] = rope.height;
            });
        });

        context.user.events.forEach(event => {
            if (ropes && event.type == 'ClimbAttempt') {
                event.height = ropes[event.rope];
            }
        });

        let result = Rc.compose([
            Rc.scoreMaps.heightClimbed,
            Rc.aggregators.sum
        ])([context.user])[0];

        setTotalHeight(result.finalScore);
    }

    if (!totalHeight)
        retrieveHeight();

    return <>
        <Typography variant='h4'>Total Height Climbed</Typography>
        {totalHeight && <>
            <div>{totalHeight.toFixed(1)} m</div>
            <Typography variant='h6'>Milestones:</Typography>
            {Object.entries({ ...milestones, 'You': totalHeight })
                .sort(([_A, heightA], [_B, heightB]) => heightA > heightB ? -1 : 1)
                .map(([name, height]) => <div key={name} style={name == 'You' ? { textDecorationLine: 'underline' } : {}}>{name}: {height.toFixed(1)}m</div>)}
        </>}
    </>
}

export default HeightClimbedTracker;