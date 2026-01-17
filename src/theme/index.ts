import { Dimensions } from 'react-native';
import { darkColors, lightColors } from './colors';
import spacing from './spacing';
import typography from './typography';
import borderRadius from './borderRadius';
const { width, height } = Dimensions.get('window');
const layout = {
  width,
  height,
  isSmallDevice: width < 375,
};

export const theme = {
  light: lightColors,
  dark: darkColors,
};
export { spacing, borderRadius, typography, layout };
export type Theme = typeof theme;
export type ThemeMode = 'light' | 'dark' | 'system';
