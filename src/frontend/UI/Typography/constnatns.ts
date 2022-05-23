import { TextStyle } from 'react-native';

import { TypographyMode } from '../interface';

const FONT_MEDIUM_SIZE = '500';
const FONT_BOLD_SIZE = '700';
const FONTS = {
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
};

export const TYPOGRAPHY_STYLES: Record<TypographyMode, TextStyle> = {
  'body-bold': {
    fontSize: 16,
    fontWeight: FONT_BOLD_SIZE,
    fontFamily: FONTS.bold,
  },
  'body-medium': {
    fontSize: 16,
    fontWeight: FONT_MEDIUM_SIZE,
    fontFamily: FONTS.medium,
  },
  label: {
    fontSize: 9,
    fontWeight: FONT_BOLD_SIZE,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: FONT_BOLD_SIZE,
    fontFamily: FONTS.bold,
  },
  title: {
    fontSize: 22,
    fontWeight: FONT_BOLD_SIZE,
    fontFamily: FONTS.bold,
  },
  'caption-bold': {
    fontSize: 12,
    fontWeight: FONT_BOLD_SIZE,
    fontFamily: FONTS.bold,
  },
  'caption-medium': {
    fontSize: 12,
    fontWeight: FONT_MEDIUM_SIZE,
    fontFamily: FONTS.medium,
  },
  default: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: FONTS.regular,
  },
};
