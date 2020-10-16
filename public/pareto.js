import Highcharts from '../node_modules/highcharts';
import Exporting from '../node_modules/highcharts/modules/exporting';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/pareto')(Highcharts);
Exporting(Highcharts);
// var container = document.createElement('div');
// document.body.appendChild(container);
   
// eslint-disable-next-line no-undef
window.pareto = new Highcharts.Chart({
    chart: {
        background: '#2a2a2b',
        renderTo: 'container',
        type: 'pareto'
    },
    title: {
        text: 'Restaurants Complaints'
    },
    tooltip: {
        shared: true
    },
    xAxis: {
        categories: [
            'Overpriced',
            'Small portions',
            'Wait time',
            'Food is tasteless',
            'No atmosphere',
            'Not clean',
            'Too noisy',
            'Unfriendly staff'
        ],
        crosshair: true
    },
    yAxis: [{
        title: {
            text: ''
        }
    }, {
        title: {
            text: ''
        },
        minPadding: 0,
        maxPadding: 0,
        max: 100,
        min: 0,
        opposite: true,
        labels: {
            format: "{value}%"
        }
    }],
    series: [{
        type: 'pareto',
        name: 'pareto',
        yAxis: 1,
        zIndex: 10,
        baseSeries: 1,
        tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
        }
    }, {
        name: 'Complaints',
        type: 'column',
        zIndex: 2,
        data: [755, 222, 151, 86, 72, 51, 36, 10]
        }]
    });

// eslint-disable-next-line no-undef
module.exports = pareto