import { ViewStyle } from 'react-native';

import { UI_COLORS } from '../colors';
import { UIButtonPropsType } from '../interface';

const DEFAULT_BUTTON_STYLES: ViewStyle = {
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: UI_COLORS.accentLightGray,
  borderRadius: 8,
};

export const BUTTON_STYLES_CONFIG: Record<UIButtonPropsType, ViewStyle> = {
  primary: {
    ...DEFAULT_BUTTON_STYLES,
    backgroundColor: UI_COLORS.primary,
  },
  round: {
    ...DEFAULT_BUTTON_STYLES,
    backgroundColor: UI_COLORS.accentLightGray,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  secondary: {
    ...DEFAULT_BUTTON_STYLES,
    backgroundColor: UI_COLORS.accentLightGray,
  },
};
