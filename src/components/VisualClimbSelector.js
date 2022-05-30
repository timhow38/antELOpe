import { useState } from 'react';
import './../styles/VisualClimbSelector.css';

function VisualClimbSelector(props) {
    return <div className='climb-selector-container'>
        <div className='climb-grid-section climb-grid-top-left'>Section A</div>
        <div className='climb-grid-section climb-grid-top-right'>Section B</div>
        <div className='climb-grid-section climb-grid-middle-left'>Section C</div>
        <div className='climb-grid-section climb-grid-middle-right'>Section D</div>
        <div className='climb-grid-section climb-grid-bottom-left'>Section E</div>
        <div className='climb-grid-section climb-grid-bottom-right'>Section F</div>
    </div>
}

export default VisualClimbSelector;