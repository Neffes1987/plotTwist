import React, { PropsWithChildren, ReactElement } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { UI_COLORS } from '../colors';
import { FlexProps } from '../interface';

export const Flex = (props: PropsWithChildren<FlexProps>): ReactElement => {
  const { onPress, children, backgroundColor, direction = 'row', justify, grow, shrink, align = 'center', wrap, styles, gapY, gapX, gap } = props;

  const customStyles = {
    backgroundColor: backgroundColor ? UI_COLORS[backgroundColor] : undefined,
    // @ts-ignore
    ...styles,
    flex: 1,
    flexDirection: direction,
    justifyContent: justify,
    flexGrow: grow,
    flexShrink: shrink,
    alignItems: align,
    flexWrap: wrap,
    paddingVertical: gapY ?? gap,
    paddingHorizontal: gapX ?? gap,
  };

  if (!onPress) {
    return <View style={customStyles as ViewStyle}>{children}</View>;
  }

  return (
    <TouchableOpacity style={customStyles as ViewStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
