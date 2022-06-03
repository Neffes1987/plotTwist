import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { DividerProps } from '../interface';

export const Divider = (props: DividerProps): ReactElement => {
  const { verticalGap, horizontalGap } = props;

  return (
    <View
      style={{
        marginVertical: verticalGap,
        marginHorizontal: horizontalGap,
        height: 1,
      }}
    />
  );
};
