import Chart from 'chart.js';
import defaults from './defaults';
import utils from './utils';

const helpers = Chart.helpers;

Chart.defaults.global.plugins.doughnutlabel = defaults;

function drawDoughnutLabel(chart, options) {
  if (options && options.labels && options.labels.length > 0) {
    const ctx = chart.ctx;
    const resolve = helpers.options.resolve;

    const innerLabels = options.labels.map((label) => {
      const text = typeof label.text === 'function' ? label.text(chart) : label.text;
      return {
        text,
        font: utils.parseFont(resolve([label.font, options.font, {}], ctx, 0)),
        color: resolve([label.color, options.color, Chart.defaults.global.defaultFontColor], ctx, 0),
      };
    });

    let textAreaSize = utils.textSize(ctx, innerLabels);

    const hypotenuse = Math.sqrt(
      Math.pow(textAreaSize.width, 2) + Math.pow(textAreaSize.height, 2)
    );
    const innerDiameter = chart.innerRadius * 2;
    const fitRatio = innerDiameter / hypotenuse;

    if (fitRatio < 1) {
      innerLabels.forEach((innerLabel) => {
        innerLabel.font.size = Math.floor(innerLabel.font.size * fitRatio);
        innerLabel.font.lineHeight = undefined;
        innerLabel.font = utils.parseFont(resolve([innerLabel.font, {}], ctx, 0));
      });

      textAreaSize = utils.textSize(ctx, innerLabels);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    const topY = centerY - textAreaSize.height / 2;

    let currentHeight = 0;
    innerLabels.forEach((innerLabel) => {
      ctx.fillStyle = innerLabel.color;
      ctx.font = innerLabel.font.string;

      const lineCenterY = topY + innerLabel.font.lineHeight / 2 + currentHeight;
      currentHeight += innerLabel.font.lineHeight;

      ctx.fillText(innerLabel.text, centerX, lineCenterY);
    });
  }
}

const DoughnutLabelPlugin = {
  id: 'doughnutlabel',
  beforeDatasetDraw(chart, args, options) {
    drawDoughnutLabel(chart, options);
  },
};

export default DoughnutLabelPlugin;
