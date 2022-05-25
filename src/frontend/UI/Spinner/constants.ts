import { ViewStyle } from 'react-native';

export const SPINNER_INTERVAL = 500;
export const SPINNER_ROW_SCHEMA = ['top:0', 'bottom:0', 'bottom:1', 'bottom:2', 'top:2', 'top:1'];
export const SPINNER_ROWS_DEFAULT_STATE = {
  top: [0, 0, 0],
  bottom: [0, 0, 0],
};

export const defaultProps: ViewStyle = {
  borderRadius: 150,
  borderWidth: 1,
};

export const topCircles: ViewStyle[] = [
  {
    marginTop: 8,
    marginLeft: 4,
    ...defaultProps,
  },
  {
    marginTop: -24,
    marginLeft: 2,
    ...defaultProps,
  },
  {
    ...defaultProps,
    marginBottom: 2,
  },
];

export const bottomCircles: ViewStyle[] = [
  {
    marginRight: 2,
    ...defaultProps,
  },
  {
    marginBottom: -18,
    ...defaultProps,
  },
  { ...defaultProps },
];
