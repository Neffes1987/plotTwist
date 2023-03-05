import React, { PropsWithChildren, ReactElement } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { UI_COLORS } from '../colors';
import { FlexProps } from '../interface';

import { SHADOWS } from './constants';

export const Flex = (props: PropsWithChildren<FlexProps>): ReactElement => {
  const {
    testID,
    fullWidth,
    onPress,
    children,
    backgroundColor,
    direction = 'row',
    justify,
    grow,
    shrink,
    align = 'center',
    wrap,
    styles,
    padY,
    padX,
    pad,
    width,
    flex,
    height,
    radius,
    fullHeight,
    shadowType,
    marginX,
    marginY,
    borderColor,
  } = props;

  let shadowConfig = {};

  if (shadowType) {
    shadowConfig = SHADOWS[shadowType];
  }

  const customStyles = {
    borderColor: borderColor ? UI_COLORS[borderColor] : undefined,
    backgroundColor: backgroundColor ? UI_COLORS[backgroundColor] : undefined,
    flexDirection: direction,
    justifyContent: justify,
    flexGrow: fullHeight ? 99 : grow,
    flexShrink: shrink,
    alignItems: align,
    flexWrap: wrap,
    marginHorizontal: marginX,
    marginVertical: marginY,
    flex,
    height,
    borderRadius: radius,
    paddingVertical: padY ?? pad,
    paddingHorizontal: padX ?? pad,
    width,
    alignSelf: fullWidth ? 'stretch' : null,
    // @ts-ignore
    ...styles,

    ...shadowConfig,
  };

  if (!onPress) {
    return (
      <View testID={testID} style={customStyles as ViewStyle}>
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity testID={testID} style={customStyles as ViewStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
