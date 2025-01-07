# Chart.js Doughnut Label Plugin

A versatile Chart.js plugin that enables displaying multiple lines of customizable text within the inner circle of doughnut charts, offering a clean and informative way to present data insights.

## Installation

```bash
npm install chartjs-doughnutlabel-v1
```

Usage
Import the plugin:

```bash
import Chart from 'chart.js';
import DoughnutLabelPlugin from 'chartjs-doughnutlabel-v1';

Chart.register(DoughnutLabelPlugin);

```

Add the doughnutLabel options in your chart configuration:

```bash
import Chart from 'chart.js/auto';
import DoughnutLabelPlugin from 'chartjs-doughnutlabel-v1';

Chart.register(DoughnutLabelPlugin);

// Example usage:
const ctx = document.getElementById('myChart').getContext('2d');
const data = {
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ['red', 'blue', 'green'],
    },
  ],
  labels: ['Red', 'Blue', 'Green'],
};

const getTotal = (chart) =>
  `Total: ${chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0)}`;

const myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data,
  options: {
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 'The title',
            font: { size: 60 },
          },
          {
            text: getTotal,
            font: { size: 50 },
            color: 'grey',
          },
          {
            text: '$100.000',
            font: { size: 30 },
            color: 'red',
          },
          {
            text: '95%',
            font: { size: 45 },
            color: 'green',
          },
        ],
      },
    },
  },
});

```