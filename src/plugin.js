import Chart from 'chart.js/auto';
import defaults from './defaults';
import utils from './utils';

const DoughnutLabelPlugin = {
  id: 'doughnutlabel',
  defaults: defaults,
  beforeDatasetDraw(chart, args, options) {
    if (options && options.labels && options.labels.length > 0) {
      /**
       * Draws the doughnut label using the given options.
       *
       * @param {Chart} chart - The chart to draw the label for.
       * @param {Object} options - The label options.
       *
       * @private
       */
      const ctx = chart.ctx;
      const resolve = Chart.helpers.resolve;

      const innerLabels = options.labels.map((label) => ({
        text: typeof label.text === 'function' ? label.text(chart) : label.text,
        font: utils.parseFont(resolve([label.font, options.font, {}], ctx, 0)),
        color: resolve([label.color, options.color, Chart.defaults.color], ctx, 0),
      }));

      const textAreaSize = utils.textSize(ctx, innerLabels);

      const innerDiameter = chart.innerRadius * 2;
      const hypotenuse = Math.sqrt(textAreaSize.width ** 2 + textAreaSize.height ** 2);
      const fitRatio = innerDiameter / hypotenuse;

      if (fitRatio < 1) {
        innerLabels.forEach((innerLabel) => {
          innerLabel.font.size = Math.floor(innerLabel.font.size * fitRatio);
          innerLabel.font = utils.parseFont(resolve([innerLabel.font, {}], ctx, 0));
        });
      }

      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      const topY = centerY - textAreaSize.height / 2;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let currentHeight = 0;
      innerLabels.forEach((innerLabel) => {
        ctx.fillStyle = innerLabel.color;
        ctx.font = innerLabel.font.string;
        const lineCenterY = topY + innerLabel.font.lineHeight / 2 + currentHeight;
        currentHeight += innerLabel.font.lineHeight;
        ctx.fillText(innerLabel.text, centerX, lineCenterY);
      });
    }
  },
};

export default DoughnutLabelPlugin;
