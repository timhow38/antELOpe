import { reduceEloHistory } from './../data/EloTools';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import './../styles/EloGraph.css';

function EloGraph(props) {
    let history = reduceEloHistory(props.events, props.baseRating);
    let dates = history.map(i => new Date(i.startTime))

    function outcomeColorMapper() {
        const red = 'rgb(255, 33, 12)';
        const amber = 'rgb(235, 125, 52)';
        const green = 'rgb(58, 235, 52)';

        let mapped = history.map(event => {
            if (event.outcome === 1)
                return green;
            else if (event.outcome === 0)
                return red;
            else
                return amber;
        });

        return mapped;
    }

    let outcomeColors = outcomeColorMapper();

    let data = {
        labels: dates,
        datasets: [
            {
                label: 'Current Rating',
                data: history.map(i => (i.currentElo/100).toFixed(2)),
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)'

            },
            {
                label: 'Grade (position) and outcome (colour)',
                data: history.map(i => (i.climbRating / 100).toFixed(2)),
                pointBackgroundColor: outcomeColors,
                borderWidth: 0
            }
        ],
    }
    let options = {
        maintainAspectRatio: false,
        color: 'rgb(255, 255, 255)',
        scales: {
            y: {
                grace: '10%',
                ticks: {
                    stepSize: 1,
                    color: 'rgb(255, 255, 255)'
                },
                grid: {
                    color: function (context) {
                        if (context.tick.value % 1 === 0) {
                            return 'rgba(75, 192, 192, 1)';
                        } else {
                            return 'rgba(75, 192, 192, 0.2)';
                        }
                    }
                }
            },
            x: {
                grace: 1000,
                type: 'time',
                min: history[1].startTime,
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgb(255, 255, 255)'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    }
    return <div className='eloGraph'>
        <Line data={data} options={options} />
    </div>
}

export default EloGraph;