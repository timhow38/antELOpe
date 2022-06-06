import AppContext from './AppContext';
import { useState, useContext } from 'react';
import './../styles/VisualClimbSelector.css';
import Area from './../data/Area';
import { collection, query, where, getDocs } from "firebase/firestore";
import Climb from './../data/Climb';
import EditClimbForm from './EditClimbForm';
import { Button } from '@mui/material';

function VisualClimbSelector(props) {
    let [area, setArea] = useState();

    function nameToSafeName(name) {
        return name.toLowerCase().replace(' ', '-');
    }

    function areasToGridTemplate(areas) {
        let [xMax, yMax] = areas.map(i => i.area).reduce(([xMax, yMax], currentArea) => {
            let [x, y, width, height] = currentArea;
            if (x + width > xMax) {
                xMax = x + width;
            }
            if (y + height > yMax) {
                yMax = y + height;
            }
            return [xMax, yMax];
        }, [0, 0]);

        let templateArr = Array(yMax).fill([]).map(() => Array(xMax).fill('.'));

        areas.forEach(i => {
            let [xMin, yMin, width, height] = i.area;
            for (let y = yMin; y < yMin + height; y++)
                for (let x = xMin; x < xMin + width; x++)
                    templateArr[y][x] = nameToSafeName(i.name);
        });
        return templateArr.map(row => `'` + row.join(' ') + `'`).join(' ');
    }

    function areaToGridSection(area) {
        let safeName = nameToSafeName(area.name);
        let className = 'climb-grid-section';
        if (!area.hasClimbs)
            className = className + ' no-climbs';
        return <div key={safeName} className={className} style={{ gridArea: safeName }} onClick={() => area.hasClimbs ? setArea(safeName) : null}>{area.name}</div>
    }

    let areas = [
        { name: 'Top Corner', hasClimbs: true, area: [0, 0, 3, 3] },
        { name: 'Training Mezzanine', area: [4, 0, 3, 1] },
        { name: 'Cave', area: [4, 1, 3, 1] },
        { name: 'Lead Walls', area: [0, 3, 3, 6] },
        { name: 'Overhangs', hasClimbs: true, area: [4, 2, 3, 4] },
        { name: 'Chimney', hasClimbs: true, area: [6, 6, 1, 1] },
        { name: 'Entrance Climbs', hasClimbs: true, area: [5, 7, 2, 2] },
        { name: 'Bottom Corner', hasClimbs: true, area: [0, 9, 3, 3] },
        { name: 'Outcrop', hasClimbs: true, area: [3, 9, 3, 3] },
        { name: 'Entrance', area: [6, 9, 1, 3] }
    ];

    let gridTemplate = areasToGridTemplate(areas);

    return (!area && <div className='climb-selector-background'>
        <div className='climb-selector-container' style={{ gridTemplateAreas: gridTemplate }}>
            {areas.map(i => areaToGridSection(i))}
        </div>
    </div>) || <RopeSelector area={area} failCallback={() => setArea(null)} successCallback={props.successCallback} />
}

