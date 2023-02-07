import { FlexStyle, PressableProps, StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

import { UI_COLORS } from './colors';

export interface FlexProps {
  direction?: FlexStyle['flexDirection'];
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  grow?: FlexStyle['flexGrow'];
  shrink?: FlexStyle['flexShrink'];
  wrap?: FlexStyle['flexWrap'];
  flex?: FlexStyle['flex'];
  width?: FlexStyle['width'];
  height?: FlexStyle['height'];
  marginX?: FlexStyle['marginHorizontal'];
  marginY?: FlexStyle['marginVertical'];
  radius?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  backgroundColor?: ColorType;
  gapY?: number;
  gapX?: number;
  gap?: number;
  shadowType?: 'l1' | 'l2' | 'l3';
  styles?: StyleProp<unknown>;
  onPress?: PressableProps['onPress'];
  testID?: string;
}

export type ColorType = keyof typeof UI_COLORS;
export type TypographyMode = 'default' | 'title' | 'subtitle' | 'body-bold' | 'body-medium' | 'caption-bold' | 'caption-medium' | 'label' | 'error';
export interface TypographyProps {
  mode?: TypographyMode;
  color?: ColorType;
  align?: TextStyle['textAlign'];
}

export type IconType = 'logo' | 'chevron' | 'faq' | 'pencil' | 'plus' | 'close' | 'gear' | 'tick' | 'search' | 'attention' | 'flame';
export interface IconProps {
  type: IconType;
  rotate?: number;
  color?: ColorType;
  size?: number;
}

export type UIButtonPropsType = 'primary' | 'secondary' | 'round';
export interface UIButtonProps extends TouchableOpacityProps {
  type?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export interface IconButtonProps extends TouchableOpacityProps {
  size?: number;
  color?: ColorType;
  iconType: IconType;
  rotate?: number;
}

export interface DrawerProps {
  caption: string | JSX.Element;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface DividerProps {
  verticalGap?: number;
  horizontalGap?: number;
}
