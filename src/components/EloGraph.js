import { reduceEloHistory } from './../data/EloTools';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import './../styles/EloGraph.css';

export default function EloGraph(props) {
    let history = reduceEloHistory(props.events, props.baseRating);


    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1;
        var dd = this.getDate();

        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('/');
    };

    let dates = history.map(i => new Date(i.startTime).yyyymmdd());

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
                data: history.map(i => (i.currentElo / 100).toFixed(2)),
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
    let bgFillRules = [];
    let currentRule = false;
    for (let i = 0; i < dates.length; i++) {
        if (i === 0 || dates[i] === dates[i - 1])
            bgFillRules.push(currentRule);
        else {
            currentRule = !currentRule;
            bgFillRules.push(currentRule);
        }
    }
    bgFillRules = bgFillRules.map(i => i ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)');

    let xTickMask = [];
    for (let i = 0; i < dates.length; i++) {
        if (i === 0 || dates[i] !== dates[i - 1])
            xTickMask.push(true);
        else {
            xTickMask.push(false);
        }
    }
    xTickMask = xTickMask.map(i => i ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)');

    let options = {
        maintainAspectRatio: false,
        color: 'rgb(255, 255, 255)',
        backgroundFillRules: bgFillRules,
        scales: {
            y: {
                grace: '10%',
                ticks: {
                    stepSize: 0.5,
                    color: 'rgb(255, 255, 255)'
                },
                grid: {
                    color: function (context) {
                        if (context.tick.value % 1 === 0) {
                            return 'rgba(255, 255, 255, 1)';
                        } else {
                            return 'rgba(255, 255, 255, 0.2)';
                        }
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: xTickMask
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            },
            customPlugin: {
                text: 'Hello'
            }

        }
    }
    let plugins = [{
        id: 'customPlugin',
        beforeDraw: function (chart, args, options) {
            let rules = chart.options.backgroundFillRules;
            let ctx = chart.ctx;
            let yAxis = chart.scales['y'];
            let xAxis = chart.scales['x'];
            for (let i = 0; i < rules.length; ++i) {
                let width = xAxis.width / xAxis.ticks.length;
                var xAxisPosStart = xAxis.left + (i * width);
                ctx.fillStyle = rules[i];
                ctx.fillRect(xAxisPosStart, chart.chartArea.top, width, yAxis.height);
            }
        }
    }]
    return <>
        <div className='elo-graph'>
            <Line data={data} options={options} plugins={plugins} />
        </div>
    </>
}