function RopeSelector(props) {
    let [area, setArea] = useState();
    let [rope, setRope] = useState(null);
    let [context, setContext] = useContext(AppContext);

    let [editingRope, setEditingRope] = useState();

    let [editing, setEditing] = useState(false);

    let [waitingForUpdate, setWaitingForUpdate] = useState(true);

    async function retrieveAreaData() {
        let a = await Area.fromFirestore(context.db, props.area);
        setArea(a);
    }

    function cleanPlacement(offset, range) {
        return Math.round((100 * ((offset) / range)) / 10) * 10;
    }

    async function moveEditingRope(e) {
        let index = area.ropes.findIndex(r => r.number == editingRope);
        let rope = area.ropes[index];
        let y = cleanPlacement(e.clientY - e.target.offsetTop, e.target.offsetHeight);
        let x = cleanPlacement(e.clientX - e.target.offsetLeft, e.target.offsetWidth);
        rope.x = x;
        rope.y = y;
        area.ropes[index] = rope;
        console.log(area.ropes[index]);
        await area.persist(context.db);
        setEditingRope(null);
        await retrieveAreaData();
        
    }

    if (!area)
        retrieveAreaData();

    return ((rope == null) && <>
        <>{context.user.isAdmin && <Button onClick={() => setEditing(!editing)}>{editing ? 'Leave edit mode' : 'Go to edit mode'}</Button>}</>
        <>{area && <div className={'rope-selector-container' + (editing ? ' with-grid' : '')} onClick={editing && editingRope ? (e) => moveEditingRope(e) : null}>
            {
                area.ropes.map(rope =>
                    <div className='rope-selector-rope-card'
                        key={rope.number}
                        style={{ position: 'absolute', left: rope.x + '%', top: rope.y + '%' }}
                        onClick={editing ? () => setEditingRope(rope.number) : () => setRope(rope.number)}
                        sx={editingRope == rope.number ? { backgroundColor: '#F00' } : {}}>
                        {rope.number + (editingRope == rope.number ? '!' : '')}
                    </div>)
            }
        </div>}</>

    </>
    )
        ||
        <ClimbSelector rope={rope} successCallback={props.successCallback} />;
}

function ClimbSelector(props) {
    let [context, setContext] = useContext(AppContext);
    let [climbs, setClimbs] = useState();

    async function retrieveClimbsData() {
        if (!props) {
            return;
        }
        let climbsRef = collection(context.db, "climbs");
        let q = query(climbsRef, where('rope', '==', props.rope.toString()));
        let snapshot = await getDocs(q);

        climbs = {}
        snapshot.forEach((doc) => {
            climbs[doc.id] = new Climb(doc.id).fillFromDoc(doc);
        });
        setClimbs(climbs);
    }

    if (!climbs)
        retrieveClimbsData();

    return climbs && <div>{
        // TODO: There should be a better way of doing this. Use an array instead?
        Object.entries(climbs)
            .map(([_, climb]) => climb)
            .filter(climb => climb.isActive)
            .map((climb) => <ClimbSelectorCard climb={climb} successCallback={props.successCallback} />)
    }
        <ClimbSelectorCard rope={props.rope} successCallback={retrieveClimbsData} />
    </div>
}

function ClimbSelectorCard(props) {
    let [newClimb, setNewClimb] = useState();

    function colourMapper(colourString) {
        switch (colourString) {
            case 'Red':
                return 'rgb(204, 51, 0)';
            case 'Green':
                return 'rgb(0, 153, 0)';
            case 'Blue':
                return 'rgb(51, 102, 255)';
            case 'Yellow':
                return 'rgb(255, 204, 0)';
            case 'Orange':
                return 'rgb(255, 128, 0)';
            case 'Purple':
                return 'rgb(102, 0, 204)';
            case 'Pink':
                return 'rgb(255, 51, 204)';
            case 'White':
                return 'rgb(217, 217, 217)';
            case 'Black':
                return 'rgb(26, 26, 26)';
            default:
                return 'rgba(255, 0, 0, 0.2)';
        }
    }

    // This can be removed after all climbs have been mapped
    if (!props.climb)
        return (!newClimb && <div className='climb-selector-card-container climb-selector-add-new-container' onClick={() => setNewClimb(true)}> + </div>)
            ||
            <EditClimbForm
                rope={props.rope}
                successCallback={() => {
                    props.successCallback();
                    setNewClimb(false);
                }}
                failCallback={() => setNewClimb(false)}
            />

    return props.climb && <div className='climb-selector-card-container' onClick={() => props.successCallback && props.successCallback(props.climb)}>
        <div className='climb-selector-card-header' style={{ backgroundColor: colourMapper(props.climb.colour) }}>{props.climb.colour}</div>
        <div className='climb-selector-card-grade'>{props.climb.grade}</div>
    </div>
}

export default VisualClimbSelector;