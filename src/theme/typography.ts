import fontWeights from './fontWeights';

const typography = {
  h1: { fontSize: 28, fontWeight: fontWeights.bold },
  h2: { fontSize: 22, fontWeight: fontWeights.semibold },
  h3: { fontSize: 18, fontWeight: fontWeights.semibold },
  body: {
    fontSize: 16,
    fontWeight: fontWeights.regular,
  },
  caption: { fontSize: 14, fontWeight: fontWeights.regular },
  small: { fontSize: 12, fontWeight: fontWeights.regular },
};
export type Typography = keyof typeof typography;
export default typography;
