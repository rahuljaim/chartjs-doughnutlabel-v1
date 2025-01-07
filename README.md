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
import DoughnutLabelPlugin from 'chartjs-doughnutlabel-plugin';

Chart.register(DoughnutLabelPlugin);

```

Add the doughnutLabel options in your chart configuration:

```bash
const options = {
  plugins: {
    doughnutLabel: {
      labels: [
        {
          text: 'Total',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        {
          text: '450',
          font: {
            size: 24,
            weight: 'bold',
          },
          color: '#36A2EB',
        },
      ],
    },
  },
};
```