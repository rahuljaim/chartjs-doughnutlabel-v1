/**
 * @module Options
 */

export default {
    /**
     * The font options used to draw the label text.
     * @member {Object|Array|Function}
     * @prop {String} font.family - defaults to Chart.defaults.font.family
     * @prop {Number} font.lineHeight - defaults to 1.2
     * @prop {Number} font.size - defaults to Chart.defaults.font.size
     * @prop {String} font.style - defaults to Chart.defaults.font.style
     * @prop {Number} font.weight - defaults to 'normal'
     * @default Chart.defaults.font.*
     */
    font: {
      family: undefined,
      lineHeight: 1.2,
      size: undefined,
      style: undefined,
      weight: null,
    },
  };
  