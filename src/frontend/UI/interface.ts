import { FlexStyle, PressableProps, StyleProp, TouchableOpacityProps } from 'react-native';

import { UI_COLORS } from './colors';

export interface FlexProps {
  direction?: FlexStyle['flexDirection'];
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  grow?: FlexStyle['flexGrow'];
  shrink?: FlexStyle['flexShrink'];
  wrap?: FlexStyle['flexWrap'];
  backgroundColor?: ColorType;
  gapY?: number;
  gapX?: number;
  gap?: number;
  styles?: StyleProp<unknown>;
  onPress?: PressableProps['onPress'];
}

export type ColorType = keyof typeof UI_COLORS;
export type TypographyMode = 'default' | 'title' | 'subtitle' | 'body-bold' | 'body-medium' | 'caption-bold' | 'caption-medium' | 'label';
export interface TypographyProps {
  mode?: TypographyMode;
  color?: ColorType;
}

export type IconType = 'logo' | 'chevron' | 'faq' | 'pencil' | 'plus' | 'close' | 'gear' | 'tick' | 'search';
export interface IconProps {
  type: IconType;
  rotate?: number;
  color?: ColorType;
  size?: number;
}

export type UIButtonPropsType = 'primary' | 'secondary' | 'round';
export interface UIButtonProps extends TouchableOpacityProps {
  type?: 'primary' | 'secondary';
}

export interface IconButtonProps extends TouchableOpacityProps {
  size?: number;
  color?: ColorType;
  iconType: IconType;
}

export interface DrawerProps {
  caption: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DividerProps {
  verticalGap?: number;
  horizontalGap?: number;
}
