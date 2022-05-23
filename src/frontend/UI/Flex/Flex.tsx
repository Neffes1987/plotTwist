import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';

import { FlexProps } from '../interface';

export const Flex = (props: PropsWithChildren<FlexProps>): ReactElement => {
  const { children, direction = 'row', justify, grow, shrink, align = 'center', wrap, styles } = props;

  return (
    <View
      style={{
        // @ts-ignore
        ...styles,
        flex: 1,
        flexDirection: direction,
        justifyContent: justify,
        flexGrow: grow,
        flexShrink: shrink,
        alignItems: align,
        flexWrap: wrap,
      }}
    >
      {children}
    </View>
  );
};
