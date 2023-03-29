import AppContext from './AppContext';
import { useContext } from 'react';
import EloGraph from './EloGraph';
import React, { useState } from 'react';
import { Typography } from '@mui/material';


function History(props) {
    function transformTime(timeStr) {
        return new Date(timeStr).toISOString().substring(0, 19);
    }
    let [context, setContext] = useContext(AppContext);

    let rankedClimbs = context.user.events.filter(event => event.type === 'ClimbAttempt' && event.ranked);

    const options1 = { dateStyle: 'short' };
    const options2 = { timeStyle: 'short' };

    return <>
    <Typography variant="h6">Current History</Typography>
    <EloGraph events={rankedClimbs} baseRating={context.user.baseRating} />
    <h2>Ranked Climbs</h2>
    <div className="scrollable">
  <table>
    <thead>
      <tr>
      <th>Color</th>
        <th>Rope</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {rankedClimbs.map(event => {
        const date = new Date(event.startTime);
        return (
          <tr key={'ranked' + event.startTime}>
            <td style={{ color: event.colour }}>{event.colour}</td>
            <td>{event.rope}</td>
            <td>{date.toLocaleDateString(undefined, options1)}</td>
            <td>{date.toLocaleTimeString(undefined, options2)}</td>
            <td>{event.outcome}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
    <h2>Casual Climbs</h2>
    <div className="scrollable">
    <table>
    <thead>
      <tr>
      <th>Color</th>
        <th>Rope</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {context.user.events
        .filter(event => event.type === 'ClimbAttempt' && !event.ranked)
        .map(event => {
          const date = new Date(event.startTime);
          return (
            <tr key={'casual' + event.startTime}>
              <td style={{ color: event.colour }}>{event.colour}</td>
              <td>{event.rope}</td>
              <td>{date.toLocaleDateString(undefined, options1)}</td>
              <td>{date.toLocaleTimeString(undefined, options2)}</td>
              <td>{event.outcome}</td>
            </tr>
          );
        })}
    </tbody>
  </table>
  </div>
  <h2>Hangboard Times</h2>
  <div className="scrollable">
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {context.user.events
        .filter(event => event.type === 'HangboardTime')
        .map(event => {
          const date = new Date(event.startTime);
          return (
            <tr key={'hang' + event.startTime}>
                <td>{date.toLocaleDateString(undefined, options1)}</td>
                <td>{date.toLocaleTimeString(undefined, options2)}</td>
              <td>{event.durationSeconds}</td>
              </tr>
          );
        })}
    </tbody>
  </table>
  </div>

</>



}

export default History;