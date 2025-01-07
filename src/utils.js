import { defaults } from 'chart.js';

const utils = {
  parseFont(value) {
    const defaultFont = defaults.font;
    const size = value.size || defaultFont.size;
    const font = {
      family: value.family || defaultFont.family,
      lineHeight: value.lineHeight || 1.2,
      size,
      style: value.style || defaultFont.style,
      weight: value.weight || defaultFont.weight,
      string: '',
    };

    font.string = utils.toFontString(font);
    return font;
  },

  toFontString(font) {
    if (!font || !font.size || !font.family) {
      return null;
    }

    return `${font.style || ''} ${font.weight || ''} ${font.size}px ${font.family}`.trim();
  },

  textSize(ctx, labels) {
    const items = Array.isArray(labels) ? labels : [labels];
    const prevFont = ctx.font;

    let width = 0;
    let height = 0;

    items.forEach((item) => {
      ctx.font = item.font.string;
      width = Math.max(ctx.measureText(item.text).width, width);
      height += item.font.lineHeight;
    });

    ctx.font = prevFont;

    return { width, height };
  },
};

export default utils;
