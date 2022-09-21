const ColorList = {
  white: '#FFFFFF',
  black: '#333333',
  darkBlue: '#525e75',
  light: '#F1DDBF',
  brown: '#756952',
  green: '#78938A',
  'green-100': '#92ba92',
  'green-200': '527558',
  purple: '#755270',
  error: '#ff0033',
} as const;

export type ThemeColor = keyof typeof ColorList;

export default ColorList;
