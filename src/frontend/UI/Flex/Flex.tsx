import React, { PropsWithChildren, ReactElement } from 'react';
import { Dimensions, TouchableOpacity, View, ViewStyle } from 'react-native';

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
    gapY,
    gapX,
    gap,
    width,
    flex,
    height,
    radius,
    fullHeight,
    shadowType,
    marginX,
    marginY,
  } = props;

  let shadowConfig = {};

  if (shadowType) {
    shadowConfig = SHADOWS[shadowType];
  }

  const customStyles = {
    backgroundColor: backgroundColor ? UI_COLORS[backgroundColor] : undefined,
    flexDirection: direction,
    justifyContent: justify,
    flexGrow: grow,
    flexShrink: shrink,
    alignItems: align,
    flexWrap: wrap,
    marginHorizontal: marginX,
    marginVertical: marginY,
    flex,
    height: fullHeight ? Dimensions.get('window').height : height,
    borderRadius: radius,
    paddingVertical: gapY ?? gap,
    paddingHorizontal: gapX ?? gap,
    width: fullWidth ? '100%' : width,
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
