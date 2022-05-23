import { ViewStyle } from 'react-native';

import { UI_COLORS } from '../colors';

export const DRAWER_STYLES: Record<string, ViewStyle> = {
  divider: {
    backgroundColor: UI_COLORS.accentGray,
    height: 6,
    width: 40,
    borderRadius: 8,
  },
  barContainer: {
    paddingVertical: 4,
    width: '100%',
    backgroundColor: UI_COLORS.primary,
    maxHeight: 14,
  },
  body: {
    backgroundColor: UI_COLORS.accentWhite,
  },
};
